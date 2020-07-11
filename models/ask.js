const mongoose = require('mongoose');


const askController = {
    solution: {
        type: String,
    }
};

const Solution = mongoose.model('Solution', askController);

module.exports = Solution;