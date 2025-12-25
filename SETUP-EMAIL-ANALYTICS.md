# 📧 Configuración de Email y Analytics - Miralab

## 🔑 Configurar Resend (Emails)

### 1. Crear cuenta en Resend
1. Ve a [resend.com](https://resend.com)
2. Regístrate gratis (100 emails/día)
3. Verifica tu email

### 2. Obtener API Key
1. Dashboard → [API Keys](https://resend.com/api-keys)
2. Click **"Create API Key"**
3. Nombre: `Miralab Production`
4. Copiar la clave (empieza con `re_`)

### 3. Configurar en Vercel
```bash
# Desde tu terminal:
vercel env add RESEND_API_KEY
# Pegar la API key cuando te lo pida
# Seleccionar: Production, Preview, Development
```

O desde el dashboard:
1. [vercel.com/dashboard](https://vercel.com/dashboard)
2. Tu proyecto → **Settings** → **Environment Variables**
3. Agregar:
   - **Name**: `RESEND_API_KEY`
   - **Value**: Tu API key de Resend
   - **Environments**: Production, Preview, Development

### 4. Configurar dominio (Opcional pero recomendado)
Para no usar `onboarding@resend.dev`:
1. Resend Dashboard → **Domains**
2. **Add Domain** → `frangipani.dev` o `miralab.ar`
3. Agregar registros DNS en Hostinger:
   ```
   Tipo: TXT
   Nombre: @
   Valor: (el que te dé Resend)
   
   Tipo: MX
   Nombre: @
   Valor: feedback-smtp.us-east-1.amazonses.com
   Prioridad: 10
   ```
4. En `src/app/api/contact/route.ts` cambiar:
   ```ts
   from: 'Miralab <contacto@tudominio.com>'
   ```

---

## 📊 Configurar Google Analytics

### 1. Crear propiedad GA4
1. [analytics.google.com](https://analytics.google.com)
2. **Admin** → **Create Property**
3. Nombre: `Miralab`
4. Timezone: Argentina
5. Click **Next** → **Create**

### 2. Obtener Measurement ID
1. **Admin** → **Data Streams**
2. **Add stream** → **Web**
3. URL: `https://www.miralab.ar`
4. Copiar el **Measurement ID** (formato: `G-XXXXXXXXXX`)

### 3. Configurar en Vercel
```bash
vercel env add NEXT_PUBLIC_GA_ID
# Pegar el Measurement ID
```

O desde dashboard:
- **Name**: `NEXT_PUBLIC_GA_ID`
- **Value**: Tu Measurement ID
- **Environments**: Production, Preview, Development

---

## 🚀 Redeployar

Después de configurar las variables:
```bash
vercel --prod
```

O hacer push a GitHub (auto-deploy):
```bash
git push
```

---

## ✅ Verificar funcionamiento

### Emails:
1. Envía un mensaje de prueba desde el formulario
2. Revisa `hola@miralab.ar`
3. Verifica en Resend Dashboard → **Logs**

### Analytics:
1. Visita tu sitio
2. Google Analytics → **Reports** → **Realtime**
3. Deberías ver tu visita en tiempo real

---

## 📧 Cambiar email destino

Editar `src/app/api/contact/route.ts` línea 21:
```ts
to: ['tu-nuevo-email@gmail.com'],
```

Luego:
```bash
git add .
git commit -m "Actualizar email de contacto"
git push
```

---

## 🎯 Límites gratuitos

- **Resend**: 100 emails/día, 3,000/mes
- **Google Analytics**: Ilimitado
- **Vercel**: 100 GB bandwidth/mes

Todo gratis para tu landing page! 🎉
