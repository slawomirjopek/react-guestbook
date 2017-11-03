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
            authenticated: false
        })
    }

    // verify token & expiration
    jwt.verify(token, app.get("jwtSecret"), (err, decoded) => {
        if (err) {
            return res.status(403).json({
                message: "Bad token.",
                authenticated: false
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
 * @api {get} /guestbook/ Get entries (range)
 * @apiName GetEntries
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
app.get(getRoute(api.guestbook, ":offset/:limit"), (req, res) => {
    const skip = Number(req.params.offset);
    const limit = Number(req.params.limit);

    posts.find(guestbookResponseHandler.bind(res))
        .skip(skip)
        .limit(limit)
        .sort({date: -1});
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
    const query = {_id: req.params.id};
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
 * @api {delete} /guestbook/:id 4. Delete entry
 * @apiName DeleteEntry
 * @apiGroup Entry
 * @apiParam {Number} id Entry unique id
 * @apiSuccess {Object} response Response object
 * @apiSuccess {Number} response.n 0/1
 * @apiSuccess {Number} response.ok 0/1
 */
app.delete(getRoute(api.guestbook, ":id"), apiRoutes, (req, res) => {
    const query = {_id: req.params.id};

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
    if (err) throw err;
    this.json(data);
}

function getRoute(api, route) {
    return _.isEmpty(route) ? `/${api}` : `/${api}/${route}`;
}