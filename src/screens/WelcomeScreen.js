import React, {useEffect} from 'react';
import {View, Text, Button} from 'react-native';
import {StackActions} from '@react-navigation/native';

const WelcomeScreen = ({navigation, route}) => {
  useEffect(() => {
    const timerHandler = setTimeout(() => {
      navigation.dispatch(
        StackActions.replace('Home', {title: 'strange title'}),
      );
    }, 3000);

    return function () {
      console.log('clearTimeout', timerHandler);
      timerHandler && clearTimeout(timerHandler);
    };
  });

  return (
    <View>
      <Text>Welcome</Text>
      <Button title="Home Screen" onPress={() => navigation.navigate('Home')} />
    </View>
  );
};

export default WelcomeScreen;
