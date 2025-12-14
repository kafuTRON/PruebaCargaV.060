/* ========== MÓDULO INDEX - JAVASCRIPT PRINCIPAL ========== */

/**
 * Clase principal para manejar la página de inicio
 */
class IndexManager {
    constructor() {
        this.isInitialized = false;
        this.performanceMetrics = {};
        this.init();
    }

    /**
     * Inicializar el módulo
     */
    async init() {
        if (this.isInitialized) return;

        try {
            // Configurar eventos básicos
            this.setupNavigation();
            this.setupImageOptimization();
            this.setupPerformanceMonitoring();
            this.setupAccessibility();
            
            // Configurar optimizaciones avanzadas
            await this.setupAdvancedOptimizations();
            
            this.isInitialized = true;
            this.logPerformance('IndexManager initialized');
            
        } catch (error) {
            console.error('Error initializing IndexManager:', error);
        }
    }

    /**
     * Configurar navegación
     */
    setupNavigation() {
        // Función global para navegación
        window.irA = (url) => {
            this.navigateToPage(url);
        };

        // Precargar páginas al hacer hover
        this.setupHoverPreloading();
    }

    /**
     * Navegar a una página con optimizaciones
     */
    navigateToPage(url) {
        // Registrar navegación
        this.logPerformance(`Navigating to: ${url}`);
        
        // Precargar si no se ha hecho
        this.preloadPage(url);
        
        // Pequeño delay para permitir preload
        setTimeout(() => {
            window.location.href = url;
        }, 50);
    }

    /**
     * Configurar preload al hacer hover
     */
    setupHoverPreloading() {
        const panels = document.querySelectorAll('.panel');
        
        panels.forEach(panel => {
            panel.addEventListener('mouseenter', () => {
                const onclick = panel.getAttribute('onclick');
                if (onclick) {
                    const url = onclick.match(/irA\(['"]([^'"]+)['"]\)/)?.[1];
                    if (url) {
                        this.preloadPage(url);
                    }
                }
            });
        });
    }

    /**
     * Precargar una página
     */
    preloadPage(url) {
        // Evitar precargar la misma página múltiples veces
        if (document.querySelector(`link[href="${url}"]`)) return;

        const link = document.createElement('link');
        link.rel = 'prefetch';
        link.href = url;
        document.head.appendChild(link);
        
        this.logPerformance(`Preloaded: ${url}`);
    }

    /**
     * Optimización de imágenes
     */
    setupImageOptimization() {
        // Lazy loading para imágenes no críticas
        const images = document.querySelectorAll('img[loading="lazy"]');
        
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        this.optimizeImage(img);
                        imageObserver.unobserve(img);
                    }
                });
            }, {
                threshold: 0.1,
                rootMargin: '50px'
            });

            images.forEach(img => imageObserver.observe(img));
        }

        // Precargar imágenes críticas
        this.preloadCriticalImages();
    }

    /**
     * Optimizar imagen individual
     */
    optimizeImage(img) {
        // Agregar clase de carga
        img.classList.add('loading');
        
        img.addEventListener('load', () => {
            img.classList.remove('loading');
            img.classList.add('loaded');
        });

        img.addEventListener('error', () => {
            img.classList.add('error');
            console.warn('Failed to load image:', img.src);
        });
    }

    /**
     * Precargar imágenes críticas
     */
    preloadCriticalImages() {
        const criticalImages = [
            'recursos/M&M/M&M.png',
            'recursos/A&A/A&A.png',
            'recursos/CDL/CDL.png'
        ];

        criticalImages.forEach(src => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.as = 'image';
            link.href = src;
            document.head.appendChild(link);
        });
    }

    /**
     * Configurar monitoreo de rendimiento
     */
    setupPerformanceMonitoring() {
        // Métricas de carga inicial
        window.addEventListener('load', () => {
            this.collectPerformanceMetrics();
        });

        // Métricas de interacción
        this.setupInteractionMetrics();
    }

    /**
     * Recopilar métricas de rendimiento
     */
    collectPerformanceMetrics() {
        if (!('performance' in window)) return;

        const navigation = performance.getEntriesByType('navigation')[0];
        const paint = performance.getEntriesByType('paint');

        this.performanceMetrics = {
            // Tiempos de carga
            loadTime: Math.round(navigation.loadEventEnd - navigation.loadEventStart),
            domContentLoaded: Math.round(navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart),
            
            // Métricas de pintura
            firstPaint: paint.find(p => p.name === 'first-paint')?.startTime || 0,
            firstContentfulPaint: paint.find(p => p.name === 'first-contentful-paint')?.startTime || 0,
            
            // Métricas de red
            networkTime: Math.round(navigation.responseEnd - navigation.requestStart),
            
            // Timestamp
            timestamp: Date.now()
        };

        this.logPerformance('Performance metrics collected', this.performanceMetrics);
    }

    /**
     * Configurar métricas de interacción
     */
    setupInteractionMetrics() {
        // Tiempo hasta primera interacción
        let firstInteraction = null;
        
        const recordInteraction = () => {
            if (!firstInteraction) {
                firstInteraction = performance.now();
                this.logPerformance('First interaction at:', firstInteraction);
            }
        };

        ['click', 'touchstart', 'keydown'].forEach(event => {
            document.addEventListener(event, recordInteraction, { once: true, passive: true });
        });
    }

    /**
     * Configurar accesibilidad
     */
    setupAccessibility() {
        // Navegación por teclado
        this.setupKeyboardNavigation();
        
        // Anuncios para lectores de pantalla
        this.setupScreenReaderSupport();
        
        // Reducir movimiento si está configurado
        this.respectMotionPreferences();
    }

    /**
     * Navegación por teclado
     */
    setupKeyboardNavigation() {
        const panels = document.querySelectorAll('.panel');
        
        panels.forEach((panel, index) => {
            panel.setAttribute('tabindex', '0');
            panel.setAttribute('role', 'button');
            
            panel.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    panel.click();
                }
            });
        });
    }

    /**
     * Soporte para lectores de pantalla
     */
    setupScreenReaderSupport() {
        // Crear región de anuncios
        const announcer = document.createElement('div');
        announcer.setAttribute('aria-live', 'polite');
        announcer.setAttribute('aria-atomic', 'true');
        announcer.className = 'sr-only';
        announcer.style.cssText = 'position:absolute;left:-10000px;width:1px;height:1px;overflow:hidden;';
        document.body.appendChild(announcer);
        
        this.announcer = announcer;
    }

    /**
     * Anunciar mensaje para lectores de pantalla
     */
    announce(message) {
        if (this.announcer) {
            this.announcer.textContent = message;
        }
    }

    /**
     * Respetar preferencias de movimiento
     */
    respectMotionPreferences() {
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
        
        if (prefersReducedMotion.matches) {
            document.documentElement.style.setProperty('--transition', 'none');
            document.documentElement.classList.add('reduced-motion');
        }
    }

    /**
     * Configurar optimizaciones avanzadas
     */
    async setupAdvancedOptimizations() {
        // Service Worker
        await this.setupServiceWorker();
        
        // Optimización de scroll
        this.optimizeScrolling();
        
        // Limpieza de memoria
        this.setupMemoryManagement();
    }

    /**
     * Configurar Service Worker
     */
    async setupServiceWorker() {
        if ('serviceWorker' in navigator) {
            try {
                const registration = await navigator.serviceWorker.register('/sw.js');
                this.logPerformance('Service Worker registered:', registration.scope);
            } catch (error) {
                console.warn('Service Worker registration failed:', error);
            }
        }
    }

    /**
     * Optimizar scrolling
     */
    optimizeScrolling() {
        let ticking = false;
        let lastScrollY = 0;

        const updateScrollPosition = () => {
            const scrollY = window.scrollY;
            
            // Aquí puedes agregar lógica de scroll específica
            // Por ejemplo, mostrar/ocultar elementos basado en scroll
            
            lastScrollY = scrollY;
            ticking = false;
        };

        const onScroll = () => {
            if (!ticking) {
                requestAnimationFrame(updateScrollPosition);
                ticking = true;
            }
        };

        window.addEventListener('scroll', onScroll, { passive: true });
    }

    /**
     * Gestión de memoria
     */
    setupMemoryManagement() {
        // Limpiar listeners cuando la página se oculta
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                this.cleanup();
            }
        });

        // Limpiar antes de descargar la página
        window.addEventListener('beforeunload', () => {
            this.cleanup();
        });
    }

    /**
     * Limpiar recursos
     */
    cleanup() {
        // Limpiar timers, observers, etc.
        this.logPerformance('Cleaning up resources');
    }

    /**
     * Logging de rendimiento
     */
    logPerformance(message, data = null) {
        if (process?.env?.NODE_ENV === 'development') {
            console.log(`[IndexManager] ${message}`, data || '');
        }
    }

    /**
     * Obtener métricas públicas
     */
    getMetrics() {
        return {
            ...this.performanceMetrics,
            isInitialized: this.isInitialized,
            timestamp: Date.now()
        };
    }

    /**
     * API pública para otras funciones
     */
    static getInstance() {
        if (!window.indexManagerInstance) {
            window.indexManagerInstance = new IndexManager();
        }
        return window.indexManagerInstance;
    }
}

// Auto-inicializar
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        IndexManager.getInstance();
    });
} else {
    IndexManager.getInstance();
}

// Exportar para uso global
window.IndexManager = IndexManager;