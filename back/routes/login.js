const { Router } = require("express");
const { User } = require("../model/model");
const { compare } = require("bcrypt");
const JWT = require("jsonwebtoken");
const { isValidConnect } = require("../middleware");

const route = Router();

route.post("/", [isValidConnect], async (request, response) => {
  const { body } = request;
  const userSearch = await User.findOne({ email: body.email });
  if (!userSearch)
    return response
      .status(404)
      .json({ msg: "ce profil n'existe pas" , status : "erreur" });

  const verif = await compare(body.password, userSearch.password);
  if (!verif)
    return response
      .status(404)
      .json({ msg: "identifiants invalides" , status : "erreur" });

  const profilSansMotPass = {
    _id: userSearch._id,
    email: userSearch.email,
    role: userSearch.role ? userSearch.role : "redacteur",
  };

  const token = JWT.sign(profilSansMotPass, process.env.CLE_PRIVEE_JWT);

  response.json({ msg: "Bienvenue", token: token , status : "success" });
});

module.exports = route;
