Write-Host "Changing Security Settings..."

[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12

Write-Host "Changed Security Settings"

Write-Host "Executing Script..."
Write-Host "Credit: Massgravel | https://github.com/massgravel/Microsoft-Activation-Scripts"

Invoke-WebRequest "https://get.activated.win" | Invoke-Expression

if ($?) {
    Write-Host "Activation Completed"
}
else {
    Write-Host "Error occurred during activation."
    exit 1
}
