const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
require("../modeles/recetteModele");
let recetteModele = mongoose.model("Recette");

router.post("/", (req, res) => {
  recetteModele
    .create(req.body)
    .then(() => res.status(200).send("Recette ajoutée"))
    .catch(() =>
      res.status(400).send("Erreur lors de la création de la recette")
    )
});

//Route permettant de récupérer toutes les recettes, sans filtre
router.get("/", (req, res) => {
  recetteModele
    .find()
    .then((recettes) => {
      res.status(200).send(recettes)
    })
    .catch(() => res.status(404).json({ messageErreur: "Aucune recette" }))
});

//Route permettant de récupérer la recette dont l'identifiant est spécifié
router.get("/:id", (req, res) => {
  recetteModele
    .findById(req.params.id)
    .then((recette) => {
      res.status(200).send(recette)
    })
    .catch(() =>
      res.status(404).json({ messageErreur: "Recette non trouvée" })
    )
});

router.put("/:id", (req, res) => {
  recetteModele
    .findByIdAndUpdate(req.params.id, req.body, { useFindAndModify: false })
    .then(() => {
      res.status(200).send("Recette modifiée")
    })
    .catch((err) => {
      res.send("Erreur lors de la modification de la recette => " + err)
    })
});

router.delete("/:id", (req, res) => {
  recetteModele
    .findByIdAndDelete(req.params.id)
    .then(() => {
      res.status(200).send("La recette a bien été supprimée")
    })
    .catch(() => {
      res.status(400).json({ messageErreur: "Erreur lors de la suppression" })
    })
});

module.exports = router;
