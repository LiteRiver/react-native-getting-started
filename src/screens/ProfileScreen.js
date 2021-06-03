import React from 'react';
import {View, Button, StyleSheet} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import Screens from '../constants/screens';

const ProfileScreen = ({navigation}) => {
  return (
    <ScrollView
      style={styles.scrollView}
      contentContainerStyle={styles.scrollViewContent}>
      <View style={styles.btnBox}>
        <Button
          title="Select Languages"
          onPress={() => navigation.push(Screens.SelectLanguage)}
        />
      </View>
      <View style={styles.btnBox}>
        <Button
          title="Sort Languages"
          onPress={() => navigation.push(Screens.SortLanguage)}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: 'yellow',
  },
  scrollViewContent: {
    padding: 10,
    justifyContent: 'space-between',
  },
  btnBox: {
    marginBottom: 15,
  },
});

export default ProfileScreen;
