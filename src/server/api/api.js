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
    const post = req.body;
    posts.find(post, (err, data) => {
        if (err) throw err;
        res.json(data);
    });
});

app.get("/guestbook/:id", (req, res) => {
    // get specific entry
});

app.get("/guestbook/category/", (req, res) => {
    // get all entries from category
});

app.get("/guestbook/archive/:month", (req, res) => {
    // get all entries from selected month
});

app.delete("/guestbook/:id", (req, res) => {
    // delete specific entry
});

app.put("/guestbook/:id", (req, res) => {
    // add new entry
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`API server running on ${port} port.`);
});