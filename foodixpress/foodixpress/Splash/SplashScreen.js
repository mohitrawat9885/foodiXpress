import React from 'react';
import {
  ImageBackground,
  Image,
  StyleSheet,
  Text,
  View,
  StatusBar,
  ActivityIndicator,
} from 'react-native';

// export default function SplashScreen({navigation}) {
//   const image = require('../Assets/b1.jpg');
//   // setTimeout(() => {
//   //   navigation.replace('GetIn');
//   // }, 100000);
//   return (
//     <>
//       <StatusBar backgroundColor="lightgray" barStyle="dark-content" />
//       <View
//         style={{
//           flex: 1,
//           justifyContent: 'center',
//           alignItems: 'center',
//         }}>
//         {/* <ImageBackground source={image} style={styles.image}>
//         <View style={styles.holder}>
//           <Text style={styles.text}>foodiXpress</Text>
//           <ActivityIndicator
//             style={styles.indicator}
//             size={55}
//             color="#00ff00"
//           />
//         </View>
//       </ImageBackground> */}
//         {/* <View
//           style={{
//             top: 10,
//             height: 200,
//             borderWidth: 1,
//           }}> */}
//         <Text
//           style={{
//             position: 'absolute',
//             top: 210,
//             fontSize: 50,
//           }}>
//           foodiXpress
//         </Text>
//         {/* </View> */}
//       </View>
//     </>
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

export default function SplashScreen({navigation}) {
  const image = require('../Assets/logo.png');
  // setTimeout(() => {
  //   navigation.replace('GetIn');
  // }, 100000);
  return (
    <>
      <StatusBar backgroundColor="lightgray" barStyle="dark-content" />
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View
          style={{
            position: 'absolute',
            top: 140,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image
            style={{
              width: 100,
              height: 100,
            }}
            source={image}></Image>
          <Text
            style={{
              marginTop: 5,
              fontSize: 50,
              color: 'rgb(0, 0,0)',
            }}>
            foodiXpress
          </Text>
        </View>
        <View
          style={{
            position: 'absolute',
            bottom: 100,
          }}>
          <Text
            style={{
              color: 'gray',
              // fontStyle: 'italic',
            }}>
            Powered by NeuroTech
          </Text>
        </View>
      </View>
    </>
  );
}
