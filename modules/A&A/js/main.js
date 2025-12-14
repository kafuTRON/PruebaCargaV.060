/* ========== MÓDULO A&A - JAVASCRIPT PRINCIPAL ========== */

/**
 * Clase principal para manejar la perfumería A&A
 */
class AAManager {
    constructor() {
        this.state = {
            products: [],
            filteredProducts: [],
            currentFilter: 'todos',
            cart: new Map(),
            isLoading: false,
            searchTerm: ''
        };

        this.elements = {
            grid: null,
            filters: null,
            cart: null,
            searchInput: null
        };

        this.observers = new Map();
        this.init();
    }

    /**
     * Inicializar el módulo A&A
     */
    async init() {
        try {
            this.findElements();
            await this.loadProducts();
            this.setupFilters();
            this.setupSearch();
            this.setupCart();
            this.setupLazyLoading();
            this.setupPerformanceOptimizations();
            
            console.log('[AAManager] Initialized successfully');
        } catch (error) {
            console.error('[AAManager] Initialization failed:', error);
            this.showError('Error al inicializar la aplicación');
        }
    }

    /**
     * Encontrar elementos del DOM
     */
    findElements() {
        this.elements.grid = document.getElementById('productos-grid');
        this.elements.filters = document.querySelectorAll('.filter-btn');
        this.elements.cart = document.getElementById('cart-container');
        this.elements.searchInput = document.getElementById('search-input');

        if (!this.elements.grid) {
            throw new Error('Products grid not found');
        }
    }

    /**
     * Cargar productos
     */
    async loadProducts() {
        this.state.isLoading = true;
        this.showLoadingState();

        try {
            // Simular carga de productos (reemplazar con API real)
            const products = await this.fetchProducts();
            this.state.products = products;
            this.state.filteredProducts = products;
            
            this.renderProducts();
        } catch (error) {
            console.error('Error loading products:', error);
            this.showError('Error al cargar productos');
        } finally {
            this.state.isLoading = false;
        }
    }

    /**
     * Obtener productos (simulado - reemplazar con API real)
     */
    async fetchProducts() {
        // Simular delay de red
        await new Promise(resolve => setTimeout(resolve, 1000));

        return [
            {
                id: 1,
                nombre: "Fragancia Inspirada Dama",
                descripcion: "Elegante fragancia floral con notas de jazmín y rosa",
                precio: "$299",
                categoria: "dama",
                imagen: "recursos/A&A/damas/perfume1.jpg",
                disponible: true
            },
            {
                id: 2,
                nombre: "Fragancia Inspirada Caballero",
                descripcion: "Aroma masculino con notas amaderadas y especiadas",
                precio: "$299",
                categoria: "caballero",
                imagen: "recursos/A&A/caballeros/perfume1.jpg",
                disponible: true
            },
            {
                id: 3,
                nombre: "Fragancia Unisex",
                descripcion: "Aroma fresco y versátil para cualquier ocasión",
                precio: "$299",
                categoria: "unisex",
                imagen: "recursos/A&A/unisex/perfume1.jpg",
                disponible: true
            }
            // Agregar más productos aquí
        ];
    }

    /**
     * Renderizar productos
     */
    renderProducts() {
        if (!this.elements.grid) return;

        const productsHTML = this.state.filteredProducts.map(product => 
            this.createProductCard(product)
        ).join('');

        this.elements.grid.innerHTML = productsHTML;
        this.setupProductEvents();
    }

    /**
     * Crear tarjeta de producto
     */
    createProductCard(product) {
        return `
            <div class="product-card" data-product-id="${product.id}" data-category="${product.categoria}">
                <div class="product-image">
                    <img src="${product.imagen}" 
                         alt="${product.nombre}" 
                         loading="lazy"
                         onerror="this.src='recursos/A&A/placeholder.jpg'">
                </div>
                <div class="product-info">
                    <h3 class="product-name">${product.nombre}</h3>
                    <p class="product-description">${product.descripcion}</p>
                    <div class="product-price">${product.precio}</div>
                    <div class="product-actions">
                        <button class="btn-action btn-primary" onclick="aaManager.addToCart(${product.id})">
                            Agregar al Carrito
                        </button>
                        <button class="btn-action btn-secondary" onclick="aaManager.showProductDetails(${product.id})">
                            Ver Detalles
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    /**
     * Configurar filtros
     */
    setupFilters() {
        this.elements.filters.forEach(filter => {
            filter.addEventListener('click', (e) => {
                e.preventDefault();
                const category = filter.dataset.filter;
                this.filterProducts(category);
                this.updateActiveFilter(filter);
            });
        });
    }

    /**
     * Filtrar productos
     */
    filterProducts(category) {
        this.state.currentFilter = category;
        
        if (category === 'todos') {
            this.state.filteredProducts = this.state.products;
        } else {
            this.state.filteredProducts = this.state.products.filter(
                product => product.categoria === category
            );
        }

        this.renderProducts();
        this.logPerformance(`Filtered by: ${category}, showing ${this.state.filteredProducts.length} products`);
    }

    /**
     * Actualizar filtro activo
     */
    updateActiveFilter(activeFilter) {
        this.elements.filters.forEach(filter => {
            filter.classList.remove('active');
        });
        activeFilter.classList.add('active');
    }

    /**
     * Configurar búsqueda
     */
    setupSearch() {
        if (!this.elements.searchInput) return;

        let searchTimeout;
        this.elements.searchInput.addEventListener('input', (e) => {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(() => {
                this.searchProducts(e.target.value);
            }, 300);
        });
    }

    /**
     * Buscar productos
     */
    searchProducts(term) {
        this.state.searchTerm = term.toLowerCase();
        
        if (!term) {
            this.filterProducts(this.state.currentFilter);
            return;
        }

        this.state.filteredProducts = this.state.products.filter(product => 
            product.nombre.toLowerCase().includes(this.state.searchTerm) ||
            product.descripcion.toLowerCase().includes(this.state.searchTerm)
        );

        this.renderProducts();
        this.logPerformance(`Search: "${term}", found ${this.state.filteredProducts.length} products`);
    }

    /**
     * Configurar carrito
     */
    setupCart() {
        // Cargar carrito desde localStorage
        const savedCart = localStorage.getItem('aa-cart');
        if (savedCart) {
            try {
                const cartData = JSON.parse(savedCart);
                this.state.cart = new Map(cartData);
                this.updateCartDisplay();
            } catch (error) {
                console.warn('Error loading saved cart:', error);
            }
        }
    }

    /**
     * Agregar al carrito
     */
    addToCart(productId) {
        const product = this.state.products.find(p => p.id === productId);
        if (!product) return;

        const currentQuantity = this.state.cart.get(productId) || 0;
        this.state.cart.set(productId, currentQuantity + 1);

        this.saveCart();
        this.updateCartDisplay();
        this.showNotification(`${product.nombre} agregado al carrito`);
        
        this.logPerformance(`Added to cart: ${product.nombre}`);
    }

    /**
     * Guardar carrito
     */
    saveCart() {
        try {
            const cartData = Array.from(this.state.cart.entries());
            localStorage.setItem('aa-cart', JSON.stringify(cartData));
        } catch (error) {
            console.warn('Error saving cart:', error);
        }
    }

    /**
     * Actualizar display del carrito
     */
    updateCartDisplay() {
        const totalItems = Array.from(this.state.cart.values()).reduce((sum, qty) => sum + qty, 0);
        
        // Actualizar contador del carrito
        const cartCounter = document.querySelector('.cart-counter');
        if (cartCounter) {
            cartCounter.textContent = totalItems;
            cartCounter.style.display = totalItems > 0 ? 'flex' : 'none';
        }
    }

    /**
     * Mostrar detalles del producto
     */
    showProductDetails(productId) {
        const product = this.state.products.find(p => p.id === productId);
        if (!product) return;

        // Implementar modal de detalles
        this.showModal('product-details', {
            title: product.nombre,
            content: `
                <div class="product-details-modal">
                    <img src="${product.imagen}" alt="${product.nombre}">
                    <div class="details-info">
                        <h3>${product.nombre}</h3>
                        <p>${product.descripcion}</p>
                        <div class="price">${product.precio}</div>
                        <button class="btn-action btn-primary" onclick="aaManager.addToCart(${product.id})">
                            Agregar al Carrito
                        </button>
                    </div>
                </div>
            `
        });
    }

    /**
     * Configurar eventos de productos
     */
    setupProductEvents() {
        const productCards = document.querySelectorAll('.product-card');
        
        productCards.forEach(card => {
            // Efecto hover mejorado
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-10px)';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0)';
            });
        });
    }

    /**
     * Configurar carga perezosa
     */
    setupLazyLoading() {
        const images = document.querySelectorAll('img[loading="lazy"]');
        
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.classList.add('loading');
                        
                        img.addEventListener('load', () => {
                            img.classList.remove('loading');
                            img.classList.add('loaded');
                        });
                        
                        imageObserver.unobserve(img);
                    }
                });
            });

            images.forEach(img => imageObserver.observe(img));
            this.observers.set('images', imageObserver);
        }
    }

    /**
     * Optimizaciones de rendimiento
     */
    setupPerformanceOptimizations() {
        // Throttle scroll events
        let scrollTimeout;
        window.addEventListener('scroll', () => {
            if (!scrollTimeout) {
                scrollTimeout = setTimeout(() => {
                    this.handleScroll();
                    scrollTimeout = null;
                }, 16); // ~60fps
            }
        }, { passive: true });

        // Preload next page of products
        this.preloadNextProducts();
    }

    /**
     * Manejar scroll
     */
    handleScroll() {
        // Implementar scroll infinito si es necesario
        const scrollPosition = window.scrollY + window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        
        if (scrollPosition >= documentHeight - 1000) {
            // Cargar más productos si es necesario
            this.loadMoreProducts();
        }
    }

    /**
     * Cargar más productos
     */
    async loadMoreProducts() {
        // Implementar paginación si es necesario
        console.log('Loading more products...');
    }

    /**
     * Precargar próximos productos
     */
    preloadNextProducts() {
        // Implementar preload de imágenes de productos
        const nextImages = this.state.products.slice(10, 20).map(p => p.imagen);
        
        nextImages.forEach(src => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.as = 'image';
            link.href = src;
            document.head.appendChild(link);
        });
    }

    /**
     * Mostrar estado de carga
     */
    showLoadingState() {
        if (this.elements.grid) {
            this.elements.grid.innerHTML = `
                <div class="loading-state">
                    <div class="loading-spinner"></div>
                    <p>Cargando productos...</p>
                </div>
            `;
        }
    }

    /**
     * Mostrar error
     */
    showError(message) {
        if (this.elements.grid) {
            this.elements.grid.innerHTML = `
                <div class="error-state">
                    <h3>⚠️ Error</h3>
                    <p>${message}</p>
                    <button onclick="aaManager.init()" class="btn-action btn-primary">
                        Reintentar
                    </button>
                </div>
            `;
        }
    }

    /**
     * Mostrar notificación
     */
    showNotification(message) {
        // Implementar sistema de notificaciones
        console.log(`[Notification] ${message}`);
    }

    /**
     * Mostrar modal
     */
    showModal(type, options) {
        // Implementar sistema de modales
        console.log(`[Modal] ${type}:`, options);
    }

    /**
     * Limpiar recursos
     */
    cleanup() {
        this.observers.forEach(observer => observer.disconnect());
        this.observers.clear();
        this.saveCart();
    }

    /**
     * Logging de rendimiento
     */
    logPerformance(message, data = null) {
        if (process?.env?.NODE_ENV === 'development') {
            console.log(`[AAManager] ${message}`, data || '');
        }
    }

    /**
     * Obtener estadísticas
     */
    getStats() {
        return {
            totalProducts: this.state.products.length,
            filteredProducts: this.state.filteredProducts.length,
            cartItems: this.state.cart.size,
            currentFilter: this.state.currentFilter,
            searchTerm: this.state.searchTerm,
            isLoading: this.state.isLoading
        };
    }

    /**
     * API estática
     */
    static getInstance() {
        if (!window.aaManagerInstance) {
            window.aaManagerInstance = new AAManager();
        }
        return window.aaManagerInstance;
    }
}

// Auto-inicializar
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.aaManager = AAManager.getInstance();
    });
} else {
    window.aaManager = AAManager.getInstance();
}

// Limpiar al salir
window.addEventListener('beforeunload', () => {
    if (window.aaManager) {
        window.aaManager.cleanup();
    }
});

// Exportar para uso global
window.AAManager = AAManager;