import 'react-native-gesture-handler';
import React, {Component, useState, useRef} from 'react';
import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import SignIn from './SignIn';
import OTP from './OTP';

const Stack = createStackNavigator();

export default function GetIn({navigation}) {
  return (
    <>
      <StatusBar backgroundColor="lightgray" barStyle="dark-content" />
      <Stack.Navigator initialRouteName="SignIn">
        <Stack.Screen
          name="SignIn"
          component={SignIn}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="OTP"
          component={OTP}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </>
  );
}
