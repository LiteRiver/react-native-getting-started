import React, {useContext, useEffect, useLayoutEffect, useState} from 'react';
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import {useToast} from 'react-native-fast-toast';
import CheckBox from '@react-native-community/checkbox';
import tagStore from '../data/tagStore';
import TagContext from '../contexts/TagContext';

const TagItem = ({index, tag, onChange}) => {
  return (
    <View style={styles.tagItem}>
      <CheckBox
        value={tag.checked}
        boxType={'square'}
        onValueChange={value => {
          onChange({index, value});
        }}
      />
      <Text style={styles.checkboxText}>{tag.name}</Text>
    </View>
  );
};

const CustomTagScreen = ({navigation}) => {
  const toast = useToast();
  const [tags, setTags] = useState([]);
  const [capture, setCapture] = useState([]);
  const [changed, setChanged] = useState(false);
  const {setTags: setContext} = useContext(TagContext);

  useEffect(() => {
    let flag = false;

    for (let i = 0; i < tags.length; i++) {
      if (tags[i].checked !== capture[i].checked) {
        flag = true;
        break;
      }
    }

    setChanged(flag);
  }, [navigation, tags, capture]);

  useEffect(() => {
    const cancel = () => {};
    let forceLeaving = false;

    const leave = () => {
      forceLeaving = true;
      navigation.pop();
    };

    const beforeRemove = e => {
      if (forceLeaving) {
        return;
      }

      if (changed) {
        e.preventDefault();
        Alert.alert('Info', 'There are some unsaved tags', [
          {
            text: 'Cancel',
            onPress: cancel,
            style: 'cancel',
          },
          {
            text: 'Leave without Saving',
            onPress: leave,
          },
        ]);
      }
    };

    navigation.addListener('beforeRemove', beforeRemove);
    return () => {
      navigation.removeListener('beforeRemove', beforeRemove);
    };
  });

  useLayoutEffect(() => {
    const onSave = () => {
      tagStore.set(tags);
      setCapture(
        tags.map(t => {
          return {checked: t.checked};
        }),
      );
      setContext(tagStore.getChecked());
      toast.show('The tags have been saved.');
    };

    navigation.setOptions({
      headerRight: props => (
        <TouchableOpacity
          style={styles.rightButton}
          onPress={onSave}
          disabled={!changed}>
          <Text
            style={[
              styles.rightButtonText,
              !changed && styles.disabledRightButtonText,
            ]}>
            Save
          </Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation, changed, tags, toast, setContext]);

  useEffect(() => {
    const fetchedTags = tagStore.get();

    setTags(fetchedTags);
    setCapture(
      fetchedTags.map(t => {
        return {checked: t.checked};
      }),
    );
  }, []);

  const onTagChanged = ({index, value}) => {
    setTags(oldTags => {
      const updatedTags = [...oldTags];
      updatedTags[index].checked = value;
      return updatedTags;
    });
  };

  const renderRows = () => {
    const rows = [];

    for (let i = 0; i < tags.length; i += 2) {
      rows.push(
        <View style={styles.row} key={i}>
          <TagItem index={i} tag={tags[i]} onChange={onTagChanged} />
          {tags[i + 1] && (
            <TagItem index={i + 1} tag={tags[i + 1]} onChange={onTagChanged} />
          )}
        </View>,
        <View style={styles.line} key={i + 1} />,
      );
    }

    rows.pop();

    return rows;
  };
  return <ScrollView>{renderRows()}</ScrollView>;
};

const styles = StyleSheet.create({
  rightButton: {
    marginRight: 15,
  },
  rightButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'green',
  },
  disabledRightButtonText: {
    color: 'lightgray',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    padding: 15,
  },
  line: {
    height: 1,
    backgroundColor: '#dddddd',
  },
  tagItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkboxIcon: {
    borderRadius: 6,
    borderWidth: 3,
    borderColor: 'green',
  },
  checkboxText: {
    marginLeft: 6,
  },
});

export default CustomTagScreen;
