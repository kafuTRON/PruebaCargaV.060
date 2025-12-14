# 🎵 Material FX - A&A Perfumería

Esta carpeta contiene todos los efectos de audio para la experiencia móvil de A&A Perfumería.

## 📁 Estructura de Carpetas

### 🔊 `/sonidos/`
Efectos de sonido para interacciones:
- **Transiciones de carrusel** (swipe, cambio de slide)
- **Clicks y taps** (botones, productos)
- **Notificaciones** (agregar al carrito, checkout)
- **Modales** (abrir/cerrar)
- **Feedback táctil** (confirmaciones, errores)

**Formatos recomendados:** `.mp3`, `.ogg`, `.wav`  
**Duración:** 0.1s - 2s  
**Tamaño:** < 50KB por archivo

### 🎶 `/musica_fondo/`
Música ambiental para la experiencia:
- **Música principal** (loop para navegación)
- **Música de catálogo** (mientras navega productos)
- **Música de checkout** (durante compra)
- **Música de bienvenida** (al entrar al sitio)

**Formatos recomendados:** `.mp3`, `.ogg`  
**Duración:** 30s - 3min (loops)  
**Tamaño:** < 2MB por archivo

## 🎯 Implementación Técnica

Los archivos de audio se cargan de forma inteligente:
- **Preload** solo de sonidos críticos
- **Lazy loading** de música de fondo
- **Detección de conexión** (no cargar en 2G)
- **Preferencias del usuario** (mute/unmute)
- **Autoplay policy** compatible con navegadores

## 📝 Convenciones de Nombres

### Sonidos:
```
click_button.mp3          # Click en botón
swipe_transition.mp3      # Transición de carrusel
add_to_cart.mp3          # Agregar al carrito
notification_success.mp3  # Notificación exitosa
notification_error.mp3    # Notificación de error
modal_open.mp3           # Abrir modal
modal_close.mp3          # Cerrar modal
```

### Música:
```
ambient_main.mp3         # Música principal
ambient_catalog.mp3      # Música del catálogo
ambient_checkout.mp3     # Música de checkout
welcome_intro.mp3        # Introducción de bienvenida
```

## 🔧 Configuración de Audio

El sistema de audio se configura en `js/mobile-ultra-main.js`:

```javascript
const AUDIO_CONFIG = {
    enabled: true,
    volume: 0.3,
    preloadCritical: true,
    respectDataSaver: true,
    sounds: {
        click: 'recursos/A&A/Material_FX/sonidos/click_button.mp3',
        swipe: 'recursos/A&A/Material_FX/sonidos/swipe_transition.mp3',
        // ... más sonidos
    },
    music: {
        main: 'recursos/A&A/Material_FX/musica_fondo/ambient_main.mp3',
        // ... más música
    }
};
```

---

**Nota:** Los archivos de audio son opcionales. Si no están presentes, la aplicación funciona normalmente sin sonido.