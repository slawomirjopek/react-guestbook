const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
    title: String,
    content: String,
    author: String,
    category: Array,
    tags: Array,
    date: Date
});

const model = mongoose.model("Post", postSchema);

module.exports = model;