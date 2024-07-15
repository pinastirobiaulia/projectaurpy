const mongoose = require('mongoose');

// Skema untuk topik
const topicSchema = new mongoose.Schema({
    topik: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

// Membuat model 'Topic' berdasarkan skema 'topicSchema'
const Topic = mongoose.model('Topic', topicSchema);

module.exports = Topic;
