$url = "https://github.com/rustdesk/rustdesk/releases/download/1.3.8/rustdesk-1.3.8-x86_64.exe"

# Set download path
$downloadPath = "$env:TEMP\rustdesk-win.exe"

# Download RustDesk
Write-Host "Downloading RustDesk..."
Invoke-WebRequest -Uri $url -OutFile $downloadPath

# Install RustDesk silently
Write-Host "Installing RustDesk..."
Start-Process -FilePath $downloadPath -ArgumentList "/silent" -Wait

# Cleanup
Remove-Item -Path $downloadPath -Force

Write-Host "RustDesk installation completed."