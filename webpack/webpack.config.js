var path = require("path");

module.exports = {
    entry: path.resolve(__dirname, "../src/client/index.js"),
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "../build"),
        publicPath: "/"
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            }
        ]
    }
};