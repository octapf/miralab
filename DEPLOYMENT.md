# Pasos para Publicar tu Aplicación en Vercel

## Método 1: Usando Vercel CLI (Línea de Comandos)

### Paso 1: Login en Vercel
```bash
vercel login
```
- Se abrirá tu navegador
- Elige tu método de login (GitHub, GitLab, Bitbucket, o Email)
- Sigue las instrucciones

### Paso 2: Desplegar
```bash
vercel
```
- Responde las preguntas:
  - **Set up and deploy?** → Yes
  - **Which scope?** → Elige tu cuenta
  - **Link to existing project?** → No
  - **What's your project's name?** → frangipani-it (o el nombre que quieras)
  - **In which directory is your code located?** → ./ (presiona Enter)
  - **Want to override the settings?** → No (presiona Enter)

### Paso 3: Desplegar a Producción
```bash
vercel --prod
```

Tu sitio estará en: `https://tu-proyecto.vercel.app`

---

## Método 2: Usando la Interfaz Web de Vercel (Más Fácil)

### Paso 1: Crear cuenta en Vercel
1. Ve a: https://vercel.com
2. Clic en "Sign Up"
3. Regístrate con GitHub, GitLab, o Email

### Paso 2: Subir tu Proyecto

**Opción A: Arrastra y Suelta (Sin Git)**
1. En el dashboard de Vercel, clic en "Add New" → "Project"
2. Clic en "Browse" o arrastra la carpeta del proyecto
3. Espera a que suba
4. Vercel detectará automáticamente Next.js
5. Clic en "Deploy"

**Opción B: Desde GitHub (Recomendado para actualizaciones automáticas)**
1. Primero instala Git: https://git-scm.com/download/win
2. Crea un repositorio en GitHub: https://github.com/new
3. Ejecuta en tu terminal:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/TU-USUARIO/TU-REPO.git
   git push -u origin main
   ```
4. En Vercel: "Add New" → "Project" → "Import Git Repository"
5. Selecciona tu repositorio
6. Clic en "Deploy"

---

## Variables de Entorno (Opcional)

Si quieres configurar el número de WhatsApp:

1. En Vercel Dashboard → Tu Proyecto → Settings → Environment Variables
2. Agrega:
   - Name: `NEXT_PUBLIC_WHATSAPP_NUMBER`
   - Value: `tu_numero_sin_espacios`
3. Redeploy

---

## Comandos Útiles

```bash
# Ver el estado del proyecto
vercel ls

# Ver los logs
vercel logs

# Ver dominios
vercel domains ls

# Agregar dominio personalizado
vercel domains add tu-dominio.com
```

---

## Dominio Personalizado (Opcional)

1. En Vercel Dashboard → Tu Proyecto → Settings → Domains
2. Agrega tu dominio
3. Configura los DNS según las instrucciones de Vercel

---

## Actualizaciones Futuras

Cada vez que hagas cambios:

**Con CLI:**
```bash
vercel --prod
```

**Con GitHub:**
Solo haz push y Vercel desplegará automáticamente:
```bash
git add .
git commit -m "Descripción del cambio"
git push
```

---

## Solución de Problemas

**Error de build:**
- Verifica que `npm run build` funcione localmente
- Revisa los logs en Vercel Dashboard

**Error 404:**
- Verifica que middleware.ts esté configurado correctamente
- Asegúrate de que las rutas dinámicas tengan `generateStaticParams()`

**Variables de entorno:**
- Recuerda que deben empezar con `NEXT_PUBLIC_` para estar disponibles en el cliente
- Redeploy después de agregar variables

---

Tu proyecto está listo para ser desplegado. ¡Buena suerte! 🚀
