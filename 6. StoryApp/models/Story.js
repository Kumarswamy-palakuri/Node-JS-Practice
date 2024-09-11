const mongoose = require('mongoose');

const storySchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    isApproved: { type: Boolean, default: false }
});

module.exports = mongoose.model('Story', storySchema);
