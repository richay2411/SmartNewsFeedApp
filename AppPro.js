import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import NewsFeed from './src/screens/NewsFeed';

const Stack = createStackNavigator();

const AppPro = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="News Feed" component={NewsFeed} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppPro;
