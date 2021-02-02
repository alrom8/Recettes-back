const jwt = require("jsonwebtoken");
const utilisateurModele = require("../modeles/utilisateurModele");

module.exports.verifierUtilisateur = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, "aaaaabnnnn", (err, tokenDecode) => {
      if (err) {
        res.locals.utilisateur = null;
        res.cookie("jwt", "", { expiresIn: "1ms" });
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
