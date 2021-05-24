import 'react-native-gesture-handler';
import React, {Component, useState, useRef} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createDrawerNavigator} from '@react-navigation/drawer';

import {Avatar} from 'react-native-paper';
import {DrawerContent} from './Drawer/DrawerContent';
import HomeScreen from './Home/Home';
import Profile from './Profile/Profile';
import EditProfile from './Profile/EditProfile';
import Menu from './Menu/Menu';
import AddCategory from './Menu/AddCategory';
import AddFood from './Menu/AddFood';
import EditCategory from './Menu/EditCategory';
import EditFood from './Menu/EditFood';
import Sells from './Sells/Sells';
import Feed from './Feeds/Feeds';

const Tab = createBottomTabNavigator();
function HomeTab() {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName, size2;
          if (route.name === 'Home') {
            iconName = 'home';
            size2 = focused ? 48 : 36;
          } else if (route.name === 'Sells') {
            iconName = 'book-open-page-variant';
            size2 = focused ? 48 : 36;
          } else if (route.name === 'Feed') {
            iconName = 'globe-model';
            size2 = focused ? 48 : 36;
          } else if (route.name === 'Menu') {
            iconName = 'format-list-checkbox';
            size2 = focused ? 48 : 36;
          } else if (route.name === 'Profile') {
            iconName = 'account-box';
            size2 = focused ? 48 : 36;
          }

          return (
            <Avatar.Icon
              size={size2}
              icon={iconName}
              color={color}
              backgroundColor="transparent"
            />
          );
        },
      })}
      tabBarOptions={{
        activeTintColor: 'black',
        inactiveTintColor: 'gray',
      }}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Sells" component={Sells} />
      <Tab.Screen name="Feed" component={Feed} />
      <Tab.Screen name="Menu" component={Menu} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
}

const Drawer = createDrawerNavigator();
function Home({navigation}) {
  return (
    <Drawer.Navigator drawerContent={props => <DrawerContent {...props} />}>
      <Drawer.Screen
        name="Home"
        component={HomeTab}
        options={{
          headerShown: false,
        }}
      />
    </Drawer.Navigator>
  );
}

const Stack = createStackNavigator();

export default function Dashboard({navigation}) {
  const [active, setActive] = React.useState('');
  function alterMenu() {
    if (isMenuOpen == false) {
      setMenuIcon('close');
      setIsMenuOpen(true);
      navigation.navigate('DrawerMenu');
    } else if (isMenuOpen == true) {
      setMenuIcon('menu');
      setIsMenuOpen(false);
      navigation.goBack();
    }
  }
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [menuIcon, setMenuIcon] = useState('menu');
  return (
    <>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="EditProfile"
          component={EditProfile}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="AddCategory"
          component={AddCategory}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="AddFood"
          component={AddFood}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="EditFood"
          component={EditFood}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="EditCategory"
          component={EditCategory}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </>
  );
}
