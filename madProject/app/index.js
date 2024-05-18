import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import WelcomeScreen from '../screens/WelcomeScreen';
import AppNavigation from '../navigation/appNavigation';
import { NavigationContainer } from '@react-navigation/native';
export default function index() {
  return (
    
      <AppNavigation />
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
