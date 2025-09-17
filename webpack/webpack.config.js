const modDEv = process.env.NODE_ENV !== 'production'
const webpack = require('webpack')
const miniCssExtractPlubin  = require('mini-css-extract-plugin')
const uglifyJsPlugin = require('uglifyjs-webpack-plugin')
const optimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')

const crypto = require("crypto");
const crypto_orig_createHash = crypto.createHash;
crypto.createHash = algorithm => crypto_orig_createHash(algorithm == "md4" ? "sha256" : algorithm);

module.exports = {
    // mode: 'development',
    mode: modDEv ? 'development' : 'production',
    entry: './src/principal.js',
    output: {
        filename: 'principal.js',
        path: __dirname + '/public'
    },
    optimization: {
        minimizer: [
            new uglifyJsPlugin({
                cache: true,
                parallel: true
            }),
            new optimizeCSSAssetsPlugin({})
        ]
    },
    plugins: [
        new miniCssExtractPlubin({
           filename: 'style.css' 
        })

    ],
    module: {
        rules: [{
            test: /\.s?[ac]ss$/,
            use: [
                miniCssExtractPlubin.loader,
                // 'style-loader',     //  jogar a tag <style> na DOM adciona CSS
                'css-loader',         //  interpreta @import, url()....
                'sass-loader',
            ]
        }]
    }
}