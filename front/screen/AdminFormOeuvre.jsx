import { Text, View , TextInput , Button } from 'react-native'
import React , {useState, useEffect , useContext } from 'react'
import styles from '../style'
import { defaultOeuvre } from '../assets/default-data'
import { TokenContext } from "../context/tokenContext"
import { api } from '../services/api'

const AdminFormAddOeuvre = ({navigation, route}) => {
  const {token} = useContext(TokenContext)
  const [oeuvre , setOeuvre] = useState({})
  const [erreur, setErreur] = useState({});

  useEffect( function(){
    const {id} = route.params
    if(id){
      api.getOneOeuvre(id)
        .then( data => {
            if(data.status === "erreur") return  setErreur(data);
            setOeuvre(data.msg)
        })
        .catch(ex => setErreur({...ex}))
      return 
    }
    setOeuvre(defaultOeuvre)
  } , [])


  const submit = () => {
    const {id} = route.params
    if(id){
      delete oeuvre._id; 
      delete oeuvre.dt_creation; 
      delete oeuvre.createdAt; 
      delete oeuvre.updatedAt; 
      delete oeuvre.__v; 
      api.updateOeuvre(id, oeuvre, token)
        .then( data => {
            setErreur(data);
            if(data.status === "erreur") return  
            setTimeout( function(){
                setErreur({})
                navigation.reset({
                  index: 0,
                  routes: [{ name: 'profil-2' }]
              })
            } , 2000)
            
        })
        .catch(ex => setErreur({...ex}))
    } else {
      api.addOeuvre(oeuvre, token)
        .then( data => {
            setErreur(data);
            if(data.status === "erreur") return  
            setTimeout( function(){
                setErreur({})
                navigation.reset({
                  index: 0,
                  routes: [{ name: 'profil-2' }]
              })
            } , 2000)
            
        })
        .catch(ex => setErreur({...ex}))
    }
}

  return (
    <View style={styles.box}>
      <Text>Oeuvre</Text>
      <TextInput placeholder='nom' value={oeuvre.nom} onChangeText={(text) => setOeuvre({...oeuvre , nom : text})} style={styles.input}/>
      <TextInput placeholder='description' value={oeuvre.description} onChangeText={(text) => setOeuvre({...oeuvre , description : text})} style={styles.input}  multiline={true} numberOfLines={5} />
      <TextInput placeholder='image' value={oeuvre.image} onChangeText={(text) => setOeuvre({...oeuvre , image : text})} style={styles.input} />
      <TextInput placeholder='auteur' value={oeuvre.auteur} onChangeText={(text) => setOeuvre({...oeuvre , auteur : text})} style={styles.input} />
      <Button title={ route.params.id ? "modifier" : "ajouter"} onPress={submit} color={route.params.id ? "orange" : "green"} />
      {
            Object.keys(erreur).length > 0 && <Text style={ erreur.status === "success" ? styles.boxSuccess :  styles.boxErreur  }>{JSON.stringify(erreur.msg)}</Text>
        }
    </View>
  )
}

export default AdminFormAddOeuvre