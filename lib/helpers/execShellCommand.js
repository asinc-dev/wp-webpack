/**
 * Executes a shell command and return it as a Promise.
 * @param cmd {string}
 * @return {Promise<string>}
 */
 const execShellCommand = (cmd) => {
  const { exec } = require('child_process');
  return new Promise((resolve, reject) => {
    exec(cmd, (error, stdout, stderr) => {
      if (error || stderr) {
        return reject(error || stderr)
      }
      return resolve(stdout);
    });
  });
}

module.exports = execShellCommand;