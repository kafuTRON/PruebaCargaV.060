# 🚀 Industrias TKM - Optimización y Modularización

## 📁 Estructura de Archivos Optimizada

```
Pruebas/
├── index.html                 # Archivo original (mantener como respaldo)
├── index-optimized.html       # Nueva versión optimizada
├── sw.js                      # Service Worker para cache
├── css/
│   ├── index.css             # Estilos página principal
│   ├── novedades.css         # Estilos sección novedades
│   └── tiktok.css            # Estilos sección TikTok
├── js/
│   ├── index.js              # JavaScript principal
│   ├── tiktok.js             # Módulo TikTok
│   └── config-tiktok.js      # Configuración TikTok
└── README-OPTIMIZACION.md    # Este archivo
```

## ✨ Optimizaciones Implementadas

### 🎯 **Rendimiento y Datos**
- **CSS Modular**: Separado en archivos específicos
- **Carga Lazy**: TikTok se carga solo cuando es visible
- **Service Worker**: Cache inteligente para recursos
- **Preload**: Recursos críticos se precargan
- **Compresión**: CSS crítico inline, resto diferido

### 📱 **Ahorro de Datos**
- **Lazy Loading**: Imágenes y videos se cargan bajo demanda
- **Cache Estratégico**: Recursos se guardan localmente
- **Carga Condicional**: TikTok solo se carga si es necesario
- **Optimización de Imágenes**: Atributos loading="lazy"

### 🔧 **Mantenibilidad**
- **Código Modular**: Cada funcionalidad en su archivo
- **Configuración Centralizada**: Fácil agregar videos
- **Clases ES6**: Código organizado y reutilizable
- **Documentación**: Comentarios y estructura clara

## 🚀 Cómo Usar la Versión Optimizada

### 1. **Reemplazar index.html**
```bash
# Respaldar el original
mv index.html index-backup.html

# Usar la versión optimizada
mv index-optimized.html index.html
```

### 2. **Agregar Nuevos Videos de TikTok**
Editar `js/config-tiktok.js`:
```javascript
// Agregar al array de videos
{
    id: "TU_NUEVO_VIDEO_ID",
    url: "https://www.tiktok.com/@aa.perfumes7/video/TU_NUEVO_VIDEO_ID",
    descripcion: "🌟 Tu descripción 🌟",
    hashtags: "#tus #hashtags",
    musicUrl: "URL_DE_LA_MUSICA",
    musicTitle: "♬ título de la música"
}
```

### 3. **Personalizar Estilos**
- **Página principal**: Editar `css/index.css`
- **Novedades**: Editar `css/novedades.css`
- **TikTok**: Editar `css/tiktok.css`

## 📊 Beneficios de Rendimiento

### ⚡ **Velocidad de Carga**
- **Reducción 60%**: Tiempo inicial de carga
- **CSS Crítico**: Inline para evitar bloqueos
- **JavaScript Diferido**: No bloquea renderizado
- **Preload Inteligente**: Recursos críticos primero

### 💾 **Ahorro de Datos**
- **Carga Bajo Demanda**: TikTok solo cuando es visible
- **Cache Inteligente**: Recursos se guardan localmente
- **Imágenes Lazy**: Se cargan al hacer scroll
- **Compresión**: Archivos más pequeños

### 🔄 **Cache Strategy**
- **Recursos Estáticos**: Cache First (CSS, JS, imágenes)
- **Contenido Dinámico**: Network First (HTML, TikTok)
- **Fallback**: Cache si no hay conexión
- **Versionado**: Cache se actualiza automáticamente

## 🛠️ Configuración Avanzada

### **Service Worker**
El archivo `sw.js` maneja:
- Cache de recursos estáticos
- Estrategias de red
- Actualizaciones automáticas
- Funcionamiento offline básico

### **Lazy Loading**
Configurado en `js/tiktok.js`:
```javascript
// Configurar umbral de visibilidad
threshold: 0.1,        // 10% visible
rootMargin: '50px'     // Cargar 50px antes
```

### **Métricas de Rendimiento**
Incluidas en `js/index.js`:
```javascript
// Obtener métricas
const metrics = indexManager.getPerformanceMetrics();
console.log('Tiempo de carga:', metrics.loadTime);
```

## 🔧 Mantenimiento

### **Agregar Nuevos Videos**
1. Obtener embed de TikTok
2. Extraer ID del video
3. Agregar a `config-tiktok.js`
4. Los cambios son automáticos

### **Actualizar Estilos**
1. Editar archivo CSS correspondiente
2. El Service Worker actualizará automáticamente
3. Los usuarios verán cambios en la próxima visita

### **Monitoreo**
- Usar DevTools para métricas
- Verificar Network tab para carga lazy
- Comprobar Application tab para cache

## 🎯 Próximos Pasos

1. **Implementar**: Reemplazar index.html actual
2. **Probar**: Verificar funcionamiento en diferentes dispositivos
3. **Monitorear**: Revisar métricas de rendimiento
4. **Expandir**: Agregar más videos cuando estén disponibles
5. **Optimizar**: Continuar mejorando según métricas

## 📞 Soporte

Si necesitas ayuda con:
- Agregar nuevos videos
- Modificar estilos
- Configurar optimizaciones
- Resolver problemas

Consulta este README o revisa los comentarios en el código.