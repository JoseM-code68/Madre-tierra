/**
 * Madre Tierra - Main Script
 * Version: Final 2.0 (Fixed)
 */

console.log('🚀 Script loaded: v=final2-fixed');

document.addEventListener('DOMContentLoaded', () => {
    console.log('✅ DOM Content Loaded');
    initApp();
});

function initApp() {
    initMobileMenu();
    initSmoothScroll();
    initSearchAndFilters();
    initModal();
    initWhatsApp();
    initScrollAnimations();
}

// ==========================================
// 1. MOBILE MENU
// ==========================================
function initMobileMenu() {
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent document click from immediately closing it
            navMenu.classList.toggle('active');
            menuToggle.classList.toggle('active');
            console.log('🍔 Menu toggled');
        });

        // Close when clicking links
        document.querySelectorAll('.nav a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                menuToggle.classList.remove('active');
            });
        });

        // Close when clicking outside
        document.addEventListener('click', (e) => {
            if (!navMenu.contains(e.target) && !menuToggle.contains(e.target)) {
                navMenu.classList.remove('active');
                menuToggle.classList.remove('active');
            }
        });
    }
}

// ==========================================
// 2. SMOOTH SCROLL
// ==========================================
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ==========================================
// 3. SEARCH & FILTERS
// ==========================================
function initSearchAndFilters() {
    const searchInput = document.getElementById('productSearch');
    const filterButtons = document.querySelectorAll('.filter-btn');

    // Filter Logic
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            filterProducts();
        });
    });

    // Search Logic
    if (searchInput) {
        searchInput.addEventListener('input', () => {
            filterProducts();
        });
    }
}

function filterProducts() {
    const currentFilter = document.querySelector('.filter-btn.active')?.dataset.filter || 'all';
    const searchTerm = document.getElementById('productSearch')?.value.toLowerCase().trim() || '';
    const cards = document.querySelectorAll('.product-card');
    const countEl = document.getElementById('productCount');
    let visibleByCount = 0;

    cards.forEach(card => {
        const category = card.dataset.category || '';
        const title = card.querySelector('h3')?.innerText.toLowerCase() || '';

        const matchesFilter = currentFilter === 'all' || category.includes(currentFilter);
        const matchesSearch = !searchTerm || title.includes(searchTerm);

        if (matchesFilter && matchesSearch) {
            card.style.display = 'block';
            card.style.animation = 'fadeInUp 0.5s ease forwards';
            visibleByCount++;
        } else {
            card.style.display = 'none';
        }
    });

    if (countEl) {
        countEl.innerHTML = `Mostrando <strong>${visibleByCount}</strong> producto${visibleByCount !== 1 ? 's' : ''}`;
    }
}

// ==========================================
// 4. PRODUCT MODAL (The Core Request)
// ==========================================
function initModal() {
    const modal = document.getElementById('productModal');
    if (!modal) {
        console.error('❌ Modal element #productModal not found in DOM!');
        return;
    }

    // Event Delegation for clicking products
    document.body.addEventListener('click', (e) => {
        const card = e.target.closest('.product-card');
        if (card) {
            console.log('📦 Product clicked:', card);
            openModal(card);
        }
    });

    // Close buttons
    document.querySelectorAll('.modal-close').forEach(btn => {
        btn.addEventListener('click', closeModal);
    });

    // Close on overlay click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeModal();
    });
}

function openModal(card) {
    const modal = document.getElementById('productModal');
    const img = card.querySelector('img')?.src;
    const title = card.querySelector('h3')?.innerText;
    const price = card.querySelector('.product-price')?.innerText || 'Consultar';
    const desc = card.querySelector('p')?.innerText || '';
    const badge = card.querySelector('.product-badge');

    // Fill Data
    document.getElementById('modalImage').src = img;
    document.getElementById('modalTitle').innerText = title;
    document.getElementById('modalPrice').innerText = price;
    document.getElementById('modalDescription').innerText = desc;

    // Badge
    const modalBadge = document.getElementById('modalBadge');
    if (badge) {
        modalBadge.innerText = badge.innerText;
        modalBadge.className = badge.className;
        modalBadge.style.display = 'inline-block';
    } else {
        modalBadge.style.display = 'none';
    }

    // Reset Quantity
    const qtyInput = document.getElementById('orderQuantity');
    if (qtyInput) qtyInput.value = 1;

    // Show
    modal.classList.add('active');
    document.body.style.overflow = 'hidden'; // Lock scroll
}

function closeModal() {
    const modal = document.getElementById('productModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = ''; // Unlock scroll
    }
}

// ==========================================
// 5. WHATSAPP & QUANTITY
// ==========================================
function initWhatsApp() {
    const qtyInput = document.getElementById('orderQuantity');
    const minusBtn = document.querySelector('.qty-btn.minus');
    const plusBtn = document.querySelector('.qty-btn.plus');

    // Quantity Logic
    if (minusBtn && qtyInput) {
        minusBtn.addEventListener('click', () => {
            let val = parseInt(qtyInput.value) || 1;
            if (val > 1) qtyInput.value = val - 1;
        });
    }

    if (plusBtn && qtyInput) {
        plusBtn.addEventListener('click', () => {
            let val = parseInt(qtyInput.value) || 1;
            qtyInput.value = val + 1;
        });
    }

    // Form Submit
    const form = document.getElementById('orderForm');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            sendWhatsApp();
        });
    }
}

function sendWhatsApp() {
    const title = document.getElementById('modalTitle')?.innerText || 'Producto';
    const price = document.getElementById('modalPrice')?.innerText;
    const qty = document.getElementById('orderQuantity')?.value || '1';
    const name = document.getElementById('clientName')?.value || 'Cliente';
    const phone = '18494671581';

    let msg = `Hola, quiero pedir en Madre Tierra:\n\n`;
    msg += `Producto/s: ${title}\n`;
    msg += `Cantidad: ${qty}\n`;
    msg += `Precio: ${price}\n`;
    msg += `Mi Nombre: ${name}\n\n`;
    msg += `¿Me confirma disponibilidad?`;

    const url = `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank');
    closeModal();
}

// ==========================================
// 6. SCROLL ANIMATIONS
// ==========================================
function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.8s ease forwards';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.product-card').forEach(el => {
        // el.style.opacity = '0'; // Avoid flashing if JS loads late
        observer.observe(el);
    });
}
