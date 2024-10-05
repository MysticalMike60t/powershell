Write-Host "Starting Debloater..."
Set-ExecutionPolicy Unrestricted -Scope Process
Invoke-WebRequest "https://raw.githubusercontent.com/Raphire/Win11Debloat/refs/heads/master/Win11Debloat.ps1" | Invoke-Expression -RemoveApps -DisableBing -Silent
if ($?) {
    Write-Host "Debloated annoying Windows 11!!!"
    exit 1
}
else {
    Write-Host "Error debloating."
    exit 1
}