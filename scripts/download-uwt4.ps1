$originalLocation = Get-Location

Write-Host "Moving to Downloads folder for user: $([System.Environment]::UserName)"
Set-Location "$env:USERPROFILE\Downloads"

Write-Host "Downloading UWT4.zip..."
Invoke-WebRequest "https://thewindowsclub.com/downloads/UWT4.zip" -OutFile "UWT4.zip"

if (Test-Path "UWT4.zip") {
    Write-Host "Extracting UWT4..."
    Expand-Archive -Path "UWT4.zip" -DestinationPath "UWT4" -Force

    if ($?) {
        Write-Host "UWT4 Extracted successfully."
    } else {
        Write-Host "Error occurred while extracting UWT4."
        exit 1
    }
} else {
    Write-Host "UWT4.zip was not downloaded."
    exit 1
}

if (Test-Path "UWT4") {
    Write-Host "Starting UWT4..."
    Set-Location "./UWT4/Ultimate Windows Tweaker 4.8"
    Start-Process "./Ultimate Windows Tweaker 4.8.exe"
} else {
    Write-Host "UWT4 folder does not exist."
    exit 1
}

Set-Location $originalLocation
Write-Host "Returned to original directory: $originalLocation"
exit 1