import React, {useState} from 'react';
import {View, StyleSheet, Image, NativeModules} from 'react-native';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import {
  Avatar,
  Title,
  Caption,
  Paragraph,
  Drawer,
  Text,
  TouchableRipple,
  ActivityIndicator,
  Switch,
  Chip,
} from 'react-native-paper';
import EncryptedStorage from 'react-native-encrypted-storage';
import Icom from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import RNRestart from 'react-native-restart';

async function signout() {
  try {
    await EncryptedStorage.clear();
    // NativeModules.DevSettings.reload();
    RNRestart.Restart();
    // Congrats! You've just cleared the device storage!
  } catch (error) {
    alert('Something went wrong!');
    console.log('Error on Clear Data');
    // There was an error on the native side
  }
}

export function DrawerContent(props) {
  const [isRestaurantOpen, setIsRestaurantOpen] = React.useState(false);
  const [restaurantStatus, setRestaurantStatus] = useState('Restaurant Closed');
  const [statusColor, setStatusColor] = useState('red');
  const [verifacation, setVerification] = useState('Un-Verified');
  const [verifacationColor, setVerificationColor] = useState('red');
  const [profile, setProfile] = useState({
    name: '',
    pic: '',
    background: '',
  });
  const [loading, setLoading] = useState(true);

  const changeActivityStatus = async () => {
    try {
      // setLoading(true);
      let activity;
      const session = JSON.parse(
        await EncryptedStorage.getItem('user_session'),
      );
      const response = await fetch(
        `${global.server}/Restaurant/changeActivityStatus/`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `foodi ${session.token}`,
          },
          body: JSON.stringify({
            activity: !isRestaurantOpen,
          }),
        },
      );
      const res = JSON.parse(await response.text());
      if (res.status === 'closed') {
        setIsRestaurantOpen(false);
        setRestaurantStatus('Restaurant Closed');
        setStatusColor('red');
      } else if (res.status === 'opened') {
        setIsRestaurantOpen(true);
        setRestaurantStatus('Restaurant Opened');
        setStatusColor('green');
      } else {
        alert('Server Error');
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getRestaurantProfile = async e => {
    try {
      // setLoading(true);
      const session = JSON.parse(
        await EncryptedStorage.getItem('user_session'),
      );
      const response = await fetch(
        `${global.server}/Restaurant/getProfile/${session.id}/`,
        {
          method: 'GET',
          headers: {
            Authorization: `foodi ${session.token}`,
          },
        },
      );
      const res = JSON.parse(await response.text());
      if (res.status === 'success') {
        setProfile(res.profile);
        setLoading(false);

        if (res.active === false) {
          setIsRestaurantOpen(false);
          setRestaurantStatus('Restaurant Closed');
          setStatusColor('red');
        } else if (res.active === true) {
          setIsRestaurantOpen(true);
          setRestaurantStatus('Restaurant Opened');
          setStatusColor('green');
        }

        if (res.verified === true) {
          setVerification('Verified');
          setVerificationColor('green');
        } else if (res.verified === false) {
          setVerification('Un-Verified');
          setVerificationColor('red');
        }
      } else {
        setLoading(false);
        console.log(res.message);
      }
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  // getRestaurantProfile();

  const getProfileDiv = () => {
    if (loading) {
      getRestaurantProfile();
    }
    return (
      <View>
        <View>
          <Image
            source={{
              uri: `${global.server}/assets/images/${profile.background}`,
            }}
            style={{width: '100%', height: 130}}
          />
        </View>
        <View
          style={{
            position: 'absolute',
            top: 70,
            alignItems: 'center',
            flexDirection: 'row',
          }}>
          <Image
            source={{
              uri: `${global.server}/assets/images/${profile.pic}`,
            }}
            style={{
              width: 100,
              height: 100,
              borderColor: 'white',
              borderWidth: 5,
              borderRadius: 50,
            }}
          />
        </View>
        <View style={{position: 'absolute', right: 25, top: 140}}>
          <Chip
            icon="star"
            size={2}
            mode="outlined"
            textStyle={{color: 'white'}}
            style={{backgroundColor: verifacationColor}}
            onPress={() => alert(`This Account is ${verifacation}`)}>
            {verifacation}
          </Chip>
        </View>
        <Text
          style={{
            padding: 5,
            marginTop: 50,
            marginBottom: 20,
            fontSize: 18,
            textAlign: 'center',
          }}>
          {profile.name}
        </Text>
      </View>
    );
  };
  return (
    <View style={{flex: 1}}>
      <DrawerContentScrollView {...props}>
        <View style={styles.DrawerContent}>
          <View style={styles.userInfoSection}>{getProfileDiv()}</View>
          <Drawer.Section style={styles.drawerSection}>
            <DrawerItem
              icon={({color, size}) => (
                <Icon name="home" color={color} size={size} />
              )}
              label="Home"
              onPress={() => props.navigation.navigate('TodaysOrders')}
            />

            <DrawerItem
              icon={({color, size}) => (
                <Icon name="account" color={color} size={size} />
              )}
              label="Profile"
              onPress={() => props.navigation.navigate('Profile')}
            />
            {/* <DrawerItem
              icon={({color, size}) => (
                <Icon name="account-edit" color={color} size={size} />
              )}
              label="Edit Profile"
              onPress={() => props.navigation.navigate('EditProfile')}
            /> */}

            <DrawerItem
              icon={({color, size}) => (
                <Icon name="cart-arrow-down" color={color} size={size} />
              )}
              label="New Orders"
              onPress={() => props.navigation.navigate('TodaysOrders')}
            />

            <DrawerItem
              icon={({color, size}) => (
                <Icon name="food-fork-drink" color={color} size={size} />
              )}
              onPress={() => props.navigation.navigate('Menu')}
              label="Food Menu"
            />
            {/* <DrawerItem
              icon={({color, size}) => (
                <Icon name="food" color={color} size={size} />
              )}
              onPress={() => props.navigation.navigate('AddFood')}
              label="Add Food"
            />
            <DrawerItem
              icon={({color, size}) => (
                <Icon name="food-variant" color={color} size={size} />
              )}
              onPress={() => props.navigation.navigate('AddCategory')}
              label="Add Category"
            /> */}

            {/* <DrawerItem
              icon={({color, size}) => (
                <Icon name="account-check-outline" color={color} size={size} />
              )}
              label="Support"
            /> */}
          </Drawer.Section>
          <Drawer.Section style={styles.drawerSection} title="Orders">
            <DrawerItem
              icon={({color, size}) => (
                <Icon name="file-outline" color={color} size={size} />
              )}
              onPress={() => props.navigation.navigate('AllOrders')}
              label="All Orders"
            />
            <DrawerItem
              icon={({color, size}) => (
                <Icon name="file-eye-outline" color={color} size={size} />
              )}
              onPress={() => props.navigation.navigate('ProcessingOrders')}
              label="Processing Orders"
            />
            <DrawerItem
              icon={({color, size}) => (
                <Icon name="file-check-outline" color={color} size={size} />
              )}
              onPress={() => props.navigation.navigate('DeliveredOrders')}
              label="Delivered Orders"
            />
            <DrawerItem
              icon={({color, size}) => (
                <Icon name="file-cancel-outline" color={color} size={size} />
              )}
              onPress={() => props.navigation.navigate('CanceledOrders')}
              label="Canceled Orders"
            />
          </Drawer.Section>
          <Drawer.Section>
            <DrawerItem
              icon={({color, size}) => (
                <Icon name="exit-to-app" color={color} size={size} />
              )}
              label="Sign out"
              onPress={() => {
                signout();
              }}
            />
          </Drawer.Section>
        </View>
      </DrawerContentScrollView>
      <Drawer.Section style={styles.bottomDrawerSection}>
        <TouchableRipple
          onPress={() => {
            changeActivityStatus();
          }}>
          <View style={styles.preference}>
            <Text
              style={{
                color: statusColor,
                fontSize: 18,
                fontWeight: 'bold',
              }}>
              {restaurantStatus}
            </Text>
            <View pointerEvents="none">
              <Switch value={isRestaurantOpen} />
            </View>
          </View>
        </TouchableRipple>
      </Drawer.Section>
    </View>
  );
}

const styles = StyleSheet.create({
  DrawerContent: {
    flex: 1,
    margin: 0,
    padding: 0,
  },
  userInfoSection: {
    paddingLeft: 0,
    borderBottomColor: 'lightgray',
    borderBottomWidth: 1,
  },
  title: {
    fontSize: 16,
    marginTop: 3,
    fontWeight: 'bold',
  },
  Caption: {
    fontSize: 14,
    lineHeight: 14,
  },
  row: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  paragraph: {
    fontWeight: 'bold',
    marginRight: 3,
  },
  drawerSection: {
    marginTop: 10,
  },
  bottomDrawerSection: {
    marginBottom: 15,
    borderTopColor: '#f4f4f4',
    borderTopWidth: 1,
  },
  preference: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});
