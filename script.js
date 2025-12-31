// ==========================================
// DOM ELEMENTS
// ==========================================
console.log('🏁 Script loaded - Version Final');

const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');
const filterButtons = document.querySelectorAll('.filter-btn');
const newsletterForm = document.getElementById('newsletterForm');

// ==========================================
// MOBILE MENU TOGGLE
// ==========================================
if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });

    // Close menu when clicking on a nav link
    document.querySelectorAll('.nav a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            menuToggle.classList.remove('active');
        });
    });
}

// ==========================================
// SMOOTH SCROLL & ACTIVE NAV
// ==========================================
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav a');

function updateActiveNav() {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', updateActiveNav);

// ==========================================
// PRODUCT SEARCH & FILTERS
// ==========================================
const searchInput = document.getElementById('productSearch');
const productCount = document.getElementById('productCount');
let currentFilter = 'all';
let currentSearchTerm = '';

function filterProducts() {
    const productCards = document.querySelectorAll('.product-card');
    const productGrid = document.querySelector('.product-grid');
    let visibleCount = 0;

    if (!productGrid) return;

    productCards.forEach((card, index) => {
        const categories = card.getAttribute('data-category');
        const productName = card.querySelector('h3')?.textContent.toLowerCase() || '';
        const productDesc = card.querySelector('p')?.textContent.toLowerCase() || '';

        const matchesFilter = currentFilter === 'all' || (categories && categories.includes(currentFilter));
        const matchesSearch = !currentSearchTerm ||
            productName.includes(currentSearchTerm.toLowerCase()) ||
            productDesc.includes(currentSearchTerm.toLowerCase());

        if (matchesFilter && matchesSearch) {
            card.style.display = 'block';
            card.style.animation = `fadeInUp 0.5s ease forwards ${index * 0.05}s`;
            visibleCount++;
        } else {
            card.style.display = 'none';
        }
    });

    // Update product count
    if (productCount) {
        productCount.innerHTML = `Mostrando <strong>${visibleCount}</strong> producto${visibleCount !== 1 ? 's' : ''}`;
    }

    // No results message
    let noResultsMsg = document.querySelector('.no-results-message');
    if (visibleCount === 0) {
        if (!noResultsMsg) {
            noResultsMsg = document.createElement('div');
            noResultsMsg.className = 'no-results-message';
            noResultsMsg.innerHTML = `
                <div style="text-align: center; padding: 3rem; grid-column: 1 / -1;">
                    <h3 style="color: #7DB249;">No se encontraron productos</h3>
                    <p>Intenta con otro término de búsqueda</p>
                </div>`;
            productGrid.appendChild(noResultsMsg);
        }
        noResultsMsg.style.display = 'block';
    } else if (noResultsMsg) {
        noResultsMsg.style.display = 'none';
    }
}

// Filter Buttons
filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        currentFilter = button.getAttribute('data-filter');
        filterProducts();
    });
});

// Search Input
if (searchInput) {
    searchInput.addEventListener('input', (e) => {
        currentSearchTerm = e.target.value.trim();
        filterProducts();
    });
}

// ==========================================
// PRODUCT DETAIL MODAL
// ==========================================
const productModal = document.getElementById('productModal');
const modalClose = document.querySelector('.modal-close');
const modalImage = document.getElementById('modalImage');
const modalBadge = document.getElementById('modalBadge');
const modalTitle = document.getElementById('modalTitle');
const modalPrice = document.getElementById('modalPrice');
const modalDescription = document.getElementById('modalDescription');
const orderForm = document.getElementById('orderForm');
const qtyInput = document.getElementById('orderQuantity');
const minusBtn = document.querySelector('.qty-btn.minus');
const plusBtn = document.querySelector('.qty-btn.plus');

// Click logic (Delegation)
document.addEventListener('click', (e) => {
    const card = e.target.closest('.product-card');

    // Ignore clicks if they happened inside the specific "Add to Cart" button if it existed (it doesn't anymore, but good practice)
    if (card) {
        console.log('Product clicked:', card); // Debug

        const image = card.querySelector('img')?.src;
        const title = card.querySelector('h3')?.innerText;
        const price = card.querySelector('.product-price')?.innerText;
        const description = card.querySelector('p')?.innerText;
        const badgeElem = card.querySelector('.product-badge');

        if (!image || !title) return;

        // Populate Modal
        if (modalImage) modalImage.src = image;
        if (modalTitle) modalTitle.innerText = title;
        if (modalPrice) modalPrice.innerText = price;
        if (modalDescription) modalDescription.innerText = description;

        if (modalBadge) {
            if (badgeElem) {
                modalBadge.innerText = badgeElem.innerText;
                modalBadge.className = badgeElem.className;
                modalBadge.style.display = 'inline-block';
            } else {
                modalBadge.style.display = 'none';
            }
        }

        // Reset form
        if (qtyInput) qtyInput.value = 1;

        // Show Modal
        if (productModal) {
            productModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }
});

// Close Modal
function closeModal() {
    if (productModal) {
        productModal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

if (modalClose) modalClose.addEventListener('click', closeModal);
if (productModal) {
    productModal.addEventListener('click', (e) => {
        if (e.target === productModal) closeModal();
    });
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && productModal && productModal.classList.contains('active')) {
        closeModal();
    }
});

// Quantity Selector
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

// WhatsApp Integration
if (orderForm) {
    orderForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const product = modalTitle ? modalTitle.innerText : 'Producto';
        const price = modalPrice ? modalPrice.innerText : '';
        const qty = qtyInput ? qtyInput.value : '1';
        const nameInput = document.getElementById('clientName');
        const name = nameInput ? nameInput.value : '';

        const phoneNumber = '18296370216';

        let message = `Hola 👋, me interesa pedir:\n\n`;
        message += `📦 *Producto:* ${product}\n`;
        message += `⚖️ *Cantidad:* ${qty}\n`;
        message += `💵 *Precio:* ${price}\n`;

        if (name) {
            message += `👤 *Mi Nombre:* ${name}\n`;
        }

        message += `\n¿Tienen disponible?`;

        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

        window.open(whatsappUrl, '_blank');
        closeModal();
    });
}

// ==========================================
// SCROLL ANIMATIONS (IntersectionObserver)
// ==========================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.8s ease forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.product-card, .feature-card, .category-card').forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
});

// ==========================================
// HEADER & HERO EFFECTS
// ==========================================
const header = document.querySelector('.header');
const hero = document.querySelector('.hero');

window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;

    // Header shadow
    if (header) {
        if (scrollY > 50) {
            header.style.boxShadow = '0 4px 20px rgba(0,0,0,0.1)';
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.backdropFilter = 'blur(10px)';
        } else {
            header.style.boxShadow = 'none';
            header.style.background = '#FFFFFF';
            header.style.backdropFilter = 'none';
        }
    }

    // Parallax
    if (hero && scrollY < window.innerHeight) {
        hero.style.transform = `translateY(${scrollY * 0.4}px)`;
        hero.style.opacity = 1 - (scrollY / 700);
    }
});

// ==========================================
// FAQ
// ==========================================
const faqQuestions = document.querySelectorAll('.faq-question');
faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
        const answer = question.nextElementSibling;
        const isActive = question.classList.contains('active');

        faqQuestions.forEach(q => {
            q.classList.remove('active');
            if (q.nextElementSibling) q.nextElementSibling.classList.remove('active');
        });

        if (!isActive && answer) {
            question.classList.add('active');
            answer.classList.add('active');
        }
    });
});
