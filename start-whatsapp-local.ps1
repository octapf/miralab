# Start WhatsApp webhook locally + expose via ngrok (Windows PowerShell)
# - Starts Next.js dev server (localhost:3000)
# - Starts ngrok tunnel (https)
# - Prints the public webhook URL for Meta: https://<ngrok>/api/whatsapp
#
# Requirements:
# - Node.js + npm
# - ngrok installed and authenticated (ngrok config add-authtoken ...)
#
# Usage:
#   .\start-whatsapp-local.ps1
# Optional env vars:
#   $env:WHATSAPP_VERIFY_TOKEN = "..."  (used to create .env.local template if missing)
#   $env:NGROK_REGION = "us"|"eu"|... (optional)

$ErrorActionPreference = "Stop"

# Try to keep console output consistent (avoid mojibake on some Windows shells)
try {
  [Console]::OutputEncoding = [System.Text.UTF8Encoding]::new()
  $OutputEncoding = [System.Text.UTF8Encoding]::new()
} catch {
  # ignore
}

function Test-Command([string]$Name) {
  return [bool](Get-Command $Name -ErrorAction SilentlyContinue)
}

function Ensure-Ngrok {
  if (Test-Command "ngrok") { return }

  Write-Host "No encuentro 'ngrok'. Intentando instalar..." -ForegroundColor Yellow

  if (Test-Command "winget") {
    try {
      winget install --id Ngrok.Ngrok -e --source winget
    } catch {
      # ignore; we'll re-check below
    }
  } elseif (Test-Command "choco") {
    try {
      choco install ngrok -y
    } catch {
      # ignore; we'll re-check below
    }
  }

  # Winget/choco may update PATH, but the current PowerShell session won't see it until refreshed.
  try {
    $machinePath = [Environment]::GetEnvironmentVariable('Path', 'Machine')
    $userPath = [Environment]::GetEnvironmentVariable('Path', 'User')
    if ($machinePath -and $userPath) {
      $env:Path = "$machinePath;$userPath"
    } elseif ($machinePath) {
      $env:Path = $machinePath
    } elseif ($userPath) {
      $env:Path = $userPath
    }
  } catch {
    # ignore
  }

  if (-not (Test-Command "ngrok")) {
    throw "No se pudo encontrar 'ngrok' despues de instalar. Cerra y re-abrí PowerShell, o ejecuta: winget install Ngrok.Ngrok"
  }
}

function Ensure-EnvLocal {
  if (Test-Path ".env.local") { return }

  $token = $env:WHATSAPP_VERIFY_TOKEN
  if (-not $token) { $token = "CHANGE_ME_VERIFY_TOKEN" }

  @(
    "# WhatsApp Cloud API webhook env",
    "WHATSAPP_VERIFY_TOKEN=$token",
    "",
    "# Needed to reply (outbound)",
    "WHATSAPP_ACCESS_TOKEN=",
    "WHATSAPP_PHONE_NUMBER_ID=",
    "",
    "# Optional: enable to avoid outbound calls while you set tokens",
    "# WHATSAPP_DRY_RUN=1",
    ""
  ) | Out-File -Encoding utf8 -FilePath ".env.local"

  Write-Host "Creé .env.local (template). Editalo si hace falta." -ForegroundColor Yellow
}

function Test-LocalUrl([string]$Url) {
  try {
    Invoke-WebRequest -Uri $Url -Method Get -TimeoutSec 2 | Out-Null
    return $true
  } catch {
    return $false
  }
}

function Detect-NextDevPort {
  # Try to detect an already running Next.js dev server by probing /api/whatsapp.
  # Returns port number or $null.
  foreach ($p in 3000..3010) {
    $u = "http://127.0.0.1:$p/api/whatsapp"
    if (Test-LocalUrl $u) { return $p }
  }
  return $null
}

function Get-NextDevProcessesForProject {
  # Detect `next dev` processes for *this* project by scanning node.exe command lines.
  # Returns an array of objects: { Pid, CommandLine, Port }
  $projectPath = ($PWD.Path).TrimEnd('\\')
  $escaped = [regex]::Escape($projectPath)

  $procs = @()
  try {
    $all = Get-CimInstance Win32_Process -Filter "Name='node.exe'" -ErrorAction SilentlyContinue
  } catch {
    $all = @()
  }

  foreach ($p in $all) {
    $cmd = "$($p.CommandLine)"
    if (-not $cmd) { continue }
    if ($cmd -notmatch '(?i)\\bnext\\b\s+dev') { continue }

    # Must reference this project folder somewhere in the command line.
    if ($cmd -notmatch $escaped) { continue }

    $port = $null
    $m1 = [regex]::Match($cmd, '(?i)(?:--port|-p)\s+(\d{2,5})')
    if ($m1.Success) {
      $port = [int]$m1.Groups[1].Value
    }

    $procs += [pscustomobject]@{
      Pid = [int]$p.ProcessId
      CommandLine = $cmd
      Port = $port
    }
  }

  return $procs
}

function Stop-NextDevProcesses([array]$Processes) {
  foreach ($p in $Processes) {
    try {
      Write-Host "Stopping next dev process PID=$($p.Pid)..." -ForegroundColor Yellow
      Stop-Process -Id $p.Pid -Force -ErrorAction SilentlyContinue
    } catch {
      # ignore
    }
  }
}

function Get-FreePort([int]$StartPort = 3000) {
  for ($p = $StartPort; $p -le ($StartPort + 50); $p++) {
    try {
      $listener = [System.Net.Sockets.TcpListener]::new([System.Net.IPAddress]::Loopback, $p)
      $listener.Start()
      $listener.Stop()
      return $p
    } catch {
      # try next
    }
  }
  throw "No free port found in range ${StartPort}-${StartPort+50}."
}

function Get-NgrokConfigPaths {
  $paths = @()
  if ($env:LOCALAPPDATA) {
    $paths += (Join-Path $env:LOCALAPPDATA "ngrok\ngrok.yml")
  }
  if ($env:USERPROFILE) {
    $paths += (Join-Path $env:USERPROFILE ".config\ngrok\ngrok.yml")
  }
  return $paths | Select-Object -Unique
}

function Has-NgrokAuthtoken {
  foreach ($p in (Get-NgrokConfigPaths)) {
    if (Test-Path $p) {
      try {
        $raw = Get-Content -Path $p -Raw -ErrorAction SilentlyContinue
        if ($raw -match '(?m)^\s*authtoken\s*:\s*\S+') { return $true }
      } catch {
        # ignore
      }
    }
  }
  return $false
}

function Ensure-NgrokAuthtoken {
  if (Has-NgrokAuthtoken) { return }

  Write-Host "" 
  Write-Host "ngrok needs an authtoken (you can sign in with Google in the browser)." -ForegroundColor Yellow
  Write-Host "Opening ngrok dashboard page to copy your authtoken..." -ForegroundColor Yellow

  $url = "https://dashboard.ngrok.com/get-started/your-authtoken"
  try {
    Start-Process $url | Out-Null
  } catch {
    # ignore
  }

  # Non-interactive flow for agent execution:
  # - Prefer env var NGROK_AUTHTOKEN
  # - Else, ask user to paste token into a file and wait
  $tokenFile = Join-Path $PWD ".ngrok-authtoken.txt"
  if (-not (Test-Path $tokenFile)) {
    @(
      "# Paste your ngrok authtoken on the next line (ONLY the token).",
      "",
      ""
    ) | Out-File -Encoding utf8 -FilePath $tokenFile
  }

  Write-Host "" 
  Write-Host "To continue, provide the authtoken in ONE of these ways:" -ForegroundColor Yellow
  Write-Host "  A) Set env var NGROK_AUTHTOKEN" -ForegroundColor Yellow
  Write-Host "  B) Paste it into: $tokenFile" -ForegroundColor Yellow

  $maxWait = $env:NGROK_TOKEN_WAIT_SECONDS
  if (-not $maxWait) { $maxWait = 600 }
  try { $maxWait = [int]$maxWait } catch { $maxWait = 600 }

  $deadline = (Get-Date).AddSeconds($maxWait)
  $token = $null

  while ((Get-Date) -lt $deadline) {
    $token = $env:NGROK_AUTHTOKEN
    if ($token -and $token.Trim()) { break }

    try {
      if (Test-Path $tokenFile) {
        $lines = Get-Content -Path $tokenFile -ErrorAction SilentlyContinue
        foreach ($l in $lines) {
          $t = $l
          if ($null -eq $t) { $t = '' }
          $t = $t.Trim()
          if (-not $t) { continue }
          if ($t.StartsWith('#')) { continue }
          $token = $t
          break
        }
      }
    } catch {
      # ignore
    }

    if ($token -and $token.Trim()) { break }
    Start-Sleep -Seconds 2
  }

  if (-not $token -or -not $token.Trim()) {
    throw "Timed out waiting for ngrok authtoken. Paste it into .ngrok-authtoken.txt or set NGROK_AUTHTOKEN, then re-run."
  }

  # Configure ngrok for this user profile (do not echo token)
  ngrok config add-authtoken $token | Out-Null

  if (-not (Has-NgrokAuthtoken)) {
    throw "ngrok authtoken was not detected after configuration. Try again or check ngrok config path." 
  }
}

function Get-NgrokPublicUrl {
  # ngrok local API is typically available on 127.0.0.1:4040
  try {
    $resp = Invoke-RestMethod -Method Get -Uri "http://127.0.0.1:4040/api/tunnels" -TimeoutSec 2
  } catch {
    return $null
  }

  if (-not $resp -or -not $resp.tunnels) { return $null }

  # prefer https tunnel
  $https = $resp.tunnels | Where-Object { $_.public_url -like "https://*" } | Select-Object -First 1
  if ($https) { return $https.public_url }

  $any = $resp.tunnels | Select-Object -First 1
  if ($any) { return $any.public_url }

  return $null
}

function Start-NgrokAndDetectPublicUrl([string]$NgrokArgs) {
  # Start ngrok in the background and parse the public URL from its stdout.
  $stamp = Get-Date -Format "yyyyMMdd-HHmmss"

  $logDir = Join-Path $PWD ".ngrok-logs"
  if (-not (Test-Path $logDir)) {
    New-Item -ItemType Directory -Path $logDir | Out-Null
  }

  $logPath = Join-Path $logDir "ngrok-$stamp.out.log"
  $errPath = Join-Path $logDir "ngrok-$stamp.err.log"

  # Force ngrok to emit logs we can parse
  $NgrokArgs = "$NgrokArgs --log=stdout --log-format=logfmt"

  $proc = Start-Process -FilePath "ngrok" -ArgumentList $NgrokArgs -PassThru -RedirectStandardOutput $logPath -RedirectStandardError $errPath -WindowStyle Minimized

  $regex = '(https://[a-zA-Z0-9.-]+\.(ngrok-free\.app|ngrok\.io|ngrok\.app))'
  $deadline = (Get-Date).AddSeconds(60)
  $publicUrl = $null
  $authError = $false

  while ((Get-Date) -lt $deadline) {
    try {
      $textOut = $null
      $textErr = $null
      if (Test-Path $logPath) { $textOut = Get-Content -Path $logPath -Raw -ErrorAction SilentlyContinue }
      if (Test-Path $errPath) { $textErr = Get-Content -Path $errPath -Raw -ErrorAction SilentlyContinue }

      $combined = "${textOut}`n${textErr}"
      if ($combined) {
        if ($combined -match 'ERR_NGROK_4018' -or $combined -match 'authtoken') {
          $authError = $true
        }

        $m = [regex]::Match($combined, $regex)
        if ($m.Success) {
          $publicUrl = $m.Groups[1].Value
          break
        }
      }
    } catch {
      # ignore and retry
    }
    Start-Sleep -Milliseconds 500
  }

  return [pscustomobject]@{ Process = $proc; PublicUrl = $publicUrl; LogPath = $logPath; ErrorLogPath = $errPath; AuthError = $authError }
}

Write-Host "=== WhatsApp Local + ngrok ===" -ForegroundColor Cyan
Write-Host "Proyecto: $PWD" -ForegroundColor DarkGray

if (-not (Test-Command "npm")) {
  throw "No encuentro 'npm'. Instalá Node.js y reintentá."
}

Ensure-Ngrok

# Ensure dependencies
if (-Not (Test-Path "node_modules")) {
  Write-Host "Instalando dependencias (npm install)..." -ForegroundColor Yellow
  npm install
}

Ensure-EnvLocal

# If Next.js dev is already running, reuse it to avoid the .next/dev/lock error.
$existingPort = Detect-NextDevPort
$nextDevProcs = Get-NextDevProcessesForProject
$devLockPath = Join-Path $PWD ".next\dev\lock"
$hasLock = Test-Path $devLockPath

$serverPort = $null
if ($existingPort) {
  $serverPort = $existingPort
  Write-Host "Detected Next.js already running on port $serverPort. Reusing it." -ForegroundColor Yellow
} elseif ($nextDevProcs -and $nextDevProcs.Count -gt 0) {
  # Reuse detected next dev process even if the HTTP probe didn't succeed yet.
  $picked = $nextDevProcs | Select-Object -First 1
  $serverPort = $picked.Port
  if (-not $serverPort) {
    # Best-effort fallback: if no port flag was found, Next defaults to 3000 and then increments.
    # We'll probe again briefly, else assume 3000.
    Start-Sleep -Seconds 2
    $serverPort = (Detect-NextDevPort)
    if (-not $serverPort) { $serverPort = 3000 }
  }
  Write-Host "Detected an existing next dev process (PID=$($picked.Pid)). Reusing port $serverPort." -ForegroundColor Yellow
} elseif ($hasLock) {
  Write-Host "Found .next/dev/lock but could not detect a responsive server." -ForegroundColor Yellow

  # Try to resolve automatically by stopping this project's next dev processes (optional).
  $autoKillValue = $env:AUTO_KILL_NEXT_DEV
  if (-not $autoKillValue) { $autoKillValue = '' }
  $autoKill = ($autoKillValue.ToLower() -eq '1')
  if ($nextDevProcs -and $nextDevProcs.Count -gt 0) {
    if ($autoKill) {
      Stop-NextDevProcesses -Processes $nextDevProcs
    } else {
      Write-Host "I can stop the existing next dev process automatically." -ForegroundColor Yellow
      Write-Host "Re-run with AUTO_KILL_NEXT_DEV=1 to auto-stop it." -ForegroundColor Yellow
      Write-Host "Example: $env:AUTO_KILL_NEXT_DEV=1; powershell -ExecutionPolicy Bypass -File .\start-whatsapp-local.ps1" -ForegroundColor DarkGray
      exit 1
    }
  }

  # Clean up stale lock if present
  try {
    if (Test-Path $devLockPath) {
      Remove-Item -Force $devLockPath -ErrorAction SilentlyContinue
    }
  } catch {
    # ignore
  }

  $serverPort = Get-FreePort -StartPort 3000
  Write-Host "Starting Next.js on port $serverPort..." -ForegroundColor Green
  $nextCmd = "Set-Location `"$PWD`"; npm run dev -- -p $serverPort"
  Start-Process -FilePath "powershell" -ArgumentList "-NoExit", "-Command", $nextCmd | Out-Null
  Start-Sleep -Seconds 2
} else {
  $serverPort = Get-FreePort -StartPort 3000
  Write-Host "Starting Next.js on port $serverPort..." -ForegroundColor Green
  $nextCmd = "Set-Location `"$PWD`"; npm run dev -- -p $serverPort"
  Start-Process -FilePath "powershell" -ArgumentList "-NoExit", "-Command", $nextCmd | Out-Null
  Start-Sleep -Seconds 2
}

# Start ngrok in a separate PowerShell window
Write-Host "Starting ngrok (https -> localhost:$serverPort)..." -ForegroundColor Green
$region = $env:NGROK_REGION
if ($region) {
  $ngrokArgs = "http $serverPort --region=$region"
} else {
  $ngrokArgs = "http $serverPort"
}

# Try local API first (fast if available)
Write-Host "Waiting for ngrok public URL..." -ForegroundColor Yellow
$publicUrl = Get-NgrokPublicUrl
$ngrokInfo = $null

if (-not $publicUrl) {
  $ngrokInfo = Start-NgrokAndDetectPublicUrl -NgrokArgs $ngrokArgs
  $publicUrl = $ngrokInfo.PublicUrl
}

# If ngrok failed due to missing authtoken, guide + configure, then retry once.
if (-not $publicUrl -and $ngrokInfo -and $ngrokInfo.AuthError) {
  Ensure-NgrokAuthtoken

  Write-Host "Retrying ngrok after authtoken setup..." -ForegroundColor Yellow
  $publicUrl = Get-NgrokPublicUrl
  $ngrokInfo = $null
  if (-not $publicUrl) {
    $ngrokInfo = Start-NgrokAndDetectPublicUrl -NgrokArgs $ngrokArgs
    $publicUrl = $ngrokInfo.PublicUrl
  }
}

Write-Host "" 
Write-Host "Webhook local:" -ForegroundColor Cyan
Write-Host "  http://localhost:$serverPort/api/whatsapp" -ForegroundColor White

if ($publicUrl) {
  $callback = "$publicUrl/api/whatsapp"
  Write-Host "" 
  Write-Host "Webhook público (pegalo en Meta):" -ForegroundColor Cyan
  Write-Host "  $callback" -ForegroundColor White
  Write-Host "" 
  Write-Host "Verify token (from .env.local):" -ForegroundColor DarkGray
  $line = (Select-String -Path .env.local -Pattern '^WHATSAPP_VERIFY_TOKEN=' | Select-Object -First 1)
  if ($line) {
    Write-Host "  $($line.Line)" -ForegroundColor DarkGray
  }
} else {
  Write-Host "" 
  Write-Host "No pude detectar la URL publica automaticamente." -ForegroundColor Yellow
  if ($ngrokInfo -and $ngrokInfo.LogPath) {
    Write-Host "Log de ngrok: $($ngrokInfo.LogPath)" -ForegroundColor Yellow
    if ($ngrokInfo.ErrorLogPath) {
      Write-Host "Errores ngrok: $($ngrokInfo.ErrorLogPath)" -ForegroundColor Yellow
    }
  }
  if ($ngrokInfo -and $ngrokInfo.AuthError) {
    Write-Host "" 
    Write-Host "ngrok requiere cuenta verificada + authtoken (ERR_NGROK_4018)." -ForegroundColor Yellow
    Write-Host "Siguiente paso:" -ForegroundColor Yellow
    Write-Host "  1) Crea/verifica cuenta: https://dashboard.ngrok.com/signup" -ForegroundColor Yellow
    Write-Host "  2) Copia tu authtoken:  https://dashboard.ngrok.com/get-started/your-authtoken" -ForegroundColor Yellow
    Write-Host "  3) En PowerShell corre: ngrok config add-authtoken TU_TOKEN" -ForegroundColor Yellow
    Write-Host "  4) Re-ejecuta este script." -ForegroundColor Yellow
  } else {
    Write-Host "Si ngrok esta corriendo, copia la URL https y agrega /api/whatsapp." -ForegroundColor Yellow
  }
}

Write-Host "" 
Write-Host "Deja el servidor corriendo mientras pruebas." -ForegroundColor DarkGray
