const { connect } = require("mongoose");
const URI = process.env.BDD_PROD;

module.exports = function(){
    connect(URI)
    .then(() => console.log("connexion mongo DB réussie"))
    .catch((ex) => console.log(ex));
}