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
import { instructorRef } from '../config/firebase';
import { sectionRef } from '../config/firebase';

const StudentTimetable = () => {
    const timetable=[  // array of objects for timetable
        [
         { // Monday
           time: '9:00-10:00',
           course: 'Programming Fundamentals',
           instructor:'Arshad Iqbal'
         },
         {
           time: '11:00-12:00',
           course: 'Calculus',
           instructor:'Naveed Iqbal'
         },
         {
           time: '1:00-2:00',
           course: 'English',
           instructor:'Azhar Hussain'
         },
         {
           time: '3:00-4:00',
           course: 'Physics',
           instructor:'Naveed Iqbal'
         },
         {
           time: '4:00-5:00',
           course: 'Calculus',
           instructor:'Anum Muneeb'
         }
         
         
        ],
        [
         { // Tuesday
           time: '10:00-11:00',
     
           course: 'Calculus',
           instructor:'Naveed Iqbal'
         },
         {
           time: '12:00-1:00',
           course: 'Physics',
           instructor:'Naveed Iqbal'
         },
         {
           time: '2:00-3:00',
           course: 'Programming Fundamentals',
           instructor:'Arshad Iqbal'
         },
         {
           time: '4:00-5:00',
           course: 'English',
           instructor:'Sir Adnan'
         },
        ],
         [
         { // Wednesday
           time: '9:00-10:00',
           course: 'Physics',
           instructor:'Naveed Iqbal'
         },
         {
           time: '11:00-12:00',
           course: 'Calculus',
           instructor:'Naveed Iqbal'
         },
         {
           time: '1:00-2:00',
           course: 'English',
           instructor:'Azhar Hussain'
         },
         
         ],
         [
     
           { // Thursday
             time: '9:00-10:00',
             course: 'Physics',
             instructor:'Naveed Iqbal'
           },
           {
             time: '11:00-12:00',
             course: 'Calculus',
             instructor:'Naveed Iqbal'
           },
           {
             time: '1:00-2:00',
             course: 'English',
             instructor:'Azhar Hussain'
           },
           {
             time: '3:00-4:00',
             course: 'Physics',
             instructor:'Naveed Iqbal'
           },
           {
             time: '4:00-5:00',
             course: 'Calculus',
             instructor:'Anum Muneeb'
           }
           
         ],
         [{ // Friday
           time: '9:00-10:00',
           course: 'Programming Fundamentals',
           instructor:'Arshad Iqbal'
         },
         {
           time: '11:00-12:00',
           course: 'Calculus',
           instructor:'Naveed Iqbal'
         },
         {
           time: '1:00-2:00',
           course: 'English',
           instructor:'Azhar Hussain'
         },
         {
           time: '3:00-4:00',
           course: 'Physics',
           instructor:'Naveed Iqbal'
         },
         {
           time: '4:00-5:00',
           course: 'Calculus',
           instructor:'Anum Muneeb'
         }],    
       ]
    const [loading, setLoading] = React.useState(false);
    const [listLoading, setListLoading] = React.useState(false);
    const [day, setDay] = React.useState('');
    const fetchData = async () => { 
        try {
            setListLoading(true);
            const querySnapshot = await getDocs(sectionRef);
            const fetchedInstructors = []; // Create an empty array to store fetched rooms
        
            querySnapshot.forEach((doc) => {
              fetchedInstructors.push({ SectionName: doc.data().sectionName, SectionStrength: doc.data().sectionStrength });
            });
        
            setInstructors(fetchedInstructors); // Update rooms state with all fetched data
            console.log('Rooms:', instructors.length); // Now should reflect the correct length
            setListLoading(false);
          } catch (error) {
            console.error('Error fetching rooms:', error.message);
          }

           }

           const [timetableArray, setTimetableArray] = useState([]);

           const displayTimetable =()=>{
            if(value=='Monday'){
                setTimetableArray(timetable[0])
                }
                else if(value=='Tuesday'){
                    setTimetableArray(timetable[1])
                }
                else if(value=='Wednesday'){
                    setTimetableArray(timetable[2])
                }
                else if(value=='Thursday'){
                    setTimetableArray(timetable[3])
                }
                else if(value=='Friday'){
                    setTimetableArray(timetable[4])
                }
           }

    const addData = async () => {   
        try {
            setLoading(true);
            await addDoc(sectionRef, {
                sectionName: instructorName,
                sectionStrength: instructorNum
                
              }).then(()=>{
                console.log('instructor name:',instructorName)
                console.log('instructor num:',instructorNum)
                console.log('Data added');
                setLoading(false);
                setInstructorName('');
                setInstructorNum('');
                
              });

        } catch (error) {
            console.log('Error adding room data to firestore:', error.message);
        }
    }

   useEffect(()=>{
    
              fetchData();
   },[])

    const[instructorName,setInstructorName]=React.useState('')
    const[instructorNum,setInstructorNum]=React.useState('')

    const [instructors, setInstructors] = useState([]);

    const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    {label: 'Monday', value: 'Monday'},
    {label: 'Tuesday', value: 'Tuesday'},
    {label: 'Wednesday', value: 'Wednesday'},
    {label: 'Thursday', value: 'Thursday'},
    {label: 'Friday', value: 'Friday'},

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

<View className="flex-row items-center justify-between">
  <TouchableOpacity onPress={()=>navigation.goBack()} className="bg-yellow-400 ml-3 mt-4 rounded-tr-2xl p-2 rounded-bl-2xl">
  
  <AntDesign name="arrowleft" size={20} color="black" />



  </TouchableOpacity>
  <Text className="mr-[115px] text-yellow-400 flex flex-row justify-center items-center text-center mt-5 text-3xl" style={{fontFamily:'Poppins-Bold'}}>TimeTable</Text>
</View>
<View className="flex-row justify-center  items-center">
{/* <Image className=" w-[250px] h-[250px] mb-[300px]" source={require('../assets/homework.png')} >
</Image> */}
{/* <LottieView className="flex-1 w-[100px] h-[100px]" source={require('../assets/addRoom.json')} speed={3} autoPlay loop /> */}



</View>

</SafeAreaView>
<View className="flex-1 bg-white mt-[20px]  px-8 pt-5" style={{borderTopLeftRadius:50, borderTopRightRadius:50}}>

<DropDownPicker
      className="p-4 bg-gray-100 text-gray-700 rounded-2xl"
      open={open}
      value={value}
      items={items}
      placeholder='Select Day'
      textStyle={{fontFamily:"Poppins-Bold",color:"#374151"}}
      setOpen={setOpen}
      setValue={setValue}
      setItems={setItems}
      onChangeValue={ ()=>{
        console.log(value)
        setDay(value)
        displayTimetable()
        
      }

      
      }
    />


<View className="flex-1">
<FlatList
  data={timetableArray}
  renderItem={({item})=>(
    <View className="flex flex-row border-2 justify-between items-center mt-6 bg-gray-100 p-4 rounded-2xl mb-4">
    <Text style={{fontFamily:"Poppins-Bold"}} className="text-gray-700 border-2 rounded-xl p-2 text-xl">{item.time}</Text>
    <View>
    <Text style={{fontFamily:"Poppins-Bold"}} className="text-gray-700 text-xl">{item.course}</Text>
    <Text style={{fontFamily:"Poppins-Bold"}} className="text-gray-700 text-xl">{'('+item.instructor+')'}</Text>
    </View>
    </View>
  )}
  keyExtractor={(item,index)=>index.toString()}
    />

</View>
    


</View>



</View>
  )
}

export default StudentTimetable