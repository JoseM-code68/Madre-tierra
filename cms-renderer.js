// CMS Content Renderer
// Renders dynamic content from Netlify CMS

class ContentRenderer {
    // Render products
    renderProducts(products, container) {
        if (!container) return;

        container.innerHTML = products.map(product => `
            <div class="product-card" data-category="${product.category || 'frutas'}">
                <div class="product-image">
                    <img src="${product.image}" alt="${product.name}" loading="lazy">
                    ${product.badge && product.badge !== 'Ninguno' ?
                `<span class="product-badge${product.badge === 'Orgánico' ? ' organic' : product.badge === 'Fresco' ? ' fresh' : ''}">${product.badge}</span>`
                : ''}
                </div>
                <div class="product-info">
                    <h3>${product.name}</h3>
                    <p>${product.description}</p>
                    <div class="product-footer">
                        <span class="product-price">${product.price}</span>
                    </div>
                </div>
            </div>
        `).join('');
    }

    // Render FAQ
    renderFAQ(faqItems, container) {
        if (!container) return;

        container.innerHTML = faqItems.map(item => `
            <div class="faq-item">
                <button class="faq-question">
                    <span>${item.question}</span>
                    <svg class="faq-icon" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M19 9l-7 7-7-7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </button>
                <div class="faq-answer">
                    <p>${item.answer}</p>
                </div>
            </div>
        `).join('');
    }

    // Render testimonials
    renderTestimonials(testimonials, container) {
        if (!container) return;

        container.innerHTML = testimonials.map(testimonial => `
            <div class="testimonial-card">
                <p class="testimonial-text">"${testimonial.text}"</p>
                <div class="testimonial-author">
                    <div class="author-avatar">
                        <img src="https://ui-avatars.com/api/?name=${encodeURIComponent(testimonial.initials || testimonial.name)}&size=50&background=7DB249&color=fff&bold=true&rounded=true"
                             alt="${testimonial.name}">
                    </div>
                    <div class="author-info">
                        <h4>${testimonial.name}</h4>
                        <p>${testimonial.company}</p>
                    </div>
                </div>
            </div>
        `).join('');
    }

    // Update site settings
    updateSettings(settings) {
        // Update hero section
        const heroTitle = document.querySelector('.hero-title');
        const heroSubtitle = document.querySelector('.hero-subtitle');
        const heroDescription = document.querySelector('.hero-description');

        if (heroTitle && settings.hero_title) heroTitle.textContent = settings.hero_title;
        if (heroSubtitle && settings.hero_subtitle) heroSubtitle.textContent = settings.hero_subtitle;
        if (heroDescription && settings.hero_description) heroDescription.textContent = settings.hero_description;

        // Update contact info
        const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
        phoneLinks.forEach(link => {
            if (settings.phone) {
                link.href = `tel:+1${settings.phone.replace(/\D/g, '')}`;
                link.textContent = settings.phone;
            }
        });

        const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
        emailLinks.forEach(link => {
            if (settings.email) {
                link.href = `mailto:${settings.email}`;
                link.textContent = settings.email;
            }
        });
    }
}

// Initialize renderer
window.contentRenderer = new ContentRenderer();

// Load and render all content when DOM is ready
document.addEventListener('DOMContentLoaded', async () => {
    console.log('🌿 Loading CMS content...');

    try {
        const content = await window.contentLoader.loadAll();

        // Render products
        const productGrid = document.querySelector('.product-grid');
        if (productGrid && content.products.length > 0) {
            window.contentRenderer.renderProducts(content.products, productGrid);
        }

        // Render FAQ
        const faqContainer = document.querySelector('.faq-container');
        if (faqContainer && content.faq.length > 0) {
            window.contentRenderer.renderFAQ(content.faq, faqContainer);

            // Re-initialize FAQ accordion
            const faqQuestions = document.querySelectorAll('.faq-question');
            faqQuestions.forEach(question => {
                question.addEventListener('click', () => {
                    const answer = question.nextElementSibling;
                    const isActive = question.classList.contains('active');

                    faqQuestions.forEach(q => {
                        q.classList.remove('active');
                        q.nextElementSibling.classList.remove('active');
                    });

                    if (!isActive) {
                        question.classList.add('active');
                        answer.classList.add('active');
                    }
                });
            });
        }

        // Render testimonials (Carousel Logic)
        const testimonialsTrack = document.querySelector('.testimonials-track');
        if (testimonialsTrack && content.testimonials.length > 0) {
            // Duplicate array for infinite loop effect
            let loopContent = content.testimonials;
            // Always duplicate at least once to ensure scroll works
            loopContent = [...loopContent, ...loopContent, ...loopContent];

            window.contentRenderer.renderTestimonials(loopContent, testimonialsTrack);
        }

        // Update settings
        if (content.settings) {
            window.contentRenderer.updateSettings(content.settings);
        }

        console.log('✅ CMS content loaded successfully!');
    } catch (error) {
        console.error('❌ Failed to load CMS content:', error);
    }
});
