# Simula un webhook de Twilio WhatsApp contra el deploy de Vercel
# Uso:
#   .\test-twilio-webhook.ps1
# Opcional:
#   $env:TWILIO_WEBHOOK_URL="https://www.miralab.ar/api/twilio/whatsapp"
#   $env:TWILIO_TEST_FROM="whatsapp:+5491112345678"
#   $env:TWILIO_TEST_BODY="Hola"

$ErrorActionPreference = "Stop"

$webhook = $env:TWILIO_WEBHOOK_URL
if (-not $webhook) { $webhook = "https://www.miralab.ar/api/twilio/whatsapp" }

$from = $env:TWILIO_TEST_FROM
if (-not $from) { $from = "whatsapp:+5491112345678" }

$body = $env:TWILIO_TEST_BODY
if (-not $body) { $body = "Hola" }

Write-Host "POST $webhook" -ForegroundColor Cyan
Write-Host "From=$from" -ForegroundColor DarkGray
Write-Host "Body=$body" -ForegroundColor DarkGray

$encFrom = [uri]::EscapeDataString($from)
$encBody = [uri]::EscapeDataString($body)
$raw = "From=$encFrom&Body=$encBody"

$res = Invoke-WebRequest -UseBasicParsing -Method Post -Uri $webhook -ContentType "application/x-www-form-urlencoded" -Body $raw

Write-Host "Status: $($res.StatusCode)" -ForegroundColor Green
Write-Host "Content-Type: $($res.Headers['Content-Type'])" -ForegroundColor DarkGray
Write-Host "--- TwiML ---" -ForegroundColor Cyan
$res.Content
