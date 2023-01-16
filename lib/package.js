const execShellCommand = require('./helpers/execShellCommand');
const path = require('path');
const checkFileExists = require('./helpers/checkFileExists');
const fs = require('fs').promises;

const package = async() => {
  const currentPath = process.cwd();
  const packageDirectory = path.basename(currentPath);

  console.log(`Packaging ${currentPath} for Wordpress`);

  const packageFile = `${packageDirectory}.zip`;
  const packageFilePath = path.join(currentPath, packageFile);

  if (await checkFileExists(packageFilePath)) {
    await fs.unlink(packageFilePath);
  }

  // Cache the original .env file 
  // const envPath = path.join(currentPath, '.env.production');
  // if (await checkFileExists(envPath))  {

  const exclusions = '-x "*.git*" -x "node_modules/*" -x "*.ssh*" -x "*.DS_Store" -x "**/.DS_Store"';
  await execShellCommand(`cd ${currentPath} && zip -r ${packageFile} . ${exclusions}`);

  // const envPath = path.join(currentPath, '.env.production');
  // if (await checkFileExists(envPath))  {
  //   console.log('Adding production env file to package');
  //   await execShellCommand(`cd ${currentPath} && printf "@ .env.production\n@=.env\n" | zipnote -w ${packageFile}`);
  // }
  
  console.log(`Created new packaged file for Wordpress deployment:\n ${packageFilePath}`)
};

module.exports = package;