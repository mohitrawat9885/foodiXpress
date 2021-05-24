import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import EncryptedStorage from 'react-native-encrypted-storage';
import RNRestart from 'react-native-restart';

async function storeUserSession(id, token) {
  try {
    await EncryptedStorage.setItem(
      'user_session',
      JSON.stringify({
        id: id,
        token: token,
      }),
    );
    await EncryptedStorage.setItem('app_mode', 'seller');
    RNRestart.Restart();
    // Congrats! You've just stored your first value!
  } catch (error) {
    console.log(error);
  }
}

export default function SignIn() {
  const [number, setNumber] = React.useState('91');
  const signIn = async e => {
    try {
      const response = await fetch(
        `${global.server}/Restaurant/signInToStore`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            number: number,
          }),
        },
      );
      const res = JSON.parse(await response.text());
      console.log(res);
      if (res.status === 'success') {
        console.log('Succcess');
        storeUserSession(res.storeId, res.token);
      } else {
        alert('Something went wrong', res.message);
      }
    } catch (error) {
      console.log('Internal Error ', error);
      alert('Error');
    }
  };
  // const image = require('../Assets/b2.jpg');

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="lightgray" barStyle="dark-content" />
      {/* <ImageBackground source={image} style={styles.image}> */}
      <View style={styles.holder}>
        <View
          style={{
            backgroundColor: 'rgba(255, 255, 255, .9)',
            marginTop: 120,
            padding: 6,
            height: 380,
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            //   borderRadius: 10,
          }}>
          <View>
            <Text
              style={{
                color: 'gray',
                fontSize: 42,
                textAlign: 'center',
                marginTop: 16,
              }}>
              foodiXpress
            </Text>
          </View>
          <View
            style={{
              marginTop: 50,
            }}>
            <Text
              style={{
                left: 12,
                fontSize: 22,
                color: 'gray',
                fontWeight: 'bold',
              }}>
              Validate Your Number
            </Text>
            <TextInput
              style={{
                width: 310,
                borderWidth: 1,
                borderColor: 'lightgray',
                borderRadius: 6,
                marginTop: 20,
                paddingLeft: 20,
                fontSize: 18,
              }}
              label="Phone Number"
              mode="outlined"
              value={number}
              onChangeText={text => setNumber(text)}
            />
            <TouchableOpacity
              style={{
                width: 310,
                height: 45,
                marginTop: 30,
                borderRadius: 6,
                borderWidth: 1,
                justifyContent: 'center',
                alignItems: 'center',
                borderColor: 'lightgray',
              }}
              onPress={() => signIn()}>
              <Text style={{fontSize: 18, color: 'black'}}>Sign In</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      {/* </ImageBackground> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  holder: {
    backgroundColor: 'rgba(0, 0, 0, 0)',
    width: '100%',
    height: '100%',
    alignItems: 'center',
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  text: {
    color: 'white',
    fontSize: 52,
    marginTop: 190,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 4,
    backgroundColor: 'rgba(0, 0, 0, .7)',
    borderRadius: 10,
    width: 350,
  },
  indicator: {
    marginTop: 280,
  },
});
