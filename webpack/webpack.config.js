const webpack = require('webpack')
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
    module: {
        rules: [{
            test: /\.css$/,
            use: [
                'style-loader',     //  jogar a tag <style> na DOM adciona CSS
                'css-loader',       //  interpreta @import, url()....
            ]
        }]
    }
}