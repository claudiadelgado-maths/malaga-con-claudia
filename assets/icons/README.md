# SVG

Los catorce iconos del archivo fuente ya están separados, normalizados e
integrados. Facebook se ha añadido al inventario, pero su SVG definitivo sigue
pendiente. La interfaz aplica los SVG como máscaras CSS con `currentColor`, por
lo que adoptan automáticamente el color correcto sobre fondos claros y oscuros.

| Archivo | Significado | Tamaño/uso recomendado | Apariciones |
| --- | --- | --- | --- |
| `icon-whatsapp.svg` | WhatsApp y contacto directo | 20–24 px; versión monocroma | CTA final, botón flotante y footer |
| `icon-instagram.svg` | Perfil de Instagram | 18–20 px | Footer |
| `icon-facebook.svg` | Perfil de Facebook | 18–20 px | Footer; pendiente de proporcionar, actualmente representado por un monograma CSS |
| `icon-language.svg` | Idiomas disponibles | 20–24 px | Bloque de confianza; opcional junto al selector |
| `icon-location.svg` | Ubicación o punto de encuentro | 18–20 px | Metadata de tours y FAQ |
| `icon-clock.svg` | Duración | 18–20 px | Metadata de tours |
| `icon-group.svg` | Grupo pequeño | 20–24 px | Bloque de confianza y tours |
| `icon-guide.svg` | Guía local / trato personal | 20–24 px | Bloque de confianza y Sobre mí |
| `icon-star.svg` | Valoración | 14–16 px repetido | Opiniones reales futuras |
| `icon-menu.svg` | Abrir navegación móvil | 24 px | Header móvil |
| `icon-close.svg` | Cerrar navegación móvil | 24 px | Header móvil abierto |
| `icon-arrow.svg` | Avance o enlace | 16–20 px | Botones y enlaces de texto |
| `icon-chevron.svg` | Abrir/cerrar contenido | 18–20 px | FAQ |
| `icon-email.svg` | Correo electrónico | 18–20 px | Footer/contacto futuro |
| `icon-compass.svg` | Descubrimiento auténtico | 20–24 px | Cuarto atributo del bloque de confianza |

Todos deberían compartir grosor, extremos y caja visual. Es preferible usar
`currentColor` para que funcionen sobre fondos claros y oscuros.
