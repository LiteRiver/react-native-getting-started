import React, {useCallback, useEffect, useState, useContext} from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import DraggableFlatList from 'react-native-draggable-flatlist';
import languageStore from '../data/languageStore';
import LanguageContext from '../contexts/LanguageContext';

const SortLanguageScreen = () => {
  const [data, setData] = useState([]);
  const {selectLanguages} = useContext(LanguageContext);

  useEffect(() => {
    languageStore.getAsync().then(languages => setData(languages));

    return () => {
      languageStore
        .getSelectedAsync()
        .then(selectedLanguages => selectLanguages(selectedLanguages));
    };
  }, [selectLanguages]);

  const renderItem = useCallback(({item, index, drag, isActive}) => {
    return (
      <TouchableOpacity
        onPressIn={drag}
        style={[styles.item, isActive && styles.itemDragging]}>
        <Text>{item.name}</Text>
      </TouchableOpacity>
    );
  }, []);

  const keyExtractor = useCallback((item, index) => `item-${item.name}`, []);

  return (
    <DraggableFlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      onDragEnd={({data: sortedData}) => {
        setData(sortedData);
        (async () => {
          await languageStore.setAsync(sortedData);
        })();
      }}
      activationDistance={20}
    />
  );
};

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    height: 50,
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  itemDragging: {
    backgroundColor: 'red',
  },
});

export default SortLanguageScreen;
