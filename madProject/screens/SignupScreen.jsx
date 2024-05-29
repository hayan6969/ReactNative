import { View, Text, SafeAreaView, TouchableOpacity, TextInput, Image } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import {useFonts} from 'expo-font';
import '../config/firebase';
import { useEffect } from 'react';
import {setDoc,doc, addDoc } from 'firebase/firestore';


import LottieView from 'lottie-react-native';
import React from 'react'
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth,db, userRef } from '../config/firebase';
import useAuth from '../hooks/useAuth';
import Loader from './Loader';


export default function SignupScreen() {

  let userId='';


  const [loading, setLoading] = React.useState(false);
  
  const navigation = useNavigation();
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [name, setName] = React.useState('')
  const handleSubmit=async()=>{
    if(email&&password){

      setLoading(true);
    
     

      try { 
        // take user id and store in a variable 
        const createUserResult = await createUserWithEmailAndPassword(auth, email, password);
        if (createUserResult.user) {
          console.log('User created successfully:', createUserResult.user.uid);
          userId = createUserResult.user.uid;
          console.log('User ID:', userId);
        } else {
          console.log('User creation may not be complete yet.');
        }  

        try {
          // Use the userId obtained from createUserResult
          await addDoc(userRef, {
            name,
            email,
            uid:createUserResult.user.uid,
            role:'student'
          });
          console.log('User data successfully added to Firestore. with uid : ',userId);
          setLoading(false);
        } catch (error) {
          console.log('Error adding user data to firestore:', error.message , "uid: ",userId);
        }
       
         
        
        

        
      
        
      } catch (error) {
        console.log('got error: ',error.message);
      }

    

    //  try {
    //    setUserId(user.uid);
    //   console.log('User ID:', userId);
    //  } catch (error) {
    //   console.log('got error while setting uid: ',error.message);
    //  }

      // try {
      //   let doc = await addDoc(userRef,{
      //     name,
      //     email,
      //     userId,
        
      //   })
        
      // } catch (error) {
      //   console.log('got error: ',error.message);
      // }
     
    }

  
  }
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


  if(loading){
    return <Loader/>
  }
  else{
    return (
    
      <View className="flex-1  bg-white " style={{backgroundColor:'#7b49de'}}>
            <StatusBar backgroundColor={"#7b49de"}/>
            <StatusBar backgroundColor={"#7b49de"}/>

      <SafeAreaView className="flex ">

        <View className="flex-row justify-start  mb-8">
        <TouchableOpacity onPress={()=>navigation.goBack()}  className="bg-yellow-400 ml-3 mt-4 rounded-tr-2xl p-2 rounded-bl-2xl">
          
          <AntDesign name="arrowleft" size={20} color="black" />
        


          </TouchableOpacity>
        </View>
        <View className="flex-row justify-center  items-center">
    {/* <Image className=" w-[250px] h-[250px] mb-[300px]" source={require('../assets/homework.png')} >
    </Image> */}
    <LottieView className="flex-1  w-[200px] h-[200px] mt-[-30px]" source={require('../assets/signup1.json')} autoPlay loop />

    
    
    </View>

      </SafeAreaView>
      <View className="flex-1 bg-white mt-[-24px]  px-8 pt-4" style={{borderTopLeftRadius:50, borderTopRightRadius:50}}>
        <View className="form space-y-2">
        <Text className="text-gray-700 ml-4" style={{fontFamily:'Poppins-Bold'}}>
            Full Name
          </Text>
          <TextInput value={{name}} onChangeText={value=>setName(value)} style={{fontFamily:"Poppins-Bold"}} className="p-4 bg-gray-100 text-gray-700 rounded-2xl" placeholder="Enter your full name"/>
          
          <Text className="text-gray-700 ml-4" style={{fontFamily:'Poppins-Bold'}}>
            Email Address
          </Text>
          <TextInput value={{email}} onChangeText={value=>setEmail(value)} style={{fontFamily:"Poppins-Bold"}} className="p-4 bg-gray-100 text-gray-700 rounded-2xl" placeholder="Enter your email address"/>
          <Text className="text-gray-700 ml-4" style={{fontFamily:'Poppins-Bold'}}>
            Password
          </Text>
          <TextInput onChangeText={value=>setPassword(value)} value={{password}} secureTextEntry style={{fontFamily:"Poppins-Bold"}} className="p-4 mb-5 bg-gray-100 text-gray-700 rounded-2xl" placeholder="Enter your password"/>
         
          <TouchableOpacity onPress={handleSubmit} className="py-3  bg-yellow-400 rounded-xl">
            <Text  style={{fontFamily:"Poppins-Bold"}} className=" text-2xl  text-center text-gray-700">
              Sign Up
            </Text>
          </TouchableOpacity>
        </View>
        <Text className="text-xl text-gray-700 text-center py-5" style={{fontFamily:"Poppins-Bold"}}>Or</Text>
        <View className="flex-row justify-center space-x-12">
          <TouchableOpacity className="p-2 bg-gray-100 rounded-3xl">
            <Image source={require('../assets/apple.png')} style={{width:50, height:50}}/>
          </TouchableOpacity>
          <TouchableOpacity className="p-2 bg-gray-100 rounded-3xl">
            <Image source={require('../assets/google.png')} style={{width:50, height:50}}/>
          </TouchableOpacity>
          <TouchableOpacity className="p-2 bg-gray-100 rounded-3xl">
            <Image source={require('../assets/facebook.png')} style={{width:50, height:50}}/>
          </TouchableOpacity>
        </View>
        <View className="flex-row justify-center mt-4">
            <Text className="text-gray-500 font-semibold">Already have an account? </Text>
            <TouchableOpacity onPress={()=>navigation.navigate('Login')}>
                <Text className=" text-yellow-500" style={{fontFamily:"Poppins-Medium"}}>
                    Login
                </Text>
            </TouchableOpacity>
        </View>
      </View>
      
    </View>
    
  )
  }
}