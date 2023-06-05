const { default: mongoose  } = require("mongoose");

const articlesSchema = new mongoose.Schema({
    _id: String,
    articles: [ { type: String } ]

})

module.exports = mongoose.model.Articles || mongoose.model("Articles", articlesSchema);
