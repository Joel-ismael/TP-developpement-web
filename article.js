class Article {
    constructor(titre, contenu, auteur, categorie, tags) {
        this.titre = titre;
        this.contenu = contenu;
        this.auteur = auteur;
        this.date = new Date().toISOString().split('T')[0]; // Format YYYY-MM-DD [cite: 94]
        this.categorie = categorie;
        this.tags = tags || [];
    }
}
module.exports = { Article };