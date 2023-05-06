const express = require("express")
const cors = require("cors")

module.exports = function(app){
    app.use(cors());
    app.use(express.json());
    app.get("/" , function(request, response){
        response.json({msg : "Hello"})
    })
    app.use("/user", require("../routes/users"));
    app.use("/oeuvre", require("../routes/oeuvres"));
    app.use("/login" , require("../routes/login"));
}