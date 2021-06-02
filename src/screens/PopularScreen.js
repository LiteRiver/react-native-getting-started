import React, {useContext} from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import PopularTab from './PopularTab';
import TagContext from '../contexts/TagContext';

const Tab = createMaterialTopTabNavigator();

const PopularScreen = () => {
  const {tags} = useContext(TagContext);

  return (
    <Tab.Navigator
      backBehavior="none"
      lazy={true}
      tabBarOptions={{scrollEnabled: true}}>
      <Tab.Screen name={'Popular(ALL)'} key={'ALL'} options={{title: 'ALL'}}>
        {props => <PopularTab language={''} />}
      </Tab.Screen>
      {tags.map(tag => (
        <Tab.Screen
          name={`Popular(${tag.name})`}
          key={tag.name}
          options={{title: tag.name}}>
          {props => <PopularTab language={tag.path} />}
        </Tab.Screen>
      ))}
    </Tab.Navigator>
  );
};

export default PopularScreen;
