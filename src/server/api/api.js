require("babel-core/register")({
    "presets": ["env", "react"]
});

const config = require("../../../config/config").getConfig;
const bodyParser = require("body-parser");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const posts = require("./models/post");
const users = require("./models/user");
const jwt = require("jsonwebtoken");
const _ = require("lodash");

const app = new express();
app.use(cors());
app.use(bodyParser.json());
app.set("jwtSecret", "3jF234F4sa$(6fsds!");

const api = config("api").name;
const db = config("database");
const server = config("server").api;

mongoose.connect(`${db.host}:${db.port}/${db.name}`);

// verify token middleware
const apiRoutes = express.Router();
apiRoutes.use((req, res, next) => {
    const token = req.body.token || req.headers.authorization;

    // if no token
    if (!token) {
        // status 403 - forbidden
        return res.status(403).send({
            message: "No token provided.",
            authenticated: false,
            status: "AUTH_ERROR"
        })
    }

    // verify token & expiration
    jwt.verify(token, app.get("jwtSecret"), (err, decoded) => {
        if (err) {
            return res.status(403).json({
                message: "Bad token.",
                authenticated: false,
                status: "AUTH_ERROR"
            })
        }

        // save request for use in next routes
        req.decoded = decoded;
        next();
    });
});

// authenticate
app.post(getRoute(api.authenticate), (req, res) => {
    users.findOne({ login: req.body.login }, (err, user) => {
        if (err) throw err;

        // if user not found
        if (!user) {
            return res.json({
                message: "User authentication failed (user nor found).",
                authenticated: false
            })
        }

        // check password
        if (user.password !== req.body.password) {
            return res.json({
                message: "User authentication failed (wrong password).",
                authenticated: false
            })
        }

        // user & password match then create jwt token
        const payload = { login: user.login };
        const settings = { expiresIn : 1440 };
        const token = jwt.sign(payload, app.get("jwtSecret"), settings);

        res.json({
            message: "Successfully logged in.",
            authenticated: true,
            token: token,
            user: _.pick(user, ["_id", "login"])
        });
    })
});

/**
 * @api {get} /guestbook/ Get entries
 * @apiName GetEntries
 * @apiGroup Entry
 * @apiSuccess {Object[]} entries Entries list
 * @apiSuccess {String} entries._id Entry id
 * @apiSuccess {String} entries.title Entry title
 * @apiSuccess {String} entries.author Entry author
 * @apiSuccess {Date} entries.date Creation date
 * @apiSuccess {String[]} entries.tags Entry tags
 * @apiSuccess {String[]} entries.category Entry categories
 */
app.get(getRoute(api.guestbook), (req, res) => {
    posts.find(guestbookResponseHandler.bind(res))
        .sort({date: -1});
});

/**
 * @api {get} /guestbook/range/:offset/:limit Get entries (range)
 * @apiName GetEntriesRange
 * @apiGroup Entry
 * @apiParam {Number} offset (range start)
 * @apiParam {Number} limit (range from offset)
 * @apiSuccess {Object[]} entries Entries list
 * @apiSuccess {String} entries._id Entry id
 * @apiSuccess {String} entries.title Entry title
 * @apiSuccess {String} entries.author Entry author
 * @apiSuccess {Date} entries.date Creation date
 * @apiSuccess {String[]} entries.tags Entry tags
 * @apiSuccess {String[]} entries.category Entry categories
 */
app.get(getRoute(api.guestbook, "range/:offset/:limit"), (req, res) => {
    const skip = Number(req.params.offset) || 0;
    const limit = Number(req.params.limit) || 5;

    posts.find(guestbookResponseHandler.bind(res))
        .skip(skip)
        .limit(limit)
        .sort({date: -1});
});

/**
 * @api {get} /guestbook/page/:page Get entries (page)
 * @apiName GetEntriesPage
 * @apiGroup Entry
 * @apiParam {Number} page (page to display)
 * @apiSuccess {Object} entries Entries data
 * @apiSuccess {Object[]} entries.entries Entries list
 * @apiSuccess {String} entries.entries._id Entry id
 * @apiSuccess {String} entries.entries.title Entry title
 * @apiSuccess {String} entries.entries.author Entry author
 * @apiSuccess {Date} entries.entries.date Creation date
 * @apiSuccess {String[]} entries.entries.tags Entry tags
 * @apiSuccess {String[]} entries.entries.category Entry categories
 * @apiSuccess {Object} entries.pagination Pagination data
 */
app.get(getRoute(api.guestbook, "page/:page"), (req, res) => {
    let page = Number(req.params.page) || 1;
    let skip = (page - 1) * 5;
    const limit = 5;

    posts.count().then(postQty => {
        const pages = Math.ceil(postQty/limit);

        posts.find((err, data) => {
            if (err) return errorHandle.bind(this, err)();
            res.json({
                entries: [...data],
                pagination: {
                    page: page,
                    pages: pages
                }
            });
        })
        .skip(skip)
        .limit(limit)
        .sort({date: -1});
    })
});

/**
 * @api {get} /guestbook/:id Get entry by id
 * @apiName GetEntry
 * @apiGroup Entry
 * @apiParam {Number} id Entry unique id
 * @apiSuccess {Object[]} entries Entries list
 * @apiSuccess {String} entries._id Entry id
 * @apiSuccess {String} entries.title Entry title
 * @apiSuccess {String} entries.author Entry author
 * @apiSuccess {Date} entries.date Creation date
 * @apiSuccess {String[]} entries.tags Entry tags
 * @apiSuccess {String[]} entries.category Entry categories
 */
app.get(getRoute(api.guestbook, ":id"), (req, res) => {
    const query = {_id: req.params.id || 0};
    posts.find(query, guestbookResponseHandler.bind(res));
});

/**
 * @api {post} /guestbook/ Create entry/entries
 * @apiName CreateEntry
 * @apiGroup Entry
 * @apiHeader {Object/Object[]} entry Entry/List of entries
 * @apiHeader {String} entry.title Entry title
 * @apiHeader {String} entry.author Entry author
 * @apiHeader {Date} entry.date Entry author
 * @apiHeader {String[]} entry.tags Entry tags
 * @apiHeader {String[]} entry.category Entry categories
 * @apiSuccess {Object} entry Created entry
 * @apiSuccess {String} entry._id Entry id
 * @apiSuccess {String} entry.title Entry title
 * @apiSuccess {String} entry.author Entry author
 * @apiSuccess {Date} entry.date Creation date
 * @apiSuccess {String[]} entry.tags Entry tags
 * @apiSuccess {String[]} entry.category Entry categories
 */
app.post(getRoute(api.guestbook), (req, res) => {
    const entry = req.body;
    posts.create(entry, guestbookResponseHandler.bind(res));
});

/**
 * @api {delete} /guestbook/:id Delete entry
 * @apiName DeleteEntry
 * @apiGroup Entry
 * @apiParam {Number} id Entry unique id
 * @apiSuccess {Object} response Response object
 * @apiSuccess {Number} response.n 0/1
 * @apiSuccess {Number} response.ok 0/1
 */
app.delete(getRoute(api.guestbook, ":id"), apiRoutes, (req, res) => {
    const query = {_id: req.params.id || 0};

    posts.find(query, (err, data) => {
        posts.remove(query, () => {
            res.json(data)
        })
    });
});

app.listen(server.port, () => {
    console.log(`API server running on ${server.port} port.`);
});

function guestbookResponseHandler(err, data) {
    if (err) return errorHandle.bind(this, err)();
    this.json(data);
}

function errorHandle(err) {
    console.log("Error: ", err.message);
    return this.status(500).end();
}

function getRoute(api, route) {
    return _.isEmpty(route) ? `/${api}` : `/${api}/${route}`;
}