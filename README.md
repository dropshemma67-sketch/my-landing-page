# MAERK — Tema Shopify «Cristal Cálido»

Tema Online Store 2.0 para una tienda de un solo producto (**Corrector de Postura, S/ 60**)
con **pago contraentrega**, banner a pantalla completa y estética **cristalina cálida sobre negro**.

---

## 1. Subir el tema a Shopify

```bash
./build.sh          # genera maerk-theme.zip
```

En tu panel de Shopify:

1. **Tienda online → Temas → Agregar tema → Subir archivo ZIP**
2. Selecciona `maerk-theme.zip`
3. Cuando termine: **Acciones → Publicar**

> Alternativa para desarrollar en vivo:
> `npm i -g @shopify/cli @shopify/theme` y luego `shopify theme dev --store tu-tienda.myshopify.com`

---

## 2. Crear el producto (paso obligatorio)

El formulario de contraentrega crea un **pedido real** en Shopify, así que necesita un producto conectado.

1. **Productos → Agregar producto**
   - Título: `Corrector de Postura MAERK`
   - Precio: `60.00`
   - Marca **"Este es un producto físico"** y pon un peso (ej. `0.2 kg`)
   - Sube las 4 fotos del producto

2. **Crea las dos tallas como variantes** (en la misma pantalla, sección *Variantes*):
   - **Agregar opciones como talla** → Nombre de la opción: `Talla`
   - Valores: `S` y `M` — escritos **exactamente así**, en mayúscula
   - En cada variante: precio `60.00` y desmarca **"Hacer seguimiento de la cantidad"**
     (dropshipping, sin stock propio)

   > El tema empareja la talla que elige el cliente con la variante buscando la letra
   > en el nombre. Si escribes `Talla S` o `Small` en vez de `S`, no va a emparejar y el
   > pedido saldrá con la primera variante. Mantén `S` y `M` a secas.

3. **Tienda online → Personalizar → sección «Producto + contraentrega»**
   → en **Producto de Shopify**, selecciónalo.

4. Haz lo mismo en la sección **Banner principal** (campo *Producto*) para que el precio se tome solo.

> La talla elegida se guarda **siempre** como dato del pedido, tengas o no las variantes
> creadas. Las variantes solo hacen que el pedido salga con la talla correcta también a
> nivel de inventario.

### Ficha del producto (para la descripción en Shopify)

| Dato | Valor |
|---|---|
| Tipo | Corrector de postura en X, doble ajuste, unisex |
| Material | Almohadilla de cuero PU acolchado; correas con perforaciones de ventilación |
| Ajuste | Hebillas y correas regulables en hombros y torso |
| Talla S | 46 – 68 cm de contorno |
| Talla M | 68 – 91 cm de contorno |
| Cómo elegir | La misma talla que usa en polos, camisas o blusas |
| Uso | Casa, oficina, gimnasio, yoga, exteriores. Bajo la ropa o encima |
| Cuidado | Lavado a mano, agua fría, jabón neutro, secado a la sombra |

---

## 3. Activar el pago contraentrega

**Configuración → Pagos → Métodos de pago manuales → Pago contra entrega (COD)**

- Nombre: `Pago contraentrega`
- Instrucciones: `Pagas en efectivo al repartidor cuando recibas tu pedido.`

Recomendado — **Configuración → Pagos → Desactiva** cualquier pasarela que no vayas a usar,
para que el cliente no vea opciones que no aplican.

**Configuración → Checkout:**
- Marca **"Número de teléfono"** como campo obligatorio
- Activa **"Permitir compra como invitado"** (sin cuenta)

---

## 4. Envío gratis

**Configuración → Envío y entrega → Tarifas**
- Zona: Perú → **Agregar tarifa** → Nombre `Envío gratis`, Precio `0.00`

---

## 5. Cómo funciona el formulario

Tiene dos modos, en *Producto + contraentrega → **Datos de entrega***:

**Solo en el checkout (por defecto).** En la página el cliente elige talla y cantidad
y toca el botón. La dirección se pide una única vez, en el checkout de Shopify.
Es el modo correcto si usas **Dropi** o cualquier proveedor que lee el pedido desde
Shopify: esos servicios leen la **dirección de envío del pedido**, no lo que se escriba
en la página, así que pedirla dos veces solo agrega fricción y pierde ventas.

**También en esta página.** Muestra el formulario largo (nombre, celular, departamento,
distrito, dirección, referencia). Los datos se guardan como propiedades del artículo y
además se intenta prellenar el checkout con ellos. Ese prellenado es un extra: Shopify
ha sido inconsistente con esos parámetros, así que puede que el cliente tenga que
reescribir algo. El pedido sale bien igual.

En ambos modos, al enviar:

1. Se agrega el producto al carrito con la talla elegida y los datos que haya.
2. Se redirige al **checkout de Shopify**, donde el cliente confirma y elige
   *Pago contraentrega*.

Los datos quedan en **Pedidos → (el pedido)**: la dirección arriba, y lo que venga del
formulario en el detalle del artículo.

También puedes cambiar **«Al enviar el pedido» → Enviar por WhatsApp**, que abre un chat
con el resumen en vez de ir al checkout. Ese modo **no** crea un pedido en Shopify, así
que **no llega a Dropi** — úsalo solo si gestionas todo a mano por chat.

### Si tu proveedor es Dropi

1. En **Dropi → Mis Integraciones → Agregar** creas la integración de Shopify y copias el **token**.
2. Instalas la app **Dropify** en Shopify y pegas ahí el token.
3. **Importa el producto desde el catálogo de Dropi** con Dropify — no lo crees a mano,
   o Dropi no sabrá qué despachar. Después le cambias el precio de venta a S/ 60.
4. Deja *Datos de entrega* en **Solo en el checkout**.
5. Los pedidos se sincronizan solos cada 5–10 minutos.

Si las variantes que trae Dropi no se llaman `S` y `M` a secas, ajusta el campo **Talla**
de cada bloque para que coincida con el texto de la variante.

## 6. Personalizar el diseño

Todo se edita en **Tienda online → Personalizar**, sin tocar código:

| Dónde | Qué cambias |
|---|---|
| **Configuración del tema → Colores** | Negro base, dorado, bronce, textos |
| **Configuración del tema → Tipografía** | Fuente de títulos y de texto |
| **Configuración del tema → Diseño** | Ancho de página, redondeo, logo, favicon |
| **Configuración del tema → WhatsApp** | Número y mensaje del botón flotante |
| **Banner principal** | Imagen de fondo, imagen flotante, títulos, precio, botones, datos animados |
| **Producto + contraentrega** | Galería, precio, puntos de venta, opciones de cantidad, textos del formulario, departamentos |
| **Beneficios / Cómo se usa / Reseñas / FAQ** | Bloques que se agregan, editan y reordenan |

### Paleta por defecto

| Token | Valor | Uso |
|---|---|---|
| `color_bg` | `#08070A` | Negro cálido de fondo |
| `color_bg_2` | `#100D0E` | Fondo secundario / pie |
| `color_warm` | `#E8B04B` | Dorado principal |
| `color_warm_light` | `#F6D28A` | Dorado claro (degradados) |
| `color_bronze` | `#B9762F` | Bronce (profundidad) |
| `color_text` | `#F3ECE2` | Texto cálido |
| `color_muted` | `#A79A8B` | Texto suave |

---

## 7. Animaciones incluidas

- Aura de luz cálida que se mueve detrás del banner
- Parallax suave de la imagen de fondo
- Revelado escalonado al hacer scroll (`IntersectionObserver`)
- Tarjeta del producto flotando + insignias flotantes
- Contadores que suben desde cero
- Barrido de luz (*sheen*) en botones y tarjetas de vidrio
- Marquesina infinita en la barra de anuncios
- Acordeón de FAQ con transición de altura
- Barra de compra fija que aparece al hacer scroll en móvil
- Header que se vuelve cristal al despegarse del inicio

Todo respeta `prefers-reduced-motion`: si el usuario pide menos movimiento, las animaciones se desactivan.

---

## 8. Estructura

```
assets/base.css              Sistema de diseño completo
assets/theme.js              Animaciones + formulario contraentrega
layout/theme.liquid          Plantilla base (inyecta colores y fuentes)
layout/password.liquid       Pantalla de "próximamente"
sections/hero-banner.liquid  Banner principal
sections/product-cod.liquid  Producto + formulario contraentrega
sections/…                   Beneficios, pasos, reseñas, FAQ, CTA, header, footer
templates/index.json         Orden de la página de inicio (ya poblada)
config/settings_schema.json  Opciones del personalizador
locales/es.default.json      Textos base en español
```

---

## 9. Antes de lanzar anuncios

- [ ] Páginas legales creadas y enlazadas en el pie: *Política de privacidad*, *Términos*, *Política de envíos*, *Cambios y devoluciones*
- [ ] Dominio propio conectado (**Configuración → Dominios**)
- [ ] Pixel de Meta y/o TikTok instalado (**Configuración → Aplicaciones y canales de venta**)
- [ ] Un pedido de prueba completo, de principio a fin
- [ ] Revisar la página en móvil real, que es donde vendrá el 80–90 % del tráfico
- [ ] Quitar la contraseña de la tienda (**Tienda online → Preferencias**)

> Las reseñas y estadísticas que vienen cargadas son **texto de ejemplo**. Reemplázalas por
> reseñas reales antes de publicar: mostrar testimonios inventados como reales es publicidad
> engañosa y las plataformas de anuncios rechazan las tiendas por eso.

> El producto es un artículo de bienestar, no un dispositivo médico. Evita prometer que
> cura hernias, escoliosis o dolores diagnosticados.
>
> La descripción del proveedor menciona que la mala postura causa **miopía**. Eso no tiene
> respaldo y está deliberadamente fuera de los textos del tema: es el tipo de afirmación
> médica que hace que Meta rechace la cuenta publicitaria. Tampoco uses "corrige la
> columna" ni "elimina el dolor"; el encuadre seguro es *alivia la tensión* y
> *ayuda a entrenar el hábito postural*.
