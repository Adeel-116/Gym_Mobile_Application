import React from "react";
import SignUp from "./Screens/SignUp/SignUp";
import SignIn from "./Screens/SignIn/SignIn";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'

const Stack = createNativeStackNavigator();

function App() {
  return (

    <NavigationContainer>
      <Stack.Navigator initialRouteName="SignIn">
        <Stack.Screen
          name="SignIn"
          component={SignIn}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen name="SignUp" 
        component={SignUp}
        options={{
            headerShown: false
        }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App;
