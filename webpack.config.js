var webpack = require("webpack");
var AppCachePlugin = require('appcache-webpack-plugin');

module.exports = {
    context: __dirname + "/src",
    entry: {
        app: "./index.js",
        vendor: ["react", "react-dom", "react-mdl"]
    },
    output: {
        path: __dirname,
        filename: "build/bundle.js"
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({minimize: true})
    ],
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader",
                query: {
                    presets: ['react', 'es2015']
                }
            }
        ]
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin("vendor", "build/vendor.bundle.js"),
        new AppCachePlugin({
              cache: [
                  'lib/material.min.css',
                  'lib/material.min.js',
                  'data/cards.json',
                  'https://fonts.googleapis.com/icon?family=Material+Icons',
                  'https://fonts.gstatic.com/s/materialicons/v12/2fcrYFNaTjcS6g4U3t-Y5UEw0lE80llgEseQY3FEmqw.woff2',
                  'https://fonts.googleapis.com/css?family=Kanit:300&subset=thai',
                  'https://fonts.gstatic.com/s/kanit/v1/raMUm0YuovlN_Xqx-LUsqRkAz4rYn47Zy2rvigWQf6w.woff2'
              ],
              settings: ['prefer-online'],
              output: 'offline.appcache'
        })
    ]
};
