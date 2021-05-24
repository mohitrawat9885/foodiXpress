import React from 'react';
import {View, Text, HeaderBar} from 'react-native';

import {Avatar, icon, IconButton, Button} from 'react-native-paper';

import {Header, Icon} from 'react-native-elements';

export default function Sells({navigation}) {
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
          text: 'Sells',
          style: {color: 'black', fontSize: 25, justifyContent: 'center'},
        }}
        rightComponent={{icon: 'home', color: 'gray', size: 27}}
        containerStyle={{
          backgroundColor: 'white',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      />
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}></View>
    </>
  );
}
