const { spawn } = require('child_process');
const chalk = require('chalk');

const subdirectories = ['main', 'subapp-demo'];

subdirectories.forEach((subdirectory) => {
  const childProcess = spawn('pnpm', ['run', 'dev'], { cwd: `./${subdirectory}` });

  childProcess.stdout.on('data', (data) => {
    console.log(chalk.green(`[${subdirectory}] ${data}`));
  });

  childProcess.stderr.on('data', (data) => {
    console.error(chalk.red(`[${subdirectory}] ${data}`));
  });

  childProcess.on('close', (code) => {
    console.log(chalk.yellow(`[${subdirectory}] Child process exited with code ${code}`));
  });
});