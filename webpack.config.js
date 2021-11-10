const path = require('path');
const fs = require('fs');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const HtmlWebpackPugPlugin = require('html-webpack-pug-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// just html pages transfer
function generateHtmlPlugins(templateDir) {
    const templateFiles = fs.readdirSync(path.resolve(__dirname, templateDir));
    return templateFiles.map(item => {
        const parts = item.split('.');
        const name = parts[0];
        const extension = parts[1];
        return new HtmlWebpackPlugin({
            filename: `${name}.html`,
            template: path.resolve(__dirname, `${templateDir}/${name}.${extension}`),
            inject: false,
        });
    });
}

const htmlPlugins = generateHtmlPlugins('./src/pages');

module.exports = {
    entry: [ './src/index.js', './src/scss/main.scss' ],
    plugins: [
        new CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns: [path.resolve(__dirname, 'dist')],
            cleanAfterEveryBuildPatterns: ['!assets/**/*'],
            verbose: true,
            dry: false
        }),
        new HtmlWebpackPugPlugin(),
        new MiniCssExtractPlugin({
            filename: "[name].css"
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
    ].concat(htmlPlugins),
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.pug$/,
                loader: 'pug-loader'
            },
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader'
                ]
            }
        ]
    }
};