const mongoose = require('mongoose');


const askController = new mongoose.Schema ({
    solution: {
        type: String,
    }
}, {timestamps: true});

const Solution = mongoose.model('Solution', askController);

module.exports = Solution;