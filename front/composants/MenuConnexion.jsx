import { createNativeStackNavigator } from "@react-navigation/native-stack"; 
import Connexion from "../screen/Connexion";
import CreerProfil from "../screen/CreerProfil";

const Stack = createNativeStackNavigator();

const MenuConnexion = () => {
    return(
        <Stack.Navigator>
            <Stack.Screen name="connexion-2" component={Connexion} options={{ 
                title : "Accéder à l'espace de gestion"
            }} />
            <Stack.Screen name="creer-profil" component={CreerProfil} options={{ 
                title : "Créer un profil rédacteur"
            }}/>
        </Stack.Navigator>
    ) 
}

export default MenuConnexion ; 