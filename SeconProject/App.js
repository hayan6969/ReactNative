import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import Box from './app/box';


export default function App() {
  return (
    <View classname="bg-red-600 font-sans font-bold">
      <Text classname="text-3xl font-bold">Open up App.js to start working on your app!</Text>
      
      <Box/>
    </View>
    
    
  );

}


