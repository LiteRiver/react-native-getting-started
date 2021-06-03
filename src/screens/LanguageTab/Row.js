import React, {useMemo} from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import FastImage from 'react-native-fast-image';

const ROW_HEIGHT = 120;
const SEPRATOR_HEIGHT = 10;

const Row = ({name, descr, avatarUrl, stars}) => {
  return useMemo(
    () => (
      <TouchableOpacity>
        <View style={styles.box}>
          <View>
            <Text style={styles.title}>{name}</Text>
            <Text numberOfLines={2} style={styles.descr}>
              {descr}
            </Text>
          </View>
          <View style={styles.bottomBox}>
            <View style={styles.flexRow}>
              <Text>Author: </Text>
              <FastImage
                source={{uri: avatarUrl}}
                style={styles.avatar}
                resizeMode={FastImage.resizeMode.contain}
              />
            </View>
            <View style={styles.flexRow}>
              <Text>Stars: </Text>
              <Text>{stars}</Text>
            </View>
            <TouchableOpacity>
              <Image
                source={require('../../../res/images/ic_star.png')}
                style={styles.star}
              />
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    ),
    [avatarUrl, descr, name, stars],
  );
};

const styles = StyleSheet.create({
  box: {
    justifyContent: 'space-between',
    backgroundColor: 'white',
    padding: 8,
    marginHorizontal: 10,
    marginTop: SEPRATOR_HEIGHT,
    shadowColor: 'gray',
    shadowOffset: {width: 0.5, height: 0.5},
    shadowOpacity: 0.5,
    shadowRadius: 5,
    borderRadius: 5,
    elevation: 2,
    height: ROW_HEIGHT,
  },
  title: {
    fontSize: 16,
    color: '#212121',
    marginBottom: 2,
  },
  descr: {
    marginBottom: 2,
    color: '#757575',
  },
  bottomBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 25,
    height: 25,
  },
  star: {
    width: 25,
    height: 25,
  },
});

export const getHeight = (data, index) => {
  return ROW_HEIGHT;
};

export const getOffset = (data, index) => {
  return SEPRATOR_HEIGHT + (ROW_HEIGHT + SEPRATOR_HEIGHT) * index;
};
export default Row;
