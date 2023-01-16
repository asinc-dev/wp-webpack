const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const sortCSSmq = require('sort-css-media-queries');

const getWebpackConfigDevelopment = (config) => {

  return {
    mode: 'production',
    module: {
      rules: [
        {
          test:/\.s?[ac]ss$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
            },
            {
              loader: require.resolve('css-loader'),
              options: {
                modules: {
                  auto: true,
                  localIdentName: '[local]--[hash:base64:5]',
                },
              }
            },
            {
              loader: require.resolve('postcss-loader'),
              options: {
                postcssOptions: {
                  plugins: [
                    require('autoprefixer'),
                    require('postcss-sort-media-queries')({ sort: sortCSSmq }),
                    require('cssnano')({ preset: 'default' })
                  ]
                }
              }
            },
            {
              loader: require.resolve('sass-loader')
            }
          ]
        }
      ]
    },
    plugins: [
      new CleanWebpackPlugin(),
      new MiniCssExtractPlugin({
        filename: '[name].css',
        chunkFilename: '[id].[hash].css'
      })
    ],
    optimization: {
      minimize: true,
      minimizer: [new TerserPlugin({
        terserOptions: {
          mangle: true
        }
      })]
    }
  };
};

module.exports = getWebpackConfigDevelopment;