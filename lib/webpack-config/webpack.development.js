const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

const getWebpackConfigDevelopment = (config) => {

  return {
    mode: 'development',
    module: {
      rules: [
        {
          test:/\.s?[ac]ss$/,
          use: [
            {
              loader: require.resolve('style-loader'),
              options: {
                injectType: 'singletonStyleTag'
              }
            },
            {
              loader: require.resolve('css-loader'),
              options: {
                modules: {
                  auto: true,
                  localIdentName: '[local]--[hash:base64:5]',
                },
                sourceMap: true
              }
            },
            {
              loader: require.resolve('postcss-loader'),
              options: {
                sourceMap: true,
                postcssOptions: {
                  plugins: [
                    require('autoprefixer')
                  ]
                }
              }
            },
            {
              loader: require.resolve('sass-loader'),
              options: {
                sourceMap: true,
                sassOptions: {
                  quietDeps: false
                }
              }
            }
          ],
        },
      ]
    },
    stats: 'errors-only',
    devtool: 'eval-cheap-module-source-map',
    plugins: [
      new ReactRefreshWebpackPlugin()
    ],
    devServer: {
      port: config.port,
      https: config.https,
      hot: true,
      historyApiFallback: true,
        allowedHosts: "all",
      headers: { 
        'Access-Control-Allow-Origin': '*' 
      }
    }
  };
};

module.exports = getWebpackConfigDevelopment;