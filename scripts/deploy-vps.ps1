[CmdletBinding()]
param(
  [Parameter(Mandatory = $true)]
  [ValidateNotNullOrEmpty()]
  [string]$VpsHost,

  [ValidateNotNullOrEmpty()]
  [string]$VpsUser = "bl_ovh",

  [ValidateNotNullOrEmpty()]
  [string]$RemotePath = "/var/www/bastienlopez.fr"
)

$ErrorActionPreference = "Stop"
Set-StrictMode -Version Latest

if ($VpsHost -notmatch "^[A-Za-z0-9][A-Za-z0-9.-]*$") {
  throw "VpsHost must be a hostname or IPv4 address without whitespace or shell characters."
}

if ($VpsUser -notmatch "^[A-Za-z0-9._-]+$") {
  throw "VpsUser contains unsupported characters."
}

$normalizedRemotePath = $RemotePath.TrimEnd("/")
$safeRemotePathPattern = "^/var/www/[A-Za-z0-9._-]+(?:/[A-Za-z0-9._-]+)*$"
$protectedRemotePaths = @("/", "/var", "/var/www", "/var/www/html", "/home", "/root", "/tmp")

if ($normalizedRemotePath -notmatch $safeRemotePathPattern -or $protectedRemotePaths -contains $normalizedRemotePath) {
  throw "RemotePath must be a safe child directory under /var/www/: $RemotePath"
}

foreach ($commandName in @("npm", "ssh", "scp")) {
  if (-not (Get-Command $commandName -ErrorAction SilentlyContinue)) {
    throw "Required command not found: $commandName"
  }
}

$repoRoot = Split-Path -Parent $PSScriptRoot
$distPath = Join-Path $repoRoot "dist"
$sshTarget = "$VpsUser@$VpsHost"
$remoteTarget = "$sshTarget`:$normalizedRemotePath/"

Push-Location $repoRoot
try {
  Write-Host "[1/5] Installing dependencies with npm ci..."
  & npm ci
  if ($LASTEXITCODE -ne 0) {
    throw "npm ci failed with exit code $LASTEXITCODE."
  }

  Write-Host "[2/5] Running project checks..."
  & npm run check
  if ($LASTEXITCODE -ne 0) {
    throw "npm run check failed with exit code $LASTEXITCODE."
  }

  if (-not (Test-Path -LiteralPath $distPath -PathType Container)) {
    throw "Build output not found: $distPath"
  }

  $distItems = @(Get-ChildItem -LiteralPath $distPath -Force)
  if ($distItems.Count -eq 0) {
    throw "Build output is empty: $distPath"
  }

  Write-Host "[3/5] Clearing the remote deployment directory..."
  $clearRemoteCommand = "set -eu; mkdir -p '$normalizedRemotePath'; find '$normalizedRemotePath' -mindepth 1 -maxdepth 1 -exec rm -rf -- {} +"
  & ssh $sshTarget $clearRemoteCommand
  if ($LASTEXITCODE -ne 0) {
    throw "Remote directory cleanup failed with exit code $LASTEXITCODE."
  }

  Write-Host "[4/5] Uploading dist contents to $remoteTarget..."
  $sourcePaths = @($distItems | ForEach-Object { $_.FullName })
  & scp -r @sourcePaths $remoteTarget
  if ($LASTEXITCODE -ne 0) {
    throw "SCP upload failed with exit code $LASTEXITCODE."
  }

  Write-Host "[5/5] Applying permissions and verifying index.html..."
  $permissionsAndVerificationCommand = "set -eu; find '$normalizedRemotePath' -type d -exec chmod 755 {} +; find '$normalizedRemotePath' -type f -exec chmod 644 {} +; test -f '$normalizedRemotePath/index.html'"
  & ssh $sshTarget $permissionsAndVerificationCommand
  if ($LASTEXITCODE -ne 0) {
    throw "Remote permissions or index.html verification failed with exit code $LASTEXITCODE."
  }

  Write-Host "Deployment complete. Uploaded $($distItems.Count) item(s) from dist/ to $remoteTarget."
}
finally {
  Pop-Location
}
