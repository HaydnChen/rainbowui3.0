const merge = require('webpack-merge');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const args = process.argv.splice(2);
const port = parseInt(args[1].split('=')[1]);

const path = require('path');
const common = require('./webpack.common');
const MyPlugin = require('./indexHtmlPlugin');
const config = require('./src/config/config.json');

module.exports = merge(common, {
    mode: 'development',
    devtool: 'eval',
    entry: {
        app: [
            'webpack/hot/only-dev-server',
            'react-hot-loader/patch',
            './src/index.js'
        ]
    },
    output: {
        filename: 'app.js',
        chunkFilename: '[name].[chunkhash:8].chunk.js',
        path: path.join(__dirname, 'dist'),
        publicPath: '/'
    },
    devServer: {
        hot: true,
        disableHostCheck: true,
        contentBase: path.join(__dirname, 'dist/dev/'),
        compress: true,
        port: port,
        historyApiFallback: true
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new HtmlWebpackPlugin({
            filename: './index.html', // 调用的文件
            template: './index.html' // 模板文件
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development')
        }),
        new ExtractTextPlugin('styles.css'),
        new CopyWebpackPlugin({
            patterns: [
                { from: './src/config/config.json', to: 'config.json' }
            ]
        }),
        new webpack.ProvidePlugin({
            i18n: 'i18n'
        }),
        new ManifestPlugin(),
        new webpack.NamedModulesPlugin(),
        new MyPlugin({ config: config, env: 'local-production' })

    ],
    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    chunks: 'initial',
                    name: 'common',
                    minChunks: 2,
                    maxInitialRequests: 5,
                    minSize: 0
                }
            }
        },
        runtimeChunk: {
            name: 'manifest'
        }
    }
});
