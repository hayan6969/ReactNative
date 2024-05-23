import { Image, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect } from 'react'
import { TextInput } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome6 } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';
import { auth } from '../config/firebase';
import { TwitterAuthProvider, signOut } from 'firebase/auth';
import Loader from '../screens/Loader'

import { userRef } from '../config/firebase';
import { collection, getDocs } from "firebase/firestore";

import LottieView from 'lottie-react-native';
import {useFonts} from 'expo-font';
import { SimpleLineIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Link,useRouter } from 'expo-router';
import { useNavigation } from '@react-navigation/native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAuth } from '../hooks/useAuth';



const AdminProfile = () => {

    const navigation = useNavigation();

    let [loading, setLoading] = React.useState(true);
    let[name,setName]=React.useState('');
    let [email,setEmail]=React.useState('');
    let [userId,setUserId]=React.useState('');

useEffect(()=>{
    console.log('use effect called')
    fetchData().then(()=>{console.log('Data Fetched')});

},[userId])
   

    const fetchData = async () => { 
        //This function is used to fetch the data from the firestore and then set the user role

        setUserId(auth.currentUser.uid);
        console.log('fetching data');
        const querySnapshot = await getDocs(userRef); //This is the query snapshot which is used to get the data from the firestore
        console.log('got query snapshot');
        querySnapshot.forEach((doc) => { //This is the for each loop which is used to iterate over the data and then set the user role
            console.log('inside for each loop');
          if (doc.data().uid == userId) { //This is the condition which is used to check if the user id is equal to the user id in the firestore
            console.log('user Name before assigning is : ',doc.data().name);
            setName(doc.data().name);
            setEmail(doc.data().email);
            console.log('User Name is : ',doc.data().name)
            setLoading(false);
          }
          })
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
        <LottieView className="flex-1  w-[200px] h-[200px] mt-[-30px]" source={require('../assets/profile.json')} autoPlay loop />
    
        
        
        </View>
    
          </SafeAreaView>
          <View className="flex-1 bg-white mt-[30px]  px-8 pt-8" style={{borderTopLeftRadius:50, borderTopRightRadius:50}}>
            <View className="  flex-col justify-between ">
            <Text className="text-gray-700 ml-4" style={{fontFamily:'Poppins-Bold'}}>
                Full Name
              </Text>
              <TextInput value={name} editable={false} selectTextOnFocus={false}  style={{fontFamily:"Poppins-Bold"}} className="p-4 mb-[20px] bg-gray-100 text-gray-700 rounded-2xl" />
              
              <Text className="text-gray-700 ml-4" style={{fontFamily:'Poppins-Bold'}}>
                Email Address
              </Text>
              <TextInput value={email} editable={false} selectTextOnFocus={false}  style={{fontFamily:"Poppins-Bold"}} className="p-4 bg-gray-100 mb-[20px]  text-gray-700 rounded-2xl" />
              <Text className="text-gray-700 ml-4" style={{fontFamily:'Poppins-Bold'}}>
                Contact No.
              </Text>
              <TextInput value='03115859015' editable={false} selectTextOnFocus={false}  style={{fontFamily:"Poppins-Bold"}} className="p-4 mb-[20px] bg-gray-100 text-gray-700 rounded-2xl" />
              <Text  className="text-gray-700 ml-4" style={{fontFamily:'Poppins-Bold'}}>
               University
              </Text>
              <TextInput editable={false} value='Pak-Austria Fachhochschule' selectTextOnFocus={false} style={{fontFamily:"Poppins-Bold"}} className="p-4 mb-5 bg-gray-100 text-gray-700 rounded-2xl" />
             
             
            </View>
            
         
          
          </View>
          
        </View>)
}

  
  
}

export default AdminProfile