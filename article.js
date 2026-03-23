const express = require('express');
const {
    ajouterArticle,
    getTousArticles,
    getArticle,
    modifierArticle,
    supprimerArticle,
    rechercherArticles
} = require("../controller/article");

const router = express.Router();

router.route("/articles/search").get(rechercherArticles); // Route de recherche [cite: 89]
router.route("/articles").post(ajouterArticle).get(getTousArticles);
router.route("/articles/:id").get(getArticle).put(modifierArticle).delete(supprimerArticle);

module.exports = router;