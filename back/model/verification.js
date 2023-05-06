const Joi = require("joi");

const schemaJoiOeuvre = Joi.object({
  nom: Joi.string().min(5).max(255).required(),
  description: Joi.string().min(5).max(10000).required(),
  image: Joi.string().min(5).max(600).optional(),
  auteur: Joi.string().min(5).max(255).required(),
  dt_creation: Joi.date().optional()
});

const schemaJoiUser = Joi.object({
  email: Joi.string().min(5).max(255).required(),
  password: Joi.string().regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/).required(),
  role: Joi.string().valid("admin", "redacteur").optional()
});


const schemaJoiUserNoPassword = Joi.object({
  email: Joi.string().min(5).max(255).required(),
  password: Joi.string().regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/).optional(),
  role: Joi.string().valid("admin", "redacteur").required()
});

module.exports.schemaJoiOeuvre = schemaJoiOeuvre;
module.exports.schemaJoiUser = schemaJoiUser;
module.exports.schemaJoiUserNoPassword = schemaJoiUserNoPassword;