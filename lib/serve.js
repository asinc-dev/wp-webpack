const WebpackDevServer = require('webpack-dev-server');
const webpack = require('webpack');
const getConfig = require('./helpers/getConfig');
const { writeProcessConfig, removeProcessConfig } = require('./helpers/handleProcessConfig');

const serve = async () => {

  const config = await getConfig();

  const webpackOptions = {
    ...config,
    mode: 'development'
  };

  const webpackConfig = require('./webpack-config')(webpackOptions);

  const compiler = webpack(webpackConfig);

  compiler.hooks.shutdown.tapAsync('AsincWpWebpack', async () => {
    console.log('Removing process config before shutdown');
    await removeProcessConfig();
  });

  const server = new WebpackDevServer(
    webpackConfig.devServer, 
    compiler
  );

  const runServer = async () => {
    try {
      console.log('Starting server...');
      await server.start();

      // Write out details on the process for WordPress
      await writeProcessConfig(server, config);
    } catch(error) {
      // Ensure we clear the config in case something happens!
      await removeProcessConfig();
      throw error;
    } 
  };

  runServer();
};

module.exports = serve;
