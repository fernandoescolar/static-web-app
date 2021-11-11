const path = require('path');
const fs = require('fs');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const HtmlWebpackPugPlugin = require('html-webpack-pug-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

const language = {
  language: 'en',
  title: 'Pug demo'
};

// just html pages transfer
function generateHtmlPlugins(templateDir) {
  const templateFiles = fs.readdirSync(path.resolve(__dirname, templateDir));
  return templateFiles.map(item => {
    const parts = item.split('.');
    const name = parts[0];
    const extension = parts[1];
    return new HtmlWebpackPlugin({
      filename: name === 'index' ? 'index.html' : `${name}/index.html`,
      template: path.resolve(__dirname, `${templateDir}/${name}.${extension}`),
    });
  });
}

const htmlPlugins = generateHtmlPlugins('./src/pages');

module.exports = {
  //entry: ['regenerator-runtime/runtime.js', './src/styles/main.scss'],
  optimization: {
    minimizer: [
      new CssMinimizerPlugin()
    ],
  },
  plugins: [
    new HtmlWebpackPugPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
      chunkFilename: '[id].[contenthash].css',
      linkType: "text/css"
    }),
    new BrowserSyncPlugin({
      server: {
        baseDir: 'dist',
        index: 'index.html'
      },
      open: false,
      online: true,
      tunnel: false,
      host: 'localhost',
      port: 3000,
      files: ['dist/*.html']
    }),
    ...htmlPlugins
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.html$/,
        exclude: /node_modules/,
        use: [
          'html-loader'
        ]
      },
      {
        test: /\.pug$/,
        exclude: /node_modules/,
        use: [
          'html-loader',
          {
            loader: 'pug-html-loader',
            options: {
              data: language
            }
          }
        ]
      },
      {
        test: /\.s[ac]ss$/i,
        exclude: /node_modules/,
        use: [
          //'style-loader',
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      }
    ]
  }
};