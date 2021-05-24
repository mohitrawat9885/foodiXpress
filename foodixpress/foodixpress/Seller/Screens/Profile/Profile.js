import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
  Alert,
} from 'react-native';
import {Avatar, Button} from 'react-native-paper';
import {Header, Icon, BottomSheet} from 'react-native-elements';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import EncryptedStorage from 'react-native-encrypted-storage';

const wait = timeout => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};

const createFormData = photo => {
  const data = new FormData();

  data.append('photo', {
    name: photo.fileName,
    type: photo.type,
    uri:
      Platform.OS === 'android' ? photo.uri : photo.uri.replace('file://', ''),
  });
  return data;
};

export default function Profile({route, navigation}) {
  const [bottomSheet, setBottomSheet] = useState(false);
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState({address: {number: [], email: []}});
  const [registerNumber, setRegisterNumber] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [galleryImage, setGalleryImage] = useState('');
  const [gallery, setGallery] = useState([]);
  const removeGalleryImageAlert = image =>
    Alert.alert('Remove Image', 'This Image will be removed', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {text: 'OK', onPress: () => removeGalleryImage(image)},
    ]);
  const removeGalleryImage = async image => {
    try {
      const session = JSON.parse(
        await EncryptedStorage.getItem('user_session'),
      );
      const response = await fetch(
        `${global.server}/Restaurant/removeGalleryImage`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `foodi ${session.token}`,
          },
          body: JSON.stringify({
            // id: '6080e26a3a5b5e114011b635',
            image: image,
          }),
        },
      );
      const res = JSON.parse(await response.text());
      if (res.status === 'success') {
        res.gallery.reverse();
        setGallery(res.gallery);
      } else if (res.status === 'error') {
        alert('Server Error');
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
      alert('Error');
    }
  };
  var imageName;
  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      if (global.profileUpdated) {
        getRestaurantProfile();
      }
    });
    return unsubscribe;
  }, [navigation]);

  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = React.useCallback(() => {
    getRestaurantProfile();
    getRestaurantGallery();
    setRefreshing(true);
    wait(1000).then(() => setRefreshing(false));
  }, []);

  const getRestaurantGallery = async e => {
    try {
      // setLoading(true);
      const session = JSON.parse(
        await EncryptedStorage.getItem('user_session'),
      );
      const response = await fetch(
        `${global.server}/Restaurant/getGallery/${session.id}/`,
        {
          method: 'GET',
          headers: {
            Authorization: 'mohit',
          },
        },
      );
      const res = JSON.parse(await response.text());
      if (res.status === 'success') {
        // global.profileUpdated = false;
        res.gallery.reverse();
        setGallery(res.gallery);
        // console.log(res.gallery);
        setLoading(false);
      }
    } catch (err) {
      console.log(err);
      setLoading(false);
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
        // console.log(res);
        global.profileUpdated = false;
        setProfile(res.profile);
        setRegisterNumber(res.registerNumber);
        setRegisterEmail(res.registerEmail);
        // console.log(res.profile);
        setLoading(false);
      } else {
        setProfile([]);
        setLoading(false);
        // console.log(res.message);
      }
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };
  const uploadGalleryImage = async () => {
    setLoading(true);
    setBottomSheet(false);
    console.log(imageName);
    try {
      const session = JSON.parse(
        await EncryptedStorage.getItem('user_session'),
      );
      const response = await fetch(`${global.server}/Restaurant/uploadImage`, {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `foodi ${session.token}`,
        },
        body: createFormData(galleryImage),
      });
      const res = JSON.parse(await response.text());
      if (res.status === 'success') {
        // setBannerName(res.imageName);
        imageName = res.imageName;
        addGalleryImage();
        // console.log('ImageName ', imageName);
        // setLoading(false);
        // alert('Uploaded');
        // return res;
      } else if (res.status === 'error') {
        setLoading(false);
        alert('Server Error');
        // return res;
      }
      // console.log(res);
    } catch (error) {
      setLoading(false);
      console.log(error);
      alert('Error');
    }
  };
  const addGalleryImage = async e => {
    // setLoading(true);
    // setBottomSheet(false);
    try {
      const session = JSON.parse(
        await EncryptedStorage.getItem('user_session'),
      );
      const response = await fetch(
        `${global.server}/Restaurant/addGalleryImage`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `foodi ${session.token}`,
          },
          body: JSON.stringify({
            // id: '6080e26a3a5b5e114011b635',
            image: imageName,
          }),
        },
      );
      const res = JSON.parse(await response.text());
      if (res.status === 'success') {
        res.gallery.reverse();
        setGallery(res.gallery);
      } else if (res.status === 'error') {
        setLoading(false);
        alert('Server Error');
        // return res;
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
      alert('Error');
    }
  };
  const chooseGalleryImage = () => {
    launchImageLibrary({}, response => {
      if (response.didCancel) {
      } else if (response.error) {
        console.log(response.error);
        alert('ImagePicker Error: ', response.error);
      } else {
        setGalleryImage(response);
        setBottomSheet(true);
      }
    });
  };

  if (loading) {
    getRestaurantProfile();
    getRestaurantGallery();
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
            text: 'Profile',
            style: {color: 'black', fontSize: 25, justifyContent: 'center'},
          }}
          //   rightComponent={{ icon: 'home', color: 'gray', size: 27 }, { icon: 'menu', color: 'gray', size: 27 }}
          rightComponent={
            <View style={{flex: 1, flexDirection: 'row'}}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('EditProfile', {
                    profile: profile,
                    registerNumber: '1020',
                    registerEmail: registerEmail,
                  })
                }>
                <Avatar.Icon
                  style={{backgroundColor: 'white'}}
                  size={42}
                  icon="file-document-edit-outline"
                  color="gray"
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => chooseGalleryImage()}>
                <Avatar.Icon
                  style={{backgroundColor: 'white'}}
                  size={42}
                  icon="image-plus"
                  color="gray"
                />
              </TouchableOpacity>
            </View>
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
  } else if (!loading) {
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
            text: 'Profile',
            style: {color: 'black', fontSize: 25, justifyContent: 'center'},
          }}
          //   rightComponent={{ icon: 'home', color: 'gray', size: 27 }, { icon: 'menu', color: 'gray', size: 27 }}
          rightComponent={
            <View style={{flex: 1, flexDirection: 'row'}}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('EditProfile', {
                    profile: profile,
                    registerNumber: registerNumber,
                    registerEmail: registerEmail,
                  })
                }>
                <Avatar.Icon
                  style={{backgroundColor: 'white'}}
                  size={42}
                  icon="file-document-edit-outline"
                  color="gray"
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => chooseGalleryImage()}>
                <Avatar.Icon
                  style={{backgroundColor: 'white'}}
                  size={42}
                  icon="image-plus"
                  color="gray"
                />
              </TouchableOpacity>
            </View>
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
          }
          contentContainerStyle={{
            alignItems: 'center',
            width: '100%',
            backgroundColor: 'white',
            paddingBottom: 200,
          }}>
          {/* <Button
          onPress={() => {
            console.log(imageName);
            // addGalleryImage()
          }}>
          Upload
        </Button> */}
          <View
            style={{
              height: 240,
            }}>
            <View style={{backgroundColor: 'lightgray'}}>
              <Image
                source={{
                  uri: `${global.server}/assets/images/${profile.background}`,
                }}
                style={{width: 380, height: 200}}
              />
            </View>
            <View
              style={{
                position: 'absolute',
                top: 110,
                alignItems: 'center',
              }}>
              <Image
                source={{
                  uri: `${global.server}/assets/images/${profile.pic}`,
                }}
                style={{
                  width: 140,
                  height: 140,
                  borderColor: 'white',
                  borderWidth: 5,
                  shadowColor: 'gray',
                  borderRadius: 70,
                  backgroundColor: 'lightgray',
                }}
              />
            </View>
          </View>
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <Text
              style={{
                marginTop: 20,
                marginBottom: 20,
                fontSize: 22,
                textAlign: 'center',
              }}>
              {profile.name}
            </Text>
          </View>
          {profile.address.number.map((val, index) => (
            <View
              key={index}
              style={{
                flexDirection: 'row',
                // justifyContent: 'center',
                alignItems: 'center',
                width: 300,
              }}>
              <Avatar.Icon
                style={{backgroundColor: 'white'}}
                size={38}
                icon="phone"
                color="blue"
              />
              <Text style={{fontSize: 16}}>
                +{profile.address.number[index]}
              </Text>
            </View>
          ))}

          {profile.address.email.map((val, index) => (
            <View
              key={index}
              style={{
                flexDirection: 'row',
                // justifyContent: 'center',
                alignItems: 'center',
                width: 300,
              }}>
              <Avatar.Icon
                style={{backgroundColor: 'white'}}
                size={38}
                icon="email"
                color="blue"
              />
              <Text style={{fontSize: 16}}>{profile.address.email[index]}</Text>
            </View>
          ))}
          <View
            style={{
              width: 200,
              flexDirection: 'row',
              justifyContent: 'center',
              marginTop: 10,
            }}>
            <Avatar.Icon
              style={{backgroundColor: 'white'}}
              size={38}
              icon="map-marker-radius"
              color="blue"
            />
            <Text style={{fontSize: 16, textAlign: 'center'}}>
              {profile.address.area}, {profile.address.city},{' '}
              {profile.address.state}, {profile.address.pinCode},{' '}
              {profile.address.landMark}
            </Text>
          </View>

          <View
            style={{
              width: '100%',
              height: 'auto',
              paddingTop: 10,
              marginTop: 30,
              borderTopWidth: 1,
              marginBottom: 3,
              borderTopColor: 'lightgray',
              display: 'flex',
              flexWrap: 'wrap',
              flexDirection: 'row',
              justifyContent: 'space-around',
            }}>
            {gallery.map((val, index) => (
              <TouchableOpacity
                key={index}
                style={{
                  width: 190,
                  height: 140,
                  marginBottom: 4,
                }}
                onLongPress={() => removeGalleryImageAlert(gallery[index])}>
                <Image
                  source={{
                    uri: `${global.server}/assets/images/${gallery[index]}`,
                  }}
                  style={{
                    width: 190,
                    height: 140,
                  }}
                />
              </TouchableOpacity>
            ))}
          </View>

          <BottomSheet isVisible={bottomSheet}>
            <Header
              backgroundColor="lightgray"
              barStyle="dark-content"
              placement="left"
              leftComponent={{
                icon: 'close',
                color: 'black',
                size: 28,
                onPress: () => setBottomSheet(false),
              }}
              centerComponent={{
                text: 'Add to Restaurant Gallery',
                style: {color: 'black', fontSize: 22, justifyContent: 'center'},
              }}
              rightComponent={{
                icon: 'check',
                color: 'black',
                size: 28,
                onPress: () => uploadGalleryImage(),
              }}
              containerStyle={{
                backgroundColor: 'white',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            />
            <View
              style={{
                width: '100%',
                flex: 1,
                // justifyContent: 'center',
                alignItems: 'center',
                height: 350,
                backgroundColor: 'rgb(240, 240, 240)',
              }}>
              <Image
                source={{
                  uri: galleryImage.uri,
                }}
                style={{width: 380, height: 200, marginTop: 20}}
              />
            </View>
          </BottomSheet>
        </ScrollView>
      </>
    );
  }
}
