const getDevServerUrl = (config) => {
  let protocol = 'http://';
  if (config.https) {
    protocol = 'https://'
  }
  return protocol + config.hostname + ':' + config.port + config.publicPath + 'build/';
}

module.exports = getDevServerUrl;