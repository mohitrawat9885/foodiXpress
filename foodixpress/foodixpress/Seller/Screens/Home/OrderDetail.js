import React from 'react';
import {View, Text, Image, ScrollView, StyleSheet} from 'react-native';
import {Avatar, Button} from 'react-native-paper';
import {Header, Icon} from 'react-native-elements';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {createStackNavigator} from '@react-navigation/stack';
import EncryptedStorage from 'react-native-encrypted-storage';

export default function OrderDetail({route, navigation}) {
  const order = route.params.order;

  const setOrderStatus = async action => {
    try {
      const session = JSON.parse(
        await EncryptedStorage.getItem('user_session'),
      );
      const response = await fetch(
        `${global.server}/Restaurant/setOrderStatus`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `foodi ${session.token}`,
          },
          body: JSON.stringify({
            orderId: order._id,
            action: action,
          }),
        },
      );
      const res = JSON.parse(await response.text());
      if (res.status === 'success') {
        console.log('Succcess');
        navigation.pop();
      } else {
        console.log(res.message);
        alert('Something went wrong', res.message);
      }
    } catch (error) {
      console.log('Internal Error ', error);
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

  let Processing;

  if (order.status === 'Processing') {
    Processing = 'Un Process';
  } else if (order.status === 'Ordered') {
    Processing = 'Processing';
  } else if (order.status === 'Canceled') {
    Processing = 'Un Process';
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
      <ScrollView>
        <View>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              backgroundColor: 'white',
              margin: 6,
              padding: 6,
            }}>
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
          </View>

          {order.foods.map((food, index) => (
            <View key={index} style={styles.foodStyle}>
              <Image
                source={{
                  uri: `${global.server}/assets/images/${food.image}`,
                }}
                style={styles.foodImage}
              />
              <Text style={{fontSize: 18, marginLeft: 10}}>{food.name}</Text>
              <View style={{right: 80, position: 'absolute'}}>
                <Text style={{fontSize: 16}}>$ {food.price}</Text>
                <Text style={{fontSize: 16}}>Qty:- {food.quantity}</Text>
              </View>
              <View style={{right: 10, position: 'absolute'}}>
                <Text style={{fontSize: 16}}>Total</Text>
                <Text style={{fontSize: 16}}>
                  $ {food.price * food.quantity}
                </Text>
              </View>
            </View>
          ))}

          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              backgroundColor: 'white',
              justifyContent: 'center',
              margin: 6,
              padding: 6,
            }}>
            <View
              style={{
                width: 200,
                flexDirection: 'row',
                justifyContent: 'center',
              }}>
              <Avatar.Icon
                style={{backgroundColor: 'white'}}
                size={38}
                icon="map-marker-radius"
                color="blue"
              />
              <Text style={{fontSize: 16, textAlign: 'center'}}>
                {order.customer.address.area}, {order.customer.address.landmark}
                , {order.customer.address.city}, {order.customer.address.state}{' '}
                {order.customer.address.pincode}
              </Text>
            </View>
          </View>
          <View
            style={{
              margin: 6,
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Button
              style={{width: '40%'}}
              icon="account-off"
              mode="contained"
              color="lightgray"
              backgroundColor="white"
              onPress={() => setOrderStatus('Cancel')}>
              Cancel Order
            </Button>

            <Button
              style={{width: '40%'}}
              icon="account-convert"
              mode="contained"
              color="orange"
              onPress={() => setOrderStatus(Processing)}>
              {Processing}
            </Button>
          </View>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  foodStyle: {
    margin: 6,
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
    paddingLeft: 10,
    width: '98%',
    height: 90,
    backgroundColor: 'white',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  foodImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 1,
    borderColor: 'black',
  },
});
