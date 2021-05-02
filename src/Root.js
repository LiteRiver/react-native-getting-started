import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import Screens from './constants/screens';

const Stack = createStackNavigator();

const Root = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Welcome"
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name={Screens.Welcome} component={WelcomeScreen} />
        <Stack.Screen name={Screens.Home} component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Root;
