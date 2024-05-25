import { View, Text, SafeAreaView, TouchableOpacity, TextInput, Image, ScrollView, FlatList } from 'react-native'
import React from 'react'
import { StatusBar } from 'expo-status-bar'
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import {useFonts} from 'expo-font';
import { auth } from '../config/firebase';
import useAuth from '../hooks/useAuth';
import Loader from '../screens/Loader'
import { collection, getDocs, setDoc,doc, addDoc } from "firebase/firestore"; 
import { useEffect } from 'react';
import { userRef } from '../config/firebase';
import LottieView from 'lottie-react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { useState } from 'react';
import { roomRef } from '../config/firebase';
import SmallButtonLoader from '../screens/SmallButtonLoader';
import MedLoader from '../screens/MedLoader';



const AddRooms = () => {

    const [loading, setLoading] = React.useState(false);
    const [listLoading, setListLoading] = React.useState(false);
    
    const fetchData = async () => { 
        try {
            setListLoading(true);
            const querySnapshot = await getDocs(roomRef);
            const fetchedRooms = []; // Create an empty array to store fetched rooms
        
            querySnapshot.forEach((doc) => {
              fetchedRooms.push({ roomName: doc.data().name, roomType: doc.data().roomType });
            });
        
            setRooms(fetchedRooms); // Update rooms state with all fetched data
            console.log('Rooms:', rooms.length); // Now should reflect the correct length
            setListLoading(false);
          } catch (error) {
            console.error('Error fetching rooms:', error.message);
          }

           }

    const addData = async () => {   
        try {
            setLoading(true);
            await addDoc(roomRef, {
                name: roomName,
                roomType: value
                
              }).then(()=>{
                console.log('room name:',roomName)
                console.log('room type:',value)
                console.log('Data added');
                setLoading(false);
                setRoomName('');
                
              });

        } catch (error) {
            console.log('Error adding room data to firestore:', error.message);
        }
    }

   useEffect(()=>{
    
              fetchData();
   },[])

    const[roomName,setRoomName]=React.useState('')
    const[roomType,setRoomType]=React.useState('')

    const [rooms, setRooms] = useState([]);

    const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    {label: 'Lecture Theatre', value: 'Lecture Theatre'},
    {label: 'Classroom', value: 'Classroom'},
    {label: 'Lab', value: 'Lab'}
  ]);

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
<LottieView className="flex-1 w-[200px] h-[200px]" source={require('../assets/addRoom.json')} speed={3} autoPlay loop />



</View>

</SafeAreaView>
<View className="flex-1 bg-white mt-[-20px]  px-8 pt-5" style={{borderTopLeftRadius:50, borderTopRightRadius:50}}>
<View className="form space-y-2">
  <Text className="text-gray-700 ml-4" style={{fontFamily:'Poppins-Bold'}}>
    Room Name
  </Text>
  <TextInput value={roomName} onChangeText={(value)=>{setRoomName(value)}}  style={{fontFamily:"Poppins-Bold"}} className="p-4 bg-gray-100 text-gray-700 rounded-2xl" placeholder="Enter Room Name"/>
  <Text className="text-gray-700 ml-4" style={{fontFamily:'Poppins-Bold'}}>
    Room Type
  </Text>
  {/* <TextInput   style={{fontFamily:"Poppins-Bold"}} className="p-4 bg-gray-100 text-gray-700 rounded-2xl" placeholder="Enter your password"/> */}

   <DropDownPicker
      className="p-4 bg-gray-100 text-gray-700 rounded-2xl"
      open={open}
      value={value}
      items={items}
      placeholder='Select Room Type'
      textStyle={{fontFamily:"Poppins-Bold",color:"#374151"}}
      setOpen={setOpen}
      setValue={setValue}
      setItems={setItems}
      onChangeValue={ ()=>{
        console.log(value)
        setRoomType(value)
        console.log(roomType)
      }

      
      }
    />
  
  
  <TouchableOpacity onPress={()=>{
    addData().then(()=>{
        fetchData();
    });
  
  }}   className="pu-3 bg-yellow-400 rounded-xl">
    <Text  style={{fontFamily:"Poppins-Bold"}} className=" text-2xl p-2 text-center text-gray-700">
      {loading ? <View className="flex flex-row justify-center items-center"><SmallButtonLoader/></View> : "Add Room"}
    </Text>
  </TouchableOpacity>
</View>
{listLoading ? <MedLoader/> : <FlatList
  data={rooms}
  renderItem={({item})=>(
    <View className="flex-row items-center justify-between border-2 border-black p-4 mt-2 bg-gray-100 rounded-2xl mb-2">
      <Text style={{fontFamily:"Poppins-Bold"}} className="text-gray-700">{item.roomName}</Text>
      <Text style={{fontFamily:"Poppins-Bold"}} className="text-gray-700">{item.roomType}</Text>
    </View>
  )}
  keyExtractor={(item)=>item.roomName}
  /> }
  
    


</View>



</View>
  )
}

export default AddRooms