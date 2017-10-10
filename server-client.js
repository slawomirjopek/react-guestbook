const webpack = require("webpack");
const WebpackDevServer = require("webpack-dev-server");
const webpackConfig = require("./webpack/webpack.config");
const config = require("./config/config").getConfig("server");

const port = config.client.port;
const host = config.client.host;

new WebpackDevServer(webpack(webpackConfig), {
    publicPath: webpackConfig.output.publicPath,
    contentBase: "static",
    historyApiFallback: true,
    stats: {
        colors: true
    }
}).listen(port, host, function (err) {
    if (err) {
        console.log(err);
    }

    console.log("Running at http://" + host + ":" + port);
});