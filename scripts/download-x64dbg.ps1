$originalLocation = Get-Location
$url = "https://github.com/x64dbg/x64dbg/releases/download/snapshot/snapshot_2024-10-03_12-14.zip"
$fileName = "snapshot_2024-10-03_12-14.zip"

# Move to Downloads folder
Write-Host "Moving to Downloads folder for user: $([System.Environment]::UserName)"
Set-Location "$env:USERPROFILE\Downloads"

Write-Host "Downloading $fileName..."
Invoke-WebRequest "$url" -OutFile "$fileName"
Write-Host "Downloaded file."

if (Test-Path "$fileName") {
    Expand-Archive -Path $fileName -DestinationPath "x64dbg" -Force
    Set-Location ./x64dbg/release/x64
}
else {
    Write-Host "Error extracting contents of zip file."
    exit 1
}

if (Test-Path "x64dbg.exe") {
    Write-Host "Starting x64dbg.exe..."
    Start-Process "./x64dbg.exe"
}
else {
    Write-Host "x64dbg.exe does not exist."
    exit 1
}

Set-Location $originalLocation
Write-Host "Returned to original directory: $originalLocation"
exit 1