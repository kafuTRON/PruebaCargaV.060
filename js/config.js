// ===== CONFIG.JS - Configuración y Datos ===== 

// Configuración de precios y opciones
const CONFIG = {
    precios: {
        tamaños: {
            '10ml': 90,   // Ya incluye feromonas y doble fijador
            '30ml': 160,
            '60ml': 220,
            '100ml': 285
        },
        extras: {
            'feromonas': {
                nombre: 'Feromonas',
                descripcion: 'Atracción y magnetismo personal',
                precios: {
                    '10ml': 0,    // Ya incluido
                    '30ml': 35,
                    '60ml': 45,
                    '100ml': 50
                },
                disponibleDesde: '10ml'
            },
            'doble_fijador': {
                nombre: 'Doble Fijador',
                descripcion: 'Mayor duración y proyección',
                precios: {
                    '10ml': 0,    // Ya incluido
                    '30ml': 45,
                    '60ml': 60,
                    '100ml': 70
                },
                disponibleDesde: '10ml'
            }
        },
        entregaDomicilio: 50,
        notas: {
            '10ml': 'Ya incluye feromonas y doble fijador',
            '30ml': 'Extras opcionales disponibles',
            '60ml': 'Extras opcionales disponibles', 
            '100ml': 'Extras opcionales disponibles'
        }
    },
    
    iconos: {
        carrito: {
            vacio: 'recursos/A&A/Material Grafico/Carrito_de_compras_Vacio.png',
            semiVacio: 'recursos/A&A/Material Grafico/Carrito_de_compras_SemiVacio.png',
            semiLleno: 'recursos/A&A/Material Grafico/Carrito_de_compras_Semilleno.png',
            lleno: 'recursos/A&A/Material Grafico/Carrito_de_compras_Lleno.png'
        }
    },
    
    cartelones: [
        'recursos/A&A/Material Grafico/CartelonDamayCabellero.jpg',
        'recursos/A&A/Material Grafico/CartelonDePerdumesInspirados.jpg',
        'recursos/A&A/Material Grafico/CartelonDeUbicacionVariante1.jpg',
        'recursos/A&A/Material Grafico/CartelonDeUbicacionVriante2.jpg',
        'recursos/A&A/Material Grafico/CartelonDeUbicacionVriante3.jpg',
        'recursos/A&A/Material Grafico/CartelonMarcoPerfume.jpg',
        'recursos/A&A/Material Grafico/ParonamaDeLogoConRedesSociales.jpg',
        'recursos/A&A/Material Grafico/VistaProductoConContactos.jpg'
    ],
    
    whatsapp: {
        numero: '2721224946' // Número actualizado de A&A Perfumería
    },
    
    animaciones: {
        duracionCartelones: 800, // 8 segundos
        duracionNotificacion: 3000, // 3 segundos
        delayProductos: 100, // delay entre productos
        duracionModal: 300 // duración de animaciones de modal
    }
};

// Base de datos de productos - Perfumes A&A
const PRODUCTOS = [
    // PERFUMES PARA CABALLEROS
    {
        id: 1,
        nombre: "Alam",
        inspirado: "Fragancia masculina exclusiva",
        descripcion: "Una fragancia sofisticada y elegante, perfecta para el caballero moderno.",
        precio: "Desde $90",
        categoria: "hombre",
        imagen: "recursos/A&A/caballeros_A&A/Alam.jpg"
    },
    {
        id: 2,
        nombre: "Anuar",
        inspirado: "Fragancia masculina intensa",
        descripcion: "Intenso y carismático, ideal para ocasiones especiales.",
        precio: "Desde $90",
        categoria: "hombre",
        imagen: "recursos/A&A/caballeros_A&A/Anuar.jpg"
    },
    {
        id: 3,
        nombre: "Cristian",
        inspirado: "Fragancia masculina fresca",
        descripcion: "Fresco y dinámico, perfecto para el día a día.",
        precio: "Desde $90",
        categoria: "hombre",
        imagen: "recursos/A&A/caballeros_A&A/Cristian.jpg"
    },
    {
        id: 4,
        nombre: "Cucho",
        inspirado: "Fragancia masculina audaz",
        descripcion: "Audaz y distintivo, para hombres que marcan la diferencia.",
        precio: "Desde $90",
        categoria: "hombre",
        imagen: "recursos/A&A/caballeros_A&A/Cucho.jpg"
    },
    {
        id: 5,
        nombre: "Eduardo",
        inspirado: "Fragancia masculina clásica",
        descripcion: "Clásico y refinado, una fragancia atemporal.",
        precio: "Desde $90",
        categoria: "hombre",
        imagen: "recursos/A&A/caballeros_A&A/Eduardo.jpg"
    },
    {
        id: 6,
        nombre: "Ismael",
        inspirado: "Fragancia masculina seductora",
        descripcion: "Seductor y magnético, conquista desde el primer momento.",
        precio: "Desde $90",
        categoria: "hombre",
        imagen: "recursos/A&A/caballeros_A&A/Ismael.jpg"
    },
    {
        id: 7,
        nombre: "Israel",
        inspirado: "Fragancia masculina poderosa",
        descripcion: "Poderoso y enérgico, para hombres seguros de sí mismos.",
        precio: "Desde $90",
        categoria: "hombre",
        imagen: "recursos/A&A/caballeros_A&A/Israel.jpg"
    },
    {
        id: 8,
        nombre: "Mandingo",
        inspirado: "Fragancia masculina exótica",
        descripcion: "Exótico y misterioso, una fragancia única e irresistible.",
        precio: "Desde $90",
        categoria: "hombre",
        imagen: "recursos/A&A/caballeros_A&A/Mandingo.jpg"
    },
    {
        id: 9,
        nombre: "Mateo",
        inspirado: "Fragancia masculina juvenil",
        descripcion: "Juvenil y vibrante, perfecto para el hombre contemporáneo.",
        precio: "Desde $90",
        categoria: "hombre",
        imagen: "recursos/A&A/caballeros_A&A/Mateo.jpg"
    },
    {
        id: 10,
        nombre: "Milton",
        inspirado: "Fragancia masculina distinguida",
        descripcion: "Distinguido y elegante, para ocasiones importantes.",
        precio: "Desde $90",
        categoria: "hombre",
        imagen: "recursos/A&A/caballeros_A&A/Milton.jpg"
    },
    {
        id: 11,
        nombre: "Pedro",
        inspirado: "Fragancia masculina tradicional",
        descripcion: "Tradicional con un toque moderno, una fragancia versátil.",
        precio: "Desde $90",
        categoria: "hombre",
        imagen: "recursos/A&A/caballeros_A&A/Pedro.jpg"
    },

    // PERFUMES PARA DAMAS
    {
        id: 12,
        nombre: "Adele",
        inspirado: "Inspirado en Chance Chanel",
        descripcion: "Elegante y sofisticada, una fragancia que marca presencia.",
        precio: "Desde $90",
        categoria: "mujer",
        imagen: "recursos/A&A/Damas_A&A/Adele(Chance_Chanel).jpg"
    },
    {
        id: 13,
        nombre: "Adelita",
        inspirado: "Inspirado en Born In Roma Valentino",
        descripcion: "Moderna y audaz, perfecta para la mujer contemporánea.",
        precio: "Desde $90",
        categoria: "mujer",
        imagen: "recursos/A&A/Damas_A&A/Adelita(Born_In_Roma_Valentino).jpg"
    },
    {
        id: 14,
        nombre: "Alondra",
        inspirado: "Inspirado en Bade'e AI Oud Honor&Glory Lattafa",
        descripcion: "Exótica y misteriosa, con notas orientales cautivadoras.",
        precio: "Desde $90",
        categoria: "mujer",
        imagen: "recursos/A&A/Damas_A&A/Alondra(Bade'e_AI_Oud_Honor&Glory_Lattafa).jpg"
    },
    {
        id: 15,
        nombre: "Angelica",
        inspirado: "Inspirado en Yara Moi de Lattafa",
        descripcion: "Dulce y envolvente, una fragancia que enamora.",
        precio: "Desde $90",
        categoria: "mujer",
        imagen: "recursos/A&A/Damas_A&A/Angelica(Yara_Moi_de_Lattafa).jpg"
    },
    {
        id: 16,
        nombre: "Anina",
        inspirado: "Inspirado en Light Blue Dolce&Gabbana",
        descripcion: "Fresca y mediterránea, perfecta para el verano.",
        precio: "Desde $90",
        categoria: "mujer",
        imagen: "recursos/A&A/Damas_A&A/Anina(Light_Blue_Dolce&Gabbana).jpg"
    },
    {
        id: 17,
        nombre: "Blanca",
        inspirado: "Inspirado en Good Girl Blush Carolina Herrera",
        descripcion: "Seductora y femenina, una fragancia irresistible.",
        precio: "Desde $90",
        categoria: "mujer",
        imagen: "recursos/A&A/Damas_A&A/Blanca(Good_Girl_Blush_EAN_Carolina_Herrera).jpg"
    },
    {
        id: 18,
        nombre: "Diana",
        inspirado: "Inspirado en Kenzo Flower",
        descripcion: "Floral y delicada, como un jardín en primavera.",
        precio: "Desde $90",
        categoria: "mujer",
        imagen: "recursos/A&A/Damas_A&A/Diana(Kenzo_Flower).jpg"
    },
    {
        id: 19,
        nombre: "Dolores",
        inspirado: "Inspirado en Scandal Jean Paul Gaultier",
        descripcion: "Provocativa y sensual, para mujeres que no pasan desapercibidas.",
        precio: "Desde $90",
        categoria: "mujer",
        imagen: "recursos/A&A/Damas_A&A/Dolores(Scandal_Jean_Paul_Gaultier).jpg"
    },
    {
        id: 20,
        nombre: "Eaned",
        inspirado: "Inspirado en Ralph Laurent",
        descripcion: "Clásica y refinada, una fragancia atemporal.",
        precio: "Desde $90",
        categoria: "mujer",
        imagen: "recursos/A&A/Damas_A&A/Eaned(Ralph_Laurent).jpg"
    },
    {
        id: 21,
        nombre: "Esther",
        inspirado: "Inspirado en Khamrah Qahwa de Lattafa",
        descripcion: "Rica y especiada, con notas de café y especias orientales.",
        precio: "Desde $90",
        categoria: "mujer",
        imagen: "recursos/A&A/Damas_A&A/Esther(Khamrah_Qahwa_de_Lattafa).jpg"
    },
    {
        id: 22,
        nombre: "Inani",
        inspirado: "Inspirado en Miss Dior",
        descripcion: "Romántica y elegante, la esencia de la feminidad.",
        precio: "Desde $90",
        categoria: "mujer",
        imagen: "recursos/A&A/Damas_A&A/Inani(Miss_Dior_Dior).jpg"
    },
    {
        id: 23,
        nombre: "Ivane",
        inspirado: "Inspirado en Sweet like Candy Ariana Grande",
        descripcion: "Dulce y juguetona, perfecta para mujeres jóvenes y divertidas.",
        precio: "Desde $90",
        categoria: "mujer",
        imagen: "recursos/A&A/Damas_A&A/Ivane(Sweed_like_Candy_Ariana_Grande).jpg"
    },
    {
        id: 24,
        nombre: "Judith",
        inspirado: "Inspirado en Yara De Lattafa",
        descripcion: "Intensa y cautivadora, una fragancia que deja huella.",
        precio: "Desde $90",
        categoria: "mujer",
        imagen: "recursos/A&A/Damas_A&A/Judith(Yara_De_Lattafa).jpg"
    },
    {
        id: 25,
        nombre: "Knoz",
        inspirado: "Inspirado en Cloud Ariana Grande",
        descripcion: "Suave y etérea, como caminar entre nubes.",
        precio: "Desde $90",
        categoria: "mujer",
        imagen: "recursos/A&A/Damas_A&A/Knoz(Cloud_Ariana_Grande).jpg"
    },
    {
        id: 26,
        nombre: "Martha",
        inspirado: "Inspirado en Chanel No5",
        descripcion: "Icónica y legendaria, la fragancia más famosa del mundo.",
        precio: "Desde $90",
        categoria: "mujer",
        imagen: "recursos/A&A/Damas_A&A/Martha(Chanel_No5).jpg"
    },
    {
        id: 27,
        nombre: "Nahomi",
        inspirado: "Inspirado en Halloween",
        descripcion: "Misteriosa y seductora, perfecta para noches especiales.",
        precio: "Desde $90",
        categoria: "mujer",
        imagen: "recursos/A&A/Damas_A&A/Nahomi(Hallowen).jpg"
    },
    {
        id: 28,
        nombre: "Olimpia",
        inspirado: "Inspirado en Libre Yves Saint Laurent",
        descripcion: "Libre y audaz, para mujeres que viven sin límites.",
        precio: "Desde $90",
        categoria: "mujer",
        imagen: "recursos/A&A/Damas_A&A/Olimpia(Libre_EAN_Parfum_Yves_Saint_Laurent).jpg"
    },
    {
        id: 29,
        nombre: "Rosa",
        inspirado: "Inspirado en Rock In Rio Escada",
        descripcion: "Vibrante y energética, perfecta para festivales y celebraciones.",
        precio: "Desde $90",
        categoria: "mujer",
        imagen: "recursos/A&A/Damas_A&A/Rosa(Rock_In_Rio_Escada).jpg"
    },
    {
        id: 30,
        nombre: "Sarai",
        inspirado: "Inspirado en Can Can Paris Hilton",
        descripcion: "Glamorosa y sofisticada, para mujeres que aman brillar.",
        precio: "Desde $90",
        categoria: "mujer",
        imagen: "recursos/A&A/Damas_A&A/Sarai(Can_Can_Paris_Hilton).jpg"
    },
    {
        id: 31,
        nombre: "Sofia",
        inspirado: "Inspirado en Meow Katy Perry",
        descripcion: "Divertida y coqueta, perfecta para mujeres con personalidad.",
        precio: "Desde $90",
        categoria: "mujer",
        imagen: "recursos/A&A/Damas_A&A/Sofia(Meow_Katy_perry).jpg"
    },
    {
        id: 32,
        nombre: "Tamara",
        inspirado: "Inspirado en 212 Clásico Carolina Herrera",
        descripcion: "Urbana y moderna, la fragancia de la mujer cosmopolita.",
        precio: "Desde $90",
        categoria: "mujer",
        imagen: "recursos/A&A/Damas_A&A/Tamara(212_Clasico_Carolina_Herrera).jpg"
    },
    {
        id: 33,
        nombre: "Yadira",
        inspirado: "Inspirado en Thank You Next Ariana Grande",
        descripcion: "Empoderada y segura, para mujeres que siguen adelante.",
        precio: "Desde $90",
        categoria: "mujer",
        imagen: "recursos/A&A/Damas_A&A/Yadira(Thank_You_Next_Ariana_Grande).jpg"
    },
    {
        id: 34,
        nombre: "Yatae",
        inspirado: "Inspirado en Coco Mademoiselle de Chanel",
        descripcion: "Elegante y rebelde, la fragancia de la mujer independiente.",
        precio: "Desde $90",
        categoria: "mujer",
        imagen: "recursos/A&A/Damas_A&A/Yatae(Coco_Mademoiselle_de_Chanel).jpg"
    },
    {
        id: 35,
        nombre: "Yesenia",
        inspirado: "Inspirado en Olympèa Paco Rabanne",
        descripcion: "Divina y poderosa, como una diosa moderna.",
        precio: "Desde $90",
        categoria: "mujer",
        imagen: "recursos/A&A/Damas_A&A/Yesenia(Olympèa_PacoRabanne).jpg"
    }
];

// Estados globales de la aplicación
const STATE = {
    categoriaActual: 'todos',
    tamañoSeleccionado: '30ml',
    extrasSeleccionados: [],
    productoSeleccionado: null,
    carritoItems: [],
    entregaDomicilio: false,
    isAnimating: false,
    modalActual: null,
    modalCarrito: null
};

// Exportar para uso global (si es necesario)
if (typeof window !== 'undefined') {
    window.CONFIG = CONFIG;
    window.PRODUCTOS = PRODUCTOS;
    window.STATE = STATE;
}
