//Este archivo va a ser nuestro recurso principal

const path = require('path'); //Para trabajar con archivos y rutas de directorios.
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { default: MiniCssExtractPlugin } = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');


/** @type {import('webpack').Configuration} */ //Añade autocompletado a nuestro archivo de webpack

module.exports = { //creamos un módulo que se va a exportar
    entry: './src/index.js', //El punto de entrada de nuestra app
    output: { 
        path: path.resolve(__dirname, 'dist'), //Utilizamos el path que declaramos arriba, resolve() nos permite saber dónde se encuentra nuestro proyecto.
        filename: 'main.js', //Nombre del archivo final
    },
    resolve: {
        extensions: ['.js'], //los archivos que webpack podrá leer
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
                    filename: 'static/images/[hash][ext][query]', //Indicamos la carpeta donde queremos guardar las imágenes
                },
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            inject: true,
            template: './public/index.html',
            filename: './index.html'
        }),
        new MiniCssExtractPlugin(),
        new CopyPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, 'src', 'assets/images'),
                    to: 'assets/images'
                },
            ],
        }),
    ],
};