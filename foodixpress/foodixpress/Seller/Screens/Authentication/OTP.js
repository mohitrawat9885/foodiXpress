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

async function storeUserSession() {
  try {
    await EncryptedStorage.setItem(
      'user_session',
      JSON.stringify({
        age: 21,
        token: 'ACCESS_TOKEN',
        username: 'emeraldsanto',
        languages: ['fr', 'en', 'de'],
      }),
    );
    console.log('Data Stored');
    // Congrats! You've just stored your first value!
  } catch (error) {
    // There was an error on the native side
  }
}

export default function EnterOTP({navigation}) {
  //   const image = require('../Assets/b2.jpg');
  const [text, setText] = React.useState('+91');
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
              Enter OTP
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
              onChangeText={text => setText(text)}
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
              onPress={() => {
                storeUserSession();
                navigation.replace('Dashboard');
              }}>
              <Text style={{fontSize: 18, color: 'gray'}}>Submit</Text>
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
