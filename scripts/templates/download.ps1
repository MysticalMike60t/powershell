$originalLocation = Get-Location
$url = "URL"
$fileName = "FILE_NAME"

# Move to Downloads folder
Write-Host "Moving to Downloads folder for user: $([System.Environment]::UserName)"
Set-Location "$env:USERPROFILE\Downloads"

Write-Host "Downloading $fileName..."
Invoke-WebRequest "$url" -OutFile "$fileName"

if (Test-Path "$fileName") {
    Write-Host "Starting $fileName..."
    Start-Process "./$fileName"
}
else {
    Write-Host "$fileName does not exist."
    exit 1
}

Set-Location $originalLocation
Write-Host "Returned to original directory: $originalLocation"
exit 1