# 📋 Cómo Usar el Panel de Administrador - Madre Tierra

## 🔐 Acceso Inicial (Solo Primera Vez)

### Paso 1: Habilitar Netlify Identity

Después de subir tu sitio a Netlify, debes hacer este setup único:

1. Ve a tu dashboard de Netlify
2. Click en tu sitio "Madre Tierra"
3. **Site settings** → **Identity**
4. Click **"Enable Identity"**
5. En **Registration preferences**, selecciona **"Invite only"** (solo personas que invites)
6. Click **"Invite users"** y agrega tu email

Recibirás un email de confirmación. Haz click en el link y crea tu contraseña.

---

## 🎛️ Entrando al Panel

1. Ve a: `https://tudominio.netlify.app/admin`
2. Ingresa con tu email y contraseña
3. ¡Listo! Verás el panel de administración

---

## ✏️ Editando Productos

### Agregar un Nuevo Producto

1. En el panel, click en **"Productos"**
2. Click en **"New Productos"** (botón verde arriba a la derecha)
3. Llena los campos:
   - **Nombre:** Ej: "Lechosa Extra Grande"
   - **Descripción:** Descripción del producto
   - **Precio:** Ej: "$3.50/lb"
   - **Categoría:** Selecciona: frutas, vegetales, o organico
   - **Badge:** Premium, Orgánico, Fresco, o Ninguno
   - **Imagen:** Click en "Choose an image" para subir foto
   - **Disponible:** ✅ activa esto para que se muestre
4. Click **"Publish"** → **"Publish now"**
5. Espera 30 segundos → ¡Ya está en vivo!

### Editar un Producto Existente

1. Click en **"Productos"**
2. Click en el producto que quieres editar
3. Cambia lo que necesites (precio, descripción, etc.)
4. Click **"Publish"** → **"Publish now"**

### Eliminar un Producto

1. En la lista de productos, click en el producto
2. Click en **"Delete unpublished entry"** (arriba a la derecha)
3. Confirma la eliminación

---

## ❓ Editando Preguntas Frecuentes (FAQ)

### Agregar Nueva Pregunta

1. Click en **"Preguntas Frecuentes"**
2. Click **"New Preguntas Frecuentes"**
3. Llena:
   - **Pregunta:** La pregunta del cliente
   - **Respuesta:** La respuesta completa
   - **Orden:** Número (1, 2, 3...) para ordenar las preguntas
4. Click **"Publish"** → **"Publish now"**

### Editar/Eliminar FAQ

Mismo proceso que productos.

---

## 💬 Editando Testimonios

### Agregar Nuevo Testimonio

1. Click en **"Testimonios"**
2. Click **"New Testimonios"**
3. Llena:
   - **Nombre:** Nombre del cliente
   - **Empresa:** Restaurante o negocio
   - **Testimonio:** El texto del testimonio
   - **Iniciales para Avatar:** Ej: "MG" para María González
4. Click **"Publish"** → **"Publish now"**

Los avatares se generan automáticamente con las iniciales.

---

## ⚙️ Configuración del Sitio

Click en **"Configuración del Sitio"** → **"Información General"**

Aquí puedes cambiar:
- Título del Hero (portada)
- Subtítulo
- Descripción
- **Teléfono** (se actualiza en todo el sitio)
- **Email**
- Dirección
- Horarios
- Redes sociales (Facebook, Instagram, Twitter)

---

## 📸 Subiendo Imágenes

Cuando subes una imagen en cualquier campo:
1. Click en **"Choose an image"**
2. Arrastra tu imagen o click para buscar
3. La imagen se sube automáticamente
4. Se guarda en la carpeta `/images`

**Formatos recomendados:** JPG o PNG
**Tamaño sugerido:** Máximo 1MB (para carga rápida)

---

## ⏱️ Tiempo de Publicación

**Importante:** Cuando haces cambios, NO son instantáneos.

1. Haces el cambio en el panel
2. Click "Publish now"
3. **Espera 20-40 segundos**
4. Netlify reconstruye el sitio automáticamente
5. Refresca tu página → ¡Cambio visible!

---

## ⚠️ Cosas Importantes a Saber

### ✅ Puedes Editar:
- Productos (agregar, editar, eliminar)
- Precios
- Descripciones
- FAQ
- Testimonios
- Imágenes
- Teléfono, email, horarios
- Textos del hero/portada

### ❌ NO Puedes Editar (requiere código):
- Colores del sitio
- Estructura del diseño
- Estilos de botones
- Animaciones

---

## 🆘 Solución de Problemas

### "No puedo entrar al /admin"
→ Revisa que **hayas habilitado Netlify Identity** en tu dashboard

### "Los cambios no se ven"
→ Espera 30-60 segundos después de publicar
→ Refresca la página con Ctrl+F5 (fuerza actualización)

### "Olvidé mi contraseña"
→ Ve a `/admin` y click en "Forgot password"
→ Recibirás email para resetear

### "Quiero agregar otro administrador"
→ En Netlify dashboard → Identity → "Invite users"
→ Agrega el email de la persona

---

## 🎓 Tutorial Rápido (5 Minutos)

**Ejercicio práctico para aprender:**

1. Entra a `/admin`
2. Edita el precio de "Lechosa Premium" de $2.50 a $2.75
3. Click "Publish" y espera 30 segundos
4. Ve a tu sitio web → Verás el nuevo precio
5. ¡Ya sabes usar el CMS!

---

## 📞 ¿Necesitas Ayuda?

Si necesitas cambiar algo que no puedes editar desde el panel (como colores o diseño), tendrás que editar el código directamente o contactar a un desarrollador.

**Todo lo demás (productos, textos, fotos)** lo puedes hacer tú mismo desde el panel. 🎉
