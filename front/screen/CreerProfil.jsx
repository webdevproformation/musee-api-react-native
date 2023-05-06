import { Button, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import styles from "../style"
import { defaultProfil } from '../assets/default-data'
import { api } from '../services/api'

const CreerProfil = ({navigation}) => {

    const [identifiants, setIdentifiants] = useState(defaultProfil)
    const [erreur, setErreur] = useState({})

    const submit = () => {
      api.addUser(identifiants , "")
            .then( data => {
                if(data.status === "erreur"){
                    setErreur(data);
                }else {
                    setErreur(data);
                    setTimeout( function(){
                        setIdentifiants(defaultProfil)
                        setErreur({})
                        navigation.reset({
                          index: 0,
                          routes: [{ name: 'connexion-2' }]
                        })
                    } , 1000)
                }
            })
            .catch(ex => setErreur({...ex}))
    }

    const reset = () => {
        navigation.reset({
            index: 0,
            routes: [{ name: 'connexion-2' }]
       })
    }

  return (
    <View style={[styles.box , {flex : 1, justifyContent : "center"}]}>
      <Text style={styles.boxTitle}>Créer un profil</Text>
      <View>
        <TextInput placeholder='email' style={styles.input} value={identifiants.email} onChangeText={(text) => setIdentifiants({...identifiants, email : text})}/>
        <TextInput placeholder='password' style={styles.input} value={identifiants.password} onChangeText={(text) => setIdentifiants({...identifiants, password : text})}/>
        <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
          <Button title='Créer' style={styles.bouton} onPress={submit} />
          <Button title='Annuler' style={styles.bouton} onPress={reset} color="orange"/>
        </View>
      </View>
        {
            Object.keys(erreur).length > 0 && <Text style={ erreur.status === "success" ? styles.boxSuccess :  styles.boxErreur  }>{JSON.stringify(erreur.msg)}</Text>
        }
    </View>
  )
}

export default CreerProfil