var webpack = require("webpack");

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
        new webpack.optimize.CommonsChunkPlugin("vendor", "build/vendor.bundle.js")
    ]
};
