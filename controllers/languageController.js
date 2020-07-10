const languageController = {
    language: {
        type: String,
    }
};

const Language = mongoose.model('LanguageController', LanguageController);

module.exports = Language;