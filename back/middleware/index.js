const { isValidObjectId } = require("mongoose");
const JWT = require("jsonwebtoken");
const {
  schemaJoiUser,
  schemaJoiOeuvre,
  schemaJoiUserNoPassword
} = require("../model/verification");


function isValidUser(request, response, next) {
  const { body } = request;
  const { error } = schemaJoiUser.validate(body, { abortEarly: false });

  if (error) return response.status(400).json({msg : error.details, status : "erreur"});
  next();
}

function isValidOeuvre(request, response, next) {
  const { body } = request;
  const { error } = schemaJoiOeuvre.validate(body, { abortEarly: false });

  if (error) return response.status(400).json({msg : error.details, status : "erreur"});
  next();
}

function isValidUserNoPassword(request, response, next){
  const { body } = request;
  const { error } = schemaJoiUserNoPassword.validate(body, { abortEarly: false });

  if (error) return response.status(400).json({msg : error.details, status : "erreur"});
  next();
}


function isValidConnect(request, response, next) {
  const { body } = request;
  const { error } = schemaJoiUser.validate(body, { abortEarly: false });

  if (error) return response.status(400).json({msg : error.details, status : "erreur"});
  next();
}

function idValid(request, response, next) {
  const id = request.params.id;

  if (!isValidObjectId(id))
    return response
      .status(400)
      .json({ msg: `id ${id} invalid`, where: "middleware", status : "erreur" });
  next();
}

function autorisation(request, response, next) {
  const token = request.header("x-token");

  if (!token)
    return response
      .status(401)
      .json({
        msg: "vous n'avez pas le token JWT necessaire pour cette opération", status : "erreur"
      });
  try {
    const payload = JWT.verify(token, process.env.CLE_PRIVEE_JWT);
    request.user = payload
    next();
  } catch (ex) {
    response.status(400).json({ msg: "JWT invalid" , status : "erreur" });
  }
}

function isAdmin(request, response, next) {
  if (request.user.role !== "admin")
    return response
      .status(403)
      .json({ msg: "Vous devez être admin pour effectuer cette action", status : "erreur" });
  next();
}

function isRedacteurAdmin(request, response, next) {
  if (!["redacteur", "admin"].includes(request.user.role) )
    return response
      .status(403)
      .json({ msg: "Vous devez être redacteur pour effectuer cette action", status : "erreur" });
  next();
}

module.exports.idValid = idValid;
module.exports.isValidOeuvre = isValidOeuvre;
module.exports.isValidUser = isValidUser;
module.exports.isValidConnect = isValidConnect;
module.exports.isAdmin = isAdmin;
module.exports.autorisation = autorisation;
module.exports.isRedacteurAdmin = isRedacteurAdmin;
module.exports.isValidUserNoPassword = isValidUserNoPassword;