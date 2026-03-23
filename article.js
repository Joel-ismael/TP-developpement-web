const { Article } = require("../model/article");
const client = require("../bd/connect");
const { ObjectId } = require("mongodb");

const ajouterArticle = async (req, res) => {
    const { titre, contenu, auteur, categorie, tags } = req.body;
    if (!titre || !auteur || !contenu) {
        return res.status(400).json({ error: "Validation échouée : titre et auteur obligatoires" });
    }
    try {
        const nouvelArticle = new Article(titre, contenu, auteur, categorie, tags);
        let result = await client.bd().collection("articles").insertOne(nouvelArticle);
        res.status(201).json({ message: "Article créé", id: result.insertedId });
    } catch (e) { res.status(500).json(e); }
};

const getTousArticles = async (req, res) => {
    try {
        const { categorie, auteur, date } = req.query;
        let filtre = {};
        if (categorie) filtre.categorie = categorie;
        if (auteur) filtre.auteur = auteur;
        if (date) filtre.date = date;
        let result = await client.bd().collection("articles").find(filtre).toArray();
        res.status(200).json(result);
    } catch (e) { res.status(500).json(e); }
};

const rechercherArticles = async (req, res) => {
    try {
        const query = req.query.query;
        let result = await client.bd().collection("articles").find({
            $or: [
                { titre: { $regex: query, $options: "i" } },
                { contenu: { $regex: query, $options: "i" } }
            ]
        }).toArray();
        res.status(200).json(result);
    } catch (e) { res.status(500).json(e); }
};

const getArticle = async (req, res) => {
    try {
        let result = await client.bd().collection("articles").findOne({ _id: new ObjectId(req.params.id) });
        result ? res.status(200).json(result) : res.status(404).json({ msg: "Not Found" });
    } catch (e) { res.status(400).json({ error: "ID invalide" }); }
};

const modifierArticle = async (req, res) => {
    try {
        const { titre, contenu, categorie, tags } = req.body;
        let result = await client.bd().collection("articles").updateOne(
            { _id: new ObjectId(req.params.id) },
            { $set: { titre, contenu, categorie, tags } }
        );
        res.status(200).json({ msg: "Modification réussie" });
    } catch (e) { res.status(500).json(e); }
};

const supprimerArticle = async (req, res) => {
    try {
        await client.bd().collection("articles").deleteOne({ _id: new ObjectId(req.params.id) });
        res.status(200).json({ msg: "Suppression réussie" });
    } catch (e) { res.status(500).json(e); }
};

module.exports = { ajouterArticle, getTousArticles, getArticle, modifierArticle, supprimerArticle, rechercherArticles };