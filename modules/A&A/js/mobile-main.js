/**
 * 📱 A&A Perfumería - Mobile Manager
 * Gestión optimizada para dispositivos móviles
 * Versión: 2.0 Mobile Enhanced
 */

class MobileAAManager {
    constructor() {
        this.products = [];
        this.cart = [];
        this.currentFilter = 'todos';
        this.isLoading = false;
        
        // Elementos DOM
        this.elements = {
            filters: document.getElementById('mobileFilters'),
            products: document.getElementById('mobileProducts'),
            productsGrid: document.getElementById('mobileProductsGrid'),
            novedades: document.getElementById('mobileNovedades'),
            novedadesGrid: document.getElementById('mobileNovedadesGrid'),
            loading: document.getElementById('mobileLoading'),
            empty: document.getElementById('mobileEmpty'),
            cartCounter: document.getElementById('mobileCartCounter'),
            cartCount: document.getElementById('mobileCartCount'),
            cartBody: document.getElementById('mobileCartBody'),
            cartFooter: document.getElementById('mobileCartFooter'),
            productModal: document.getElementById('mobileProductModal'),
            cartModal: document.getElementById('mobileCartModal'),
            modalBody: document.getElementById('mobileModalBody')
        };
        
        // Configuración móvil
        this.config = {
            lazyLoadOffset: 100,
            touchFeedbackDuration: 150,
            animationDuration: 300,
            maxImageSize: 400, // Tamaño máximo para móviles
            cacheExpiry: 5 * 60 * 1000 // 5 minutos
        };
        
        // Cache para optimización
        this.cache = new Map();
        
        console.log('📱 MobileAAManager inicializado');
    }
    
    /**
     * Inicializar la aplicación móvil
     */
    async init() {
        try {
            console.log('🚀 Iniciando aplicación móvil...');
            
            // Configurar eventos
            this.setupEventListeners();
            
            // Cargar datos
            await this.loadData();
            
            // Configurar optimizaciones móviles
            this.setupMobileOptimizations();
            
            // Cargar carrito desde localStorage
            this.loadCartFromStorage();
            
            // Mostrar productos por defecto
            this.filterProducts('todos');
            
            console.log('✅ Aplicación móvil lista');
            
        } catch (error) {
            console.error('❌ Error inicializando aplicación móvil:', error);
            this.showError('Error cargando la aplicación');
        }
    }
    
    /**
     * Configurar event listeners optimizados para móvil
     */
    setupEventListeners() {
        // Filtros con touch feedback
        if (this.elements.filters) {
            this.elements.filters.addEventListener('click', (e) => {
                if (e.target.classList.contains('filter-btn')) {
                    this.handleFilterClick(e.target);
                }
            });
            
            // Touch feedback para filtros
            this.elements.filters.addEventListener('touchstart', (e) => {
                if (e.target.classList.contains('filter-btn')) {
                    this.addTouchFeedback(e.target);
                }
            }, { passive: true });
        }
        
        // Productos con lazy loading
        if (this.elements.productsGrid) {
            this.elements.productsGrid.addEventListener('click', (e) => {
                const productCard = e.target.closest('.mobile-product-card');
                if (productCard) {
                    const productId = productCard.dataset.productId;
                    this.openProductModal(productId);
                }
            });
        }
        
        // Optimización de scroll
        this.setupScrollOptimization();
        
        // Eventos de orientación
        window.addEventListener('orientationchange', () => {
            setTimeout(() => this.handleOrientationChange(), 100);
        });
        
        // Eventos de resize
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => this.handleResize(), 250);
        });
        
        console.log('📱 Event listeners configurados');
    }
    
    /**
     * Cargar datos de productos y novedades
     */
    async loadData() {
        this.showLoading(true);
        
        try {
            // Cargar productos (usando la configuración existente)
            if (typeof PRODUCTOS !== 'undefined') {
                this.products = PRODUCTOS;
            } else {
                // Fallback con productos básicos
                this.products = await this.loadProductsFallback();
            }
            
            // Cargar novedades
            this.novedades = this.getNovedadesData();
            
            console.log(`📦 Cargados ${this.products.length} productos`);
            
        } catch (error) {
            console.error('❌ Error cargando datos:', error);
            throw error;
        } finally {
            this.showLoading(false);
        }
    }
    
    /**
     * Productos fallback si no están disponibles
     */
    async loadProductsFallback() {
        return [
            {
                id: 'aa001',
                nombre: 'Fragancia Inspirada Premium',
                categoria: 'unisex',
                inspirado: 'Inspirado en fragancias populares',
                descripcion: 'Una fragancia única y cautivadora',
                precio: 'Desde $299',
                imagen: 'recursos/A&A/productos/default.jpg',
                tamaños: [
                    { ml: 30, precio: 299 },
                    { ml: 50, precio: 449 },
                    { ml: 100, precio: 699 }
                ]
            }
        ];
    }
    
    /**
     * Obtener datos de novedades
     */
    getNovedadesData() {
        return [
            {
                id: 'nov001',
                titulo: 'Fragancias para Dama y Caballero',
                descripcion: 'Descubre nuestra exclusiva colección',
                imagen: 'recursos/A&A/Material Grafico/CartelonDamayCabellero.jpg'
            },
            {
                id: 'nov002',
                titulo: 'Perfumes Inspirados',
                descripcion: 'Calidad premium a precios accesibles',
                imagen: 'recursos/A&A/Material Grafico/CartelonDePerdumesInspirados.jpg'
            },
            {
                id: 'nov003',
                titulo: 'Marco de Perfume',
                descripcion: 'Presentación elegante y sofisticada',
                imagen: 'recursos/A&A/Material Grafico/CartelonMarcoPerfume.jpg'
            }
        ];
    }
    
    /**
     * Manejar clic en filtros
     */
    handleFilterClick(button) {
        const filter = button.dataset.filter;
        
        // Actualizar botones activos
        this.elements.filters.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        button.classList.add('active');
        
        // Aplicar filtro
        if (filter === 'novedades') {
            this.showNovedades();
        } else {
            this.filterProducts(filter);
        }
        
        // Feedback táctil
        this.addTouchFeedback(button);
    }
    
    /**
     * Filtrar productos
     */
    filterProducts(categoria) {
        this.currentFilter = categoria;
        
        // Ocultar novedades, mostrar productos
        this.elements.novedades.style.display = 'none';
        this.elements.products.style.display = 'block';
        
        let filteredProducts = this.products;
        
        if (categoria !== 'todos') {
            filteredProducts = this.products.filter(p => p.categoria === categoria);
        }
        
        this.renderProducts(filteredProducts);
        
        console.log(`🔍 Mostrando ${filteredProducts.length} productos (${categoria})`);
    }
    
    /**
     * Mostrar novedades
     */
    showNovedades() {
        // Mostrar novedades, ocultar productos
        this.elements.products.style.display = 'none';
        this.elements.novedades.style.display = 'block';
        
        this.renderNovedades();
        
        console.log('🎉 Mostrando novedades');
    }
    
    /**
     * Renderizar productos optimizado para móvil
     */
    renderProducts(products) {
        if (!products.length) {
            this.showEmpty(true);
            return;
        }
        
        this.showEmpty(false);
        
        const html = products.map(product => this.createProductCard(product)).join('');
        this.elements.productsGrid.innerHTML = html;
        
        // Configurar lazy loading para imágenes
        this.setupLazyLoading();
        
        // Configurar touch feedback para productos
        this.setupProductTouchFeedback();
    }
    
    /**
     * Crear tarjeta de producto móvil
     */
    createProductCard(product) {
        return `
            <div class="mobile-product-card" data-product-id="${product.id || product.nombre}">
                <div class="mobile-product-image">
                    <img src="${product.imagen}" 
                         alt="${product.nombre}" 
                         loading="lazy"
                         onerror="this.src='recursos/A&A/placeholder.jpg'">
                    <div class="mobile-product-category">${product.categoria.toUpperCase()}</div>
                </div>
                <div class="mobile-product-info">
                    <h3 class="mobile-product-name">${product.nombre}</h3>
                    <p class="mobile-product-description">${product.inspirado || product.descripcion}</p>
                    <div class="mobile-product-price">${product.precio}</div>
                    <div class="mobile-product-actions">
                        <button class="mobile-btn mobile-btn-primary" onclick="mobileApp.openProductModal('${product.id || product.nombre}')">
                            Ver Detalles
                        </button>
                        <button class="mobile-btn mobile-btn-secondary" onclick="mobileApp.quickAddToCart('${product.id || product.nombre}')">
                            🛒 Agregar
                        </button>
                    </div>
                </div>
            </div>
        `;
    }
    
    /**
     * Renderizar novedades
     */
    renderNovedades() {
        const html = this.novedades.map(novedad => this.createNovedadCard(novedad)).join('');
        this.elements.novedadesGrid.innerHTML = html;
        
        this.setupLazyLoading();
    }
    
    /**
     * Crear tarjeta de novedad
     */
    createNovedadCard(novedad) {
        return `
            <div class="mobile-novedad-card">
                <div class="mobile-novedad-image">
                    <img src="${novedad.imagen}" 
                         alt="${novedad.titulo}" 
                         loading="lazy"
                         onerror="this.src='recursos/A&A/placeholder.jpg'">
                </div>
                <div class="mobile-novedad-info">
                    <h3 class="mobile-novedad-title">${novedad.titulo}</h3>
                    <p class="mobile-novedad-description">${novedad.descripcion}</p>
                </div>
            </div>
        `;
    }
    
    /**
     * Configurar lazy loading optimizado
     */
    setupLazyLoading() {
        const images = this.elements.productsGrid.querySelectorAll('img[loading="lazy"]');
        
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.style.opacity = '0';
                        img.style.transition = 'opacity 0.3s ease';
                        
                        img.onload = () => {
                            img.style.opacity = '1';
                        };
                        
                        imageObserver.unobserve(img);
                    }
                });
            }, {
                rootMargin: `${this.config.lazyLoadOffset}px`
            });
            
            images.forEach(img => imageObserver.observe(img));
        }
    }
    
    /**
     * Configurar feedback táctil para productos
     */
    setupProductTouchFeedback() {
        const cards = this.elements.productsGrid.querySelectorAll('.mobile-product-card');
        
        cards.forEach(card => {
            card.addEventListener('touchstart', () => {
                this.addTouchFeedback(card);
            }, { passive: true });
        });
    }
    
    /**
     * Agregar feedback táctil
     */
    addTouchFeedback(element) {
        element.style.transform = 'scale(0.98)';
        element.style.transition = 'transform 0.1s ease';
        
        setTimeout(() => {
            element.style.transform = '';
            element.style.transition = '';
        }, this.config.touchFeedbackDuration);
    }
    
    /**
     * Abrir modal de producto
     */
    openProductModal(productId) {
        const product = this.products.find(p => (p.id || p.nombre) === productId);
        if (!product) return;
        
        const modalContent = this.createProductModalContent(product);
        this.elements.modalBody.innerHTML = modalContent;
        
        this.elements.productModal.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        console.log(`📱 Modal abierto para: ${product.nombre}`);
    }
    
    /**
     * Crear contenido del modal de producto
     */
    createProductModalContent(product) {
        const sizes = product.tamaños || [
            { ml: 30, precio: 299 },
            { ml: 50, precio: 449 },
            { ml: 100, precio: 699 }
        ];
        
        return `
            <div class="mobile-modal-product">
                <div class="mobile-modal-image">
                    <img src="${product.imagen}" alt="${product.nombre}">
                </div>
                <div class="mobile-modal-info">
                    <h2 class="mobile-modal-title">${product.nombre}</h2>
                    <p class="mobile-modal-inspired">${product.inspirado}</p>
                    <p class="mobile-modal-description">${product.descripcion}</p>
                    
                    <div class="mobile-modal-sizes">
                        <h3>Tamaños disponibles:</h3>
                        <div class="mobile-sizes-grid">
                            ${sizes.map(size => `
                                <div class="mobile-size-option" data-ml="${size.ml}" data-price="${size.precio}">
                                    <div class="mobile-size-ml">${size.ml}ml</div>
                                    <div class="mobile-size-price">$${size.precio}</div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                    
                    <div class="mobile-modal-actions">
                        <button class="mobile-btn mobile-btn-primary" onclick="mobileApp.addToCartFromModal('${product.id || product.nombre}')">
                            🛒 Agregar al Carrito
                        </button>
                        <button class="mobile-btn mobile-btn-secondary" onclick="mobileApp.contactWhatsApp('${product.nombre}')">
                            💬 Consultar por WhatsApp
                        </button>
                    </div>
                </div>
            </div>
        `;
    }
    
    /**
     * Cerrar modal de producto
     */
    closeMobileProductModal() {
        this.elements.productModal.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    /**
     * Agregar al carrito desde modal
     */
    addToCartFromModal(productId) {
        const selectedSize = document.querySelector('.mobile-size-option.selected');
        if (!selectedSize) {
            alert('Por favor selecciona un tamaño');
            return;
        }
        
        const product = this.products.find(p => (p.id || p.nombre) === productId);
        const ml = selectedSize.dataset.ml;
        const price = selectedSize.dataset.price;
        
        this.addToCart(product, ml, price);
        this.closeMobileProductModal();
    }
    
    /**
     * Agregar rápido al carrito
     */
    quickAddToCart(productId) {
        const product = this.products.find(p => (p.id || p.nombre) === productId);
        if (!product) return;
        
        // Agregar tamaño por defecto (30ml)
        this.addToCart(product, 30, 299);
    }
    
    /**
     * Agregar producto al carrito
     */
    addToCart(product, ml, price) {
        const cartItem = {
            id: `${product.id || product.nombre}_${ml}ml`,
            productId: product.id || product.nombre,
            nombre: product.nombre,
            ml: ml,
            precio: price,
            cantidad: 1,
            imagen: product.imagen
        };
        
        // Verificar si ya existe en el carrito
        const existingIndex = this.cart.findIndex(item => item.id === cartItem.id);
        
        if (existingIndex >= 0) {
            this.cart[existingIndex].cantidad++;
        } else {
            this.cart.push(cartItem);
        }
        
        this.updateCartUI();
        this.saveCartToStorage();
        
        // Mostrar feedback
        this.showCartFeedback(`${product.nombre} (${ml}ml) agregado al carrito`);
        
        console.log(`🛒 Agregado al carrito: ${product.nombre} ${ml}ml`);
    }
    
    /**
     * Abrir carrito móvil
     */
    openMobileCart() {
        this.renderCart();
        this.elements.cartModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    /**
     * Cerrar carrito móvil
     */
    closeMobileCart() {
        this.elements.cartModal.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    /**
     * Renderizar carrito
     */
    renderCart() {
        if (!this.cart.length) {
            this.elements.cartBody.innerHTML = `
                <div class="mobile-cart-empty">
                    <div class="mobile-cart-empty-icon">🛒</div>
                    <h3>Tu carrito está vacío</h3>
                    <p>Agrega algunos productos para comenzar</p>
                </div>
            `;
            this.elements.cartFooter.innerHTML = '';
            return;
        }
        
        const cartHTML = this.cart.map(item => this.createCartItem(item)).join('');
        this.elements.cartBody.innerHTML = cartHTML;
        
        const total = this.cart.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);
        this.elements.cartFooter.innerHTML = this.createCartFooter(total);
    }
    
    /**
     * Crear item del carrito
     */
    createCartItem(item) {
        return `
            <div class="mobile-cart-item" data-item-id="${item.id}">
                <div class="mobile-cart-item-image">
                    <img src="${item.imagen}" alt="${item.nombre}">
                </div>
                <div class="mobile-cart-item-info">
                    <h4 class="mobile-cart-item-name">${item.nombre}</h4>
                    <p class="mobile-cart-item-size">${item.ml}ml</p>
                    <div class="mobile-cart-item-controls">
                        <button class="mobile-cart-btn" onclick="mobileApp.updateCartQuantity('${item.id}', -1)">-</button>
                        <span class="mobile-cart-quantity">${item.cantidad}</span>
                        <button class="mobile-cart-btn" onclick="mobileApp.updateCartQuantity('${item.id}', 1)">+</button>
                    </div>
                </div>
                <div class="mobile-cart-item-price">
                    $${item.precio * item.cantidad}
                </div>
                <button class="mobile-cart-remove" onclick="mobileApp.removeFromCart('${item.id}')" aria-label="Eliminar">×</button>
            </div>
        `;
    }
    
    /**
     * Crear footer del carrito
     */
    createCartFooter(total) {
        return `
            <div class="mobile-cart-total">
                <div class="mobile-cart-total-row">
                    <span>Subtotal:</span>
                    <span>$${total}</span>
                </div>
                <div class="mobile-cart-total-row">
                    <span>Envío:</span>
                    <span>A consultar</span>
                </div>
                <div class="mobile-cart-total-row mobile-cart-total-final">
                    <span>Total:</span>
                    <span>$${total}</span>
                </div>
            </div>
            <div class="mobile-cart-actions">
                <button class="mobile-btn mobile-btn-primary" onclick="mobileApp.proceedToCheckout()">
                    💳 Proceder al Pago
                </button>
                <button class="mobile-btn mobile-btn-secondary" onclick="mobileApp.contactWhatsAppCart()">
                    💬 Consultar por WhatsApp
                </button>
            </div>
        `;
    }
    
    /**
     * Actualizar cantidad en carrito
     */
    updateCartQuantity(itemId, change) {
        const itemIndex = this.cart.findIndex(item => item.id === itemId);
        if (itemIndex === -1) return;
        
        this.cart[itemIndex].cantidad += change;
        
        if (this.cart[itemIndex].cantidad <= 0) {
            this.cart.splice(itemIndex, 1);
        }
        
        this.updateCartUI();
        this.renderCart();
        this.saveCartToStorage();
    }
    
    /**
     * Remover del carrito
     */
    removeFromCart(itemId) {
        this.cart = this.cart.filter(item => item.id !== itemId);
        this.updateCartUI();
        this.renderCart();
        this.saveCartToStorage();
    }
    
    /**
     * Actualizar UI del carrito
     */
    updateCartUI() {
        const totalItems = this.cart.reduce((sum, item) => sum + item.cantidad, 0);
        
        if (this.elements.cartCounter) {
            this.elements.cartCounter.textContent = totalItems;
            this.elements.cartCounter.style.display = totalItems > 0 ? 'flex' : 'none';
        }
        
        if (this.elements.cartCount) {
            this.elements.cartCount.textContent = `${totalItems} producto${totalItems !== 1 ? 's' : ''}`;
        }
    }
    
    /**
     * Contactar por WhatsApp
     */
    contactWhatsApp(productName) {
        const message = `Hola! Me interesa el perfume "${productName}" de A&A Perfumería. ¿Podrían darme más información?`;
        const whatsappUrl = `https://wa.me/5212721234567?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
    }
    
    /**
     * Contactar por WhatsApp con carrito
     */
    contactWhatsAppCart() {
        if (!this.cart.length) return;
        
        let message = "Hola! Me interesan estos productos de A&A Perfumería:\n\n";
        
        this.cart.forEach(item => {
            message += `• ${item.nombre} (${item.ml}ml) - Cantidad: ${item.cantidad}\n`;
        });
        
        const total = this.cart.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);
        message += `\nTotal: $${total}\n\n¿Podrían confirmar disponibilidad y costo de envío?`;
        
        const whatsappUrl = `https://wa.me/5212721234567?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
    }
    
    /**
     * Guardar carrito en localStorage
     */
    saveCartToStorage() {
        try {
            localStorage.setItem('aa_mobile_cart', JSON.stringify(this.cart));
        } catch (error) {
            console.warn('⚠️ No se pudo guardar el carrito:', error);
        }
    }
    
    /**
     * Cargar carrito desde localStorage
     */
    loadCartFromStorage() {
        try {
            const saved = localStorage.getItem('aa_mobile_cart');
            if (saved) {
                this.cart = JSON.parse(saved);
                this.updateCartUI();
            }
        } catch (error) {
            console.warn('⚠️ No se pudo cargar el carrito:', error);
            this.cart = [];
        }
    }
    
    /**
     * Configurar optimizaciones móviles
     */
    setupMobileOptimizations() {
        // Optimizar imágenes para móviles
        this.optimizeImages();
        
        // Configurar gestos táctiles
        this.setupTouchGestures();
        
        // Optimizar rendimiento
        this.setupPerformanceOptimizations();
        
        console.log('📱 Optimizaciones móviles configuradas');
    }
    
    /**
     * Optimizar imágenes
     */
    optimizeImages() {
        const images = document.querySelectorAll('img');
        images.forEach(img => {
            img.loading = 'lazy';
            img.style.imageRendering = 'auto';
        });
    }
    
    /**
     * Configurar gestos táctiles
     */
    setupTouchGestures() {
        // Prevenir zoom accidental
        document.addEventListener('touchstart', (e) => {
            if (e.touches.length > 1) {
                e.preventDefault();
            }
        }, { passive: false });
        
        // Mejorar scroll en modales
        [this.elements.productModal, this.elements.cartModal].forEach(modal => {
            if (modal) {
                modal.style.webkitOverflowScrolling = 'touch';
            }
        });
    }
    
    /**
     * Configurar optimizaciones de rendimiento
     */
    setupPerformanceOptimizations() {
        // Throttle para eventos de scroll
        let scrollTimeout;
        window.addEventListener('scroll', () => {
            if (scrollTimeout) return;
            scrollTimeout = setTimeout(() => {
                scrollTimeout = null;
                // Lógica de scroll optimizada
            }, 16); // ~60fps
        }, { passive: true });
    }
    
    /**
     * Configurar optimización de scroll
     */
    setupScrollOptimization() {
        let ticking = false;
        
        const updateScrollElements = () => {
            // Aquí se pueden agregar optimizaciones específicas de scroll
            ticking = false;
        };
        
        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(updateScrollElements);
                ticking = true;
            }
        }, { passive: true });
    }
    
    /**
     * Manejar cambio de orientación
     */
    handleOrientationChange() {
        // Reajustar layout si es necesario
        console.log('📱 Orientación cambiada');
    }
    
    /**
     * Manejar resize
     */
    handleResize() {
        // Reajustar elementos si es necesario
        console.log('📱 Ventana redimensionada');
    }
    
    /**
     * Mostrar estado de carga
     */
    showLoading(show) {
        this.elements.loading.style.display = show ? 'flex' : 'none';
        this.isLoading = show;
    }
    
    /**
     * Mostrar estado vacío
     */
    showEmpty(show) {
        this.elements.empty.style.display = show ? 'flex' : 'none';
    }
    
    /**
     * Mostrar feedback del carrito
     */
    showCartFeedback(message) {
        // Crear toast notification
        const toast = document.createElement('div');
        toast.className = 'mobile-toast';
        toast.textContent = message;
        toast.style.cssText = `
            position: fixed;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
            background: var(--aa-primary);
            color: var(--aa-dark);
            padding: 12px 20px;
            border-radius: 25px;
            font-weight: bold;
            z-index: 10000;
            opacity: 0;
            transition: opacity 0.3s ease;
        `;
        
        document.body.appendChild(toast);
        
        setTimeout(() => toast.style.opacity = '1', 100);
        setTimeout(() => {
            toast.style.opacity = '0';
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }
    
    /**
     * Mostrar error
     */
    showError(message) {
        console.error('❌', message);
        alert(message); // Temporal, se puede mejorar con un modal personalizado
    }
}

// Funciones globales para compatibilidad
window.openMobileCart = () => window.mobileApp?.openMobileCart();
window.closeMobileCart = () => window.mobileApp?.closeMobileCart();
window.closeMobileProductModal = () => window.mobileApp?.closeMobileProductModal();

// Event listeners para modal sizes
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('mobile-size-option')) {
        // Remover selección anterior
        document.querySelectorAll('.mobile-size-option').forEach(opt => {
            opt.classList.remove('selected');
        });
        
        // Agregar selección actual
        e.target.classList.add('selected');
    }
});

console.log('📱 MobileAAManager cargado');