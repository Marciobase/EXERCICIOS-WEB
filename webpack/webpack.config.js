const webpack = require('webpack')
const miniCssExtractPlubin  = require('mini-css-extract-plugin')

const crypto = require("crypto");
const crypto_orig_createHash = crypto.createHash;
crypto.createHash = algorithm => crypto_orig_createHash(algorithm == "md4" ? "sha256" : algorithm);

module.exports = {
    // mode: 'development',
    mode: 'production',
    entry: './src/principal.js',
    output: {
        filename: 'principal.js',
        path: __dirname + '/public'
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