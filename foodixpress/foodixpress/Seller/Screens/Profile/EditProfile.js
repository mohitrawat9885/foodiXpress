import React, {useState} from 'react';
import {View, Text, Image, ActivityIndicator} from 'react-native';
import {Header, Icon, Input} from 'react-native-elements';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import {Avatar, TextInput, Button} from 'react-native-paper';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import EncryptedStorage from 'react-native-encrypted-storage';
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

export default function EditProfile({route, navigation}) {
  console.log(route.params);
  const [preProfile, setPreProfile] = useState(route.params.profile);
  const [loading, setLoading] = useState(false);
  const [banner, setBanner] = useState();
  const [profile, setProfile] = useState();
  var bannerName = preProfile.background;
  var profileName = preProfile.pic;
  // const [bannerName, setBannerName] = useState(preProfile.background);
  // const [profileName, setProfileName] = useState(preProfile.pic);
  const [bannerChange, setBannerChange] = useState(false);
  const [profileChange, setProfileChange] = useState(false);

  const [restaurantName, setRestaurantName] = useState(preProfile.name);
  const [numbers, setNumbers] = useState(preProfile.address.number);
  const [emails, setEmails] = useState(preProfile.address.email);
  const [country, setCountry] = useState(preProfile.address.country);
  const [state, setState] = useState(preProfile.address.state);
  const [city, setCity] = useState(preProfile.address.city);
  const [area, setArea] = useState(preProfile.address.area);
  const [pincode, setPincode] = useState(preProfile.address.pinCode);
  const [landmark, setLandmark] = useState(preProfile.address.landMark);

  const updateProfile = async e => {
    try {
      const session = JSON.parse(
        await EncryptedStorage.getItem('user_session'),
      );
      console.log(session);
      setLoading(true);
      console.log('Profile ', profileName, 'Banner ', bannerName);
      if (profileChange) {
        let res = await uploadProfile();
        if (res.status === 'error') {
          setLoading(false);
          return;
        }
      }
      if (bannerChange) {
        let res = await uploadBanner();
        if (res.status === 'error') {
          setLoading(false);
          return;
        }
      }

      const response = await fetch(
        `${global.server}/Restaurant/updateProfile/`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `foodi ${session.token}`,
          },
          body: JSON.stringify({
            // id: '6080e26a3a5b5e114011b635',
            name: restaurantName,
            pic: profileName,
            background: bannerName,
            address: {
              number: numbers,
              email: emails,
              country: country,
              state: state,
              city: city,
              area: area,
              pinCode: pincode,
              landMark: landmark,
            },
          }),
        },
      );
      const res = JSON.parse(await response.text());
      if (res.status === 'success') {
        setPreProfile(res.profile);
        setLoading(false);
        global.profileUpdated = true;
        navigation.navigate('Profile');
        // alert('Profile Updated');
      } else {
        setLoading(false);
        alert('Server Error');
      }
      setBannerChange(false);
      setProfileChange(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      alert('Error');
    }
  };

  const uploadBanner = async () => {
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
        body: createFormData(banner),
      });
      const res = JSON.parse(await response.text());
      if (res.status === 'success') {
        // setBannerName(res.imageName);
        bannerName = res.imageName;
        return res;
      } else if (res.status === 'error') {
        alert('Server Error');
        return res;
      }
      // console.log(res);
    } catch (error) {
      console.log(error);
      alert('Error');
    }
  };
  const uploadProfile = async () => {
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
        body: createFormData(profile),
      });
      const res = JSON.parse(await response.text());
      if (res.status === 'success') {
        // setProfileName(res.imageName);
        profileName = res.imageName;
        return res;
      } else if (res.status === 'error') {
        alert('Server Error');
        return res;
      }
    } catch (error) {
      console.log(error);
      alert('Error');
    }
  };

  const chooseBanner = () => {
    launchImageLibrary({}, response => {
      if (response.didCancel) {
      } else if (response.error) {
        console.log(response.error);
        alert('ImagePicker Error: ', response.error);
      } else {
        setBanner(response);
        setBannerChange(true);
      }
    });
  };
  const chooseProfile = () => {
    launchImageLibrary({}, response => {
      if (response.didCancel) {
      } else if (response.error) {
        alert('ImagePicker Error: ', response.error);
      } else {
        setProfile(response);
        setProfileChange(true);
      }
    });
  };
  function renderBanner() {
    if (bannerChange) {
      return (
        <Image source={{uri: banner.uri}} style={{width: 380, height: 200}} />
      );
    } else {
      return (
        <Image
          source={{uri: `${global.server}/assets/images/${bannerName}`}}
          style={{width: 380, height: 200}}
        />
      );
    }
  }
  function renderProfile() {
    if (profileChange) {
      return (
        <Image
          source={{uri: profile.uri}}
          style={{
            width: 140,
            height: 140,
            borderRadius: 70,
            borderWidth: 5,
            borderColor: 'white',
          }}
        />
      );
    } else {
      return (
        <Image
          source={{
            uri: `${global.server}/assets/images/${profileName}`,
          }}
          style={{
            width: 140,
            height: 140,
            borderRadius: 70,
            borderWidth: 5,
            borderColor: 'white',
          }}
        />
      );
    }
  }

  function renderIndigator() {
    if (loading) {
      return (
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
      );
    } else {
      return;
    }
  }
  return (
    <>
      {renderIndigator()}
      <Header
        backgroundColor="lightgray"
        barStyle="dark-content"
        placement="left"
        leftComponent={{
          icon: 'close',
          color: 'black',
          size: 28,
          onPress: () => navigation.goBack(),
        }}
        centerComponent={{
          text: 'Edit Profile',
          style: {color: 'black', fontSize: 22, justifyContent: 'center'},
        }}
        rightComponent={
          <View style={{flex: 1, flexDirection: 'row'}}>
            <TouchableOpacity
              onPress={() => {
                updateProfile();
              }}>
              <Avatar.Icon
                style={{backgroundColor: 'white'}}
                size={40}
                icon="check-bold"
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
        contentContainerStyle={{
          alignItems: 'center',
          width: '100%',
          backgroundColor: 'white',
          paddingBottom: 40,
        }}>
        <View
          style={{
            alignItems: 'center',
            backgroundColor: 'white',
            height: '100%',
          }}>
          <View
            style={{
              height: 255,
            }}>
            <View>
              <TouchableOpacity
                style={{width: 380, height: 200, backgroundColor: 'lightgray'}}
                onPress={() => chooseBanner()}>
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  {renderBanner()}
                </View>
              </TouchableOpacity>
            </View>
            <View
              style={{
                position: 'absolute',
                top: 110,
                alignItems: 'center',
              }}>
              <TouchableOpacity onPress={() => chooseProfile()}>
                {renderProfile()}
              </TouchableOpacity>
            </View>
          </View>
          {/* <Button onPress={() => uploadBanner()}>Upload Banner</Button>
          <Button onPress={() => uploadProfile()}>Upload Profile</Button> */}
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <View
              style={{
                width: 320,
                marginTop: 14,
                marginBottom: 20,
                // fontSize: 22,
                // textAlign: 'center',
              }}>
              <Input
                placeholder="Restaurant Name"
                value={restaurantName}
                multiline={true}
                fontSize={22}
                onChangeText={val => setRestaurantName(val)}
                textAlign="center"
              />
            </View>
            <View
              style={{
                marginBottom: 20,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <View>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: 'bold',
                    margin: 5,
                    marginBottom: 8,
                  }}>
                  Registered No.
                </Text>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Avatar.Icon
                  style={{backgroundColor: 'white'}}
                  size={38}
                  icon="phone"
                  color="blue"
                />

                <Text style={{fontSize: 16}}>
                  +{route.params.registerNumber}
                </Text>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                {/* <Avatar.Icon style={{backgroundColor: 'lightgray',}} size={34} icon="plus" color="gray"/> */}
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: 'bold',
                    margin: 5,
                    marginBottom: 8,
                  }}>
                  Registered e-mail
                </Text>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Avatar.Icon
                  style={{backgroundColor: 'white'}}
                  size={38}
                  icon="email"
                  color="blue"
                />
                <Text style={{fontSize: 16}}>{route.params.registerEmail}</Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: 'bold',
                  margin: 5,
                  marginBottom: 8,
                  width: 300,
                }}>
                Public Numbers.
              </Text>
            </View>

            {/* <Text style={{fontSize: 16}}>+91-7895995686</Text> */}

            {numbers.map((val, index) => (
              <View
                key={index}
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: 180,
                }}>
                <Avatar.Icon
                  style={{backgroundColor: 'white'}}
                  size={38}
                  icon="phone"
                  color="blue"
                />
                <Input
                  placeholder="Public Number"
                  value={numbers[index]}
                  fontSize={16}
                  textAlign="center"
                  onChangeText={val => {
                    let newNum = [];
                    numbers[index] = val;
                    for (let i = 0; i < numbers.length; i++) {
                      newNum[i] = numbers[i];
                    }
                    setNumbers(newNum);
                    console.log(newNum);
                  }}
                />
                {/* <Button
                  icon="minus"
                  mode="text"
                  onPress={() => console.log('Pressed')}>
                  Remove
                </Button> */}
                <TouchableOpacity
                  onPress={() => {
                    let newNum = [];

                    // numbers[numbers.length] = '';
                    let indi = 0;
                    for (let i = 0; i < numbers.length; i++) {
                      if (i != index) newNum[indi++] = numbers[i];
                    }
                    setNumbers(newNum);
                    console.log(newNum);
                  }}>
                  <Avatar.Icon
                    style={{backgroundColor: 'lightgray'}}
                    size={30}
                    icon="minus"
                    color="gray"
                  />
                </TouchableOpacity>
              </View>
            ))}
            <View style={{width: 220, marginBottom: 16}}>
              <Button
                icon="plus"
                mode="outlined"
                color="gray"
                onPress={() => {
                  let newNum = [];
                  numbers[numbers.length] = '';
                  for (let i = 0; i < numbers.length; i++) {
                    newNum[i] = numbers[i];
                  }
                  setNumbers(newNum);
                  console.log(newNum);
                }}>
                Add New Number
              </Button>
            </View>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              {/* <Avatar.Icon
                style={{backgroundColor: 'lightgray'}}
                size={34}
                icon="plus"
                color="gray"
              /> */}
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: 'bold',
                  margin: 5,
                  marginBottom: 8,
                  width: 300,
                }}>
                Public E-mails.
              </Text>
            </View>

            {emails.map((val, index) => (
              <View
                key={index}
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: 280,
                }}>
                <Avatar.Icon
                  style={{backgroundColor: 'white'}}
                  size={38}
                  icon="email"
                  color="blue"
                />
                <Input
                  placeholder="Public Email"
                  value={emails[index]}
                  fontSize={16}
                  textAlign="center"
                  onChangeText={val => {
                    let newEmails = [];
                    emails[index] = val;
                    for (let i = 0; i < emails.length; i++) {
                      newEmails[i] = emails[i];
                    }
                    setEmails(newEmails);
                    console.log(newEmails);
                  }}
                />
                {/* <Button
                  icon="minus"
                  mode="text"
                  onPress={() => console.log('Pressed')}>
                  Remove
                </Button> */}
                <TouchableOpacity
                  onPress={() => {
                    let newEmails = [];
                    // numbers[numbers.length] = '';
                    let indi = 0;
                    for (let i = 0; i < emails.length; i++) {
                      if (i != index) newEmails[indi++] = emails[i];
                    }
                    setEmails(newEmails);
                    console.log(newEmails);
                  }}>
                  <Avatar.Icon
                    style={{backgroundColor: 'lightgray'}}
                    size={30}
                    icon="minus"
                    color="gray"
                  />
                </TouchableOpacity>
              </View>
            ))}
            <View style={{width: 220, marginBottom: 16}}>
              <Button
                icon="plus"
                mode="outlined"
                color="gray"
                onPress={() => {
                  let newEmails = [];
                  emails[emails.length] = '';
                  for (let i = 0; i < emails.length; i++) {
                    newEmails[i] = emails[i];
                  }
                  setEmails(newEmails);
                  console.log(newEmails);
                }}>
                Add New Email
              </Button>
            </View>

            <View
              style={{
                flexDirection: 'column',
                // justifyContent: 'center',

                width: 330,
              }}>
              <Avatar.Icon
                style={{backgroundColor: 'white'}}
                size={38}
                icon="map-marker-radius"
                color="blue"
              />
              {/* <Text style={{fontSize: 16, textAlign: 'center'}}>
                Chhapar, Bijnor, National Highway 734, Kotwali Rd, Najibabad,
                Uttar Pradesh 246763
              </Text> */}
              <View
                style={{
                  width: 340,
                }}>
                <TextInput
                  placeholder="Enter Your Area Specification"
                  label="Area"
                  multiline={true}
                  value={area}
                  onChangeText={val => setArea(val)}
                  fontSize={16}
                  textAlign="center"
                />
                <TextInput
                  placeholder="Landmark"
                  label="Landmark"
                  multiline={true}
                  value={landmark}
                  fontSize={16}
                  onChangeText={val => setLandmark(val)}
                  textAlign="center"
                />

                <TextInput
                  placeholder="Enter City"
                  label="City"
                  value={city}
                  fontSize={16}
                  onChangeText={val => setCity(val)}
                  textAlign="center"
                />
                <TextInput
                  placeholder="Enter State"
                  label="State"
                  value={state}
                  fontSize={16}
                  onChangeText={val => setState(val)}
                  textAlign="center"
                />
                <TextInput
                  placeholder="Enter Country"
                  label="Country"
                  value={country}
                  fontSize={16}
                  onChangeText={val => setCountry(val)}
                  textAlign="center"
                />
                <TextInput
                  placeholder="Enter Pincode"
                  label="Pincode"
                  value={pincode}
                  fontSize={16}
                  onChangeText={val => setPincode(val)}
                  textAlign="center"
                />
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </>
  );
}
