var webpack = require("webpack");
var WebpackDevServer = require("webpack-dev-server");
var config = require("./webpack/webpack.config");

new WebpackDevServer(webpack(config), {
    publicPath: config.output.publicPath,
    contentBase: "template",
    historyApiFallback: true,
    stats: {
        colors: true
    }
}).listen(3000, "0.0.0.0", function (err) {
    if (err) {
        console.log(err);
    }

    console.log("Running at http://0.0.0.0:3000");
});