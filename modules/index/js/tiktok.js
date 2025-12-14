/* ========== MÓDULO INDEX - TIKTOK MANAGER ========== */

/**
 * Clase para manejar la integración de TikTok de manera optimizada
 */
class TikTokManager {
    constructor(config = {}) {
        this.config = {
            username: 'aa.perfumes7',
            displayName: 'A&A perfumes',
            profileUrl: 'https://www.tiktok.com/@aa.perfumes7?refer=embed',
            videosPerLoad: 3,
            lazyLoadThreshold: 0.1,
            lazyLoadMargin: '50px',
            loadDelay: 1000,
            retryAttempts: 3,
            cacheEnabled: true,
            ...config
        };

        this.state = {
            isLoaded: false,
            isLoading: false,
            hasError: false,
            loadAttempts: 0,
            cachedVideos: new Map()
        };

        this.elements = {
            container: null,
            button: null,
            section: null
        };

        this.observers = new Map();
        this.init();
    }

    /**
     * Inicializar el módulo TikTok
     */
    init() {
        this.findElements();
        this.setupLazyLoading();
        this.setupButton();
        this.setupErrorHandling();
        this.loadConfiguration();
    }

    /**
     * Encontrar elementos del DOM
     */
    findElements() {
        this.elements.container = document.getElementById('tiktokVideos');
        this.elements.button = document.querySelector('.btn-cargar-videos');
        this.elements.section = document.querySelector('.videos-section');

        if (!this.elements.container) {
            console.warn('TikTok container not found');
            return false;
        }

        return true;
    }

    /**
     * Cargar configuración desde archivo externo
     */
    async loadConfiguration() {
        try {
            // Intentar cargar configuración externa si existe
            if (window.TIKTOK_CONFIG) {
                this.config = { ...this.config, ...window.TIKTOK_CONFIG };
            }
        } catch (error) {
            console.warn('Could not load external TikTok config:', error);
        }
    }

    /**
     * Configurar carga perezosa
     */
    setupLazyLoading() {
        if (!this.elements.section) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !this.state.isLoaded && !this.state.isLoading) {
                    this.loadInitialVideos();
                }
            });
        }, {
            threshold: this.config.lazyLoadThreshold,
            rootMargin: this.config.lazyLoadMargin
        });

        observer.observe(this.elements.section);
        this.observers.set('lazyLoad', observer);
    }

    /**
     * Configurar botón de carga
     */
    setupButton() {
        if (!this.elements.button) return;

        this.elements.button.addEventListener('click', (e) => {
            e.preventDefault();
            this.loadRandomVideos();
        });
    }

    /**
     * Configurar manejo de errores
     */
    setupErrorHandling() {
        window.addEventListener('error', (e) => {
            if (e.filename && e.filename.includes('tiktok')) {
                this.handleError('TikTok script error', e.error);
            }
        });
    }

    /**
     * Cargar videos iniciales
     */
    async loadInitialVideos() {
        if (this.state.isLoading || this.state.isLoaded) return;

        this.state.isLoading = true;
        this.state.loadAttempts++;

        try {
            this.showLoadingState();
            
            // Cargar script de TikTok
            await this.loadTikTokScript();
            
            // Cargar videos
            await this.loadRandomVideos();
            
            this.state.isLoaded = true;
            this.state.hasError = false;
            
        } catch (error) {
            this.handleError('Failed to load initial videos', error);
        } finally {
            this.state.isLoading = false;
        }
    }

    /**
     * Cargar script de TikTok dinámicamente
     */
    loadTikTokScript() {
        return new Promise((resolve, reject) => {
            // Si ya está cargado, resolver inmediatamente
            if (window.tiktokEmbed) {
                resolve();
                return;
            }

            // Si ya hay un script cargándose, esperar
            const existingScript = document.querySelector('script[src*="tiktok.com/embed.js"]');
            if (existingScript) {
                existingScript.addEventListener('load', resolve);
                existingScript.addEventListener('error', reject);
                return;
            }

            // Crear nuevo script
            const script = document.createElement('script');
            script.src = 'https://www.tiktok.com/embed.js';
            script.async = true;
            script.defer = true;
            
            script.onload = () => {
                this.logPerformance('TikTok script loaded');
                resolve();
            };
            
            script.onerror = (error) => {
                this.logPerformance('TikTok script failed to load');
                reject(error);
            };

            document.head.appendChild(script);
        });
    }

    /**
     * Cargar videos aleatorios
     */
    async loadRandomVideos() {
        if (!this.elements.container) return;

        const button = this.elements.button;
        const originalText = button?.innerHTML;

        try {
            // Mostrar estado de carga
            this.setButtonState('loading');
            
            // Obtener videos
            const videos = this.getRandomVideos();
            
            if (videos.length === 0) {
                throw new Error('No videos available');
            }

            // Generar HTML
            const videosHTML = videos.map(video => this.createVideoEmbed(video)).join('');
            
            // Actualizar contenedor con delay para mejor UX
            setTimeout(() => {
                this.elements.container.innerHTML = videosHTML;
                this.renderTikTokEmbeds();
                this.setButtonState('normal', originalText);
                this.logPerformance(`Loaded ${videos.length} videos`);
            }, this.config.loadDelay);

        } catch (error) {
            this.handleError('Failed to load random videos', error);
            this.setButtonState('normal', originalText);
        }
    }

    /**
     * Obtener videos aleatorios
     */
    getRandomVideos() {
        const videos = this.getAvailableVideos();
        
        // Si hay menos videos que los solicitados, duplicar algunos
        const videosPool = [...videos];
        while (videosPool.length < this.config.videosPerLoad && videos.length > 0) {
            videosPool.push(...videos);
        }
        
        // Mezclar y tomar la cantidad solicitada
        return videosPool
            .sort(() => Math.random() - 0.5)
            .slice(0, this.config.videosPerLoad);
    }

    /**
     * Obtener videos disponibles
     */
    getAvailableVideos() {
        // Videos por defecto si no hay configuración externa
        const defaultVideos = [
            {
                id: "7580562100410469650",
                url: "https://www.tiktok.com/@aa.perfumes7/video/7580562100410469650",
                descripcion: "🌟 Perfumes para parejas en Orizaba 🌟",
                hashtags: "#orizaba #orizabapueblomagico #orizabaveracruz #perfumes #parejas",
                musicUrl: "https://www.tiktok.com/music/sonido-original-7580562123089136405?refer=embed",
                musicTitle: "♬ sonido original - A&A perfumes"
            }
        ];

        return this.config.videos || defaultVideos;
    }

    /**
     * Crear embed de video
     */
    createVideoEmbed(video) {
        const cacheKey = `video_${video.id}`;
        
        // Usar cache si está habilitado
        if (this.config.cacheEnabled && this.state.cachedVideos.has(cacheKey)) {
            return this.state.cachedVideos.get(cacheKey);
        }

        const embed = `
            <div class="video-item" data-video-id="${video.id}">
                <blockquote class="tiktok-embed" 
                    cite="${video.url}" 
                    data-video-id="${video.id}" 
                    style="max-width: 605px; min-width: 325px;">
                    <section>
                        <a target="_blank" 
                           title="@${this.config.username}" 
                           href="${this.config.profileUrl}">
                           @${this.config.username}
                        </a>
                        <p>${video.descripcion}</p>
                        ${video.hashtags ? `<p>${video.hashtags}</p>` : ''}
                        <a target="_blank" 
                           title="${video.musicTitle || '♬ sonido original'}" 
                           href="${video.musicUrl || '#'}">
                           ${video.musicTitle || '♬ sonido original - ' + this.config.displayName}
                        </a>
                    </section>
                </blockquote>
            </div>
        `;

        // Guardar en cache
        if (this.config.cacheEnabled) {
            this.state.cachedVideos.set(cacheKey, embed);
        }

        return embed;
    }

    /**
     * Renderizar embeds de TikTok
     */
    renderTikTokEmbeds() {
        if (window.tiktokEmbed && window.tiktokEmbed.lib) {
            try {
                window.tiktokEmbed.lib.render();
            } catch (error) {
                console.warn('TikTok render error:', error);
            }
        }
    }

    /**
     * Mostrar estado de carga
     */
    showLoadingState() {
        if (this.elements.container) {
            this.elements.container.innerHTML = `
                <div class="videos-loading">
                    <div class="loading-spinner"></div>
                    <p>Cargando videos de TikTok...</p>
                </div>
            `;
        }
    }

    /**
     * Configurar estado del botón
     */
    setButtonState(state, text = null) {
        if (!this.elements.button) return;

        switch (state) {
            case 'loading':
                this.elements.button.innerHTML = '<span class="loading-spinner"></span> Cargando...';
                this.elements.button.disabled = true;
                break;
            case 'error':
                this.elements.button.innerHTML = '🔄 Intentar de nuevo';
                this.elements.button.disabled = false;
                break;
            case 'normal':
            default:
                this.elements.button.innerHTML = text || '🔄 Cargar Más Videos';
                this.elements.button.disabled = false;
                break;
        }
    }

    /**
     * Manejar errores
     */
    handleError(message, error) {
        console.error(`[TikTokManager] ${message}:`, error);
        
        this.state.hasError = true;
        
        if (this.state.loadAttempts < this.config.retryAttempts) {
            // Reintentar después de un delay
            setTimeout(() => {
                this.loadInitialVideos();
            }, 2000 * this.state.loadAttempts);
        } else {
            // Mostrar error permanente
            this.showErrorState(message);
        }
    }

    /**
     * Mostrar estado de error
     */
    showErrorState(message) {
        if (this.elements.container) {
            this.elements.container.innerHTML = `
                <div class="videos-error">
                    <h3>⚠️ Error al cargar videos</h3>
                    <p>No se pudieron cargar los videos de TikTok en este momento.</p>
                    <button onclick="tiktokManager.retry()" class="btn-cargar-videos">
                        🔄 Intentar de nuevo
                    </button>
                </div>
            `;
        }
        
        this.setButtonState('error');
    }

    /**
     * Reintentar carga
     */
    retry() {
        this.state.loadAttempts = 0;
        this.state.hasError = false;
        this.state.isLoaded = false;
        this.loadInitialVideos();
    }

    /**
     * Agregar nuevo video
     */
    addVideo(video) {
        if (!this.config.videos) {
            this.config.videos = [];
        }
        this.config.videos.push(video);
        this.logPerformance('Video added:', video.id);
    }

    /**
     * Limpiar recursos
     */
    cleanup() {
        // Limpiar observers
        this.observers.forEach(observer => observer.disconnect());
        this.observers.clear();
        
        // Limpiar cache
        this.state.cachedVideos.clear();
        
        this.logPerformance('TikTok resources cleaned up');
    }

    /**
     * Logging de rendimiento
     */
    logPerformance(message, data = null) {
        if (process?.env?.NODE_ENV === 'development') {
            console.log(`[TikTokManager] ${message}`, data || '');
        }
    }

    /**
     * Obtener estadísticas
     */
    getStats() {
        return {
            ...this.state,
            config: { ...this.config },
            videosCount: this.config.videos?.length || 0,
            cacheSize: this.state.cachedVideos.size
        };
    }

    /**
     * API estática
     */
    static getInstance(config) {
        if (!window.tiktokManagerInstance) {
            window.tiktokManagerInstance = new TikTokManager(config);
        }
        return window.tiktokManagerInstance;
    }
}

// Auto-inicializar
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.tiktokManager = TikTokManager.getInstance();
    });
} else {
    window.tiktokManager = TikTokManager.getInstance();
}

// Exportar para uso global
window.TikTokManager = TikTokManager;