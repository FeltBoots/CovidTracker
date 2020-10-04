import React, {FC} from 'react';
import {View, StyleSheet, Text, Button} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';
import Route from '../enum/route';
import {RootStackParamList} from '../types';

type Props = {
  navigation: StackNavigationProp<RootStackParamList, Route.Error>;
  route: RouteProp<RootStackParamList, Route.Error>;
};

const ErrorScreen: FC<Props> = ({
  navigation,
  route: {
    params: {message},
  },
}) => {
  return (
    <View style={[styles.centered, styles.container]}>
      <Text
        style={{
          color: 'white',
          fontSize: 20,
          fontWeight: 'bold',
          textAlign: 'center',
          marginBottom: 40,
        }}>
        {message}
      </Text>
      <Button title="Go back" onPress={() => navigation.goBack()} />
    </View>
  );
};

const styles = StyleSheet.create({
  centered: {
    flexDirection: 'column',
    justifyContent: 'center',
  },
  container: {
    backgroundColor: 'black',
    flex: 1,
  },
});

export default ErrorScreen;
