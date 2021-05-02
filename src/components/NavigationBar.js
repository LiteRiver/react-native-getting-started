import React from 'react';
import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import PropTypes from 'prop-types';

const LeftButton = props => {
  const navigation = useNavigation();

  return (
    <View style={styles.leftButton}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Image
          source={require('../../res/images/ic_arrow_back_white_36pt.png')}
          style={styles.icon}
        />
      </TouchableOpacity>
    </View>
  );
};

const NavigationBar = props => {
  const titleView = props.titleView || (
    <View>
      <Text style={styles.title}>{props.title}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {props.leftButton}
      {titleView}
      {props.rightButton}
    </View>
  );
};

NavigationBar.propTypes = {
  leftButton: PropTypes.element,
  rightButton: PropTypes.element,
  hide: PropTypes.bool,
  title: PropTypes.string,
  titleView: PropTypes.element,
};

NavigationBar.defaultProps = {
  leftButton: <LeftButton />,
};

const styles = StyleSheet.create({
  container: {
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 40,
    backgroundColor: '#FA8072',
  },
  icon: {
    width: 22,
    height: 22,
    margin: 5,
  },
  title: {
    color: 'white',
  },
});

NavigationBar.iconStyle = styles.icon;

export default NavigationBar;
