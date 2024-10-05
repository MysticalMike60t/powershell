﻿<#
.SYNOPSIS
    Installs the Salesforce CLI (sfdx).
.DESCRIPTION
    This PowerShell script downloads and installs the Salesforce CLI on Windows.
.EXAMPLE
    PS> ./install-salesforce-cli.ps1
    (The Salesforce CLI installer will be downloaded and run.)
.LINK
    https://github.com/fleschutz/PowerShell
.NOTES
    Author: Gavin R. McDavitt
#>

try {
    # Define the URL of the Salesforce CLI installer
    $url = "https://developer.salesforce.com/media/salesforce-cli/sf/channels/stable/sf-x64.exe"
    
    # Define the output path for the downloaded installer
    $output = "$env:USERPROFILE\Downloads\sfdx-windows-x64.exe"
    
    # Download the installer
    Invoke-WebRequest -Uri $url -OutFile $output

    # Run the installer
    Start-Process -FilePath $output -ArgumentList "/silent" -Wait
    
    # Verify the installation
    sfdx --version
    Write-Output "Salesforce CLI installed successfully."

    exit 0 # success
} catch {
    Write-Output "⚠️ Error in line $($_.InvocationInfo.ScriptLineNumber): $($Error[0])"
    exit 1
}