import { FlatList, Text, View , Image , ActivityIndicator, Button } from 'react-native'
import React, { useEffect, useState } from 'react'
import  styles  from "../style"
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { api } from '../services/api'

const Accueil = ({navigation}) => {

  const [data, setData] = useState([]);

  useEffect(()=>{
    api.getAll("","oeuvre")
      .then( ({msg})=> {
        setData(msg)
      })
      .catch(ex => console.log(ex))
  }, [])

  const renderItem = ({item}) => {
    return (
      <View style={styles.box}>
        <Text  style={styles.boxTitle}>{item.nom}</Text>
        <View style={styles.centerMr5}>
          <Image source={{ uri : item.image }}  style= {{ height:200, width: 300 }} />
        </View>
        <Button title={"plus de détails"} onPress={() => navigation.navigate("single" , {id : item._id})} />
      </View>
    )
  }
  return (
    <View style={{flex:1}}>
        <View style={styles.centerMr5}>
          <MaterialCommunityIcons color={"black"} name={"golf-cart"} size={70} />
          <Text>Bienvenue !!</Text>
        </View>
        {data.length === 0 
          ? 
          <ActivityIndicator size={'large'} />
      :
        <FlatList 
            data={data}
            renderItem={renderItem}
            keyExtractor={item => item._id}
            style={styles.box}
        />}
    </View>
  )
}

export default Accueil

