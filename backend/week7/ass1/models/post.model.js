const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },
    caption: {
        type: String,
        required: true,
    },
    imageUrl: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
});

const Post = mongoose.model("post", postSchema);

module.exports = Post;