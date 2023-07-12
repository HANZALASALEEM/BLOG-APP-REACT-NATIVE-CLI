import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {createStackNavigator} from '@react-navigation/stack';

//Screens
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import HomeScreen from './screens/HomeScreen';
import CreateBlogScreen from './screens/CreateBlogScreen';
import BlogScreen from './screens/BlogScreen';

// create tab navigator for logged-out state
const Tab = createMaterialTopTabNavigator();

const LoggedOutTabNavigator = ({setIsLoggedIn}) => {
  return (
    <Tab.Navigator initialRouteName="Login">
      <Tab.Screen
        name="Login"
        component={LoginScreen}
        setIsLoggedIn={setIsLoggedIn}
      />
      <Tab.Screen name="Register" component={RegisterScreen} />
    </Tab.Navigator>
  );
};

// create stack navigator for logged-in state
const Stack = createStackNavigator();

const LoggedInStackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="CreateBlog" component={CreateBlogScreen} />
      <Stack.Screen name="Blog" component={BlogScreen} />
    </Stack.Navigator>
  );
};

// check if user is logged in and return appropriate navigator
const MainNavigator = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <NavigationContainer>
      {isLoggedIn ? <LoggedInStackNavigator /> : <LoggedOutTabNavigator />}
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default MainNavigator;
