import React from 'react';
import {
  ImageBackground,
  StyleSheet,
  Image,
  Text,
  View,
  StatusBar,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';

// export default function SplashScreen({navigation}) {
//   const image = require('./Seller/Screens/Assets/b1.jpg');

//   return (
//     <View style={styles.container}>
//       <StatusBar backgroundColor="lightgray" barStyle="dark-content" />
//       <ImageBackground source={image} style={styles.image}>
//         <View style={styles.holder}>
//           <Text style={styles.text}>foodiXpress</Text>
//           <View>
//             <TouchableOpacity
//               style={{
//                 width: 300,
//                 height: 50,
//                 backgroundColor: 'white',
//                 borderRadius: 6,
//                 borderColor: 'white',
//                 borderWidth: 1,
//                 justifyContent: 'center',
//                 alignItems: 'center',
//                 marginTop: 16,
//               }}
//               onPress={() => navigation.navigate('customer')}>
//               <Text style={{fontSize: 20, color: 'orange'}}>Customer</Text>
//             </TouchableOpacity>

//             <TouchableOpacity
//               style={{
//                 width: 300,
//                 height: 50,
//                 backgroundColor: 'white',
//                 borderRadius: 6,
//                 borderColor: 'white',
//                 borderWidth: 1,
//                 justifyContent: 'center',
//                 alignItems: 'center',
//                 marginTop: 16,
//               }}
//               onPress={() => navigation.navigate('seller')}>
//               <Text style={{fontSize: 20, color: 'orange'}}>Seller</Text>
//             </TouchableOpacity>

//             <TouchableOpacity
//               style={{
//                 width: 300,
//                 height: 50,
//                 backgroundColor: 'white',
//                 borderRadius: 6,
//                 borderColor: 'white',
//                 borderWidth: 1,
//                 justifyContent: 'center',
//                 alignItems: 'center',
//                 marginTop: 16,
//               }}
//               onPress={() => navigation.navigate('deliveryboy')}>
//               <Text style={{fontSize: 20, color: 'orange'}}>Delivery Boy</Text>
//             </TouchableOpacity>
//             {/* <Button mode="contained" onPress={() => console.log('Pressed')}>
//               Press me
//             </Button> */}
//           </View>
//         </View>
//       </ImageBackground>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     flexDirection: 'column',
//   },
//   holder: {
//     backgroundColor: 'rgba(0, 0, 0, .2)',
//     width: '100%',
//     height: '100%',
//     alignItems: 'center',
//   },
//   image: {
//     flex: 1,
//     resizeMode: 'cover',
//     justifyContent: 'center',
//   },
//   text: {
//     color: 'white',
//     fontSize: 52,
//     marginTop: 190,
//     fontWeight: 'bold',
//     textAlign: 'center',
//     padding: 4,
//     backgroundColor: 'rgba(0, 0, 0, .5)',
//     borderRadius: 10,
//     width: 350,
//   },
//   indicator: {
//     marginTop: 280,
//   },
// });

export default function LandingScreen({navigation}) {
  const image = require('./Assets/logo.png');

  return (
    <>
      <StatusBar backgroundColor="lightgray" barStyle="dark-content" />
      <View
        style={{
          height: '100%',
          backgroundColor: 'lightgray',
          alignItems: 'center',
        }}>
        <View
          style={{
            position: 'absolute',
            top: 100,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image
            style={{
              width: 100,
              height: 100,
              // borderRadius: 1,
              // borderWidth: 1,
              // borderRadius: 50,
              // backgroundColor: 'white',
              // borderColor: 'white',
            }}
            source={image}></Image>
          <Text
            style={{
              marginTop: 5,
              fontSize: 50,
              color: 'tomato',
            }}>
            foodiXpress
          </Text>
          {/* <Text
            style={{
              marginTop: 60,
              color: 'white',
            }}>
            Select App Mode
          </Text> */}
        </View>

        <View
          style={{
            height: '50%',
            width: '95%',

            borderTopRightRadius: 20,
            borderTopLeftRadius: 20,
            position: 'absolute',
            bottom: 0,
            backgroundColor: 'white',
            paddingTop: 50,
            alignItems: 'center',
          }}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('customer')}>
            <Text style={styles.buttonText}>I am Customer</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('seller')}>
            <Text style={styles.buttonText}>I am Seller</Text>
          </TouchableOpacity>

          {/* <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('deliveryboy')}>
            <Text style={{fontSize: 20, color: 'orange'}}>Delivery Boy</Text>
          </TouchableOpacity> */}
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 330,
    height: 55,
    backgroundColor: 'transparent',
    borderRadius: 6,
    borderColor: 'tomato',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
  },
  buttonText: {
    fontSize: 20,
    color: 'tomato',
  },
});
