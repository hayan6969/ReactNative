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


const Stack = createNativeStackNavigator();

export default function AppNavigation() {


const {user}= useAuth();

    
if(user){
    let userRole='';
    let userId=user.uid;
    const fetchUserRole = async () => {
        const q = query(userRef,where('userId','==',userId));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            userRole=doc.data().role;
            console.log('User role:', userRole);
        });
    }
    

    //taking user role from firestore from collection reference useRef  and checking its role 

    
            if(userRole=='admin'){
                console.log('User is admin', );
                
               
               return(
                <Stack.Navigator initialRouteName='Admin'>
                <Stack.Screen options={{headerShown:false}} name="Admin" component={AdminHome} />
                  
                </Stack.Navigator>
               )
        }
        else{
            console.log('User is not admin','userID : ',userId,'userRole: ',userRole );
           return (
            <Stack.Navigator initialRouteName='Admin'>
            <Stack.Screen options={{headerShown:false}} name="Admin" component={AdminHome} />
              
            </Stack.Navigator>
           )
        }


    }


    



    

else{
    return (
        
      
        <Stack.Navigator initialRouteName='Welcome'>
                    <Stack.Screen options={{headerShown:false}} name="Admin" component={AdminHome} />

        <Stack.Screen options={{headerShown:false}} name="SignUp" component={SignUpScreen} />
          <Stack.Screen options={{headerShown:false}} name="Welcome" component={WelcomeScreen} />
          
          <Stack.Screen options={{headerShown:false}} name="Login" component={LoginScreen} />
        </Stack.Navigator>

      
    );
}
   
  }