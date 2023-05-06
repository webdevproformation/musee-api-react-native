const { Router } = require("express");
const { User } = require("../model/model");
const { genSalt, hash } = require("bcrypt");
const { idValid, isValidUser, autorisation , isAdmin  , isValidUserNoPassword  } = require("../middleware");

const route = Router();

route.post("/", [isValidUser], async (request, response) => {
  const { body } = request;
  const oneUser = await User.findOne({ email: body.email });
  if ( oneUser) return response.status(400).json({ msg: "email déjà pris",  status : "erreur" });

  const salt = await genSalt(10);
  const passwordHashe = await hash(body.password, salt);
  const userACreer = new User({ ...body, password: passwordHashe });
  await userACreer.save();
  response.json({ msg: "profil créé",  status : "success" });
});

route.get("/all",  [ autorisation , isAdmin ] , async (request, response) => {
  const allUsers = await User.find({}).select({ _id: 1, email: 1, role: 1 });
  response.json({msg : allUsers, status : "success"});
});

route.get("/:id", [idValid , autorisation , isAdmin ], async (request, response) => {
  const { id } = request.params
  const oneUser = await User.findById(id).select({ _id: 1, email: 1, role: 1 });
  response.json({msg : oneUser, status : "success"});
});

route.delete("/:id", [idValid,  autorisation ,isAdmin ], async (request, response) => {
  const { id } = request.params

  const utilisateurASupprimer = await User.findByIdAndRemove(id);

  if (!utilisateurASupprimer)
    return response
      .status(404)
      .json({ msg: `profil introuvable pour l'id ${id}`, status : "erreur" });
      const allUsers = await User.find().select({ _id: 1, email: 1, role: 1 });
      response.json({msg : allUsers, status : "success"});
});

/** 
 * mis à jour d'un profil avec mot de password à hasher
 */
route.put("/:id", [idValid, isValidUser,  autorisation , isAdmin], async (request, response) => {
    const {id} = request.params;
    const { body } = request;

    const salt = await genSalt(10);
    const passwordHashe = await hash(body.password, salt);
    body.password = passwordHashe ; 

    const updateUser = await User.findByIdAndUpdate(id, { $set: body } , {new : true});
    if (!updateUser)
      return response
        .status(404)
        .json({ msg: `profil introuvable pour l'id ${id}`, status : "erreur" });
    response.json({msg : "profil mis à jour" , status : "success"});
  }
);

/** 
 * mis à jour d'un profil sans changer le mot de password
 */
route.put("/no-password/:id", [idValid, isValidUserNoPassword,   autorisation , isAdmin], async (request, response) => {
  const {id} = request.params;
  const { body } = request;

  const updateUser = await User.findByIdAndUpdate(id, { $set: body } , {new : true});
  if (!updateUser)
    return response
      .status(404)
      .json({ msg: `profil introuvable pour l'id ${id}`, status : "erreur" });
  response.json({msg : "profil mis à jour" , status : "success"});
}
);

module.exports = route;