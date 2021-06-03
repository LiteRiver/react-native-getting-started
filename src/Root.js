import React, {useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {ToastProvider} from 'react-native-fast-toast';
import HomeScreen from './screens/HomeScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import SelectLanguageScreen from './screens/SelectLanguageScreen';
import SortLanguageScreen from './screens/SortLanguageScreen';
import Screens from './constants/screens';
import languageStore from './data/languageStore';
import LanguageContext from './contexts/LanguageContext';

const Stack = createStackNavigator();

const Root = () => {
  const [languages, selectLanguages] = useState(languageStore.getSelected());

  return (
    <ToastProvider>
      <LanguageContext.Provider value={{languages, selectLanguages}}>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Welcome"
            screenOptions={{
              headerShown: false,
              headerTitleAlign: 'center',
            }}>
            <Stack.Screen name={Screens.Welcome} component={WelcomeScreen} />
            <Stack.Screen name={Screens.Home} component={HomeScreen} />
            <Stack.Screen
              name={Screens.SelectLanguage}
              component={SelectLanguageScreen}
              options={{
                headerShown: true,
                title: 'Select Languages',
              }}
            />
            <Stack.Screen
              name={Screens.SortLanguage}
              component={SortLanguageScreen}
              options={{
                headerShown: true,
                title: 'Sort Languages',
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </LanguageContext.Provider>
    </ToastProvider>
  );
};

export default Root;
