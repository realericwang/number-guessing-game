import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import StartScreen from "./screens/StartScreen";
import ConfirmScreen from "./screens/ConfirmScreen";


const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Start">
        <Stack.Screen name="Start" component={StartScreen} options={{ title: 'Registration' }} />
        <Stack.Screen 
          name="Confirm" 
          component={ConfirmScreen} 
          options={{ 
            headerShown: false,
            presentation: 'transparentModal',
            cardOverlayEnabled: true,
            cardStyle: { backgroundColor: 'transparent' },
          }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
