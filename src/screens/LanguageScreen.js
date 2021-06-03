import React, {useContext} from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import LanguageTab from './LanguageTab';
import LanguageContext from '../contexts/LanguageContext';

const Tab = createMaterialTopTabNavigator();

const LanguageScreen = () => {
  const {languages} = useContext(LanguageContext);

  return (
    <Tab.Navigator
      backBehavior="none"
      lazy={true}
      tabBarOptions={{scrollEnabled: true}}>
      <Tab.Screen name={'Popular(ALL)'} key={'ALL'} options={{title: 'ALL'}}>
        {props => <LanguageTab language={''} />}
      </Tab.Screen>
      {languages.map(language => (
        <Tab.Screen
          name={`Popular(${language.name})`}
          key={language.name}
          options={{title: language.name}}>
          {props => <LanguageTab language={language.path} />}
        </Tab.Screen>
      ))}
    </Tab.Navigator>
  );
};

export default LanguageScreen;
