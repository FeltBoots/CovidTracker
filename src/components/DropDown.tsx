import React, {FC} from 'react';
import {Picker} from '@react-native-community/picker';
import {View, StyleSheet} from 'react-native';
import {Country as CountryType} from '../types';

type Props = {
  countries: CountryType[];
  setCountry: (value: string) => void;
  current?: string;
};

const Dropdown: FC<Props> = ({countries, setCountry, current}) => {
  return (
    <View style={styles.wrapper}>
      <Picker
        style={styles.dropDown}
        onValueChange={(value) => {
          setCountry(value as string);
        }}
        selectedValue={current}>
        {countries.map(({Country, Slug}) => (
          <Picker.Item label={Country} value={Slug} key={Slug} />
        ))}
      </Picker>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 0, 0.7)',
    borderRadius: 4,
    marginBottom: 20,
  },
  dropDown: {
    backgroundColor: 'black',
    color: 'white',
  },
});

export default Dropdown;
