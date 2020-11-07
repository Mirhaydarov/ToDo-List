const path = require('path');
const HtmlPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');

module.exports = {
    entry: ['babel-polyfill', './src/js/main.js'],
    output: {
        filename: 'js/bundle.js',
        path: path.resolve(__dirname, './build'),
    },
    optimization: {
        minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
    },
    devServer: {
        contentBase: path.resolve(__dirname, './build'),
        compress: true,
        port: 9000,
    },
    plugins: [
        new HtmlPlugin({
            template: './src/index.pug',
            filename: 'index.html',
        }),
        new MiniCssExtractPlugin({
            filename: 'css/style.css',
        }),
    ],
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.pug$/,
                loader: 'pug-loader',
            },
            {
                test: /\.css$/i,
                use: [MiniCssExtractPlugin.loader, 'css-loader'],
            },
            {
                test: /\.s[ac]ss$/i,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
            },
        ],
    },
};
