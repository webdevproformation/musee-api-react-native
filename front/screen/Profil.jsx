import { Button, ScrollView, View , Text } from 'react-native'
import React, { useContext } from 'react'
import { TokenContext } from '../context/tokenContext';
import AdminProfil from "./AdminProfil"
import styles from '../style';
import jwt_decode from "jwt-decode";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Profil = ({navigation}) => {
  const { token , setToken } = useContext(TokenContext);
  const decoded = jwt_decode(token);

  const logout = () => {
    setToken("");
    navigation.navigate("home");
  }
 
  return (
    <View style={styles.box}>
      <ScrollView>
        <View style={styles.centerMr5}>
          <MaterialCommunityIcons color={"black"} name={"golf-cart"} size={70} />
          <Text style={styles.mb10}>Bienvenue {decoded.email} - {decoded.role} !!</Text>
          <Button title="deconnexion" onPress={logout}/>
        </View>
        <AdminProfil navigation={navigation} name={"oeuvre"} ressource={"oeuvre"}/>
        {
          decoded.role === "admin" && <AdminProfil navigation={navigation} name={"profil"} ressource={"user"}/>
        }
        
      </ScrollView>
    </View>
  )
}

export default Profil
