

//const urlAPI = "http://10.0.2.2:4003";
const urlAPI = "https://musee-api-react-native-production.up.railway.app";

export const api = {
    getOneUser : (id , token) => {
        return fetch(`${urlAPI}/user/${id}` , { headers:{ "x-token" : token}})
                    .then(rep => rep.json())
    },
    getAll : (token , ressource) => {
        return fetch(`${urlAPI}/${ressource}/all`  ,  {headers : {"x-token" : token}} )
        .then(result=> result.json())
    },
    delete : (id, token , ressource) => {
        return fetch(`${urlAPI}/${ressource}/${id}`, { method : "DELETE" , headers : {"x-token" : token} })
        .then(result=> result.json()) 
    },
    addUser : (profil , token) => {
        return fetch(`${urlAPI}/user` , {method: "POST", body: JSON.stringify(profil), headers:{"content-type" : "application/json", "x-token" : token}})
        .then(rep => rep.json())
    },
    updateUser : (id , profil , token , urlPart) => {
        return fetch(`${urlAPI}/user${urlPart}/${id}` , {method: "PUT", body: JSON.stringify(profil), headers:{"content-type" : "application/json", "x-token" : token}})
        .then(rep => rep.json())
    },
    getOneOeuvre : (id) => {
        return fetch(`${urlAPI}/oeuvre/${id}` )
        .then(rep => rep.json())
    },
    addOeuvre : (oeuvre , token) => {
        return fetch(`${urlAPI}/oeuvre` , {method: "POST", body: JSON.stringify(oeuvre), headers:{"content-type" : "application/json", "x-token" : token}})
        .then(rep => rep.json())
    },
    updateOeuvre : (id , oeuvre , token) => {
        return fetch(`${urlAPI}/oeuvre/${id}` , {method: "PUT", body: JSON.stringify(oeuvre), headers:{"content-type" : "application/json", "x-token" : token}})
        .then(rep => rep.json())
    },
    login : (identifiants) => {
        return fetch(`${urlAPI}/login` , {method: "POST", body: JSON.stringify(identifiants), headers:{"content-type" : "application/json"}})
        .then(rep => rep.json())
    }
}