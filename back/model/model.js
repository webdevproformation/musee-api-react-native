const { Schema, model } = require("mongoose");

const oeuvreSchema = new Schema({
  nom: String,
  description: String,
  image:  { type: String , default : "https://picsum.photos/200/300" },
  auteur: String,
  dt_creation: { type : Date , default : Date.now()},
} , {
  timestamps : true,
});

const Oeuvre = model("oeuvres", oeuvreSchema);

const userSchema = new Schema({
  email: String,
  password: String,
  role: { type: String, enum: ['admin', 'redacteur'] , default : "redacteur" },
}, {
  timestamps : true,
});

const User = model("users", userSchema);

module.exports.Oeuvre = Oeuvre;
module.exports.User = User;
