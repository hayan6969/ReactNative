import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomeScreen from '../screens/WelcomeScreen';
import SignUpScreen from '../screens/SignupScreen';
import LoginScreen from '../screens/LoginScreen';
import useAuth from '../hooks/useAuth';
import HomeScreen from '../screens/HomeScreen';
import AdminHome from '../adminScreens/AdminHome';
import { stripBaseUrl } from 'expo-router/build/fork/getStateFromPath';
import { userRef } from '../config/firebase';
import { query, where } from 'firebase/firestore';
import { collection, getDocs } from "firebase/firestore"; 
import { useEffect } from 'react';
import { useState } from 'react';
import AdminProfile from '../adminScreens/AdminProfile';
import AddRooms from '../adminScreens/AddRooms';
import AddInstructor from '../adminScreens/AddInstructor';
import AddCourses from '../adminScreens/AddCourses';
import AddSection from '../adminScreens/AddClass';
import AddSectionn from '../adminScreens/AddSection';
import StudentTimetable from '../screens/StudentTimetable';



const Stack = createNativeStackNavigator();

export default function AppNavigation() {

 
 
    return (
        
      
        <Stack.Navigator initialRouteName='Welcome'>
          <Stack.Screen options={{headerShown:false}} name="StdTimetable" component={StudentTimetable} />
          <Stack.Screen options={{headerShown:false}} name="AddSection" component={AddSectionn} />
          <Stack.Screen options={{headerShown:false}} name="AddClass" component={AddSection} />
          <Stack.Screen options={{headerShown:false}} name="AddCourses" component={AddCourses} />
          <Stack.Screen options={{headerShown:false}} name="AddInstructor" component={AddInstructor} />
                    <Stack.Screen options={{headerShown:false}} name="Admin" component={AdminHome} />
                    <Stack.Screen options={{headerShown:false}} name="AddRoom" component={AddRooms} />

        <Stack.Screen options={{headerShown:false}} name="SignUp" component={SignUpScreen} />
          <Stack.Screen options={{headerShown:false}} name="Welcome" component={WelcomeScreen} />
          
          <Stack.Screen options={{headerShown:false}} name="Login" component={LoginScreen} />
          <Stack.Screen options={{headerShown:false}} name="Aprofile" component={AdminProfile} />
          <Stack.Screen options={{headerShown:false}} name="Home" component={StudentTimetable} />
          
          
        </Stack.Navigator>

      
    );

   
  }