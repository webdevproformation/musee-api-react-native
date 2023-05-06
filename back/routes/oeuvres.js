const { Router } = require("express");
const { Oeuvre } = require("../model/model");
const { idValid, isValidOeuvre, autorisation, isRedacteurAdmin } = require("../middleware");

const route = Router();

route.post("/", [isValidOeuvre, autorisation , isRedacteurAdmin], async (request, response) => {
  const { body } = request;
  
  const oeuvreRecherche = await Oeuvre.find({ nom: body.nom });

  if (oeuvreRecherche.length > 0) return response.status(400).json({ msg: "cette oeuvre existe déjà" , status : "erreur" });
  
  const nouvelleOeuvre = new Oeuvre({ ...body });
  await nouvelleOeuvre.save();

  response.json({ msg: "oeuvre créée" , status : "success" });
});

route.get("/all", async (request, response) => {
  const toutesLesOeuvres = await Oeuvre.find();
  response.json({ msg: toutesLesOeuvres , status : "success" });
});

route.get("/:id", [ idValid ], async (request, response) => {
  const {id} = request.params;
  const oeuvreGetted = await Oeuvre.findById(id)

  if (!oeuvreGetted)
    return response
      .status(404)
      .json({ msg: `oeuvre introuvable pour l'id ${id}` , status : "erreur" });

  response.json({ msg: oeuvreGetted , status : "success" });
});

route.put("/:id", [idValid, isValidOeuvre , autorisation, isRedacteurAdmin], async (request, response) => {
  const {id} = request.params;
  const { body } = request;
  const oeuvreUpdated = await Oeuvre.findByIdAndUpdate(id,{ $set: body },{ new: true });

  if (!oeuvreUpdated)
    return response
      .status(404)
      .json({ msg: `oeuvre introuvable pour l'id ${id}` , status : "erreur" });

  response.json({ msg: `oeuvre ${id} updated` , status : "success" });
});

route.delete("/:id", [idValid, autorisation , isRedacteurAdmin], async (request, response) => {
  const {id} = request.params;
  const oeuvreDeleted = await Oeuvre.findByIdAndDelete(id);

  if (!oeuvreDeleted)
    return response
      .status(404)
      .json({ msg: `oeuvre introuvable pour l'id ${id}` , status : "erreur" });

    const toutesLesOeuvres = await Oeuvre.find();
    response.json({ msg: toutesLesOeuvres , status : "success" });
});

module.exports = route