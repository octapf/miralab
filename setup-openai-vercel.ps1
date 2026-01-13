<#
Setup OpenAI env vars on Vercel and redeploy, then test Twilio webhook.

This script is intentionally step-by-step and chatty so it can be run
interactively while you follow along.

Requirements:
- Node.js + npx
- Access to your Vercel project

What it does:
1) Ensures Vercel CLI is available
2) Ensures you're logged into Vercel
3) Ensures the project is linked
4) Adds/updates OPENAI_API_KEY and OPENAI_MODEL on Vercel (Production + Preview)
5) Deploys to Production
6) Tests the webhook endpoint
#>

[CmdletBinding()]
param(
  [string]$ProjectPath,
  [string]$WebhookUrl = "https://www.miralab.ar/api/twilio/whatsapp",
  [string]$DefaultModel = "gpt-4.1-mini",
  [switch]$AlsoSetDevelopment
)

$ErrorActionPreference = 'Stop'

function Write-Step([string]$text) {
  Write-Host "\n==> $text" -ForegroundColor Cyan
}

function Require-Command([string]$name, [string]$hint) {
  if (-not (Get-Command $name -ErrorAction SilentlyContinue)) {
    throw "Missing command '$name'. $hint"
  }
}

function Read-SecretPlain([string]$prompt) {
  $secure = Read-Host -AsSecureString $prompt
  $bstr = [Runtime.InteropServices.Marshal]::SecureStringToBSTR($secure)
  try {
    return [Runtime.InteropServices.Marshal]::PtrToStringBSTR($bstr)
  } finally {
    if ($bstr -ne [IntPtr]::Zero) {
      [Runtime.InteropServices.Marshal]::ZeroFreeBSTR($bstr)
    }
  }
}

function Add-VercelEnv([string]$name, [string]$value, [string]$target) {
  # Vercel CLI reads the value from stdin when not running as TTY.
  # We use echo/pipeline to avoid interactive paste prompts.
  Write-Host "Setting $name ($target)…" -ForegroundColor DarkGray
  $value | npx --yes vercel env add $name $target --force | Out-Host
}

Write-Step "1) Checking prerequisites"
Require-Command node "Install Node.js (LTS) and reopen the terminal."
Require-Command npx "Install Node.js (LTS) and reopen the terminal."

Write-Host "Node: $(node --version)" -ForegroundColor DarkGray

Write-Step "2) Switching to project folder"
if (-not $ProjectPath) {
  # Default to the folder where this script lives (so you can run it from anywhere)
  $ProjectPath = $PSScriptRoot
}
if (-not (Test-Path $ProjectPath)) {
  throw "ProjectPath not found: $ProjectPath"
}
Set-Location $ProjectPath
Write-Host "CWD: $((Get-Location).Path)" -ForegroundColor DarkGray

Write-Step "3) Ensuring Vercel CLI works"
# This will download/run Vercel CLI via npx.
$npxVercelVersion = (npx --yes vercel --version)
Write-Host "Vercel CLI: $npxVercelVersion" -ForegroundColor DarkGray

Write-Step "4) Ensuring you're logged into Vercel"
try {
  $who = (npx --yes vercel whoami) 2>$null
  if ($who) {
    Write-Host "Logged in as: $who" -ForegroundColor Green
  } else {
    throw "not logged"
  }
} catch {
  Write-Host "Not logged in. Starting 'vercel login'…" -ForegroundColor Yellow
  Write-Host "Follow the browser flow, then come back here." -ForegroundColor Yellow
  npx --yes vercel login | Out-Host
  $who2 = (npx --yes vercel whoami)
  Write-Host "Logged in as: $who2" -ForegroundColor Green
}

Write-Step "5) Ensuring the project is linked"
# If already linked, this is quick. If not, Vercel may prompt for scope/project.
# We keep it interactive because accounts differ.
try {
  npx --yes vercel project ls | Out-Null
} catch {
  # ignore; some CLI versions behave differently
}

if (-not (Test-Path ".vercel\project.json")) {
  Write-Host "Project is not linked yet (.vercel/project.json not found)." -ForegroundColor Yellow
  Write-Host "Running 'vercel link'…" -ForegroundColor Yellow
  npx --yes vercel link | Out-Host
  if (-not (Test-Path ".vercel\\project.json")) {
    throw (
      "Vercel link did not create .vercel/project.json. " +
      "Run this script from the project folder (mlab-portfolio) or rerun with -ProjectPath pointing to it."
    )
  }
} else {
  Write-Host "Project already linked (.vercel/project.json found)." -ForegroundColor Green
}

Write-Step "6) Collecting OpenAI settings"
$openaiKey = Read-SecretPlain "Paste OPENAI_API_KEY (input hidden)"
if (-not $openaiKey -or $openaiKey.Trim().Length -lt 10) {
  throw "OPENAI_API_KEY looks empty/too short. Aborting."
}

$model = Read-Host "OPENAI_MODEL (Enter for default: $DefaultModel)"
if (-not $model) { $model = $DefaultModel }

Write-Host "Will set OPENAI_MODEL=$model" -ForegroundColor DarkGray

Write-Step "7) Setting Vercel Environment Variables"
Add-VercelEnv "OPENAI_API_KEY" $openaiKey "production"
Add-VercelEnv "OPENAI_MODEL" $model "production"
Add-VercelEnv "OPENAI_API_KEY" $openaiKey "preview"
Add-VercelEnv "OPENAI_MODEL" $model "preview"

if ($AlsoSetDevelopment) {
  Add-VercelEnv "OPENAI_API_KEY" $openaiKey "development"
  Add-VercelEnv "OPENAI_MODEL" $model "development"
}

Write-Step "8) Deploying to Production"
Write-Host "This creates a new production deployment so env vars take effect." -ForegroundColor DarkGray
npx --yes vercel --prod | Out-Host

Write-Step "9) Testing the webhook"
if (Test-Path ".\test-twilio-webhook.ps1") {
  $env:TWILIO_WEBHOOK_URL = $WebhookUrl
  $env:TWILIO_TEST_BODY = "Hola"
  $env:TWILIO_TEST_FROM = "whatsapp:+5491112345678"
  .\test-twilio-webhook.ps1 | Out-Host
  Write-Host "If the reply sounds more 'AI-like', OpenAI is active." -ForegroundColor Green
} else {
  Write-Host "test-twilio-webhook.ps1 not found; skipping local test." -ForegroundColor Yellow
  Write-Host "You can test via WhatsApp: send 'Hola' to the Twilio Sandbox number." -ForegroundColor Yellow
}

Write-Step "Done"
Write-Host "Next: In WhatsApp, try sending a non-greeting message too. If you want AI for ALL messages, tell me and I'll adjust the route." -ForegroundColor Green
