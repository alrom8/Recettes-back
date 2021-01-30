const mongoose = require("mongoose");
const recetteModele = require("./recetteModele");
require("./recetteModele");
const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');

const utilisateurSchema = new Schema({
  pseudo: { type: String, required: true, unique: true },
  mdp: { type: String, required: true },
  recettes: [recetteModele.recetteSchema],
  recettesFavorites : [recetteModele.recetteSchema],  
  imageProfil: String,
});

utilisateurSchema.plugin(uniqueValidator);


const utilisateurModele = mongoose.model("Utilisateur", utilisateurSchema);

module.exports = utilisateurModele;
