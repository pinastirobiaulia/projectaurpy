const Topic = require('../models/topic');
const Discussion = require('../models/discussion');
const Reply = require('../models/reply');

// Fungsi untuk mendapatkan topik-topik yang sudah ada
const getStaticTopics = async () => {
    try {
        // Mengambil topik berdasarkan nama yang sudah ditentukan
        const topics = await Topic.find({ topik: { $in: ["Gagal tambah buku", "Update koleksi buku", "Update kategori buku"] } });
        return topics;
    } catch (err) {
        console.error(err);
        throw new Error('Failed to fetch static topics');
    }
};

const getTopics = async (req, res) => {
    try {
        // Menggunakan fungsi getStaticTopics untuk mendapatkan topik-topik
        const topics = await getStaticTopics();
        res.status(200).json({ topics });
    } catch (err) {
        console.error(err);
        res.status(404).json({ message: err.message });
    }
};

const createTopic = async (req, res) => {
    res.status(400).json({ message: 'Adding new topics is not allowed. Use predefined topics.' });
};

const getDiscussions = async (req, res) => {
    const sort = req.query.sort === 'oldest' ? 1 : -1;
    try {
        const discussions = await Discussion.find()
            .populate('topicId')
            .populate('userId')
            .sort({ createdAt: sort });
        res.status(200).json(discussions);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

const createDiscussion = async (req, res) => {
    const discussion = new Discussion({
        topicId: req.body.topicId,
        title: req.body.title,
        content: req.body.content,
        userId: req.body.userId,
    });

    try {
        const newDiscussion = await discussion.save();
        res.status(201).json(newDiscussion);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

const getReplies = async (req, res) => {
    try {
        const replies = await Reply.find({ discussionId: req.params.id })
            .populate('userId')
            .sort({ createdAt: 1 });
        res.status(200).json(replies);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

const createReply = async (req, res) => {
    const reply = new Reply({
        discussionId: req.params.id,
        content: req.body.content,
        userId: req.body.userId,
    });

    try {
        const newReply = await reply.save();
        res.status(201).json(newReply);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

const searchDiscussions = async (req, res) => {
    try {
        const result = await Discussion.find({
            title: { $regex: req.query.q, $options: 'i' },
        }).populate('topicId').populate('userId');
        res.status(200).json(result);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

module.exports = {
    getTopics,
    createTopic,
    getDiscussions,
    createDiscussion,
    getReplies,
    createReply,
    searchDiscussions,
};
