const WebpackDevServer = require('webpack-dev-server');
const webpack = require('webpack');
const getConfig = require('./helpers/getConfig');

const serve = () => {

  const config = getConfig();

  const webpackOptions = {
    ...config,
    mode: 'development'
  };

  const webpackConfig = require('./webpack-config')(webpackOptions);

  const server = new WebpackDevServer(
    webpackConfig.devServer, 
    webpack(webpackConfig)
  );

  const runServer = async () => {
    console.log('Starting server...');
    await server.start();
  };

  runServer();
};

module.exports = serve;
