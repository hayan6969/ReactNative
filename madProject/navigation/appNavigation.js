import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomeScreen from '../screens/WelcomeScreen';
import SignUpScreen from '../screens/SignupScreen';
import LoginScreen from '../screens/LoginScreen';
import useAuth from '../hooks/useAuth';
import HomeScreen from '../screens/HomeScreen';


const Stack = createNativeStackNavigator();

export default function AppNavigation() {

const {user}= useAuth();
if(user){
    return (
        
      
        <Stack.Navigator initialRouteName='Home'>
        <Stack.Screen options={{headerShown:false}} name="Home" component={HomeScreen} />
          
        </Stack.Navigator>

      
    );
}
else{
    return (
        
      
        <Stack.Navigator initialRouteName='Welcome'>
        <Stack.Screen options={{headerShown:false}} name="SignUp" component={SignUpScreen} />
          <Stack.Screen options={{headerShown:false}} name="Welcome" component={WelcomeScreen} />
          
          <Stack.Screen options={{headerShown:false}} name="Login" component={LoginScreen} />
        </Stack.Navigator>

      
    );
}
   
  }