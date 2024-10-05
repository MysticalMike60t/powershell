﻿<#
.SYNOPSIS
	Checks the power status
.DESCRIPTION
	This PowerShell script queries the power status and prints it.
.EXAMPLE
	PS> ./check-power.ps1
	⚠️ Battery 9% only with 54min remaining (power scheme is 'HP Optimized') 
.LINK
	https://github.com/fleschutz/PowerShell
.NOTES
	Author: Markus Fleschutz | License: CC0
#>

try {
	if ($IsLinux) {
		$reply = "✅ AC powered" # TODO, just guessing :-)
	} else {
		Add-Type -Assembly System.Windows.Forms
		$details = [System.Windows.Forms.SystemInformation]::PowerStatus
		[int]$percent = 100 * $details.BatteryLifePercent
		[int]$remaining = $details.BatteryLifeRemaining / 60
		$powerScheme = (powercfg /getactivescheme)
		$powerScheme = $powerScheme -Replace "^(.*)  \(",""
		$powerScheme = $powerScheme -Replace "\)$",""
		if ($details.PowerLineStatus -eq "Online") {
			if ($details.BatteryChargeStatus -eq "NoSystemBattery") {
				$reply = "✅ AC powered"
			} elseif ($percent -ge 95) {
				$reply = "✅ Battery nearly full ($percent%, power scheme is '$powerScheme')"
			} else {
				$reply = "✅ Battery charging ($percent%, power scheme is '$powerScheme')"
			}
		} else { # must be offline
			if (($remaining -eq 0) -and ($percent -ge 60)) {
				$reply = "✅ Battery $percent% full (power scheme is '$powerScheme')"
			} elseif ($remaining -eq 0) {
				$reply = "✅ Battery at $percent% (power scheme is '$powerScheme')"
			} elseif ($remaining -le 5) {
				$reply = "⚠️ Battery $percent% ONLY $($remaining)min remaining (power scheme is '$powerScheme')"
			} elseif ($remaining -le 30) {
				$reply = "⚠️ Battery $percent% only $($remaining)min remaining (power scheme is '$powerScheme')"
			} elseif ($percent -lt 10) {
				$reply = "⚠️ Battery $percent% only with $($remaining)min remaining (power scheme is '$powerScheme') "
			} elseif ($percent -ge 90) {
				$reply = "✅ Battery $percent% full with $($remaining)min remaining (power scheme is '$powerScheme')"
			} else {
				$reply = "✅ Battery $percent% with $($remaining)min remaining (power scheme is '$powerScheme') "
			}
		}
	}
	Write-Host $reply
	exit 0 # success
} catch {
	"⚠️ Error in line $($_.InvocationInfo.ScriptLineNumber): $($Error[0])"
	exit 1
}