const PORT = 80;
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
require("./modeles/dbConfig");
const recettesRoute = require("./routes/recettesRoute");
const utilisateursRoute = require("./routes/utilisateursRoute");

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
app.use("/api/recettes", recettesRoute);
app.use("/api/utilisateurs", utilisateursRoute);

app.listen(PORT, () => console.log("Serveur connecté sur le port " + PORT));
