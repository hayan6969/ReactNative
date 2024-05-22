import { Image, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import LottieView from 'lottie-react-native';
import {useFonts} from 'expo-font';
import { Link,useRouter } from 'expo-router';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { auth } from '../config/firebase';
import { signOut } from 'firebase/auth';
import useAuth from '../hooks/useAuth';
import db from "../config/firebase";
import { useEffect } from 'react';
import { onSnapshot } from 'firebase/firestore';
import { collection } from 'firebase/firestore';
export default function HomeScreen() {



const {user}= useAuth();
  const handleLogout = async()=>{
await signOut(auth);
  }
  if(user){
    return(
      <SafeAreaView className="flex-1 pb-[80px]" style={{backgroundColor:"#7b49de"
    }}>
        <StatusBar backgroundColor={"#7b49de"}/>
    <View className="flex-1 flex justify-around my-4 mt-10">
    <View className="flex">
    <Text className="text-white mt-[100px] mb-[100px]  text-2xl text-center" style={{fontFamily:"Poppins-Bold"}}>
            Welcome, {user.email} !
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
            <TouchableOpacity onPress={handleLogout} className="py-3 bg-yellow-400 mx-7 rounded-xl">
                <Text className="text-xl  text-center text-gray-700  "  style={{fontFamily:"Poppins-Bold"}}>Logout</Text>
               
                
            </TouchableOpacity>
            
        </View>
    </View>
    
        </SafeAreaView>
    )
  }
  else{
    return(
      <SafeAreaView className="flex-1 pb-[80px]" style={{backgroundColor:"#7b49de"
    }}>
        <StatusBar backgroundColor={"#7b49de"}/>
    <View className="flex-1 flex justify-around my-4 mt-10">
    <View className="flex">
    <Text className="text-white mt-[100px] mb-[100px]  text-4xl text-center" style={{fontFamily:"Poppins-Bold"}}>
            Welcome !
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
            <TouchableOpacity onPress={handleLogout} className="py-3 bg-yellow-400 mx-7 rounded-xl">
                <Text className="text-xl  text-center text-gray-700  "  style={{fontFamily:"Poppins-Bold"}}>Logout</Text>
               
                
            </TouchableOpacity>
            
        </View>
    </View>
    
        </SafeAreaView>
    )
  }
}