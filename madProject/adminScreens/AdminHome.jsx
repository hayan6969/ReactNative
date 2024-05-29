import { Image, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { TextInput } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome6 } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';
import { auth } from '../config/firebase';
import { signOut } from 'firebase/auth';
import { FontAwesome } from '@expo/vector-icons';


import LottieView from 'lottie-react-native';
import {useFonts} from 'expo-font';
import { SimpleLineIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Link,useRouter } from 'expo-router';
import { useNavigation } from '@react-navigation/native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAuth } from '../hooks/useAuth';
import { timetableRef } from '../config/firebase';
import Loader from '../screens/Loader';


const AdminHome = () => {
  const navigation = useNavigation();

  const handleprofile =()=>{  
    console.log('profile clicked');
    navigation.navigate('Aprofile');
  }

  const handleLogout = async()=>{
await signOut(auth).then(()=>{
  console.log('logged out');
  navigation.navigate('Welcome');


});
  }
  const onTimetableClick=()=>{
    //make loader true for 3 secs and then make it false 
    setLoading(true);
    setTimeout(()=>{
      setLoading(false);
    },3000);
  }

  const [loading, setLoading] = React.useState(false);
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
      <SafeAreaView className="flex-1 " style={{backgroundColor:'#7b49de'}}>
      <StatusBar backgroundColor={"#7b49de"}/>
      <View className="flex-1 flex justify-between items-center    flex-col">
  
      <View className="flex  flex-col items-center"><LottieView className=" w-[200px] mt-[-20px] h-[200px]" source={require('../assets/welcomee.json')} autoPlay loop />
      <Text style={{fontFamily:"Poppins-Bold"}} className="text-white  text-3xl">Welcome Admin! </Text></View>
     <View className="">
     
      <TouchableOpacity onPress={()=>{navigation.navigate('AddCourses')}} className="border mb-4 flex items-center justify-start flex-row p-4 rounded-lg bg-yellow-400">
      <FontAwesome6 name="book-bookmark" size={24} color="black" />
              <Text style={{fontFamily:"Poppins-Bold"}} className="text-black text-2xl">  Courses</Text>
  
      </TouchableOpacity>
      <TouchableOpacity onPress={()=>{navigation.navigate('AddInstructor')}} className="border mb-4 flex items-center justify-start flex-row p-4 rounded-lg bg-yellow-400">
      <FontAwesome5  name="chalkboard-teacher" size={24} color="black" />
                  <Text style={{fontFamily:"Poppins-Bold"}} className="text-black text-2xl"> Instructors</Text>
  
      </TouchableOpacity>
      <TouchableOpacity onPress={()=>{navigation.navigate('AddRoom')}} className="border mb-4 flex items-center justify-start flex-row p-4 rounded-lg bg-yellow-400">
      <MaterialCommunityIcons name="office-building-marker-outline" size={24} color="black" />    
                  <Text style={{fontFamily:"Poppins-Bold"}} className="text-black text-2xl">  Rooms</Text>
  
      </TouchableOpacity>
      <TouchableOpacity onPress={()=>{navigation.navigate('AddSection')}} className="border mb-4 flex items-center justify-start  flex-row p-4 rounded-lg bg-yellow-400">
      <MaterialCommunityIcons name="account-group-outline" size={24} color="black" />
                  <Text style={{fontFamily:"Poppins-Bold"}} className="text-black text-2xl "> Sections</Text>
  
      </TouchableOpacity>
      <TouchableOpacity onPress={()=>{navigation.navigate('AddClass')}} className="border mb-4 flex items-center justify-start flex-row p-4 rounded-lg bg-yellow-400">
      <MaterialCommunityIcons name="google-classroom" size={24} color="black" />
                      <Text style={{fontFamily:"Poppins-Bold"}} className="text-black text-2xl">  Classes</Text>
  
      </TouchableOpacity>
      <TouchableOpacity onPress={onTimetableClick} className="border mb-4 flex items-center justify-start flex-row p-4 rounded-lg bg-yellow-400">
      <MaterialCommunityIcons name="timetable" size={24} color="black" />
                          <Text style={{fontFamily:"Poppins-Bold"}} className="text-black text-2xl">  Timetables     </Text>
  
      </TouchableOpacity>
      
     </View>
    
     
  
      
      
     
      </View>
      <View className="flex flex-row justify-center  ">
      <View  className="  border-4  h-[90px] w-full flex flex-row justify-evenly items-center    mx-10   " style={{borderTopLeftRadius:50, borderTopRightRadius:50, backgroundColor:"#7b49de"}}>
         
          <TouchableOpacity onPress={handleprofile} className="bg-yellow-400 w-[90px] h-[70px] flex flex-col justify-center items-center rounded-xl">
         <MaterialCommunityIcons name="face-man-profile" size={24} color="black" />
          <Text style={{fontFamily:"Poppins-Bold"}}>Profile</Text></TouchableOpacity>
          <TouchableOpacity className="bg-yellow-400 w-[90px] h-[70px] flex flex-col justify-center items-center rounded-xl">
          <Ionicons name="settings-outline" size={24} color="black" />
                  <Text style={{fontFamily:"Poppins-Bold"}}>Settings</Text></TouchableOpacity>
                  <TouchableOpacity onPress={handleLogout}  className="bg-yellow-400 w-[90px] h-[70px] flex flex-col justify-center items-center rounded-xl">
                  <SimpleLineIcons name="logout" size={24} color="black" />
                                  <Text style={{fontFamily:"Poppins-Bold"}}>Logout</Text></TouchableOpacity>
            </View>
      </View>
      <View className="flex flex-row">
      {/* <Image className="w-[80px] h-[80px]" source={require("../assets/nav.png")}></Image> */}
      
      </View>
        
      </SafeAreaView>
    )
  }
}

export default AdminHome