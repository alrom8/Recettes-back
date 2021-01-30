const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const recetteSchema = new Schema({
  nom: String,
  description: String,
  idAuteurRecette: String,
  image: String,
  calories: Number,
  ingredients: [String],
  preparation: [String],
  commentaires: [
    {
      idAuteurCommentaire: String,
      texte: String,
      note: Number,
    },
  ],
  dateCreation: { type: Date, default: Date.now },
});

const recetteModele = mongoose.model("Recette", recetteSchema);

module.exports = { recetteModele, recetteSchema };
