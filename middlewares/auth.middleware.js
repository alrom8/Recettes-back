const jwt = require("jsonwebtoken");
const utilisateurModele = require("../modeles/utilisateurModele");

module.exports.verifierUtilisateur = (req, res, next) => {
  const token = req.cookies.jwt; //récupère le cookie dont nom est "jwt"
  if (token) {
    jwt.verify(token, "aaaaabnnnn", (err, tokenDecode) => { //"aaaaabnnnn" = clé permettant de décoder le token, on la retrouve lors de la route de connexion
      if (err) {
        res.locals.utilisateur = null; //res.locals.user est un objet temporaire (même durée de vie que la requête) qui contient les infos de l'utilisateur (dont son id)
        res.cookie("jwt", "", { expiresIn: "1ms" }); //destruction du token altéré ou faux
        next();
      } else {
        utilisateurModele
          .findById(tokenDecode.idUtilisateur)
          .then((utilisateur) => {
            res.locals.utilisateur = utilisateur;
          });
        next();
      }
    });
  } else {
    res.local.utilisateur = null;
    next();
  }
};
