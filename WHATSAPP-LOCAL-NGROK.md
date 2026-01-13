# WhatsApp webhook local con ngrok (Windows)

Objetivo: correr el webhook de WhatsApp **en tu PC** (Next.js en `localhost:3000`) y exponerlo con **ngrok** para que Meta pueda pegarle, sin depender de Vercel.

## 1) Variables de entorno (Next.js)

Creá un archivo `.env.local` en la raíz del proyecto con:

```bash
# Un string cualquiera (pero igual al que cargues en Meta)
WHATSAPP_VERIFY_TOKEN=mi_token_de_verificacion

# Necesarios para responder mensajes (outbound)
WHATSAPP_ACCESS_TOKEN=
WHATSAPP_PHONE_NUMBER_ID=

# Opcional: si todavía no tenés token/phone id, evitás errores y solo loguea
# WHATSAPP_DRY_RUN=1
```

Notas:
- Para que Meta valide el webhook, **solo** necesita `WHATSAPP_VERIFY_TOKEN`.
- Para que el bot responda en WhatsApp (botones/listas/texto), necesitás `WHATSAPP_ACCESS_TOKEN` y `WHATSAPP_PHONE_NUMBER_ID`.

## 2) Levantar Next.js en local

Si querés que el agente te lo deje andando con un comando (Next.js + ngrok + URL lista para pegar), usá:

```powershell
Set-Location "C:\Users\Arigo\OneDrive\Escritorio\web-dev\mlab-portfolio"
.\start-whatsapp-local.ps1
```

O manualmente:

En PowerShell:

```powershell
Set-Location "C:\Users\Arigo\OneDrive\Escritorio\web-dev\mlab-portfolio"
npm install
npm run dev
```

El webhook queda en:
- `http://localhost:3000/api/whatsapp`

## 3) Instalar ngrok

Opción A (winget):

```powershell
winget install Ngrok.Ngrok
```

Opción B (chocolatey):

```powershell
choco install ngrok
```

Después (solo la primera vez) asociá tu cuenta:

```powershell
ngrok config add-authtoken TU_NGROK_TOKEN
```

## 4) Exponer el puerto 3000

En otra terminal:

```powershell
ngrok http 3000
```

Ngrok te va a mostrar una URL HTTPS tipo:
- `https://xxxxx.ngrok-free.app`

Tu **Callback URL** para Meta es:
- `https://xxxxx.ngrok-free.app/api/whatsapp`

## 5) Configurar el webhook en Meta

En la pantalla de Webhooks (WhatsApp):
- Callback URL: `https://xxxxx.ngrok-free.app/api/whatsapp`
- Verify token: el mismo que pusiste en `WHATSAPP_VERIFY_TOKEN`

Meta va a pegar un GET de verificación con `hub.challenge`. Si está ok, responde 200.

## 6) Probar sin Meta (opcional)

Podés simular un POST con PowerShell (sirve para ver el parsing):

```powershell
$body = @{
  object = "whatsapp_business_account"
  entry = @(
    @{
      changes = @(
        @{
          value = @{
            messages = @(
              @{
                from = "5491112345678"
                type = "text"
                text = @{ body = "hola" }
              }
            )
          }
        }
      )
    }
  )
} | ConvertTo-Json -Depth 20

Invoke-RestMethod -Method Post -Uri "http://localhost:3000/api/whatsapp" -ContentType "application/json" -Body $body
```

## Qué se mejoró en el webhook

- Soporta mensajes `interactive` (click en botones/listas), no solo texto.
- `WHATSAPP_DRY_RUN=1` o falta de tokens: no rompe el handler, solo loguea.
