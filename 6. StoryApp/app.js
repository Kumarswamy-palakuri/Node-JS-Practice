const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();

// Connect to MongoDB
mongoose.connect('mongodb+srv://kumar:kumar@cluster0.k7r7k.mongodb.net/Storys');

// Middleware
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/', require('./routes/index'));
app.use('/', require('./routes/auth'));

const bcrypt = require('bcryptjs');
const User = require('./models/User');

async function createAdmin() {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('adminpassword', salt); // Change this password if needed

    const adminUser = new User({
        username: 'admin',
        password: hashedPassword,
        role: 'admin'
    });

    await adminUser.save();
    console.log('Admin user created');
}

createAdmin();

// Start the server
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
