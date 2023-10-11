const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const chalk = require('chalk');

function executeCommand(command, options) {
  return new Promise((resolve, reject) => {
    exec(command, options, (error, stdout, stderr) => {
      if (error) {
        reject(error);
      } else {
        resolve(stdout || stderr);
      }
    });
  });
}

async function runDevInSubdirectories(directory) {
  const files = await fs.promises.readdir(directory);

  const promises = files.map(async (file) => {
    const filePath = path.join(directory, file);
    const stats = await fs.promises.stat(filePath);

    if (stats.isDirectory()) {
      const packageJsonPath = path.join(filePath, 'package.json');

      try {
        await fs.promises.access(packageJsonPath, fs.constants.F_OK);
        console.log(chalk.green(`Running 'pnpm run dev' in: ${filePath}`));
        return executeCommand('pnpm run dev', { cwd: filePath });
      } catch (error) {
        // Handle error if package.json does not exist in the directory
        console.log(chalk.yellow(`Skipping directory: ${filePath}`));
      }
    }
  });

  await Promise.all(promises);
}

async function main() {
  const currentDirectory = process.cwd();
  console.log(chalk.blue(`Current Directory: ${currentDirectory}`));

  try {
    await runDevInSubdirectories(currentDirectory);
    console.log(chalk.green('Command execution initiated in all directories.'));
  } catch (error) {
    console.error(chalk.red(`Error occurred while processing directories: ${error}`));
  }
}

main();