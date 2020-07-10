const mongoose = require('mongoose');


const solutionsController = {
    solution: {
        type: String,
    }
};

const Solution = mongoose.model('Solution', solutionsController);

module.exports = Solution;