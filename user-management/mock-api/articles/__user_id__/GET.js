module.exports = (request, response) => {
    let articles = require("../GET.json");
    let articlesByUserId = articles.filter(article => (article.user_id == request.params.user_id));

    response.json(articlesByUserId);
}