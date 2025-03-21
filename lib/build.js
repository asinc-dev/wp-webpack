const webpack = require('webpack');
const getConfig = require('./helpers/getConfig');

const build = async () => {

  const config = await getConfig();

  const webpackOptions = {
    ...config,
    mode: 'production'
  };

  const webpackConfig = require('./webpack-config')(webpackOptions);
  
  webpack(webpackConfig, async(err, stats) => {
    if (err) {
      console.error('Error building webpack', err);
      throw err;
    }
    console.log(stats.toString({
      chunks: false,
      colors: true
    }));
  });
};

module.exports = build;

