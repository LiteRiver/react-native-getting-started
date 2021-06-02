import React, {useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {ToastProvider} from 'react-native-fast-toast';
import HomeScreen from './screens/HomeScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import CustomTagScreen from './screens/CustomTagScreen';
import Screens from './constants/screens';
import tagStore from './data/tagStore';
import TagContext from './contexts/TagContext';

const Stack = createStackNavigator();

const Root = () => {
  const [tags, setTags] = useState(tagStore.getChecked());

  return (
    <ToastProvider>
      <TagContext.Provider value={{tags, setTags}}>
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
              name={Screens.CustomTag}
              component={CustomTagScreen}
              options={{
                headerShown: true,
                title: 'Custom Tags',
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </TagContext.Provider>
    </ToastProvider>
  );
};

export default Root;
