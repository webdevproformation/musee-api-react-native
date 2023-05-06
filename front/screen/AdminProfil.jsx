import { Text, View , Button , Image } from 'react-native'
import React, { useEffect, useState , useContext } from 'react'
import styles from '../style';
import { TokenContext } from '../context/tokenContext';
import { api } from '../services/api'

const AdminProfil = ({navigation , name , ressource }) => {

  const {token} = useContext(TokenContext)
  const [data, setData] = useState([]);
  const [erreur, setErreur] = useState({})

  useEffect(()=>{
    api.getAll(token , ressource)
      .then( data => {
        if(data.status === "erreur"){
            setErreur(data);
        }else {
            setData(data.msg)
        }
      })
  }, []);

  const supprimer = (id) => {
    api.delete(id,token,ressource) 
      .then(  data => {
        if(data.status === "erreur"){
            setErreur(data);
        }else {
            setData(data.msg)
        }
      })
  }

  return (
    <View>
      <Text style={styles.boxTitle}>Gestion des {name}s</Text>
        <Button onPress={() => navigation.navigate(`form-${name}`, {id : null})} title={"ajouter"}/>
        <View style={styles.box}>
            {Object.keys(erreur).length !== 0
                ?
                <Text style={styles.boxErreur}>{ JSON.stringify(erreur.msg) }</Text>
                :
                data.map(function(item){
                    return <View style={[styles.box, styles.boxBtn ]} key={item._id}>
                        { name === "oeuvre" ? 
                            <Image source={{ uri : item.image }} width={100}  height={100} style={{ resizeMode: 'cover' }} />
                        : 
                            <Text style={styles.mr10}>{ item.email } - {item.role.slice(0, 5)}</Text>
                        }
                        <View style={styles.boxBtn}>
                        <Button title={"modifier"} onPress={() => navigation.navigate(`form-${name}` , {id : item._id}  )} color={"orange"} />
                        <Button title={"supprimer"} onPress={() => supprimer(item._id)} color={"red"} />
                    </View>
                </View>
                })
            }
        </View>
    </View>
  )
}
export default AdminProfil