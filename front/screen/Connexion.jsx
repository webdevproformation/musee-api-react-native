import { Button, Text, TextInput, View } from 'react-native'
import React, { useState,  useContext } from 'react'
import { TokenContext } from "../context/tokenContext"
import styles from "../style"
import { defaultProfil } from '../assets/default-data'
import { api } from '../services/api'

const Connexion = ({navigation}) => {

    const {setToken} = useContext(TokenContext);
    const [identifiants , setIdentifiants] = useState(defaultProfil);
    const [erreur, setErreur] = useState({})

    const submit = () => {
      api.login(identifiants)
          .then((data) => {
              if(data.status === "erreur"){
                  setErreur(data);
              }else { 
                  setErreur(data);
                  setToken(data.token);
                  setTimeout( function(){
                      setIdentifiants(defaultProfil);
                      setErreur({})
                      navigation.navigate("home")
                  } , 1000)
              }
          })
          .catch(ex => setErreur({...ex}))
  }

  return (
    <View style={[styles.box , {flex : 1, justifyContent : "center"}]}>
      <Text style={styles.boxTitle}>Connexion</Text>
      <View>
      <TextInput placeholder='email' style={styles.input} value={identifiants.email} onChangeText={(text) => setIdentifiants({...identifiants , email : text})}/>
        <TextInput placeholder='password' style={styles.input} value={identifiants.password} onChangeText={(text) => setIdentifiants({...identifiants , password : text})}/>
        <View style={styles.boxBtn}>
          <Button title='créer un compte' style={styles.bouton} onPress={() => navigation.navigate("creer-profil") } color={"green"} />
          <Button title='Connexion' style={styles.bouton} onPress={submit} />
        </View>
      </View>
      {
            Object.keys(erreur).length > 0 && <Text style={ erreur.status === "success" ? styles.boxSuccess :  styles.boxErreur  }>{JSON.stringify(erreur.msg)}</Text>
        }
    </View>
  )
}

export default Connexion