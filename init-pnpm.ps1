<# 全局使用pnpm管理node版本 #>
<# powerrshell管理员运行 #>
$env:PNPM_VERSION = "7.9.5"
iwr https://get.pnpm.io/install.ps1 -useb | iex
