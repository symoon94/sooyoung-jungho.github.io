import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MainScreen from './screens/MainScreen';
import LocationScreen from './screens/LocationScreen';
import GalleryScreen from './screens/GalleryScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Main">
        <Stack.Screen 
          name="Main" 
          component={MainScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="Location" 
          component={LocationScreen}
          options={{ title: '오시는 길' }}
        />
        <Stack.Screen 
          name="Gallery" 
          component={GalleryScreen}
          options={{ title: '갤러리' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
} 