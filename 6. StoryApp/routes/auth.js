const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Story = require('../models/Story');
const router = express.Router();

// Login page
router.get('/login', (req, res) => {
    res.render('login');
});

// Login POST handler
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) return res.status(400).send('Invalid Username');

    const validPass = await bcrypt.compare(password, user.password);
    if (!validPass) return res.status(400).send('Invalid Password');

    // Create and assign a token
    const token = jwt.sign({ _id: user._id, role: user.role }, 'SECRET');
    res.header('auth-token', token).redirect(user.role === 'admin' ? '/admin' : '/');
});

// Admin panel route
router.get('/admin', async (req, res) => {
    const stories = await Story.find({ isApproved: false });
    res.render('admin', { stories });
});

// Approve story route
router.post('/approve-story/:id', async (req, res) => {
    const { id } = req.params;
    await Story.findByIdAndUpdate(id, { isApproved: true });
    res.redirect('/admin');
});

module.exports = router;
