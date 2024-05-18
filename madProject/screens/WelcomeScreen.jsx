import { Image, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import LottieView from 'lottie-react-native';
import {useFonts} from 'expo-font';
import { Link,useRouter } from 'expo-router';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


const WelcomeScreen = ({navigation}) => {

    
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
    <SafeAreaView className="flex-1 pb-[80px]" style={{backgroundColor:"#7b49de"
}}>
    <StatusBar backgroundColor={"#7b49de"}/>
<View className="flex-1 flex justify-around my-4 mt-10">
<View className="flex">
<Text className="text-white mt-[100px] mb-[100px]  text-4xl text-center" style={{fontFamily:"Poppins-Bold"}}>
        Let's Get Started!
        <Image className="w-[300px] h-[300px] flex justify-center " source={require("../assets/under.png")}></Image>
    </Text>
    
</View>
    
    <View className="flex-row justify-center mb-[100px] items-center">
    {/* <Image className=" w-[250px] h-[250px] mb-[300px]" source={require('../assets/homework.png')} >
    </Image> */}
    <LottieView className="flex-1 w-[350px] h-[350px]" source={require('../assets/welcome1.json')} autoPlay loop />

    
    
    </View>

    <View className="mt-[100px]">
        <Text className="text-center text-3xl text-white" style={{fontFamily:"Poppins-Bold"}}>All <Text className="text-yellow-400 ">educational scheduling</Text> in one place</Text>
    </View>
    <View className="space-y-4 mt-[200px]">
        <TouchableOpacity onPress={()=>navigation.navigate('SignUp')} className="py-3 bg-yellow-400 mx-7 rounded-xl">
            <Text className="text-xl  text-center text-gray-700  "  style={{fontFamily:"Poppins-Bold"}}>Sign Up</Text>
           
            
        </TouchableOpacity>
        <View className="flex-row justify-center">
            <Text className="text-white font-semibold">Already have an account? </Text>
            <TouchableOpacity onPress={()=>navigation.navigate('Login')}>
                <Text className=" text-yellow-400" style={{fontFamily:"Poppins-Medium"}}>
                    Login In
                </Text>
            </TouchableOpacity>
        </View>
    </View>
</View>

    </SafeAreaView>
  )
}

export default WelcomeScreen

const styles = StyleSheet.create({
    text1:{
        color:"white",
        fontSize:30,
        fontWeight:"bold",
        textAlign:"center",
        marginTop:100,
        marginBottom:100,
        fontFamily:"Poppins-Black"
    }
})