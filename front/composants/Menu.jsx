import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { TokenContext } from '../context/tokenContext';
import { useContext } from 'react';

import MenuAccueil from './MenuAccueil';
import MenuConnexion from './MenuConnexion';
import MenuProfil from './MenuProfil';

const Tab = createBottomTabNavigator();


const Menu = function(){
    const {token} = useContext(TokenContext)

    return <NavigationContainer>
    <Tab.Navigator screenOptions={ 
      {
        tabBarActiveBackgroundColor : "#eee",
        tabBarStyle : { borderColor: "#ccc", borderWidth:2 } , 
        headerShown : false,
        unmountOnBlur : true 
    }}>
      <Tab.Screen name='home' component={MenuAccueil}
      options={{ 
        tabBarIcon : function(){
          return <MaterialCommunityIcons name='home' color="black" size={30}/>
        } ,
        headerShown : false}} />
        {token === "" ?
        
        <Tab.Screen name='connexion' component={MenuConnexion}
        options={{tabBarIcon : function() {
         return <MaterialCommunityIcons name='login' color="black" size={30}/>
           }}}/>
        :
        <Tab.Screen name='profil' component={MenuProfil}
     options={{tabBarIcon : function() {
      return <MaterialCommunityIcons name='account-box-outline' color="black" size={30}/>
     }}}/>
        }
    
     
    </Tab.Navigator>
  </NavigationContainer>
}

export default Menu ;