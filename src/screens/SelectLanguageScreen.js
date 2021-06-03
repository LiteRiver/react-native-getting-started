import React, {useCallback, useContext, useEffect, useState} from 'react';
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
import languageStore from '../data/languageStore';
import LanguageContext from '../contexts/LanguageContext';

const LanguageItem = ({index, language, onChange}) => {
  return (
    <View style={styles.languageItem}>
      <CheckBox
        value={language.checked}
        boxType={'square'}
        onValueChange={value => {
          onChange({index, value});
        }}
      />
      <Text style={styles.checkboxText}>{language.name}</Text>
    </View>
  );
};

const HeaderRight = ({changed, onSave}) => {
  return (
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
  );
};

const SelectLanguageScreen = ({navigation}) => {
  const toast = useToast();
  const [languages, setLanguages] = useState([]);
  const [capture, setCapture] = useState([]);
  const [changed, setChanged] = useState(false);
  const {selectLanguages} = useContext(LanguageContext);

  // load languages
  useEffect(() => {
    const loadedLanguages = languageStore.get();

    setLanguages(loadedLanguages);
    setCapture(
      loadedLanguages.map(t => {
        return {checked: t.checked};
      }),
    );
  }, []);

  // check if changes
  useEffect(() => {
    let flag = false;

    for (let i = 0; i < languages.length; i++) {
      if (languages[i].checked !== capture[i].checked) {
        flag = true;
        break;
      }
    }

    setChanged(flag);
  }, [navigation, languages, capture]);

  // save changes
  const onSave = useCallback(() => {
    languageStore.set(languages);
    setCapture(
      languages.map(t => {
        return {checked: t.checked};
      }),
    );
    selectLanguages(languageStore.getSelected());
    toast.show('The languages have been saved.');
  }, [selectLanguages, languages, toast]);

  // configure header right
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => <HeaderRight changed={changed} onSave={onSave} />,
    });
  }, [navigation, changed, onSave]);

  // intercept beforeRemove
  useEffect(() => {
    let forceLeaving = false;

    const unsave = () => {
      forceLeaving = true;
      navigation.pop();
    };

    const save = () => {
      forceLeaving = true;
      onSave();
      navigation.pop();
    };

    const beforeRemove = e => {
      if (forceLeaving) {
        return;
      }

      if (changed) {
        e.preventDefault();
        Alert.alert('Info', 'Do you want to save your changes?', [
          {
            text: 'No',
            onPress: unsave,
            style: 'cancel',
          },
          {
            text: 'Yes',
            onPress: save,
          },
        ]);
      }
    };

    navigation.addListener('beforeRemove', beforeRemove);
    return () => {
      navigation.removeListener('beforeRemove', beforeRemove);
    };
  }, [navigation, changed, onSave]);

  const onSelectionChanged = useCallback(({index, value}) => {
    setLanguages(original => {
      const updated = [...original];
      updated[index].checked = value;
      return updated;
    });
  }, []);

  const renderRows = () => {
    const rows = [];

    for (let i = 0; i < languages.length; i += 2) {
      rows.push(
        <View style={styles.row} key={i}>
          <LanguageItem
            index={i}
            language={languages[i]}
            onChange={onSelectionChanged}
          />
          {languages[i + 1] && (
            <LanguageItem
              index={i + 1}
              language={languages[i + 1]}
              onChange={onSelectionChanged}
            />
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
  languageItem: {
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

export default SelectLanguageScreen;
