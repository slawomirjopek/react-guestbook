var defaults = {
    database: {
        host: "mongodb://localhost",
        port: 27017,
        name: "guestbook"
    },
    server: {
        api: {
            port: 5900,
            host: "localhost"
        },
        client: {
            port: 3000,
            host: "localhost",
            contentBase: "static"
        }
    },
    api: {
        name: {
            guestbook: "guestbook"
        },
        prefix: "/api"
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