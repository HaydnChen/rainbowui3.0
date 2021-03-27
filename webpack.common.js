const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const srcPath = path.join(__dirname, '/../src');
const rootPath = path.join(__dirname, './');
const buildModule = [];
const MyPlugin = require('./indexHtmlPlugin');
const config = require('./src/config/config.json');
buildModule.push(srcPath);
for (let key in require(rootPath + 'package.json')['dependencies']) {
    buildModule.push(path.resolve(__dirname, './node_modules/' + key));
}
const buildOption = {
    plugins: ['transform-async-to-generator', 'transform-strict-mode', 'transform-object-assign', 'transform-decorators-legacy', 'react-hot-loader/babel'],
    presets: ['es2015', 'react', 'stage-0']
};

module.exports = {
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new HtmlWebpackPlugin({
            template: './index.html',
            filename: './index.html'
        }),
        new MyPlugin({ config: config, env: 'local-production' })

    ],
    output: {
        filename: '[name].bundle.js',
        chunkFilename: '[chunkhash].bundle.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/'
    },
    module: {
        rules: [{
            test: /\.(js|jsx)$/,
            loader: 'babel-loader',
            exclude: [path.resolve(__dirname, 'node_modules')],
            options: buildOption
        },
        {
            test: /\.(js|jsx)$/,
            loader: 'babel-loader',
            include: buildModule,
            options: buildOption
        },
        {
            test: /\.(js|jsx)$/,
            loader: 'eslint-loader',
            exclude: [path.resolve(__dirname, 'node_modules')],
            options: {
                formatter: require('eslint-friendly-formatter')
            }
        },
        {
            test: /\.css$/,
            use: [
                'style-loader',
                'css-loader'
            ]
        },
        {
            test: /\.(png|svg|jpg|gif)$/,
            use: [
                'url-loader'
            ]
        }
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx'],
        alias: {
            config: path.resolve(__dirname, './src/config/config.js'),
            i18n: path.resolve(__dirname, './src/i18n/index.js')
        }
    }
};
