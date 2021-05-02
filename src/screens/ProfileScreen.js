import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import NavigationBar from '../components/NavigationBar';
import Repository from '../data/reponsitory';

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

const ProfileScreen = () => {
  const [content, setContent] = useState('fetching...');
  useEffect(() => {
    async function fetchRepositories() {
      const res = await Repository.getTrending({
        keywords: 'react-navigation',
        language: 'javascript',
        page: 2,
        per_page: 10,
      });

      setContent(JSON.stringify(res));
    }

    try {
      fetchRepositories();
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <View style={styles.container}>
      <NavigationBar rightButton={<RightButton />} title={'Profile'} />
      <ScrollView>
        <Text>{content}</Text>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  rightButtonContainer: {
    flexDirection: 'row',
  },
});

export default ProfileScreen;
