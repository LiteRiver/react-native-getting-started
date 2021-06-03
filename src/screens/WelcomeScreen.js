import React, {useState, useRef, useEffect} from 'react';
import {View, Text, Button} from 'react-native';
import {StackActions} from '@react-navigation/native';

const TOTAL_SECONDS = 3;

const WelcomeScreen = ({navigation, route}) => {
  const [seconds, setSeconds] = useState(TOTAL_SECONDS);
  const secondsRef = useRef(TOTAL_SECONDS);

  useEffect(() => {
    const timerHandler = setInterval(() => {
      secondsRef.current = secondsRef.current - 1;
      setSeconds(secondsRef.current);
      if (secondsRef.current === 0) {
        timerHandler && clearInterval(timerHandler);
        navigation.dispatch(StackActions.replace('Home'));
      }
    }, 1000);

    return function () {
      timerHandler && clearInterval(timerHandler);
    };
  }, [navigation]);

  return (
    <View>
      <Text>Welcome, {seconds}s</Text>
      <Button title="Home Screen" onPress={() => navigation.navigate('Home')} />
    </View>
  );
};

export default WelcomeScreen;
