const execShellCommand = require('./helpers/execShellCommand');
const path = require('path');
const checkFileExists = require('./helpers/checkFileExists');
const removeFileIfExists = require('./helpers/removeFileIfExists');
const { removeProcessConfig } = require('./helpers/handleProcessConfig');
const { PROCESS_FILE_NAME } = require('./helpers/constants');
const fs = require('fs').promises;

const package = async() => {
  const currentPath = process.cwd();
  const packageDirectory = path.basename(currentPath);

  console.log(`Packaging ${currentPath} for Wordpress`);

  const packageFile = `${packageDirectory}.zip`;
  const packageFilePath = path.join(currentPath, packageFile);

  await removeFileIfExists(packageFilePath);

  // Ensure we don't accidentally throw the plugin/theme into dev mode
  await removeProcessConfig();

  let env = '';

  // Cache the original .env file 
  const envPath = path.join(currentPath, '.env');
  if (await checkFileExists(envPath))  {
    console.log('Caching .env file');
    env = await fs.readFile(envPath);
  }

  const prodEnvPath = path.join(currentPath, '.env.production');
  if (await checkFileExists(prodEnvPath))  {
    console.log('Temporarily placing .env.production as .env');
    const prodEnv = await fs.readFile(prodEnvPath);
    await fs.writeFile(envPath, prodEnv);
  }

  console.log('Creating zip file')
  const exclusions = `-x "${PROCESS_FILE_NAME}" -x "*.git*" -x "node_modules/*" -x "*.ssh*" -x "*.DS_Store" -x "**/.DS_Store"`;
  await execShellCommand(`cd ${currentPath} && zip -r ${packageFile} . ${exclusions}`);

  if (env.length) {
    console.log('Replacing original .env file');
    await fs.writeFile(envPath, env);
  }
  
  console.log(`Created new packaged file for Wordpress deployment:\n ${packageFilePath}`)
};

module.exports = package;