import { ActivityIndicator, Text, View , Image , Button, ScrollView } from 'react-native'
import {useEffect , useState} from 'react'
import  styles  from "../style"
import moment from "moment"
import { api } from '../services/api'

const Single = ({route , navigation}) => {
  const [data, setData] = useState({})

  useEffect(()=>{
    api.getOneOeuvre(route.params.id )
      .then( ({msg})=>  setData(msg))
  }, [])


  return (
    <View>
      {
        Object.keys(data).length === 0 
        ?
        <ActivityIndicator size={"large"} />
        : 
        <View style={styles.box}>
          <ScrollView>
            <Text style={styles.boxTitle}>{data.nom}</Text>
            <View style={styles.centerMr5}>
              <Image source={{ uri : data.image , width : 200, height : 300 }}  />
            </View>
            <Text style={styles.boxSep}>{data.description}</Text>
            <Text>par : {data.auteur}</Text>
            <Text >publié le : {moment(data.dt_creation).format('DD/MM/YYYY')}</Text>
            <View style={styles.boxSep} />
            <View style={styles.centerMr5}>
              <Button onPress={() => navigation.navigate("accueil-2")} title={"retour accueil"} color={"purple"} />
            </View>
          </ScrollView>
        </View>
      }
    </View>
  )
}
export default Single
