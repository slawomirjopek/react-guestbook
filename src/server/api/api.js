require("babel-core/register")({
    "presets": ["env", "react"]
});

const config = require("../../../config/config").getConfig;
const bodyParser = require("body-parser");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const posts = require("./models/post");

const app = new express();
app.use(cors());
app.use(bodyParser.json());

const api = config("api").name;
const db = config("database");
const server = config("server").api;

mongoose.connect(`${db.host}:${db.port}/${db.name}`);

/**
 * @api {get} /guestbook/ 1. Get entries
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
app.get(api, (req, res) => {
    posts.find(responseHandler.bind(res));
});

/**
 * @api {get} /guestbook/:id 2. Get entry by id
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
app.get(api + "/:id", (req, res) => {
    const query = {_id: req.params.id};
    posts.find(query, responseHandler.bind(res));
});

/**
 * @api {post} /guestbook/ 3. Create entry/entries
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
app.post(api, (req, res) => {
    const entry = req.body;
    posts.create(entry, responseHandler.bind(res));
});

/**
 * @api {post} /guestbook/category/ 4. Gets all entries from category/categories
 * @apiName GetEntryByCategory
 * @apiGroup Entry
 * @apiHeader {String[]} category List of categories
 * @apiSuccess {Object[]} entries Entries list
 * @apiSuccess {String} entries._id Entry id
 * @apiSuccess {String} entries.title Entry title
 * @apiSuccess {String} entries.author Entry author
 * @apiSuccess {Date} entries.date Creation date
 * @apiSuccess {String[]} entries.tags Entry tags
 * @apiSuccess {String[]} entries.category Entry categories
 */
app.post(api + "/category/", (req, res) => {
    const categories = {category: req.body.category};
    // @TODO find by categories
    //posts.find(categories, responseHandler.bind(res));
});

/**
 * @api {post} /guestbook/tag/ 5. Gets all entries with tag/tags
 * @apiName GetEntryByTag
 * @apiGroup Entry
 * @apiHeader {String[]} tag List of tags
 * @apiSuccess {Object[]} entries Entries list
 * @apiSuccess {String} entries._id Entry id
 * @apiSuccess {String} entries.title Entry title
 * @apiSuccess {String} entries.author Entry author
 * @apiSuccess {Date} entries.date Creation date
 * @apiSuccess {String[]} entries.tags Entry tags
 * @apiSuccess {String[]} entries.category Entry categories
 */
app.post(api + "/tag/", (req, res) => {
    const tags = {tag: req.body.tag};
    // @TODO find by tags
    //posts.find(tags, responseHandler.bind(res));
});

/**
 * @api {get} /guestbook/archive/:month 6. Gets entries from archive
 * @apiName GetArchive
 * @apiGroup Entry
 * @apiParam {String} month - Month name
 * @apiSuccess {Object[]} entries Entries list
 * @apiSuccess {String} entries._id Entry id
 * @apiSuccess {String} entries.title Entry title
 * @apiSuccess {String} entries.author Entry author
 * @apiSuccess {Date} entries.date Creation date
 * @apiSuccess {String[]} entries.tags Entry tags
 * @apiSuccess {String[]} entries.category Entry categories
 */
app.get(api + "/archive/:month", (req, res) => {
    // @TODO get all entries from selected month
});

/**
 * @api {delete} /guestbook/:id 7. Delete entry
 * @apiName DeleteEntry
 * @apiGroup Entry
 * @apiParam {Number} id Entry unique id
 * @apiSuccess {Object} response Response object
 * @apiSuccess {Number} response.n 0/1
 * @apiSuccess {Number} response.ok 0/1
 */
app.delete(api + "/:id", (req, res) => {
    const query = {_id: req.params.id};
    posts.remove(query, responseHandler.bind(res));
});

/**
 * @api {put} /guestbook/:id 8. Edit entry
 * @apiName EditEntry
 * @apiGroup Entry
 * @apiParam {Number} id Entry unique id
 * @apiHeader {Object} entry Entry
 * @apiHeader {String} [entry.title] Entry title
 * @apiHeader {String} [entry.author] Entry author
 * @apiHeader {Date} [entry.date] Entry author
 * @apiHeader {String[]} [entry.tags] Entry tags
 * @apiHeader {String[]} [entry.category] Entry categories
 * @apiSuccess {Object[]} entries Entries list
 * @apiSuccess {String} entries._id Entry id
 * @apiSuccess {String} entries.title Entry title
 * @apiSuccess {String} entries.author Entry author
 * @apiSuccess {Date} entries.date Creation date
 * @apiSuccess {String[]} entries.tags Entry tags
 * @apiSuccess {String[]} entries.category Entry categories
 */
app.put(api + "/:id", (req, res) => {
    // @TODO edit entry
});

app.listen(server.port, () => {
    console.log(`API server running on ${server.port} port.`);
});

function responseHandler(err, data) {
    if (err) throw err;
    this.json(data);
}