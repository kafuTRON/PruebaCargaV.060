// ===== CART-SIMPLE.JS - Sistema de Carrito Simplificado =====

// Variables globales del carrito
let carritoItems = [];
let entregaDomicilio = false;
let modalCarrito = null;

// Función para obtener icono del carrito
function getCartIcon(cantidad) {
    if (cantidad === 0) return 'recursos/A&A/Material Grafico/Carrito_de_compras_Vacio.png';
    if (cantidad === 1) return 'recursos/A&A/Material Grafico/Carrito_de_compras_SemiVacio.png';
    if (cantidad <= 3) return 'recursos/A&A/Material Grafico/Carrito_de_compras_Semilleno.png';
    return 'recursos/A&A/Material Grafico/Carrito_de_compras_Lleno.png';
}

// Función para actualizar icono del carrito
function updateCartIcon() {
    const cartIcon = document.getElementById('cartIcon');
    const cartCounter = document.getElementById('cartCounter');
    const cantidad = carritoItems.length;
    
    if (cartIcon) {
        cartIcon.src = getCartIcon(cantidad);
    }
    
    if (cartCounter) {
        cartCounter.textContent = cantidad;
        if (cantidad > 0) {
            cartCounter.classList.add('visible');
        } else {
            cartCounter.classList.remove('visible');
        }
    }
}

// Función para abrir modal del carrito
function openCartModal() {
    console.log('Abriendo modal del carrito...', carritoItems);
    
    // Crear modal si no existe
    if (!modalCarrito) {
        modalCarrito = document.createElement('div');
        modalCarrito.className = 'cart-modal';
        modalCarrito.id = 'cartModal';
        
        modalCarrito.innerHTML = `
            <div class="cart-modal-content">
                <div class="cart-header">
                    <h2 class="cart-title">
                        <img src="recursos/A&A/Material Grafico/Carrito_de_compras_Vacio.png" alt="Carrito" style="width: 30px; height: 30px;">
                        Mi Carrito
                    </h2>
                    <button class="cart-close" onclick="closeCartModal()">&times;</button>
                </div>
                
                <div id="cartContent">
                    <!-- El contenido se actualizará dinámicamente -->
                </div>
            </div>
        `;
        
        document.body.appendChild(modalCarrito);
    }
    
    // Actualizar contenido del carrito
    updateCartContent();
    
    // Mostrar modal
    modalCarrito.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    console.log('Modal del carrito abierto');
}

// Función para actualizar el contenido del carrito
function updateCartContent() {
    const cartContent = document.getElementById('cartContent');
    if (!cartContent) return;
    
    if (carritoItems.length === 0) {
        cartContent.innerHTML = `
            <div class="cart-empty">
                <img class="cart-empty-icon" src="recursos/A&A/Material Grafico/Carrito_de_compras_Vacio.png" alt="Carrito vacío" style="width: 80px; height: 80px; margin: 20px auto; display: block; opacity: 0.5;">
                <h3 style="text-align: center; color: #ffd700;">Tu carrito está vacío</h3>
                <p style="text-align: center; color: #ccc;">Agrega algunos perfumes para comenzar</p>
            </div>
        `;
    } else {
        // Calcular totales
        const subtotal = carritoItems.reduce((sum, item) => sum + item.precioTotal, 0);
        const costoEntrega = entregaDomicilio ? 50 : 0;
        const total = subtotal + costoEntrega;
        
        cartContent.innerHTML = `
            <div class="cart-items">
                ${carritoItems.map(item => renderCartItem(item)).join('')}
            </div>
            
            <div class="delivery-option ${entregaDomicilio ? 'selected' : ''}" onclick="toggleDelivery()" style="background: rgba(255,255,255,0.05); border: 2px solid ${entregaDomicilio ? '#ffd700' : 'rgba(255,255,255,0.1)'}; border-radius: 10px; padding: 1rem; margin-bottom: 1rem; cursor: pointer; display: flex; justify-content: space-between; align-items: center;">
                <div class="delivery-info">
                    <strong style="color: white;">Entrega a domicilio</strong>
                    <div style="font-size: 0.9rem; color: #bbb;">Recibe tu pedido en casa</div>
                </div>
                <div class="delivery-price" style="color: #ffd700; font-weight: bold;">+$50</div>
            </div>
            
            <div class="cart-summary" style="background: rgba(255,215,0,0.1); border: 2px solid rgba(255,215,0,0.3); border-radius: 10px; padding: 1rem; margin-bottom: 1.5rem;">
                <div style="display: flex; justify-content: space-between; margin-bottom: 0.8rem; color: #ccc;">
                    <span>Subtotal (${carritoItems.length} ${carritoItems.length === 1 ? 'producto' : 'productos'}):</span>
                    <span>$${subtotal}</span>
                </div>
                ${entregaDomicilio ? `
                    <div style="display: flex; justify-content: space-between; margin-bottom: 0.8rem; color: #ccc;">
                        <span>Entrega a domicilio:</span>
                        <span>$${costoEntrega}</span>
                    </div>
                ` : ''}
                <div style="display: flex; justify-content: space-between; border-top: 1px solid rgba(255,215,0,0.3); padding-top: 0.8rem; margin-top: 1rem; font-weight: bold; font-size: 1.2rem; color: #ffd700;">
                    <span>Total:</span>
                    <span>$${total}</span>
                </div>
            </div>
            
            <div class="cart-actions" style="display: flex; gap: 1rem; justify-content: center;">
                <button onclick="proceedToCheckout()" style="background: linear-gradient(45deg, #ffd700, #ffed4e); color: #000; border: none; padding: 12px 24px; border-radius: 25px; font-weight: bold; cursor: pointer; transition: all 0.3s ease;">
                    Proceder al Pago
                </button>
                <button onclick="contactForCart()" style="background: rgba(255,255,255,0.05); color: white; border: 1px solid rgba(255,255,255,0.1); padding: 12px 24px; border-radius: 25px; font-weight: bold; cursor: pointer; transition: all 0.3s ease;">
                    Consultar por WhatsApp
                </button>
            </div>
        `;
    }
}

// Función para renderizar un item del carrito
function renderCartItem(item) {
    return `
        <div class="cart-item" style="background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 10px; padding: 1rem; margin-bottom: 1rem; transition: all 0.3s ease;">
            <div class="cart-item-header" style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 1rem;">
                <div class="cart-item-info">
                    <h4 style="color: #ffd700; margin-bottom: 0.5rem; font-size: 1.2rem;">${item.producto}</h4>
                    <div class="cart-item-details" style="color: #ccc; font-size: 0.9rem; line-height: 1.4;">
                        <div>${item.inspirado}</div>
                        <div><strong>Tamaño:</strong> ${item.tamaño}</div>
                        ${item.extras.length > 0 ? `<div><strong>Extra:</strong> ${item.extras.join(', ')} ${item.is10ml ? '(Incluido)' : '(+$' + item.precioExtras + ')'}</div>` : ''}
                    </div>
                </div>
                <div class="cart-item-price" style="color: #ffd700; font-weight: bold; font-size: 1.3rem;">$${item.precioTotal}</div>
            </div>
            <button onclick="removeFromCart(${item.id})" style="background: rgba(255, 75, 87, 0.2); border: 1px solid rgba(255, 75, 87, 0.3); color: #ff4757; padding: 0.5rem 1rem; border-radius: 10px; cursor: pointer; transition: all 0.3s ease; font-size: 0.9rem;">
                Eliminar del carrito
            </button>
        </div>
    `;
}

// Función para cerrar modal del carrito
function closeCartModal() {
    console.log('Cerrando modal del carrito...');
    
    if (modalCarrito) {
        modalCarrito.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

// Función para agregar producto al carrito
function addToCart(producto, tamaño, extras) {
    const is10ml = tamaño === '10ml';
    
    // Precios base
    const precios = {
        '10ml': 90,
        '30ml': 180,
        '60ml': 220,
        '100ml': 280
    };
    
    const precioBase = precios[tamaño];
    const precioExtras = is10ml ? 0 : extras.length * 35;
    const precioTotal = precioBase + precioExtras;
    
    // Convertir extras a nombres legibles
    const extrasNombres = extras.map(extra => {
        if (extra === 'doble_fijador') return 'Doble Fijador';
        if (extra === 'feromonas') return 'Feromonas';
        return extra;
    });
    
    const item = {
        id: Date.now(),
        producto: producto.nombre,
        imagen: producto.imagen,
        inspirado: producto.inspirado,
        tamaño: tamaño,
        extras: extrasNombres,
        precioBase: precioBase,
        precioExtras: precioExtras,
        precioTotal: precioTotal,
        is10ml: is10ml
    };
    
    carritoItems.push(item);
    updateCartIcon();
    
    // Mostrar notificación
    showNotification(`Producto agregado al carrito: ${producto.nombre} (${tamaño})`);
    
    console.log('Producto agregado al carrito:', item);
}

// Función para mostrar notificación
function showNotification(mensaje) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: linear-gradient(45deg, #00ff88, #00cc6a);
        color: #000;
        padding: 1rem 1.5rem;
        border-radius: 15px;
        font-weight: bold;
        z-index: 10001;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        box-shadow: 0 8px 25px rgba(0,255,136,0.3);
        max-width: 300px;
    `;
    
    notification.textContent = mensaje;
    document.body.appendChild(notification);
    
    // Animación de entrada
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remover después de 3 segundos
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Función para abrir modal de producto
function openProductModal(nombreProducto) {
    console.log('Abriendo modal de producto:', nombreProducto);
    
    // Buscar producto
    const producto = PRODUCTOS.find(p => p.nombre === nombreProducto);
    if (!producto) {
        console.error('Producto no encontrado:', nombreProducto);
        return;
    }
    
    // Crear modal de producto
    const modal = document.createElement('div');
    modal.className = 'product-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <button class="modal-close" onclick="closeProductModal()">&times;</button>
            
            <div class="modal-header">
                <img class="modal-product-image" src="${producto.imagen}" alt="${producto.nombre}" style="width: 120px; height: 120px; object-fit: cover; border-radius: 15px; margin: 0 auto 1rem; display: block;">
                <h2 style="color: #ffd700; text-align: center; margin-bottom: 0.5rem;">${producto.nombre}</h2>
                <p style="color: #ccc; text-align: center; font-style: italic; margin-bottom: 0.5rem;">${producto.inspirado}</p>
                <p style="color: #bbb; text-align: center; margin-bottom: 1rem;">${producto.descripcion}</p>
                <div style="text-align: center; background: rgba(0, 255, 0, 0.1); color: #00ff88; padding: 0.5rem; border-radius: 10px; margin-bottom: 1rem;">
                    <span style="display: inline-block; width: 8px; height: 8px; background: #00ff88; border-radius: 50%; margin-right: 0.5rem;"></span>
                    Disponible - Entrega inmediata
                </div>
            </div>
            
            <div style="margin-bottom: 1.5rem;">
                <h3 style="color: #ffd700; text-align: center; margin-bottom: 1rem;">Selecciona el tamaño</h3>
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(120px, 1fr)); gap: 1rem;">
                    <div class="size-option" onclick="selectSize('10ml')" style="background: rgba(255,255,255,0.05); border: 2px solid rgba(255,255,255,0.1); border-radius: 10px; padding: 1rem; text-align: center; cursor: pointer; transition: all 0.3s ease;">
                        <div style="font-size: 1.2rem; font-weight: bold; color: white; margin-bottom: 0.5rem;">10ml</div>
                        <div style="color: #ffd700; font-weight: bold;">$90</div>
                        <div style="color: #00ff88; font-size: 0.8rem; margin-top: 0.3rem;">Todo incluido</div>
                    </div>
                    <div class="size-option selected" onclick="selectSize('30ml')" style="background: rgba(255,215,0,0.2); border: 2px solid #ffd700; border-radius: 10px; padding: 1rem; text-align: center; cursor: pointer; transition: all 0.3s ease;">
                        <div style="font-size: 1.2rem; font-weight: bold; color: white; margin-bottom: 0.5rem;">30ml</div>
                        <div style="color: #ffd700; font-weight: bold;">$160</div>
                    </div>
                    <div class="size-option" onclick="selectSize('60ml')" style="background: rgba(255,255,255,0.05); border: 2px solid rgba(255,255,255,0.1); border-radius: 10px; padding: 1rem; text-align: center; cursor: pointer; transition: all 0.3s ease;">
                        <div style="font-size: 1.2rem; font-weight: bold; color: white; margin-bottom: 0.5rem;">60ml</div>
                        <div style="color: #ffd700; font-weight: bold;">$220</div>
                    </div>
                    <div class="size-option" onclick="selectSize('100ml')" style="background: rgba(255,255,255,0.05); border: 2px solid rgba(255,255,255,0.1); border-radius: 10px; padding: 1rem; text-align: center; cursor: pointer; transition: all 0.3s ease;">
                        <div style="font-size: 1.2rem; font-weight: bold; color: white; margin-bottom: 0.5rem;">100ml</div>
                        <div style="color: #ffd700; font-weight: bold;">$285</div>
                    </div>
                </div>
            </div>
            
            <div style="margin-bottom: 1.5rem;">
                <h3 style="color: #ffd700; text-align: center; margin-bottom: 1rem;">Extras disponibles (elige uno)</h3>
                <div id="extrasContainer">
                    <!-- Los extras se generarán dinámicamente -->
                </div>
            </div>
            
            <div style="background: rgba(255,215,0,0.1); border: 2px solid rgba(255,215,0,0.3); border-radius: 10px; padding: 1rem; margin-bottom: 1.5rem;">
                <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem; color: #ccc;">
                    <span>Perfume (<span id="selectedSizeDisplay">30ml</span>):</span>
                    <span>$<span id="basePriceDisplay">160</span></span>
                </div>
                <div id="extrasBreakdown"></div>
                <div style="display: flex; justify-content: space-between; border-top: 1px solid rgba(255,215,0,0.3); padding-top: 0.5rem; margin-top: 1rem; font-weight: bold; font-size: 1.2rem; color: #ffd700;">
                    <span>Total:</span>
                    <span>$<span id="totalPriceDisplay">160</span></span>
                </div>
            </div>
            
            <div style="display: flex; gap: 1rem; justify-content: center;">
                <button onclick="addProductToCart()" style="background: linear-gradient(45deg, #ffd700, #ffed4e); color: #000; border: none; padding: 12px 24px; border-radius: 25px; font-weight: bold; cursor: pointer; transition: all 0.3s ease;">
                    Agregar al Carrito
                </button>
                <button onclick="contactForProduct()" style="background: rgba(255,255,255,0.05); color: white; border: 1px solid rgba(255,255,255,0.1); padding: 12px 24px; border-radius: 25px; font-weight: bold; cursor: pointer; transition: all 0.3s ease;">
                    Consultar por WhatsApp
                </button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Guardar producto actual
    window.currentProduct = producto;
    window.selectedSize = '30ml';
    window.selectedExtras = [];
    
    // Inicializar display de extras
    setTimeout(() => {
        updateExtrasDisplay();
    }, 100);
}

// Función para cerrar modal de producto
function closeProductModal() {
    const modal = document.querySelector('.product-modal');
    if (modal) {
        modal.remove();
        document.body.style.overflow = 'auto';
    }
}

// Función para seleccionar tamaño
function selectSize(size) {
    window.selectedSize = size;
    
    // Reset extras al cambiar tamaño
    window.selectedExtras = [];
    
    // Actualizar UI de tamaños
    document.querySelectorAll('.size-option').forEach(option => {
        option.style.background = 'rgba(255,255,255,0.05)';
        option.style.border = '2px solid rgba(255,255,255,0.1)';
    });
    
    event.target.closest('.size-option').style.background = 'rgba(255,215,0,0.2)';
    event.target.closest('.size-option').style.border = '2px solid #ffd700';
    
    updatePriceDisplay();
}

// Función para seleccionar extra
function selectExtra(extra) {
    // Solo permitir un extra (reemplazar el anterior)
    const index = window.selectedExtras.indexOf(extra);
    if (index > -1) {
        window.selectedExtras.splice(index, 1);
    } else {
        window.selectedExtras = [extra]; // Solo uno a la vez
    }
    
    updatePriceDisplay();
}

// Función para actualizar display de precios
function updatePriceDisplay() {
    // Usar la configuración actualizada de CONFIG
    const precioBase = CONFIG.precios.tamaños[window.selectedSize];
    const is10ml = window.selectedSize === '10ml';
    
    let precioExtras = 0;
    if (!is10ml && window.selectedExtras.length > 0) {
        const extraKey = window.selectedExtras[0];
        precioExtras = CONFIG.precios.extras[extraKey].precios[window.selectedSize];
    }
    
    const total = precioBase + precioExtras;
    
    document.getElementById('selectedSizeDisplay').textContent = window.selectedSize;
    document.getElementById('basePriceDisplay').textContent = precioBase;
    document.getElementById('totalPriceDisplay').textContent = total;
    
    // Actualizar extras dinámicamente
    updateExtrasDisplay();
    
    // Actualizar desglose de extras
    const extrasBreakdown = document.getElementById('extrasBreakdown');
    if (window.selectedExtras.length > 0) {
        const extraKey = window.selectedExtras[0];
        const extraName = CONFIG.precios.extras[extraKey].nombre;
        const extraPrice = is10ml ? 0 : CONFIG.precios.extras[extraKey].precios[window.selectedSize];
        
        extrasBreakdown.innerHTML = `
            <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem; color: #ccc;">
                <span>${extraName}:</span>
                <span>${is10ml ? 'Incluido' : `+$${extraPrice}`}</span>
            </div>
        `;
    } else {
        extrasBreakdown.innerHTML = '';
    }
}

// Función para actualizar display de extras dinámicamente
function updateExtrasDisplay() {
    const extrasContainer = document.getElementById('extrasContainer');
    if (!extrasContainer) return;
    
    const is10ml = window.selectedSize === '10ml';
    
    let extrasHTML = '';
    Object.entries(CONFIG.precios.extras).forEach(([key, extra]) => {
        const isSelected = window.selectedExtras.includes(key);
        const extraPrice = is10ml ? 0 : extra.precios[window.selectedSize];
        const priceText = is10ml ? 'Ya incluido' : `+$${extraPrice}`;
        const priceColor = is10ml ? '#00ff88' : '#ffd700';
        
        extrasHTML += `
            <div class="extra-option ${isSelected ? 'selected' : ''}" onclick="selectExtra('${key}')" 
                 style="background: ${isSelected ? 'rgba(255,215,0,0.2)' : 'rgba(255,255,255,0.05)'}; 
                        border: 2px solid ${isSelected ? '#ffd700' : 'rgba(255,255,255,0.1)'}; 
                        border-radius: 10px; padding: 1rem; cursor: pointer; margin-bottom: 0.5rem; 
                        display: flex; justify-content: space-between; align-items: center; transition: all 0.3s ease;">
                <div>
                    <div style="color: white; font-weight: bold; margin-bottom: 0.2rem;">${extra.nombre}</div>
                    <div style="color: #bbb; font-size: 0.9rem;">${extra.descripcion}</div>
                    ${is10ml ? '<div style="color: #00ff88; font-size: 0.8rem; margin-top: 0.3rem;">✓ Incluido sin costo adicional</div>' : ''}
                </div>
                <div style="color: ${priceColor}; font-weight: bold;">${priceText}</div>
            </div>
        `;
    });
    
    extrasContainer.innerHTML = extrasHTML;
}

// Función para agregar producto actual al carrito
function addProductToCart() {
    if (window.currentProduct) {
        addToCart(window.currentProduct, window.selectedSize, window.selectedExtras);
        closeProductModal();
    }
}

// Función para contactar por producto
function contactForProduct() {
    if (window.currentProduct) {
        const extras = window.selectedExtras.map(e => e === 'doble_fijador' ? 'Doble Fijador' : 'Feromonas');
        const total = document.getElementById('totalPriceDisplay').textContent;
        
        const mensaje = `Hola! Me interesa el perfume "${window.currentProduct.nombre}" en ${window.selectedSize}${extras.length > 0 ? ` con ${extras.join(', ')}` : ''}. Precio total: $${total}`;
        
        const url = `https://wa.me/${CONFIG.whatsapp.numero}?text=${encodeURIComponent(mensaje)}`;
        window.open(url, '_blank');
        closeProductModal();
    }
}

// Función para eliminar producto del carrito
function removeFromCart(itemId) {
    carritoItems = carritoItems.filter(item => item.id !== itemId);
    updateCartIcon();
    updateCartContent();
    
    console.log('Producto eliminado del carrito. Items restantes:', carritoItems.length);
}

// Función para alternar entrega a domicilio
function toggleDelivery() {
    entregaDomicilio = !entregaDomicilio;
    updateCartContent();
    console.log('Entrega a domicilio:', entregaDomicilio);
}

// Función para proceder al pago
function proceedToCheckout() {
    const subtotal = carritoItems.reduce((sum, item) => sum + item.precioTotal, 0);
    const costoEntrega = entregaDomicilio ? 50 : 0;
    const total = subtotal + costoEntrega;
    
    alert(`¡Gracias por tu compra!\n\nResumen:\n${carritoItems.length} productos\nTotal: $${total}\n${entregaDomicilio ? 'Con entrega a domicilio' : 'Retiro en tienda'}\n\nTe contactaremos pronto para confirmar tu pedido.`);
    
    // Limpiar carrito
    clearCart();
}

// Función para contactar por WhatsApp con todo el carrito
function contactForCart() {
    const subtotal = carritoItems.reduce((sum, item) => sum + item.precioTotal, 0);
    const costoEntrega = entregaDomicilio ? 50 : 0;
    const total = subtotal + costoEntrega;
    
    let mensaje = '¡Hola! Me interesa hacer el siguiente pedido:\n\n';
    
    carritoItems.forEach((item, index) => {
        mensaje += `${index + 1}. ${item.producto} - ${item.tamaño}\n`;
        if (item.extras.length > 0) {
            mensaje += `   Extra: ${item.extras.join(', ')} ${item.is10ml ? '(Incluido)' : ''}\n`;
        }
        mensaje += `   Precio: $${item.precioTotal}\n\n`;
    });
    
    mensaje += `Subtotal: $${subtotal}\n`;
    if (entregaDomicilio) {
        mensaje += `Entrega a domicilio: $${costoEntrega}\n`;
    }
    mensaje += `Total: $${total}\n\n`;
    mensaje += entregaDomicilio ? 'Con entrega a domicilio' : 'Retiro en tienda';
    
    const url = `https://wa.me/2721224946?text=${encodeURIComponent(mensaje)}`;
    window.open(url, '_blank');
    closeCartModal();
}

// Función para limpiar carrito
function clearCart() {
    carritoItems = [];
    entregaDomicilio = false;
    updateCartIcon();
    closeCartModal();
    console.log('Carrito limpiado');
}

// Inicializar cuando se carga la página
document.addEventListener('DOMContentLoaded', function() {
    updateCartIcon();
    console.log('Sistema de carrito simple inicializado');
});

console.log('Cart-simple.js cargado correctamente');