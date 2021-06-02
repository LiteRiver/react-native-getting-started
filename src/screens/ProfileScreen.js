import React, {useState} from 'react';
import {
  View,
  Button,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import NavigationBar from '../components/NavigationBar';
import Screens from '../constants/screens';

const RightButton = props => {
  return (
    <View style={styles.rightButtonContainer}>
      <TouchableOpacity onPress={() => console.log('Hello Icon')}>
        <Image
          source={require('../../res/images/ic_star.png')}
          style={NavigationBar.iconStyle}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => console.log('Hello Icon')}>
        <Image
          source={require('../../res/images/ic_star.png')}
          style={NavigationBar.iconStyle}
        />
      </TouchableOpacity>
    </View>
  );
};

const ProfileScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <NavigationBar rightButton={<RightButton />} title={'Profile'} />
      <ScrollView style={styles.body}>
        <Button
          title="Custom Tags"
          onPress={() => navigation.push(Screens.CustomTag)}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignContent: 'stretch',
  },
  body: {
    padding: 5,
  },
  rightButtonContainer: {
    flexDirection: 'row',
  },
});

export default ProfileScreen;
