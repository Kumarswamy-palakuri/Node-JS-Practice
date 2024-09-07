const express = require('express');
const Blog = require('../models/Blog');
const router = express.Router();

// Get all blogs
router.get('/', async (req, res) => {
    try {
        const blogs = await Blog.find().sort({ date: -1 });
        res.render('index', { blogs });
    } catch (err) {
        res.status(500).send("Error loading blogs");
    }
});

// Form to create a new blog post (GET)
router.get('/new', (req, res) => {
    res.render('new');
});

// Create a new blog post (POST)
router.post('/', async (req, res) => {
    try {
        // Create a new blog instance with form data
        const newBlog = new Blog({
            title: req.body.title,
            content: req.body.content,
            author: req.body.author,  // Capturing author from form input
        });

        // Save the blog post to MongoDB
        await newBlog.save();
        res.redirect('/blogs');  // Redirect to the blog list after saving
    } catch (err) {
        res.status(500).send("Error creating blog post");
    }
});

module.exports = router;
