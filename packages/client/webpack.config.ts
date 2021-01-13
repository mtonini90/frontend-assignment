import path from 'path';
import webpack from 'webpack';
import {CleanWebpackPlugin} from 'clean-webpack-plugin';

module.exports = {
    entry: './src/index.tsx',
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/env'],
                },
            },
            {
                test: /\.(s[ac]ss|css)$/i,
                use: ['style-loader', 'css-loader', 'sass-loader'],
            },
        ],
    },
    resolve: {extensions: ['.ts', '.tsx', '.js', '.jsx']},
    output: {
        path: path.resolve(__dirname, 'dist/'),
        filename: 'bundle.js',
    },
    devServer: {
        contentBase: path.join(__dirname, 'src/public/'),
        port: 3000,
        publicPath: 'http://localhost:3000/',
        hot: true,
        inline: true,
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new CleanWebpackPlugin(),
    ],
};
