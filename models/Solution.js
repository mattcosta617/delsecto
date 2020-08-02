const mongoose = require('mongoose');


const solutionController = new mongoose.Schema ({
    solution: {
        type: String,
    }
}, {timestamps: true});

const Solution = mongoose.model('Solution', solutionController);

module.exports = Solution;