const express = require('express');
const { connecter } = require("./bd/connect");
const routesArticle = require("./router/article");

const app = express();
app.use(express.json());

app.use("/api", routesArticle); // Endpoint de base [cite: 46]

connecter("mongodb://127.0.0.1:27017/", (erreur) => {
    if (erreur) {
        console.log("Erreur de connexion MongoDB");
        process.exit(-1);
    } else {
        console.log("Serveur prêt sur le port 3000");
        app.listen(3000);
    }
});