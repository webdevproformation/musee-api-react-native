import { createNativeStackNavigator } from "@react-navigation/native-stack"; 
import Accueil from "../screen/Accueil";
import Single from "../screen/Single";

const Stack = createNativeStackNavigator();

const MenuAccueil = () => {
    return(
        <Stack.Navigator>
            <Stack.Screen name="accueil-2" component={Accueil} options={{  title : "TP Musée", }} />
            <Stack.Screen name="single" component={Single} />
        </Stack.Navigator>
    ) 
}

export default MenuAccueil ; 