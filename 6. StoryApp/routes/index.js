const express = require('express');
const Story = require('../models/Story');
const router = express.Router();

// Home page route
router.get('/', async (req, res) => {
    const stories = await Story.find({});
    res.render('home', { stories });
});

// Story submission form
router.get('/submit-story', (req, res) => {
    res.render('submitStory');
});

router.post('/submit-story', async (req, res) => {
    const { title, content } = req.body;
    const newStory = new Story({ title, content });
    await newStory.save();
    res.redirect('/');
});

module.exports = router;
