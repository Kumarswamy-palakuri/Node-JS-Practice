const mongoose = require('mongoose');

// Blog schema with title, content, author, and date fields
const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,  // Author is required
    },
    date: {
        type: Date,
        default: Date.now,
    }
});

const Blog = mongoose.model('Blog', blogSchema);
module.exports = Blog;
