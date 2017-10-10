var defaults = {
    database: {
        host: "mongodb://localhost",
        port: 27017,
        name: "guestbook"
    },
    server: {
        api: {
            port: 6000
        },
        client: {
            port: 3000,
            host: "0.0.0.0",
            contentBase: "static"
        }
    },
    api: {
        name: "/guestbook"
    }
};

var getConfig = function(key) {
    if (key && typeof key === "string" && defaults[key] !== undefined) {
        return defaults[key];
    }
    return defaults;
};

module.exports = {
    getConfig: getConfig
};