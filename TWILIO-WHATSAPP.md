# Twilio WhatsApp (Plan B)

Meta te bloquea el panel, asi que usamos Twilio como puente.

## 1) Crear Sandbox en Twilio

- Crear cuenta: https://www.twilio.com/
- En Twilio Console buscar **WhatsApp Sandbox**
- Te van a dar:
  - Un numero WhatsApp de Twilio (ej: `whatsapp:+14155238886`)
  - Un codigo para enviar desde tu celu (ej: `join pizza-party`)

## 2) Variables de entorno

En `.env.local` agrega (opcional para usar OpenAI):

```bash
# OpenAI (opcional)
OPENAI_API_KEY=
OPENAI_MODEL=gpt-4.1-mini
```

Para este webhook no hace falta `TWILIO_ACCOUNT_SID`/`TWILIO_AUTH_TOKEN` porque respondemos con **TwiML**.

### Setup automatizado (Vercel + OpenAI)

Si queres que el agente lo haga paso a paso (setear env vars en Vercel, redeploy y test), corre:

```powershell
Set-Location "C:\Users\Arigo\OneDrive\Escritorio\web-dev\mlab-portfolio"
.\setup-openai-vercel.ps1
```

## 3) Endpoint del webhook

El webhook esta en:
- `POST /api/twilio/whatsapp`

Archivo:
- `src/app/api/twilio/whatsapp/route.ts`

## 4) Correr local

```bash
npm run dev
```

## 5) Exponer tu localhost (necesario)

Twilio necesita una URL publica para pegarle.

Opciones:
- Si ya tenes ngrok configurado: `ngrok http 3000` (o el puerto que use Next)
- Alternativa: publicar el webhook en Vercel temporalmente

Luego en Twilio Sandbox, en **WHEN A MESSAGE COMES IN**, pon:
- `https://TU_DOMINIO_PUBLICO/api/twilio/whatsapp`

## 6) Probar

- Desde tu WhatsApp envia `Hola`
- Deberia responder con un mensaje del asistente (y usa OpenAI si `OPENAI_API_KEY` esta seteada)

## Si el panel de Twilio no carga

Si `console.twilio.com` esta con problemas, igual podes validar que tu webhook funciona:

```powershell
Set-Location "C:\Users\Arigo\OneDrive\Escritorio\web-dev\mlab-portfolio"
.\test-twilio-webhook.ps1
```

Eso simula el POST de Twilio y deberias ver una respuesta XML (TwiML) con el mensaje.
