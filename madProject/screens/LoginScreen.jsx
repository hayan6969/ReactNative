import { View, Text, SafeAreaView, TouchableOpacity, TextInput, Image } from 'react-native'
import React from 'react'
import { StatusBar } from 'expo-status-bar'
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import {useFonts} from 'expo-font';
import { auth } from '../config/firebase';
import useAuth from '../hooks/useAuth';
import Loader from '../screens/Loader'
import { collection, getDocs } from "firebase/firestore"; 
import { useEffect } from 'react';
import { userRef } from '../config/firebase';




import LottieView from 'lottie-react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
 function LoginScreen() {
  const navigation = useNavigation();
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


const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [name, setName] = React.useState('')
  let userRole = '';
  let userId='';
  const [loading, setLoading] = React.useState(false);
  const {user}= useAuth();
  const fetchData = async () => { //This function is used to fetch the data from the firestore and then set the user role
    console.log('fetching data');
    const querySnapshot = await getDocs(userRef); //This is the query snapshot which is used to get the data from the firestore
    console.log('got query snapshot');
    querySnapshot.forEach((doc) => { //This is the for each loop which is used to iterate over the data and then set the user role
        console.log('inside for each loop');
      if (doc.data().uid == userId) { //This is the condition which is used to check if the user id is equal to the user id in the firestore
        console.log('user role before assigning is : ',doc.data().role);
        userRole=doc.data().role; //Then the user role is set
        console.log('User Role is : ',userRole)
      }
      })
       }
 


  
  
  const handleSubmit=async()=>{
    if(email&&password){
      try {
        
        setLoading(true);


        await signInWithEmailAndPassword(auth,email,password).then(()=>{ //first the sign in happens
         userId = auth.currentUser.uid;  //when the signin happens then the userID is set
        console.log('User ID is : ',userId);
        console.log('now entering the role settign phase');
         fetchData().then(()=>{console.log('fetching is done', ' user role is ', userRole) //then the fetching happens and once the fetching is complete the userRole is set

         if(userRole=='admin'){  //Then the user role is checked and the user is navigated to the respective screen
          console.log('THEE user role is admin');
          setLoading(false);
          navigation.navigate('Admin')
        }
        else if(userRole=='student'){  //Then the user role is checked and the user is navigated to the respective screen
          console.log('THEE user role is student');
          setLoading(false);
          navigation.navigate('Home')
        }
      
         });
        
        
          
          
        });
        
        
        
      } catch (error) {
        console.log('got error: ',error.message);
        loading=false;
      }
    }

  
  }


if(loading){
  return (
    <Loader/>
  
  )
}

else {
  return (
    
    <View className="flex-1  bg-white " style={{backgroundColor:'#7b49de'}}>
            <StatusBar backgroundColor={"#7b49de"}/>
            <StatusBar backgroundColor={"#7b49de"}/>

      <SafeAreaView className="flex ">

        <View className="flex-row justify-start">
          <TouchableOpacity onPress={()=>navigation.goBack()} className="bg-yellow-400 ml-3 mt-4 rounded-tr-2xl p-2 rounded-bl-2xl">
          
          <AntDesign name="arrowleft" size={20} color="black" />
        


          </TouchableOpacity>
        </View>
        <View className="flex-row justify-center  items-center">
    {/* <Image className=" w-[250px] h-[250px] mb-[300px]" source={require('../assets/homework.png')} >
    </Image> */}
    <LottieView className="flex-1 w-[250px] h-[250px]" source={require('../assets/login.json')} autoPlay loop />

    
    
    </View>

      </SafeAreaView>
      <View className="flex-1 bg-white mt-1  px-8 pt-8" style={{borderTopLeftRadius:50, borderTopRightRadius:50}}>
        <View className="form space-y-2">
          <Text className="text-gray-700 ml-4" style={{fontFamily:'Poppins-Bold'}}>
            Email Address
          </Text>
          <TextInput value={email} onChangeText={value => setEmail(value)} style={{fontFamily:"Poppins-Bold"}} className="p-4 bg-gray-100 text-gray-700 rounded-2xl" placeholder="Enter your email address"/>
          <Text className="text-gray-700 ml-4" style={{fontFamily:'Poppins-Bold'}}>
            Password
          </Text>
          <TextInput value={password} onChangeText={value => setPassword(value)} secureTextEntry style={{fontFamily:"Poppins-Bold"}} className="p-4 bg-gray-100 text-gray-700 rounded-2xl" placeholder="Enter your password"/>
          <TouchableOpacity className="flex items-end mb-5">
            <Text className="text-gray-700" style={{fontFamily:"Poppins-Bold"}}>Forgot Password?</Text>

          </TouchableOpacity>
          <TouchableOpacity onPress={handleSubmit}  className="pu-3 bg-yellow-400 rounded-xl">
            <Text  style={{fontFamily:"Poppins-Bold"}} className=" text-2xl p-2 text-center text-gray-700">
              Login
            </Text>
          </TouchableOpacity>
        </View>
        <Text className="text-xl text-gray-700 text-center py-5" style={{fontFamily:"Poppins-Bold"}}>Or</Text>
        <View className="flex-row justify-center  space-x-12">
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
        <View className="flex-row justify-center  ">
            <Text className="text-gray-500 font-semibold">Don't have an account? </Text>
            <TouchableOpacity onPress={()=>navigation.navigate('SignUp')}>
                <Text className=" text-yellow-500" style={{fontFamily:"Poppins-Medium"}}>
                    Sign Up
                </Text>
            </TouchableOpacity>
        </View>
      </View>
      
    </View>
  )
}



  
}

export default LoginScreen