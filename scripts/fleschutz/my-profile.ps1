﻿# MY POWERSHELL PROFILE - it defines the look & feel of PowerShell.

# WINDOW TITLE
if ($IsLinux) { $username = $(whoami) } else { $username = $env:USERNAME }
$host.ui.RawUI.WindowTitle = "$username @ $(hostname)"

# GREETING
Write-Host "👋 Welcome $username to $(hostname)'s PowerShell (type 'hlp' for help)" -foregroundColor green

# PROMPT
function prompt { Write-Host "`n➤ " -noNewline -foregroundColor yellow; return " " }

# ALIASES
del alias:pwd -force -errorAction SilentlyContinue
set-alias -name hlp -value write-help.ps1
set-alias -name pwd -value list-workdir.ps1	# pwd = print working directory
set-alias -name ll -value get-childitem		# ll = list folder (long format)
del alias:ls -force -errorAction SilentlyContinue 
set-alias -name ls -value list-folder.ps1	# ls = list folder (short format)
