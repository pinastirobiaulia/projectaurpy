const mongoose = require('mongoose');

const replySchema = new mongoose.Schema({
    discussionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Discussion',
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Reply = mongoose.model('Reply', replySchema);
module.exports = Reply;