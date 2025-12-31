// ==========================================
// DOM ELEMENTS
// ==========================================
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');
const filterButtons = document.querySelectorAll('.filter-btn');
const productCards = document.querySelectorAll('.product-card');
const newsletterForm = document.getElementById('newsletterForm');

// ==========================================
// MOBILE MENU TOGGLE
// ==========================================
menuToggle?.addEventListener('click', () => {
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
// PRODUCT FILTERS
// ==========================================
let currentFilter = 'all';
let currentSearchTerm = '';

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Update active button
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        currentFilter = button.getAttribute('data-filter');
        filterProducts();
    });
});

// ==========================================
// PRODUCT SEARCH (REAL-TIME)
// ==========================================
const searchInput = document.getElementById('productSearch');
const productCount = document.getElementById('productCount');

function filterProducts() {
    let visibleCount = 0;
    const productGrid = document.querySelector('.product-grid');

    productCards.forEach((card, index) => {
        const categories = card.getAttribute('data-category');
        const productName = card.querySelector('h3')?.textContent.toLowerCase() || '';
        const productDesc = card.querySelector('p')?.textContent.toLowerCase() || '';

        const matchesFilter = currentFilter === 'all' || categories?.includes(currentFilter);
        const matchesSearch = !currentSearchTerm ||
            productName.includes(currentSearchTerm.toLowerCase()) ||
            productDesc.includes(currentSearchTerm.toLowerCase());

        setTimeout(() => {
            if (matchesFilter && matchesSearch) {
                card.style.display = 'block';
                card.style.animation = 'fadeInUp 0.5s ease forwards';
                visibleCount++;
            } else {
                card.style.display = 'none';
            }
        }, index * 30);
    });

    // Update product count
    setTimeout(() => {
        if (productCount) {
            productCount.innerHTML = `Mostrando <strong>${visibleCount}</strong> producto${visibleCount !== 1 ? 's' : ''}`;
        }

        // Show "no results" message if needed
        let noResultsMsg = document.querySelector('.no-results-message');

        if (visibleCount === 0) {
            if (!noResultsMsg) {
                noResultsMsg = document.createElement('div');
                noResultsMsg.className = 'no-results-message';
                noResultsMsg.innerHTML = `
                    <div style="text-align: center; padding: 3rem; grid-column: 1 / -1;">
                        <svg width="80" height="80" viewBox="0 0 80 80" fill="none" style="margin: 0 auto 1rem;">
                            <circle cx="40" cy="40" r="35" stroke="#E0E0E0" stroke-width="4"/>
                            <path d="M30 45 L50 45" stroke="#7DB249" stroke-width="4" stroke-linecap="round"/>
                            <circle cx="30" cy="30" r="4" fill="#7DB249"/>
                            <circle cx="50" cy="30" r="4" fill="#7DB249"/>
                        </svg>
                        <h3 style="color: #7DB249; margin-bottom: 0.5rem;">No se encontraron productos</h3>
                        <p style="color: #6C757D;">Intenta con otro término de búsqueda o filtro</p>
                    </div>
                `;
                productGrid.appendChild(noResultsMsg);
            }
            noResultsMsg.style.display = 'block';
        } else if (noResultsMsg) {
            noResultsMsg.style.display = 'none';
        }
    }, productCards.length * 30 + 100);

    // Track search in Google Analytics
    if (typeof gtag !== 'undefined' && currentSearchTerm) {
        gtag('event', 'search', {
            'search_term': currentSearchTerm,
            'results_count': visibleCount
        });
    }
}

// Real-time search as user types
searchInput?.addEventListener('input', (e) => {
    currentSearchTerm = e.target.value.trim();
    filterProducts();
});

// Add fadeInUp animation
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

// ==========================================
// NEWSLETTER FORM
// ==========================================
newsletterForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const emailInput = newsletterForm.querySelector('input[type="email"]');
    const email = emailInput.value;

    if (email) {
        // Show success message
        const successMessage = document.createElement('div');
        successMessage.className = 'success-message';
        successMessage.textContent = '¡Gracias por suscribirte! 🎉';
        successMessage.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: linear-gradient(135deg, #4CAF50 0%, #81C784 100%);
            color: white;
            padding: 2rem 3rem;
            border-radius: 1rem;
            font-size: 1.25rem;
            font-weight: 600;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
            z-index: 1000;
            animation: slideIn 0.5s ease;
        `;

        document.body.appendChild(successMessage);

        // Add slide in animation
        const slideInStyle = document.createElement('style');
        slideInStyle.textContent = `
            @keyframes slideIn {
                from {
                    opacity: 0;
                    transform: translate(-50%, -60%);
                }
                to {
                    opacity: 1;
                    transform: translate(-50%, -50%);
                }
            }
        `;
        document.head.appendChild(slideInStyle);

        // Remove message after 3 seconds
        setTimeout(() => {
            successMessage.style.animation = 'slideOut 0.5s ease';
            setTimeout(() => successMessage.remove(), 500);
        }, 3000);

        // Add slide out animation
        const slideOutStyle = document.createElement('style');
        slideOutStyle.textContent = `
            @keyframes slideOut {
                from {
                    opacity: 1;
                    transform: translate(-50%, -50%);
                }
                to {
                    opacity: 0;
                    transform: translate(-50%, -40%);
                }
            }
        `;
        document.head.appendChild(slideOutStyle);

        // Clear input
        emailInput.value = '';
    }
});

// ==========================================
// SCROLL ANIMATIONS
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

// Observe elements for scroll animation
document.querySelectorAll('.product-card, .feature-card, .category-card').forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
});

// ==========================================
transform: translateX(0);
                }
            }
`;
        document.head.appendChild(slideInRightStyle);

        // Remove after 2 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 2000);

        const slideOutRightStyle = document.createElement('style');
        slideOutRightStyle.textContent = `
@keyframes slideOutRight {
                from {
        opacity: 1;
        transform: translateX(0);
    }
                to {
        opacity: 0;
        transform: translateX(100px);
    }
}
`;
        document.head.appendChild(slideOutRightStyle);

        // Bounce animation on button
        button.style.animation = 'none';
        setTimeout(() => {
            button.style.animation = 'cartBounce 0.5s ease';
        }, 10);
    });
});

// Cart button bounce animation
const cartBounceStyle = document.createElement('style');
cartBounceStyle.textContent = `
@keyframes cartBounce {
    0 %, 100 % {
        transform: scale(1) rotate(0deg);
    }
    25 % {
        transform: scale(1.2) rotate(12deg);
    }
    75 % {
        transform: scale(0.9) rotate(- 12deg);
}
    }
`;
document.head.appendChild(cartBounceStyle);

// ==========================================
// HEADER SCROLL EFFECT
// ==========================================
const header = document.querySelector('.header');
let lastScrollY = window.pageYOffset;

window.addEventListener('scroll', () => {
    const currentScrollY = window.pageYOffset;

    if (currentScrollY > 100) {
        header.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.1)';
        header.style.background = 'rgba(255, 255, 255, 0.95)';
    } else {
        header.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.08)';
        header.style.background = '#FFFFFF';
    }

    lastScrollY = currentScrollY;
});

// ==========================================
// PARALLAX EFFECT ON HERO
// ==========================================
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');

    if (hero && scrolled < window.innerHeight) {
        hero.style.transform = `translateY(${ scrolled * 0.5}px)`;
        hero.style.opacity = 1 - (scrolled / 600);
    }
});

// ==========================================
// FAQ ACCORDION
// ==========================================
const faqQuestions = document.querySelectorAll('.faq-question');

faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
        const answer = question.nextElementSibling;
        const isActive = question.classList.contains('active');

        // Close all other FAQs
        faqQuestions.forEach(q => {
            q.classList.remove('active');
            q.nextElementSibling.classList.remove('active');
        });

        // Toggle current FAQ
        if (!isActive) {
            question.classList.add('active');
            answer.classList.add('active');
        }
    });
});

// ==========================================
// INITIALIZATION
// ==========================================
console.log('🌿 Madre Tierra - Website loaded successfully!');
