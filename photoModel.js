const mongoose = require("mongoose");

const PhotoSchema = new mongoose.Schema({
    albumId: {
        type: Number,
        required: true,
    },
    id: {
        type: Number,
        required: true,
    },
    title: {
        type: String,
    },
    url: {
        type: String,
    },
    thumbnailUrl: {
        type: String,
    },
});

const PhotoModel = mongoose.model("baitap", PhotoSchema);

module.exports = PhotoModel;