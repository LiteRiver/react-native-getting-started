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
  const [loaded, setLoaded] = useState(false);
  const [languages, setLanguages] = useState([]);
  const [capture, setCapture] = useState([]);
  const [changed, setChanged] = useState(false);
  const {selectLanguages} = useContext(LanguageContext);

  // load languages
  useEffect(() => {
    languageStore.getAsync().then(loadedLanguages => {
      setLanguages(loadedLanguages);
      setCapture(
        loadedLanguages.map(t => {
          return {checked: t.checked};
        }),
      );
      setLoaded(true);
    });

    return () => {
      selectLanguages(languageStore.getSelected());
    };
  }, [selectLanguages]);

  // check if changes
  useEffect(() => {
    if (!loaded) {
      return;
    }

    for (let i = 0; i < languages.length; i++) {
      if (languages[i].checked !== capture[i].checked) {
        setChanged(true);
        return;
      }
    }

    setChanged(false);
  }, [navigation, languages, capture, loaded]);

  // save changes
  const onSave = useCallback(() => {
    setLanguages(languages);
    setCapture(
      languages.map(t => {
        return {checked: t.checked};
      }),
    );

    (async () => {
      await languageStore.setAsync(languages);
    })();

    toast.show('The languages have been saved.');
  }, [languages, toast]);

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
