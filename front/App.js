import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import Menu from "./composants/Menu"
import {TokenContextProvider} from "./context/tokenContext"
// import 'react-native-gesture-handler';

export default function App() {
  return (
    <View style={styles.container}>
      <TokenContextProvider>
        <Menu />
      </TokenContextProvider>
      <StatusBar style="auto" hidden={true}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
});
