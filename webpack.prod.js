const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
// const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const InlineManifestWebpackPlugin = require('inline-manifest-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
// const WebpackBundleAnalyzer = require('webpack-bundle-analyzer');
const common = require('./webpack.common');
const WorkboxWebpackPlugin = require('workbox-webpack-plugin');
const os = require('os');
const HappyPack = require('happypack');
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });
// const { BundleAnalyzerPlugin} = WebpackBundleAnalyzer;
const MyPlugin = require('./indexHtmlPlugin');

module.exports = merge(common, {
    mode: 'production',
    devtool: 'false',
    entry: {
        app: [
            './src/index.js'
        ]
    },
    output: {
        path: path.join(__dirname, 'dist/release/'),
        filename: '[name].[chunkhash].bundle.js',
        chunkFilename: '[name].[chunkhash:8].bundle.js',
        publicPath: './'
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new HtmlWebpackPlugin({
            filename: './index.html',
            template: './index.html'
        }),
        new InlineManifestWebpackPlugin(),
        // new UglifyJsPlugin({
        //     // sourceMap: true,
        //     parallel: true,
        //     cache: true,
        //     uglifyOptions: {
        //         output: {
        //             comments: false,
        //             beautify: false
        //         },
        //         compress: {
        //             drop_console: true,
        //             warnings: false,
        //             drop_debugger: true
        //         }
        //     }
        // }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        }),
        new ExtractTextPlugin('styles.min.css'),
        new CopyWebpackPlugin({
            patterns: [
                { from: './src/config/config.json', to: 'config.json' }
            ]
        }),
        new webpack.ProvidePlugin({
            i18n: 'i18n'
        }),
        new HappyPack({
            id: 'happybabel',
            loaders: ['cache-loader','babel-loader?cacheDirectory'],
            threadPool: happyThreadPool,
            verbose: true
        }),
        new ManifestPlugin(),
        new webpack.NamedModulesPlugin(),
        // new BundleAnalyzerPlugin(),
        new MyPlugin({env: 'production'}),
        new WorkboxWebpackPlugin.GenerateSW({
            clientsClaim: true,
            skipWaiting: true,
            exclude: [/\.map$/]
        })
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
        },
        minimize: true,
        minimizer: [new TerserPlugin({
            cache: true, // 是否缓存
            parallel: true, // 是否并行打包
            sourceMap: false,
            include: /\.(js|jsx)$/
        })]
    }
});
