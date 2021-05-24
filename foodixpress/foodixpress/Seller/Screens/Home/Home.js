import React from 'react';
import {View, Text, Image, ScrollView, StyleSheet} from 'react-native';
import {Avatar, Button} from 'react-native-paper';
import {Header, Icon} from 'react-native-elements';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {createStackNavigator} from '@react-navigation/stack';

import TodaysOrders from './TodaysOrders';
import CanceledOrders from './CanceledOrders';
import DeliveredOrders from './DeliveredOrders';
import AllOrders from './AllOrders';
import ProcessingOrders from './ProcessingOrders';
import OrderDetail from './OrderDetail';
const Stack = createStackNavigator();
export default function HomeScreen({navigation}) {
  return (
    <>
      <Stack.Navigator initialRouteName="TodaysOrders">
        <Stack.Screen
          name="TodaysOrders"
          component={TodaysOrders}
          options={{
            title: 'hi',
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="AllOrders"
          component={AllOrders}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="ProcessingOrders"
          component={ProcessingOrders}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="DeliveredOrders"
          component={DeliveredOrders}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="CanceledOrders"
          component={CanceledOrders}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="OrderDetail"
          component={OrderDetail}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </>
  );
}
