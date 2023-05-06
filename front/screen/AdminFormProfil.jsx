import { Text, View , TextInput, Button } from 'react-native'
import {useState, useEffect, useContext} from 'react'
import styles from '../style'
import { defaultProfil } from '../assets/default-data'
import { TokenContext } from "../context/tokenContext"
import { api } from '../services/api'

const AdminFormModif = ({navigation, route}) => {
  const {token} = useContext(TokenContext)
  const [profil, setProfil] = useState({})
  const [erreur, setErreur] = useState({});

  useEffect( function(){
    const {id} = route.params
    if(id){
      api.getOneUser(id,token)
        .then( data => {
            if(data.status === "erreur") return  setErreur(data);
            setProfil(data.msg)
        })
        .catch(ex => setErreur({...ex}))
      return 
    }
    const cloneDefaultProfil = {...defaultProfil}
    delete cloneDefaultProfil.password
    cloneDefaultProfil.role = "admin/redacteur"
    setProfil(cloneDefaultProfil);
  } , [])

  const submit = () => {
    const {id} = route.params
    if(id){
      delete profil._id; 
      delete profil.createdAt; 
      delete profil.updatedAt; 
      delete profil.__v; 
      const urlPart = profil?.password  ? "" : "/no-password"
      api.updateUser(id,profil,token,urlPart)
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
      api.addUser(profil, token)
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
      <Text>Profil</Text>
      <TextInput placeholder='email' value={profil.email} onChangeText={(text) => setProfil({...profil , email : text})} style={styles.input}/>
      <TextInput placeholder='password laisser vide si voulez pas changer' value={profil.password} onChangeText={(text) => setProfil({...profil , password : text})} style={styles.input}/>
      <TextInput placeholder='role' value={profil.role} onChangeText={(text) => setProfil({...profil , role : text})} style={styles.input}/>
      <Button title={ route.params.id ? "modifier" : "ajouter"} onPress={submit} color={route.params.id ? "orange" : "green"} />
      {
            Object.keys(erreur).length > 0 && <Text style={ erreur.status === "success" ? styles.boxSuccess :  styles.boxErreur  }>{JSON.stringify(erreur.msg)}</Text>
        }
    </View>
  )
}

export default AdminFormModif