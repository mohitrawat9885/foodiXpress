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

const wait = timeout => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};

export default function CanceledOrders({navigation}) {
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = React.useState(false);
  const [canceledOrders, setCanceledOrders] = useState([]);

  const onRefresh = React.useCallback(() => {
    getCanceledOrders();
    setRefreshing(true);
    wait(1000).then(() => setRefreshing(false));
  }, []);

  const getCanceledOrders = async e => {
    try {
      const session = JSON.parse(
        await EncryptedStorage.getItem('user_session'),
      );
      const response = await fetch(
        `${global.server}/Restaurant/getCanceledOrders`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `foodi ${session.token}`,
          },
        },
      );
      const res = JSON.parse(await response.text());
      if (res.status === 'success') {
        console.log('Succcess');
        setCanceledOrders(res.canceledOrders);
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
    getCanceledOrders();
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
            text: 'Canceled Orders',
            style: {color: 'red', fontSize: 25, justifyContent: 'center'},
          }}
          rightComponent={{
            icon: 'home',
            color: 'gray',
            size: 27,
            onPress: () => navigation.navigate('TodaysOrders'),
          }}
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
          text: 'Canceled Orders',
          style: {color: 'red', fontSize: 25, justifyContent: 'center'},
        }}
        rightComponent={{
          icon: 'home',
          color: 'gray',
          size: 27,
          onPress: () => navigation.navigate('TodaysOrders'),
        }}
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
        {canceledOrders.map((order, index) => (
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
