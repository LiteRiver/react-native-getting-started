import React from 'react';
import {View, ActivityIndicator, Text, StyleSheet} from 'react-native';

const Footer = ({shown}) => {
  if (!shown) {
    return null;
  }

  return (
    <View style={styles.box}>
      <ActivityIndicator color="green" size="large" />
      <Text style={styles.loadingText}>Loading...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  box: {
    marginVertical: 15,
  },
  loadingText: {
    color: 'green',
    textAlign: 'center',
  },
});

export default Footer;
