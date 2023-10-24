<# 全局使用pnpm管理node版本 #>
<# powerrshell管理员运行 #>
$env:PNPM_VERSION = "7.9.5"
iwr https://get.pnpm.io/install.ps1 -useb | iex
# 映射windows 192.168.10.33的7000端口到WS2的ip的7000端口：
# netsh interface portproxy add v4tov4 listenaddress=0.0.0.0 listenport=8992 connectaddress=172.29.128.242 connectport=8992
