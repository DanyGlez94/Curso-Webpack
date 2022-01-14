//Este archivo va a ser nuestro recurso principal

const path = require('path'); //Para trabajar con archivos y rutas de directorios.
const HtmlWebpackPlugin = require('html-webpack-plugin');

/** @type {import('webpack').Configuration} */ //Añade autocompletado a nuestro archivo de webpack

module.exports = { //creamos un módulo que se va a exportar
    entry: './src/index.js', //El punto de entrada de nuestra app
    output: { 
        path: path.resolve(__dirname, 'dist'), //Utilizamos el path que declaramos arriba, resolve() nos permite saber dónde se encuentra nuestro proyecto.
        filename: 'main.js', //Nombre del archivo final
    },
    resolve: {
        extensions: ['.js'] //los archivos que webpack podrá leer
    },
    module: {
        rules: [
            {
                test: /\.m?js$/, //Expresión regular para utilizar solamente archivos .mjs y .js.
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            inject: true,
            template: './public/index.html',
            filename: './index.html'
        })
    ]
}