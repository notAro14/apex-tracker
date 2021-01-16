// node
const path = require('path');
// webpack
const webpack = require('webpack');
const { merge } = require('webpack-merge');
const webpackCfgCommon = require('./webpack.config');

module.exports = () =>
  merge(webpackCfgCommon, {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
      historyApiFallback: true,
      contentBase: path.resolve(__dirname, './dist'),
      open: true,
      compress: true,
      hot: true,
      port: 4000,
    },

    module: {
      rules: [
        {
          test: /\.(css|scss)$/i,
          use: [
            'style-loader',
            {
              loader: 'css-loader',
              options: { sourceMap: true, importLoaders: 2 },
            },
            {
              loader: 'postcss-loader',
              options: { sourceMap: true },
            },
            {
              loader: 'sass-loader',
              options: { sourceMap: true },
            },
          ],
        },
      ],
    },

    plugins: [new webpack.HotModuleReplacementPlugin()],
  });
