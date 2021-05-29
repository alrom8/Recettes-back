const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { verifierUtilisateur } = require("../middlewares/auth.middleware");
require("../modeles/utilisateurModele");

let utilisateurModele = mongoose.model("Utilisateur");

//pour une raison inconnue, cette route doit figurer avant la route "connexion" pour fonctionner
router.get("/deconnexion", (req, res) => {
  res.cookie("jwt", "", { maxAge: 1 }); //maxAge = durée après laquelle le token est détruit
  res.redirect("/"); // la requête n'aboutit pas sans cette ligne
});

router.get("/", (req, res) => {
  utilisateurModele
    .find()
    .then((utilisateurs) => res.status(200).send(utilisateurs))
    .catch(() => res.sendStatus(400));
});

router.get("/:id", (req, res) => {
  utilisateurModele
    .findById(req.params.id)
    .then((utilisateur) => res.status(200).send(utilisateur))
    .catch(() => res.sendStatus(400));
});

router.put("/:id", (req, res) => {
  utilisateurModele
    .findByIdAndUpdate(req.params.id, req.body, { useFindAndModify: false })
    .then(() => res.sendStatus(200))
    .catch(() => res.sendStatus(400));
});

router.delete("/:id", (req, res) => {
  utilisateurModele
    .findByIdAndDelete(req.params.id)
    .then(() => res.sendStatus(200))
    .catch(() => res.sendStatus(400));
});

router.post("/inscription", (req, res) => {
  bcrypt.hash(req.body.mdp, 10, (err, hash) => {
    req.body.mdp = hash;
    utilisateurModele
      .create(req.body)
      .then(() => res.sendStatus(200))
      .catch(() => res.sendStatus(400));
  });
});

router.post("/connexion", (req, res) => {
  utilisateurModele
    .find({ pseudo: req.body.pseudo })
    .then((utilisateurs) => {
      if (utilisateurs.length == 0) {
        res.status(400).send("Pseudo ou mot de passe incorrect");
      }
      for (utilisateur of utilisateurs) {
        bcrypt
          .compare(req.body.mdp, utilisateur.mdp)
          .then((estValide) => {
            if (estValide) {
              res.cookie(
                "jwt",
                jwt.sign({ idUtilisateur: utilisateur.id }, "aaaaabnnnn", {
                  expiresIn: "24h",
                }),
                { httpOnly: true }
              );
              res.status(200).send(utilisateur.pseudo);
            }
            res.status(400).send("Pseudo ou mot de passe incorrect");
          })
          .catch((err) => res.status(400).json(err));
      }
    })
    .catch((err) => res.status(400).json(err));
});

module.exports = router;
