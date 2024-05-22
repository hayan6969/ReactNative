import { View, Text, StatusBar } from 'react-native'
import React from 'react'
import LottieView from 'lottie-react-native';
import {useFonts} from 'expo-font';


const Loader = () => {
    const [loaded, ferror] = useFonts({
        'Poppins-Black': require('../assets/fonts/Poppins-Black.ttf'),
        'Poppins-Bold': require('../assets/fonts/Poppins-Bold.ttf'),
        'Poppins-ExtraBold': require('../assets/fonts/Poppins-ExtraBold.ttf'),
        'Poppins-ExtraLight': require('../assets/fonts/Poppins-ExtraLight.ttf'),
        'Poppins-Light': require('../assets/fonts/Poppins-Light.ttf'),
        'Poppins-Medium': require('../assets/fonts/Poppins-Medium.ttf'),
        'Poppins-Regular': require('../assets/fonts/Poppins-Regular.ttf'),
        'Poppins-SemiBold': require('../assets/fonts/Poppins-SemiBold.ttf'),
        'Poppins-Thin': require('../assets/fonts/Poppins-Thin.ttf'),
    
        })
    if (!loaded) {
        return null;
       
    }
  return (
    <View className='flex-1 flex-col items-center ' style={{backgroundColor:'#7b49de'}}>
        <StatusBar backgroundColor={"#7b49de"}/>
          <LottieView className="flex-1 w-[300px] h-[300px]" source={require('../assets/kittyLoader.json')} speed={1.5} autoPlay loop />

    </View>
  )
}

export default Loader