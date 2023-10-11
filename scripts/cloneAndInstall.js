const { execSync } = require('child_process');
const chalk = require('chalk');

// 克隆 qiankun-main 仓库
console.log(chalk.yellow('开始克隆 qiankun-main 仓库...'));
try {
  execSync('git clone https://github.com/yaolinhong/qiankun-main.git main');
  console.log(chalk.green('qiankun-main 仓库克隆成功！'));
  
  // 进入 main 目录并执行 pnpm install
  process.chdir('main');
  console.log(chalk.green('在 main 目录中执行 pnpm install ...'));
  execSync('pnpm install');
  console.log(chalk.green('在 main 目录中执行 pnpm install 成功！'));
} catch (error) {
  console.error(chalk.red('qiankun-main 仓库克隆或执行 pnpm install 失败:'), error);
}

// 克隆 qiankun-subapp-demo 仓库
console.log(chalk.yellow('开始克隆 qiankun-subapp-demo 仓库...'));
try {
  process.chdir('..'); // 返回上一级目录
  execSync('git clone https://github.com/yaolinhong/qiankun-subapp-demo.git subapp-demo');
  console.log(chalk.green('qiankun-subapp-demo 仓库克隆成功！'));
  
  // 进入 subapp-demo 目录并执行 pnpm install
  console.log(chalk.green('在 subapp-demo 目录中执行 pnpm install ...'));
  process.chdir('subapp-demo');
  execSync('pnpm install');
  console.log(chalk.green('在 subapp-demo 目录中执行 pnpm install 成功！'));
} catch (error) {
  console.error(chalk.red('qiankun-subapp-demo 仓库克隆或执行 pnpm install 失败:'), error);
}
