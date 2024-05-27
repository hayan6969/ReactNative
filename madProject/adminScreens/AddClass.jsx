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
import { courseRef } from '../config/firebase';
import { sectionRef } from '../config/firebase';
import { db } from '../config/firebase';
import { instructorRef } from '../config/firebase';

const AddSection = () => {
  const [sections, setSections] = useState([]);
const [section, setSection] = useState('CS');
const [instructors, setInstructors] = useState([]);
const [coursesNames, setCoursesnames] = useState([]);


const secRef = collection(db, `${section}`);
    const [loading, setLoading] = React.useState(false);
    const [listLoading, setListLoading] = React.useState(false);
    
    const fetchData = async () => { 
        try {
            setListLoading(true);
            const querySnapshot = await getDocs(instructorRef);
            const fetchedInstructors = []; // Create an empty array to store fetched rooms
        
            querySnapshot.forEach((doc) => {
              fetchedInstructors.push({ label: doc.data().instructorName, value: doc.data().instructorName });
            });
        
            setItems(fetchedInstructors); // Update rooms state with all fetched data
            console.log('Rooms:', courses.length); // Now should reflect the correct length
            const querySnapshot2 = await getDocs(courseRef);
            const fetchedCourses = []; // Create an empty array to store fetched rooms

            querySnapshot2.forEach((doc) => {
                fetchedCourses.push({ label: doc.data().courseName, value: doc.data().courseName });
                });

            setItems2(fetchedCourses); // Update rooms state with all fetched data
            


const querySnapshot3 = await getDocs(sectionRef);

            const fetchedSections = []; // Create an empty array to store fetched rooms

            querySnapshot3.forEach((doc) => {

                fetchedSections.push({ label: doc.data().sectionName, value: doc.data().sectionName });
                });

            setItems3(fetchedSections); // Update rooms state with all fetched data
            setMainLoading(false);

           


          } catch (error) {
            console.error('Error fetching rooms:', error.message);
          }

           }

           const fetchClasses = async () => {
            setListLoading(true); 
            const querySnapshot4 = await getDocs(secRef);
            const fetchedCoursesNames = []; // Create an empty array to store fetched rooms
            querySnapshot4.forEach((doc) => {
              console.log('entered the section adding loop')

                fetchedCoursesNames.push({ Course: doc.data().CourseName, Instructor: doc.data().InstructorName });
                });

                setSections(fetchedCoursesNames);
                setListLoading(false);
           }

          

           const addSection = async ()=>{
            await addDoc(sectionRef, {
                sectionName: section
            }).then(()=>{
                console.log('section added')
            }
            )
           }

    const addData = async () => {   
        try {
            setLoading(true);
            await addDoc(secRef, {
                InstructorName: value,
                CourseName: value2
                
              }).then(()=>{
                console.log('room name:',instructorName)
                console.log('room type:',value)
                console.log('Data added');
                setLoading(false);
                setInstructorName('');
                
              });

              const  querySnapshot = await getDocs(sectionRef);
              const exist=false;
              //im gonna go over this collection to see if sectionName of section variable already exists
                querySnapshot.forEach((doc) => {
                    //should check for all the documents and if section exists in any then it should not add it
                    if(doc.data().sectionName===section){
                        exist=true;
                    }

                    if(exist){
                        console.log('Section already exists')

                    }else{
                        
                    }
                }
                )


              


        } catch (error) {
            console.log('Error adding room data to firestore:', error.message);
        }
    }

   useEffect(()=>{
    
              fetchData();
   },[])

   useEffect(()=>{
    fetchClasses();
   },[section])

   const sec=[{
    name:[
        {
            courseName:'Web Development',
            creditHours:3
        }
    ]
   }]
    const[instructorName,setInstructorName]=React.useState('')
    const[courseName,setCourseName]=React.useState('')

    const [courses, setCourses] = useState([]);

    const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    {label: '1', value: '1'},
    {label: '2', value: '2'},
    {label: '3', value: '3'}
  ]);

  const [open2, setOpen2] = useState(false);
  const [value2, setValue2] = useState(null);
  const [items2, setItems2] = useState([
    {label: '1', value: '1'},
    {label: '2', value: '2'},
    {label: '3', value: '3'}
  ]);
  const [open3, setOpen3] = useState(false);
  const [value3, setValue3] = useState(null);
  const [items3, setItems3] = useState([
    {label: '1', value: '1'},
    {label: '2', value: '2'},
    {label: '3', value: '3'}
  ]);

  const [mainLoading, setMainLoading] = useState(true);
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
  if(mainLoading){
    return <Loader/>
  }
  else{
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
  <LottieView className="flex-1 w-[150px] h-[150px]" source={require('../assets/addRoom.json')} speed={3} autoPlay loop />
  
  
  
  </View>
  
  </SafeAreaView>
  <View className="flex-1  bg-white mt-[-20px]  px-8 pt-5" style={{borderTopLeftRadius:50, borderTopRightRadius:50}}>
  <View className="form space-y-2">
    <Text className="text-gray-700 ml-4" style={{fontFamily:'Poppins-Bold'}}>
      Section Name
    </Text>
    <DropDownPicker
        className="p-4 z-0 bg-white text-gray-700 rounded-2xl"
        open={open3}
        value={value3}
        items={items3}
        placeholder='Select Section Name'
        textStyle={{fontFamily:"Poppins-Bold",color:"#374151"}}
        style={{backgroundColor:'white'}}
        setOpen={setOpen3}
       
        setValue={setValue3}
        setItems={setItems3}
        onSelectItem={(item) => {
          console.log(item);
          setSection(item.value);
         
        }}
        // onChangeValue={ ()=>{
        //   console.log(value3)
          
        //   console.log('the section is set to ',section)
        //   fetchClasses();
        //   console.log(section)
        // }
  
        
        // }
      />
    {/* <TextInput value={section} onChangeText={(value)=>{setSection(value)}}  style={{fontFamily:"Poppins-Bold"}} className="p-4 bg-gray-100 text-gray-700 rounded-2xl" placeholder="Enter Section Name"/> */}
    <Text className="text-gray-700 ml-4" style={{fontFamily:'Poppins-Bold'}}>
      Instructor Name
    </Text>
    {/* <TextInput   style={{fontFamily:"Poppins-Bold"}} className="p-4 bg-gray-100 text-gray-700 rounded-2xl" placeholder="Enter your password"/> */}
  
     <DropDownPicker
        className="p-4 z-10 bg-white text-gray-700 rounded-2xl"
        open={open}
        value={value}
        items={items}
        placeholder='Select Instructor Name'
        textStyle={{fontFamily:"Poppins-Bold",color:"#374151"}}
        style={{backgroundColor:'white'}}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
        onChangeValue={ ()=>{
          console.log(value)
          setInstructorName(value)
          console.log(courseName)
        }
  
        
        }
      />
       <Text className="text-gray-700 ml-4" style={{fontFamily:'Poppins-Bold'}}>
      Course Name
    </Text>
    {/* <TextInput   style={{fontFamily:"Poppins-Bold"}} className="p-4 bg-gray-100 text-gray-700 rounded-2xl" placeholder="Enter your password"/> */}
  
     <DropDownPicker
        className="p-4 bg-gray-100 z-20 text-gray-700 rounded-2xl"
        open={open2}
        value={value2}
        items={items2}
        placeholder='Select Course Name'
        textStyle={{fontFamily:"Poppins-Bold",color:"#374151"}}
        style={{backgroundColor:'white'}}
        setOpen={setOpen2}
        setValue={setValue2}
        setItems={setItems2}
        onChangeValue={ ()=>{
          console.log(value2)
          setCourseName(value2)
          console.log(courseName)
        }
  
        
        }
      />
      
      
    
    
    
    
    <TouchableOpacity onPress={()=>{
      addData().then(()=>{
          fetchData();
          fetchClasses();
      });
    
    }}   className="pu-3 bg-yellow-400 rounded-xl">
      <Text  style={{fontFamily:"Poppins-Bold"}} className=" text-2xl p-2 text-center text-gray-700">
        {loading ? <View className="flex flex-row justify-center items-center"><SmallButtonLoader/></View> : "Add Class"}
      </Text>
    </TouchableOpacity>
  </View>
  {listLoading ? <MedLoader/> : <FlatList
    data={sections}
    renderItem={({item})=>(
      <View key={item.courseName} className="flex-col items-start justify-between border-2 border-black p-4 mt-2 bg-gray-100 rounded-2xl mb-2">
        <Text style={{fontFamily:"Poppins-Bold"}} className="text-gray-700">{item.Course}</Text>
        <Text style={{fontFamily:"Poppins-Bold"}} className="text-gray-700">{item.Instructor}</Text>
      </View>
    )}
    keyExtractor={(item)=>item.roomName}
    /> }
    
      
  
  
  </View>
  
  
  
  </View>
    )
  }
}

export default AddSection