require("babel-core/register")({
    "presets": ["env", "react"]
});

const config = require("../../../config/config").getConfig;
const bodyParser = require("body-parser");
const express = require("express");
const mongoose = require("mongoose");
const posts = require("./models/post");

const app = new express();
app.use(bodyParser.json());

const api = config("api").name;
const db = config("database");
const server = config("server").client;

mongoose.connect(`${db.host}:${db.port}/${db.name}`);

app.get(api, (req, res) => {
    posts.find((err, data) => {
        if (err) throw err;
        res.json(data);
    });
});

app.get(api + "/:id", (req, res) => {
    const query = {_id: req.params.id};

    posts.find(query, (err, data) => {
        if (err) throw err;
        res.json(data);
    });
});

app.get(api + "/category/:category", (req, res) => {
    // @TODO get all entries from category
});

app.get(api + "/archive/:month", (req, res) => {
    // @TODO get all entries from selected month
});

app.delete(api + "/:id", (req, res) => {
    const query = {_id: req.params.id};

    posts.remove(query, (err, data) => {
        if (err) throw err;
        res.json(data);
    });
});

app.put(api + "/:id", (req, res) => {
    // @TODO add new entry
});

app.listen(server.port, () => {
    console.log(`API server running on ${server.port} port.`);
});