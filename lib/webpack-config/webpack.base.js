const webpack = require('webpack');
const path = require('path');
const getDevServerUrl = require('../helpers/getDevServerUrl');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const WebpackMessages = require('webpack-messages');
const { getAllEnv } = require('../helpers/getEnv');
const getEnvPluginNames = require('../helpers/getEnvPluginNames');
const packagePath = require('../helpers/getPackagePath')();

const getWebpackConfigBase = (config) => {

  const isProd = (config.mode === 'production');
  const isDevelopment = !isProd;
  const publicPath = isProd ? config.publicPath + 'build/' : getDevServerUrl(config);
  const { 
    buildPath, 
    rootPath,
    scriptPath, 
    stylesPath,
  } = require('../helpers/getPaths')(config);

  return {
    entry: {
      app: [
        scriptPath,
        stylesPath
      ]
    },

    output: {
      path: buildPath,
      publicPath,
      filename: '[name].js',
      chunkFilename: '[name].[contenthash].js'
    },

    module: {
      rules:[
        {
          test: /\.(ts|js)x?$/,
          exclude: /node_modules/,
          use: {
            loader: require.resolve('babel-loader'),
            options: {
              presets: [
                require.resolve('@babel/preset-react'),
                [
                  require.resolve('@babel/preset-env'),
                  {
                    corejs: 3,
                    useBuiltIns: 'entry'
                  }
                ],
                require.resolve('@babel/preset-typescript')
              ],
              plugins: [
                [
                  require.resolve('@babel/plugin-transform-runtime'),
                  {
                    'regenerator': true
                  }
                ],
                require.resolve('@babel/plugin-transform-async-to-generator'),
                require.resolve('@babel/plugin-proposal-class-properties'),
                isDevelopment && require.resolve('react-refresh/babel')
              ].filter(Boolean)
            }
          }
        },
        {
          test: /\.(jpe?g|png|gif|ico|eot|ttf|woff2?)(\?v=\d+\.\d+\.\d+)?$/i,
          type: 'asset/resource',
        },
        {
          test: /\.svg$/,
          issuer: /\.(jsx?|tsx?)$/,
          use: [{
            loader: require.resolve('@svgr/webpack'),
            options: {
              svgoConfig: {
                plugins: [{
                  name: 'removeViewBox',
                  active: false
               }]
              }
            }
          },{
            loader: require.resolve('url-loader')
          }]
        },
        {
          test: /\.svg$/,
          issuer: /\.s?css$/,
          type: 'asset/resource'
        }
      ]
    },

    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          'NODE_ENV': JSON.stringify(process.env.NODE_ENV),
          ...getEnvPluginNames(),
          ...getAllEnv()
        }
      }),
      new ForkTsCheckerWebpackPlugin(),
      new WebpackMessages({
        name: 'client',
        logger: str => console.log(`>> ${str}`)
      })
    ],

    resolve: {
      // Ensure Webpack evaluates this package directory first or it
      // won't be able to find babel dependencies, etc.
      modules: [path.resolve(packagePath, 'node_modules'), 'node_modules'],
      extensions: ['.ts', '.tsx', '.js', '.scss', '.css', '.svg'],
      alias: {
        '@': rootPath
      },
    },

    externals: { 
      '@wordpress/blocks': 'wp.blocks',
      '@wordpress/block-editor': 'wp.blockEditor',
      '@wordpress/blob': 'wp.blob',
      '@wordpress/element': 'wp.element',
      '@wordpress/i18n': 'wp.i18n',
      '@wordpress/components': 'wp.components',
    },
  };
};

module.exports = getWebpackConfigBase;