import React from 'react';
import {Image, StyleSheet} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import ProfileScreen from './ProfileScreen';
import PopularScreen from './PopularScreen';
import Screens from '../constants/screens';

const Tab = createBottomTabNavigator();
const HomeScreen = ({navigation, route}) => {
  return (
    <Tab.Navigator
      backBehavior="none"
      tabBarOptions={{
        activeTintColor: 'green',
        inactiveTintColor: 'gray',
        labelStyle: styles.tabLabel,
      }}>
      <Tab.Screen
        name={Screens.Popular}
        component={PopularScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <Image
              source={require('../../res/images/ic_popular.png')}
              style={styles.tabIcon}
            />
          ),
        }}
      />
      <Tab.Screen
        name={Screens.Profile}
        component={ProfileScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <Image
              source={require('../../res/images/ic_my.png')}
              style={styles.tabIcon}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabIcon: {
    width: 22,
    height: 22,
  },
  tabLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    lineHeight: 14,
  },
  headerTitle: {
    color: 'green',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default HomeScreen;
