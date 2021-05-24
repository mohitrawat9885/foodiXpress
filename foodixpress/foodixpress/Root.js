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
import EncryptedStorage from 'react-native-encrypted-storage';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import SplashScreen from './Splash/SplashScreen';
import GetIn from './Seller/Screens/Authentication/GetIn';
import Dashboard from './Seller/Screens/Dashboard';

import Starting from './Starting';
import Customer from './Customer/Customer';
// import DeliveryBoy from './Driver/Driver';
global.server = 'http://192.168.43.108:8000';

const isEmpty = obj => {
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) return false;
  }
  return true;
};

const Stack = createStackNavigator();

export default function App() {
  const [isLoading, setLoading] = useState(true);
  const [isSignIn, setSignIn] = useState(false);
  const [appMode, setAppMode] = useState('');

  async function retrieveUserSession() {
    try {
      const session = await EncryptedStorage.getItem('user_session');
      var appMode = await EncryptedStorage.getItem('app_mode');

      if (session !== undefined) {
        setTimeout(() => {
          if (session === null) {
            setAppMode(appMode);
            setSignIn(false);
            setLoading(false);
          }
          if (!isEmpty(session)) {
            setAppMode(appMode);
            setSignIn(true);
            setLoading(false);
          }
        }, 1500);
      } else {
        console.log('Session not found');
      }
    } catch (error) {
      console.log('Error Retriving Session');
    }
  }

  if (isLoading) {
    retrieveUserSession();
    return <SplashScreen />;
  } else if (!isLoading) {
    if (!isSignIn) {
      // alert(appMode);

      return (
        <>
          <StatusBar backgroundColor="lightgray" barStyle="dark-content" />
          <NavigationContainer>
            <Stack.Navigator>
              <Stack.Screen
                name="Starting"
                component={Starting}
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="customer"
                component={Customer}
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="seller"
                component={GetIn}
                options={{
                  headerShown: false,
                }}
              />
              {/* <Stack.Screen
                name="deliveryboy"
                component={DeliveryBoy}
                options={{
                  headerShown: false,
                }}
              /> */}
            </Stack.Navigator>
          </NavigationContainer>
        </>
      );
    } else if (isSignIn) {
      if (appMode === 'customer') {
        return (
          <>
            <StatusBar backgroundColor="lightgray" barStyle="dark-content" />
            <NavigationContainer>
              <Stack.Navigator>
                <Stack.Screen
                  name="Customer"
                  component={Customer}
                  options={{
                    headerShown: false,
                  }}
                />
              </Stack.Navigator>
            </NavigationContainer>
          </>
        );
      } else if (appMode === 'seller') {
        return (
          <>
            <StatusBar backgroundColor="lightgray" barStyle="dark-content" />
            <NavigationContainer>
              <Stack.Navigator>
                <Stack.Screen
                  name="Dashboard"
                  component={Dashboard}
                  options={{
                    headerShown: false,
                  }}
                />
              </Stack.Navigator>
            </NavigationContainer>
          </>
        );
      } else if (appMode === 'deliveryboy') {
        return (
          <>
            <StatusBar backgroundColor="lightgray" barStyle="dark-content" />
            <NavigationContainer>
              <Stack.Navigator>
                <Stack.Screen
                  name="DeliveryBoy"
                  component={DeliveryBoy}
                  options={{
                    headerShown: false,
                  }}
                />
              </Stack.Navigator>
            </NavigationContainer>
          </>
        );
      } else {
        return (
          <>
            <StatusBar backgroundColor="lightgray" barStyle="dark-content" />
            <NavigationContainer>
              <Stack.Navigator>
                <Stack.Screen
                  name="Starting"
                  component={Starting}
                  options={{
                    headerShown: false,
                  }}
                />
              </Stack.Navigator>
            </NavigationContainer>
          </>
        );
      }
    }
  }
}
