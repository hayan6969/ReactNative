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



const Stack = createNativeStackNavigator();

export default function AppNavigation() {
 
    return (
        
      
        <Stack.Navigator initialRouteName='Welcome'>
                    <Stack.Screen options={{headerShown:false}} name="Admin" component={AdminHome} />

        <Stack.Screen options={{headerShown:false}} name="SignUp" component={SignUpScreen} />
          <Stack.Screen options={{headerShown:false}} name="Welcome" component={WelcomeScreen} />
          
          <Stack.Screen options={{headerShown:false}} name="Login" component={LoginScreen} />
          <Stack.Screen options={{headerShown:false}} name="Aprofile" component={AdminProfile} />
          
        </Stack.Navigator>

      
    );

   
  }