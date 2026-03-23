const { MongoClient, Db } = require("mongodb");

var client = null;

function connecter(url, callback){
    if(client == null){
        client = new MongoClient(url);
        client.connect()
            .then(() => callback())
            .catch((erreur) => {
                client = null;
                callback(erreur);
            });
    } else {
        callback();
    }
}

function bd(){
    // On retourne l'accès à la base de données "dbok"
    return client.db("dbok"); 
}

function fermerConnexion(){
    if (client){
        client.close();
        client = null;
    }
}

module.exports = { connecter, bd, fermerConnexion };