import { StatusBar } from 'expo-status-bar';
import { Button, Image, Pressable, StyleSheet, Text, TextInput, TextInputComponent, View } from 'react-native';
import { useState } from 'react';
import {Link} from 'expo-router';

export default function App() {

  const [count, setCount] = useState(0);

  let counter =()=>{
    setCount(count+1);
    

  

    
  }
//creating an animation style for the text having the count varibale to make it pop each time the pressable button increases the count is pressed 


  
  return (
    < >
    <View style={styles.container}>
      <Text style={styles.text}>Open up App.js to start working on your app!</Text>
      <Text style={styles.textpop}>{count}</Text>
      <Image source={require('./assets/pedro.webp')} style={{width: 200, height: 200}} />
      <TextInput style={styles.text} placeholder="Enter your name" />


      <StatusBar style="auto" />
    </View>


   
<Pressable onPress={()=>{counter()}} style={styles.buttonss} >
  <Text  style={styles.text}>Press me</Text>
  

   </Pressable>
   

    </>
    
  );
}






const styles = StyleSheet.create({


  container: {
    flex: 1,
    //purple background color
    backgroundColor:'#8A2BE2',
    
    alignItems: 'center',
    justifyContent: 'center',
  },
  //creating style for the text
  text:{
    color:'white',
    fontSize: 30,
    //poppins bold font
    fontFamily:'roboto-bold',
  //add a border
  borderRadius: 10,

    borderWidth: 1,
    borderColor: 'black',
    padding: 10,
    fontWeight:'bold',
    

  }
,

buttonss:{
  //light pink background color
  backgroundColor:'#FFB6C1',
  flexDirection: 'row',
  justifyContent: 'center',

  //add on click effect
  shadowColor: 'black',
  shadowOffset: {width: 0, height: 2},
  shadowRadius: 6,
  shadowOpacity: 0.26,
  elevation: 8,
  borderRadius: 10,
  //add and effect when its clicked
  animation: 'pop 0.5s',
  animationIterationCount: 'infinite',

  
  padding: 10,

  
  },

  textpop:{
  //creating an animation style for the text having the count varibale to make it pop each time the pressable button increases the count is pressed 

    fontSize: 30,
    //poppins bold font
    fontFamily:'roboto-bold',
    fontWeight:'bold',
    color:'white',
    transform: [{scale: 1.1}],

    //it should be animated when the count is increased
    animation: 'pop 0.5s',
    animationIterationCount: 'infinite',



  }


});

