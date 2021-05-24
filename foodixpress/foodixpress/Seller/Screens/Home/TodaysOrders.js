import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import {Avatar, Button} from 'react-native-paper';
import {Header} from 'react-native-elements';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {createStackNavigator} from '@react-navigation/stack';
import EncryptedStorage from 'react-native-encrypted-storage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import socketIOClient from 'socket.io-client';
// import PushNotification from 'react-native-push-notification';
import Sound from 'react-native-sound';
const wait = timeout => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};

export default function TodaysOrders({navigation}) {
  // const notifySound = {
  //   title: 'Play mp3 sound from Local',
  //   isRequire: true,
  //   url: require('../Assets/neworder.mp3'),
  // };

  // sound1 = new Sound(notifySound.url, (err, sou) => {
  //   alert('Error Sound');
  // });

  // sound1.play(() => {
  //   sound1.release();
  // });

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = React.useState(false);
  const [newOrders, setNewOrders] = useState([]);

  React.useEffect(async () => {
    const session = JSON.parse(await EncryptedStorage.getItem('user_session'));
    const socket = socketIOClient(global.server, {
      auth: {
        token: session.token,
      },
    });
    socket.emit('connection', 'Hello Server');
    socket.on('message', data => {
      var sound1 = new Sound(
        require('../Assets/neworder.mp3'),
        (error, sound) => {
          if (error) {
            alert('error' + error.message);
            return;
          }
          sound1.play(() => {
            sound1.release();
          });
        },
      );

      getNewOrders();
    });

    const unsubscribe = navigation.addListener('focus', () => {
      getNewOrders();
    });
    return unsubscribe;
  }, [navigation]);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(1000).then(() => setRefreshing(false));
  }, []);

  const getNewOrders = async e => {
    try {
      const session = JSON.parse(
        await EncryptedStorage.getItem('user_session'),
      );
      const response = await fetch(`${global.server}/Restaurant/getNewOrders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `foodi ${session.token}`,
        },
      });
      const res = JSON.parse(await response.text());
      if (res.status === 'success') {
        setNewOrders(res.newOrders);
        setLoading(false);
      } else {
        alert('Something went wrong', res.message);
        setLoading(false);
      }
    } catch (error) {
      console.log('Internal Error ', error);
      setLoading(false);
      alert('Error');
    }
  };

  const getDate = (date, type) => {
    const months = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];
    const d = new Date(date);
    if (type === 'year') return d.getFullYear();
    if (type === 'date') return d.getDate();
    if (type === 'month') return months[d.getMonth()];
    if (type === 'time') {
      let h = d.getHours();
      let m = d.getMinutes();
      if (h > 12) {
        h = h - 12;
        if (h < 10) {
          h = '0' + h;
        }
        return h + ':' + m + ' PM';
      } else if (h <= 12) {
        if (h < 10) {
          h = '0' + h;
        }
        return h + ':' + m + ' AM';
      }
    }
  };

  if (loading) {
    getNewOrders();
    return (
      <>
        <Header
          backgroundColor="lightgray"
          barStyle="dark-content"
          placement="left"
          leftComponent={{
            icon: 'menu',
            color: 'black',
            size: 28,
            onPress: () => navigation.openDrawer(),
          }}
          centerComponent={{
            text: 'foodiXpress',
            style: {color: 'black', fontSize: 25, justifyContent: 'center'},
          }}
          rightComponent={
            // {icon: 'menu', color: 'gray', size: 27}
            <Icon name="cart" color="gray" size={28} />
          }
          containerStyle={{
            backgroundColor: 'white',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        />
        <View
          style={{
            height: '100%',
            width: '100%',
            position: 'absolute',
            backgroundColor: 'rgba(255, 255, 255, .9)',
            zIndex: 100,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <ActivityIndicator size={40} color="gray" />
        </View>
      </>
    );
  }
  return (
    <>
      <Header
        backgroundColor="lightgray"
        barStyle="dark-content"
        placement="left"
        leftComponent={{
          icon: 'menu',
          color: 'black',
          size: 28,
          onPress: () => navigation.openDrawer(),
        }}
        centerComponent={{
          text: 'foodiXpress',
          style: {color: 'black', fontSize: 25, justifyContent: 'center'},
        }}
        rightComponent={
          // {icon: 'menu', color: 'gray', size: 27}
          <Icon name="cart" color="gray" size={28} />
        }
        containerStyle={{
          backgroundColor: 'white',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      />
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        {newOrders.map((order, index) => (
          <TouchableOpacity
            key={index}
            style={{
              flex: 1,
              flexDirection: 'row',
              backgroundColor: 'white',
              marginLeft: 6,
              marginRight: 6,
              borderTopColor: 'lightgray',
              borderTopWidth: 2,
              padding: 6,
            }}
            onPress={() =>
              navigation.navigate('OrderDetail', {
                order: order,
              })
            }>
            <View style={{marginLeft: 6}}>
              <Text style={{fontSize: 14}}>
                {getDate(order.orderDate, 'year')}
              </Text>
              <Text style={{fontSize: 21, fontWeight: 'bold'}}>
                {getDate(order.orderDate, 'date')}
              </Text>
              <Text style={{fontSize: 14}}>
                {getDate(order.orderDate, 'month')}
              </Text>
            </View>
            <View style={{marginLeft: 16}}>
              <Text style={{color: 'black', fontWeight: 'bold'}}>
                {getDate(order.orderDate, 'time')}
              </Text>
              <Text style={{fontSize: 18, color: 'blue'}}>
                {order.customer.name}
              </Text>
              <Text style={{color: 'gray'}}>{order.customer.number}</Text>
            </View>

            <View
              style={{
                position: 'absolute',
                right: 10,
                bottom: 10,
              }}>
              <View style={{marginLeft: 16}}>
                <Text style={{fontSize: 15}}>Total</Text>
                <Text style={{fontSize: 16, fontWeight: 'bold'}}>$130</Text>
              </View>
              <Text style={{color: 'brown'}}>{order.status}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </>
  );
}