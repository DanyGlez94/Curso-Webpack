//Este archivo va a ser nuestro recurso principal

const path = require('path'); //Para trabajar con archivos y rutas de directorios.
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { default: MiniCssExtractPlugin } = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin'); //Optimizador CSS
const TerserPlugin = require('terser-webpack-plugin'); //optimizador JS
const DotEnv = require('dotenv-webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

/** @type {import('webpack').Configuration} */ //Añade autocompletado a nuestro archivo de webpack

module.exports = { //creamos un módulo que se va a exportar
    entry: './src/index.js', //El punto de entrada de nuestra app
    output: { 
        path: path.resolve(__dirname, 'dist'), //Utilizamos el path que declaramos arriba, resolve() nos permite saber dónde se encuentra nuestro proyecto.
        filename: '[name].[contenthash].js', //Nombre del archivo final
        assetModuleFilename: 'assets/images/[hash][ext][query]',
    },
    resolve: {
        extensions: ['.js'], //los archivos que webpack podrá leer
        alias: {
            '@utils': path.resolve(__dirname, 'src/utils/'),
            '@templates': path.resolve(__dirname, 'src/templates/'),
            '@styles': path.resolve(__dirname, 'src/styles/'),
            '@images': path.resolve(__dirname, 'src/assets/images/'),
        },
    },
    module: {
        rules: [
            {
                test: /\.m?js$/, //Expresión regular para utilizar solamente archivos .mjs y .js.
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.s?css$|\.styl$/i,
                use: [MiniCssExtractPlugin.loader,'css-loader','stylus-loader']
            },
            {
                test: /\.png/,
                type: 'asset/resource',
                generator: { 
                    filename: 'assets/images/[hash][ext][query]', //Indicamos la carpeta donde queremos guardar las imágenes
                },
            },
            {
                test: /\.(woff|woff2)$/,
                type: 'asset/resource',
                generator: {
                    filename: 'assets/fonts/[name].[contenthash].[ext][query]', //Indicamos dónde se va a guardar los archivos generados.
                },
                // use: { //Esto no lo usamos, porque el loader de fuentes ya viene integrado en Webpack 5
                //     loader: 'url-loader',
                //     options: {
                //         limit: 10000,
                //         mimetype: "application/font-woff",
                //         name: "[name].[ext]",
                //         outputPath: "./assets/fonts/",
                //         publicPath: "./assets/fonts/",
                //         esModule: false,
                //     },
                // },
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            inject: true,
            template: './public/index.html',
            filename: './index.html'
        }),
        new MiniCssExtractPlugin({
            filename: 'assets/[name].[contenthash].css',
        }),
        new CopyPlugin({ //Hace una copia de las imágenes de la carpeta src/assets/images a dir/assets/images
            patterns: [
                {
                    from: path.resolve(__dirname, 'src', 'assets/images'),
                    to: 'assets/images'
                },
            ],
        }),
        new DotEnv(),
        new CleanWebpackPlugin(),
    ],
    optimization: {
        minimize: true,
        minimizer: [new CssMinimizerPlugin(), new TerserPlugin(),],
    },
};