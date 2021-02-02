const PORT = 80;
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser")
const {verifierUtilisateur} = require("./middlewares/auth.middleware")
require("./modeles/dbConfig");
const recettesRoute = require("./routes/recettesRoute");
const utilisateursRoute = require("./routes/utilisateursRoute");

app.use(cookieParser());
app.use(bodyParser.json());
app.use((req, res, next) => {
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

app.get("*", verifierUtilisateur)

app.use("/api/recettes", recettesRoute);
app.use("/api/utilisateurs", utilisateursRoute);

app.listen(PORT, () => console.log("Serveur connecté sur le port " + PORT));
