# magik-web

Sitio web estático desarrollado con HTML, CSS y JavaScript vanilla.

## Estado

Prototipo visual V1 trilingüe (ES / EN / FR), personalizado para Claudia
Delgado. La oferta, los precios, la biografía, las opiniones, las políticas y
el funcionamiento de las reservas deben validarse antes de publicar. Los datos
de WhatsApp, email, Instagram y Facebook ya son reales.

## Desarrollo local

Desde la raíz del proyecto:

```sh
python3 -m http.server 8000 --bind 127.0.0.1
```

Abrir `http://127.0.0.1:8000/` en el navegador. El servidor se detiene con
`Ctrl+C`.

## Portabilidad

- Los archivos del sitio se mantienen dentro de este directorio.
- Las referencias entre páginas y recursos deben usar rutas relativas.
- El proyecto no requiere compilación ni dependencias instaladas con npm.
- El servidor de Python se usa solo para desarrollo y no forma parte del sitio.

## Estructura

```text
index.html
assets/
  css/styles.css
  js/i18n.js
  js/main.js
  images/README.md
  icons/README.md
```

Los inventarios de fotografías e iconos están documentados dentro de sus
respectivos directorios. Las fotografías se sirven en WebP y los SVG usan el
color del componente mediante máscaras CSS. No se incluyen recursos remotos.

## Antes de publicar

Buscar en el código `TODO CLIENTE`, `PLACEHOLDER CLIENTE` y
`DEMO / PLACEHOLDER`. Estos marcadores identifican datos que no deben llegar a
producción sin sustituir o validar.
