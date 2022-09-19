const mongoose = require ('mongoose');

const activitySchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        required: true
    },
    duration: {
        type: Number,
        required: false
    },
    date: {
        type: Date,
        required: true
    },
});

module.exports = mongoose.model('Activity', activitySchema);