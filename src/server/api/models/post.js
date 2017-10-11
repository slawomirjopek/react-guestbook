const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
    title: String,
    content: String,
    author: String,
    category: [String],
    tags: [String],
    date: {type: Date, default: Date.now}
});

const model = mongoose.model("Post", postSchema);

module.exports = model;