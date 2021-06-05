import React, {useEffect, useState, useCallback, useMemo} from 'react';
import {
  StyleSheet,
  FlatList,
  StatusBar,
  SafeAreaView,
  RefreshControl,
} from 'react-native';
import PropTypes from 'prop-types';
import git from '../../data/git';
import Row, {getHeight, getOffset} from './Row';
import Footer from './Footer';

const PAGE_SIZE = 30;

const LanguageTab = ({language}) => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);

  async function fetchRepos() {
    if (!loading && !refreshing) {
      return;
    }

    try {
      const res = await git.repo.getList({
        language: language,
        page: page,
        per_page: PAGE_SIZE,
      });

      setData([...data, ...res.items]);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }

  useEffect(() => {
    setRefreshing(true);
  }, []);

  useEffect(() => {
    fetchRepos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, refreshing]);

  const keyExtractor = useCallback((item, index) => index.toString(), []);

  const renderItem = useCallback(
    ({item, index}) => (
      <Row
        index={index}
        name={item.name}
        fullName={item.full_name}
        descr={item.description}
        avatarUrl={item.owner.avatar_url}
        stars={item.stargazers_count}
      />
    ),
    [],
  );

  const getItemLayout = useCallback(
    (item, index) => ({
      length: getHeight(item, index),
      offset: getOffset(item, index),
      index,
    }),
    [],
  );

  const onRefresh = useCallback(async () => {
    if (!refreshing && !loading) {
      setRefreshing(true);
      setData([]);
      setPage(1);
    }
  }, [refreshing, loading]);

  const refreshControl = useMemo(
    () => (
      <RefreshControl
        colors={['orange']}
        tintColor={'green'}
        title={'loading'}
        refreshing={refreshing}
        onRefresh={onRefresh}
      />
    ),
    [refreshing, onRefresh],
  );

  const footer = useMemo(() => <Footer shown={!refreshing && loading} />, [
    refreshing,
    loading,
  ]);

  const onEndReached = async () => {
    if (!refreshing && !loading) {
      setLoading(true);
      setPage(pg => pg + 1);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar />
      <FlatList
        data={data}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        getItemLayout={getItemLayout}
        refreshControl={refreshControl}
        ListFooterComponent={footer}
        onEndReached={onEndReached}
        initialNumToRender={7}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});

LanguageTab.propTypes = {
  language: PropTypes.string.isRequired,
};

export default LanguageTab;
