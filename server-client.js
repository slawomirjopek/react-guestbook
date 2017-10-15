const webpack = require("webpack");
const WebpackDevServer = require("webpack-dev-server");
const webpackConfig = require("./webpack/webpack.config");
const config = require("./config/config");

const serverConfig = config.getConfig("server");
const apiConfig = config.getConfig("api");
const clientPort = serverConfig.client.port;
const clientHost = serverConfig.client.host;
const apiPort = serverConfig.api.port;
const apiHost = serverConfig.api.host;

new WebpackDevServer(webpack(webpackConfig), {
    publicPath: webpackConfig.output.publicPath,
    contentBase: "static",
    historyApiFallback: true,
    stats: {
        colors: true
    },
    proxy: {
        [apiConfig.prefix]: {
            target: `http://${apiHost}:${apiPort}`,
            pathRewrite: {[`^${apiConfig.prefix}`] : ''},
            secure: false
        }
    }
}).listen(clientPort, clientHost, function (err) {
    if (err) {
        console.log(err);
    }

    console.log("Running at http://" + clientHost + ":" + clientPort);
});