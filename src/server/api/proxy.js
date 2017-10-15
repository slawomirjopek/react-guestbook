import httpProxy from "http-proxy";
import config from "../../../config/config";

const apiPrefix = config.getConfig("api").prefix;
const apiServer = config.getConfig("server").api;

const createProxy = (expressApp) => {
    const apiProxy = httpProxy.createProxyServer({
        target: `http://${apiServer.host}:${apiServer.port}`
    });

    expressApp.use(apiPrefix, () => {
        apiProxy.web(req, res)
    })
};

export default createProxy;