$originalLocation = Get-Location

# Move to Downloads folder
Write-Host "Moving to Downloads folder for user: $([System.Environment]::UserName)"
Set-Location "$env:USERPROFILE\Downloads"

Write-Host "Downloading wkhtmltox-0.12.6-1.msvc2015-win64.exe..."
Invoke-WebRequest "https://github.com/wkhtmltopdf/packaging/releases/download/0.12.6-1/wkhtmltox-0.12.6-1.msvc2015-win64.exe" -OutFile "wkhtmltox-0.12.6-1.msvc2015-win64.exe"

if (Test-Path "wkhtmltox-0.12.6-1.msvc2015-win64.exe") {
    Write-Host "Starting wkhtmltox-0.12.6-1.msvc2015-win64.exe..."
    Start-Process "./wkhtmltox-0.12.6-1.msvc2015-win64.exe"
}
else {
    Write-Host "wkhtmltox-0.12.6-1.msvc2015-win64.exe does not exist."
    exit 1
}

Set-Location $originalLocation
Write-Host "Returned to original directory: $originalLocation"
exit 1