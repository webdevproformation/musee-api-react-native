import { createNativeStackNavigator } from "@react-navigation/native-stack"; 
import Profil from "../screen/Profil";
import AdminFormOeuvre from "../screen/AdminFormOeuvre";
import AdminFormProfil from "../screen/AdminFormProfil";

const Stack = createNativeStackNavigator();

const MenuProfil = () => {
    return(
        <Stack.Navigator>
            <Stack.Screen name="profil-2" component={Profil} options={{ 
                title : "Espace de Gestion 🔥"
            }} />
            <Stack.Screen name="form-oeuvre" component={AdminFormOeuvre} options={{ 
                title : "Gestion Oeuvre 🎨"
            }}/>
            <Stack.Screen name="form-profil" component={AdminFormProfil} options={{ 
                title : "Gestion Profil 👤"
            }}/>
        </Stack.Navigator>
    ) 
}

export default MenuProfil ; 