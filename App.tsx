import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {RootStackParamList} from './src/types';
import Route from './src/enum/route';
import Home from './src/components/Home';
import Details from './src/components/Details';
import ErrorScreen from './src/components/ErrorScreen';

const Stack = createStackNavigator<RootStackParamList>();

const App = () => (
  <NavigationContainer>
    <Stack.Navigator headerMode="none">
      <Stack.Screen name={Route.Home} component={Home} />
      <Stack.Screen name={Route.Details} component={Details} />
      <Stack.Screen name={Route.Error} component={ErrorScreen} />
    </Stack.Navigator>
  </NavigationContainer>
);

export default App;
