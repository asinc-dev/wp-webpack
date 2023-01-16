const path = require('path');
const env = require('dotenv').config();
const currentPath = process.cwd();
const currentFolder = path.basename(currentPath)
const prefix = currentFolder.toUpperCase().replace(/\-/g, '_');

/**
 * Retrieves the full env value by a suffix where the prefix
 * is the folder in `MACRO_CASE` resulting in:
 * `CURRENT_FOLDER_NAME_SUFFIX`
 * 
 * @param {String} suffix 
 * @param {String} defaultValue 
 * @returns 
 */
const getEnv = (suffix, defaultValue = '') => {
  return env?.parsed?.[`${prefix}_${suffix}`] ?? defaultValue
}

const getAllEnv = () => {
  const variables = {};
  for (const [key,value] of Object.entries(env?.parsed ?? {})) {
    const newKey = key.replace(`${prefix}_`, '');
    variables[newKey] = JSON.stringify(value);
  }

  return variables;
}

module.exports = {
  getEnv,
  getAllEnv
}