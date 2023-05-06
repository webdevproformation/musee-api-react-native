const express = require("express");
require("dotenv").config();
const PORT = 4003;
const app = express();

require("./config/bdd")();
require("./config/routes")(app);

app.listen(process.env.PORT || PORT, () => console.log(`express start sur port ${process.env.PORT || PORT}`));