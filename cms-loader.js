// Netlify CMS Content Loader
// Loads content from markdown files managed by Netlify CMS

class ContentLoader {
    constructor() {
        this.products = [];
        this.faq = [];
        this.testimonials = [];
        this.settings = {};
    }

    // Parse markdown frontmatter
    parseFrontmatter(content) {
        const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---/;
        const match = content.match(frontmatterRegex);

        if (!match) return {};

        const frontmatter = {};
        const lines = match[1].split('\n');

        lines.forEach(line => {
            const colonIndex = line.indexOf(':');
            if (colonIndex > -1) {
                const key = line.substring(0, colonIndex).trim();
                let value = line.substring(colonIndex + 1).trim();

                // Remove quotes
                value = value.replace(/^["']|["']$/g, '');

                // Convert boolean strings
                if (value === 'true') value = true;
                if (value === 'false') value = false;

                // Convert numbers
                if (!isNaN(value) && value !== '') {
                    value = Number(value);
                }

                frontmatter[key] = value;
            }
        });

        return frontmatter;
    }

    // Fetch and parse a markdown file
    async fetchMarkdown(url) {
        try {
            const response = await fetch(url);
            if (!response.ok) return null;
            const content = await response.text();
            return this.parseFrontmatter(content);
        } catch (error) {
            console.warn(`Failed to fetch ${url}:`, error);
            return null;
        }
    }

    // Load all products
    async loadProducts() {
        const productFiles = [
            '/content/products/lechosa-premium.md',
            '/content/products/lechosa-organica.md',
            '/content/products/lechosa-de-granja.md'
        ];

        const products = await Promise.all(
            productFiles.map(file => this.fetchMarkdown(file))
        );

        this.products = products.filter(p => p && p.available !== false);
        return this.products;
    }

    // Load all FAQ items
    async loadFAQ() {
        const faqFiles = [
            '/content/faq/pedido-minimo.md',
            '/content/faq/entregas.md',
            '/content/faq/organicas.md'
        ];

        const faq = await Promise.all(
            faqFiles.map(file => this.fetchMarkdown(file))
        );

        this.faq = faq
            .filter(f => f && f.question)
            .sort((a, b) => (a.order || 0) - (b.order || 0));

        return this.faq;
    }

    // Load all testimonials
    async loadTestimonials() {
        const testimonialFiles = [
            '/content/testimonials/maria-gonzalez.md',
            '/content/testimonials/carlos-rodriguez.md',
            '/content/testimonials/ana-martinez.md'
        ];

        const testimonials = await Promise.all(
            testimonialFiles.map(file => this.fetchMarkdown(file))
        );

        this.testimonials = testimonials.filter(t => t && t.name);
        return this.testimonials;
    }

    // Load site settings
    async loadSettings() {
        try {
            const response = await fetch('/content/settings.json');
            this.settings = await response.json();
            return this.settings;
        } catch (error) {
            console.warn('Failed to load settings:', error);
            return {};
        }
    }

    // Load all content
    async loadAll() {
        await Promise.all([
            this.loadProducts(),
            this.loadFAQ(),
            this.loadTestimonials(),
            this.loadSettings()
        ]);

        return {
            products: this.products,
            faq: this.faq,
            testimonials: this.testimonials,
            settings: this.settings
        };
    }
}

// Initialize and expose globally
window.contentLoader = new ContentLoader();
