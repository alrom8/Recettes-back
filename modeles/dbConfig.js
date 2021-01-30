const mongoose = require("mongoose");

mongoose.connect(
  "mongodb://localhost:27017/AppliRecettesDb",
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    err
      ? console.log("Connexion à la bdd échouée")
      : console.log("Connexion à la bdd réussie");
  }
);
