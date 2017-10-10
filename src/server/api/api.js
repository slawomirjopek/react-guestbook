require("babel-core/register")({
    "presets": ["env", "react"]
});

const bodyParser = require("body-parser");
const express = require("express");
const mongoose = require("mongoose");
const posts = require("./models/post");

const app = new express();
app.use(bodyParser.json());

mongoose.connect(`mongodb://localhost:27017/guestbook`);

app.get("/guestbook", (req, res) => {
    posts.find((err, data) => {
        if (err) throw err;
        res.json(data);
    });
});

app.get("/guestbook/:id", (req, res) => {
    const query = {_id: req.params.id};

    posts.find(query, (err, data) => {
        if (err) throw err;
        res.json(data);
    });
});

app.get("/guestbook/category/:category", (req, res) => {
    // @TODO get all entries from category
});

app.get("/guestbook/archive/:month", (req, res) => {
    // @TODO get all entries from selected month
});

app.delete("/guestbook/:id", (req, res) => {
    const query = {_id: req.params.id};

    posts.remove(query, (err, data) => {
        if (err) throw err;
        res.json(data);
    });
});

app.put("/guestbook/:id", (req, res) => {
    // @TODO add new entry
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`API server running on ${port} port.`);
});