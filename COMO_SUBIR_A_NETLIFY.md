# 🚀 Cómo subir tu sitio a Netlify (Guía Rápida)

Tu sitio web ya está optimizado y listo para ser publicado en internet. Sigue estos pasos sencillos para subirlo a Netlify (un servicio de hosting gratuito y rápido).

## Opción 1: Arrastrar y Soltar (Más Fácil)

1. Ve a [app.netlify.com](https://app.netlify.com) e inicia sesión (o crea una cuenta gratuita).
2. Una vez en tu panel de control, verás una sección que dice **"Drag & drop your site folder here"**.
3. Abre tu explorador de archivos en tu computadora.
4. Arrastra la carpeta **`Lechosa Prueba Aantigravity`** completa directamente al área indicada en el navegador.
5. ¡Listo! Netlify subirá tu sitio y te dará un enlace único (ej. `mifantastico-sitio.netlify.app`) en segundos.

## Opción 2: Usar Git (Más Profesional)

Si ya usas GitHub, GitLab o Bitbucket:

1. Crea un repositorio nuevo y sube tus archivos.
2. En Netlify, haz clic en "Add new site" > "Import from existing project".
3. Conecta tu proveedor de Git y selecciona tu repositorio.
4. Netlify detectará automáticamente que es un sitio estático.
   - **Build command:** (Dejar vacío)
   - **Publish directory:** `.` (o dejar vacío/default)
5. Haz clic en **Deploy site**.

## ✅ Archivos Incluidos para Netlify

He agregado un archivo `netlify.toml` que configura automáticamente:
- Seguridad básica para tu sitio.
- Reglas para que tu sitio cargue rápido.
- Permisos para cargar las imágenes y fuentes correctamente.

He agregado también un archivo `.node-version` asegurando que use una versión estable de Node.js (v20) para evitar errores de instalación.

---
**Nota:** Tienes una copia de seguridad de tus archivos en la carpeta `backup_2025_12_28`.
