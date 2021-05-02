import React, {useCallback, useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  StatusBar,
  SafeAreaView,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import Repository from '../data/reponsitory';

const PAGE_SIZE = 100;

const Item = ({fullName}) => {
  return (
    <View style={styles.itemContainer}>
      <Text>{fullName}</Text>
    </View>
  );
};

const LoadingIndicator = ({refreshing}) => {
  if (refreshing) {
    return null;
  }

  return (
    <View>
      <ActivityIndicator color="green" />
      <Text style={styles.loadingText}>Loading...</Text>
    </View>
  );
};

const PopularScreen = () => {
  const [data, setData] = useState([]);
  const [nextPage, setNextPage] = useState(1);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    console.log(':::::::::::useEffect:::::::::::');

    fetchTrending();
  }, []);

  async function fetchTrending() {
    try {
      const res = await Repository.getTrending({
        page: nextPage,
        per_page: PAGE_SIZE,
      });

      setNextPage(np => np + 1);
      setData(items => items.concat(res.items));
    } catch (error) {
      console.log('::::::::::::::ERROR:::::::::::::::::');
      console.log(error);
    }
  }

  const renderItem = ({item}) => <Item fullName={item.fullName} />;

  const onRefresh = useCallback(async () => {
    console.log('::::::::onRefresh:::::::');
    setRefreshing(true);
    setNextPage(np => 1);
    setData(items => []);
    console.log(`> nextPage => ${nextPage}`);
    console.log(nextPage);

    await fetchTrending();
    setRefreshing(false);
  }, []);

  const onEndReached = useCallback(async () => {
    console.log('::::::::onEndReached:::::::');
    await fetchTrending();
  }, [nextPage]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar />
      <FlatList
        data={data}
        renderItem={renderItem}
        refreshControl={
          <RefreshControl
            colors={['orange']}
            tintColor={'green'}
            title={'loading'}
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
        ListFooterComponent={<LoadingIndicator refreshing={refreshing} />}
        onEndReached={onEndReached}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
    backgroundColor: 'gray',
  },
  itemContainer: {
    backgroundColor: 'white',
    marginBottom: 5,
    borderWidth: 0.5,
    borderColor: '#aeaeae',
    padding: 5,
  },
  seprator: {
    height: 2,
    backgroundColor: 'green',
  },
  loadingText: {
    color: 'green',
    textAlign: 'center',
  },
});

export default PopularScreen;
