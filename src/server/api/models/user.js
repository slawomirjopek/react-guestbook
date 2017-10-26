const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    login: String,
    password: String
});

const model = mongoose.model("User", userSchema);

module.exports = model;