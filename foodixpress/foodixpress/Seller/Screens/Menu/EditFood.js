import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  SafeAreaView,
} from 'react-native';
import {colors, Header, Icon} from 'react-native-elements';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Avatar, Button, TextInput, List, RadioButton} from 'react-native-paper';
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

export default function AddFood({route, navigation}) {
  console.log(route.params);
  const menu = route.params.menu;
  var imageName = route.params.food.images[0];
  const [imageChanged, setImageChanged] = useState(false);
  const [loading, setLoading] = useState(false);
  const [foodImage, setFoodImage] = useState();
  const [foodName, setFoodName] = useState(route.params.food.name);
  const [foodPrice, setFoodPrice] = useState(`${route.params.food.price}`);
  const [foodDescription, setFoodDescription] = useState(
    route.params.food.description,
  );
  const [foodCategory, setFoodCategory] = useState(route.params.category.name);
  const [foodCategoryValue, setFoodCategoryValue] = useState(
    route.params.category,
  );
  const foodId = route.params.food._id;
  const [categoryId, setCategoryId] = useState(route.params.food.categoryId);

  const editFood = async () => {
    try {
      if (imageChanged) {
        await uploadFoodImage();
      }
      console.log('Image name is ', imageName);
      const session = JSON.parse(
        await EncryptedStorage.getItem('user_session'),
      );
      const response = await fetch(`${global.server}/Restaurant/editFood`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `foodi ${session.token}`,
        },
        body: JSON.stringify({
          foodId: foodId,
          food: {
            categoryId: categoryId,
            name: foodName,
            images: imageName,
            price: foodPrice,
            description: foodDescription,
          },
        }),
      });
      const res = JSON.parse(await response.text());
      if (res.status === 'success') {
        setLoading(false);
        global.menuUpdated = true;
        navigation.navigate('Menu');
        // console.log(res.food);
        alert('Updated');
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

  const removeFood = async () => {
    try {
      setLoading(true);
      const session = JSON.parse(
        await EncryptedStorage.getItem('user_session'),
      );
      const response = await fetch(`${global.server}/Restaurant/removeFood`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `foodi ${session.token}`,
        },
        body: JSON.stringify({
          foodId: foodId,
        }),
      });
      const res = JSON.parse(await response.text());
      if (res.status === 'success') {
        setLoading(false);
        console.log('Success...');
        global.menuUpdated = true;
        navigation.navigate('Menu');
        // console.log(res.food);
        // alert('Updated');
      } else if (res.status === 'error') {
        setLoading(false);
        console.log(res);
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

  const uploadFoodImage = async () => {
    setLoading(true);
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
        body: createFormData(foodImage),
      });
      const res = JSON.parse(await response.text());

      if (res.status === 'success') {
        // setBannerName(res.imageName);
        imageName = res.imageName;
        console.log('Image uploded...');
        // console.log(imageName);
        // alert('Uploaded');
        // setLoading(false);
        // alert('Uploaded');
        // return res;
      } else if (res.status === 'error') {
        // setLoading(false);
        alert('Server Error');
        // return res;
      }
      // console.log(res);
    } catch (error) {
      // setLoading(false);
      console.log(error);
      alert('Error');
    }
  };

  const chooseFoodImage = () => {
    launchImageLibrary({}, response => {
      if (response.didCancel) {
      } else if (response.error) {
        console.log(response.error);
        alert('ImagePicker Error: ', response.error);
      } else {
        setImageChanged(true);
        setFoodImage(response);
      }
    });
  };
  function renderFoodImage() {
    if (foodImage) {
      return (
        <Image
          source={{uri: foodImage.uri}}
          style={{
            width: 330,
            height: 200,
            borderWidth: 5,
            borderColor: 'white',
          }}
        />
      );
    } else {
      return (
        <Image
          source={{
            uri: `${global.server}/assets/images/${imageName}`,
          }}
          style={{
            width: 330,
            height: 200,
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
          text: 'Edit Food',
          style: {color: 'black', fontSize: 22, justifyContent: 'center'},
        }}
        rightComponent={
          <View style={{flex: 1, flexDirection: 'row'}}>
            <TouchableOpacity onPress={() => editFood()}>
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

      {/* <SafeAreaView style={styles.container}> */}
      <ScrollView>
        <View style={{padding: 15, alignItems: 'center'}}>
          {/* <Text style={{padding: 8, fontSize: 25}}>Add Your Product</Text> */}
          <TouchableOpacity
            style={{
              width: 330,
              marginBottom: 10,
              height: 200,
              borderRadius: 2,
              backgroundColor: 'lightgray',
            }}
            onPress={() => chooseFoodImage()}>
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              {renderFoodImage()}
            </View>
          </TouchableOpacity>
          <Text style={{textAlign: 'center', color: 'black', marginBottom: 20}}>
            Food Image
          </Text>

          <TextInput
            style={styles.input}
            label="Food Name"
            autoCapitalize="none"
            mode="flat"
            underlineColor=""
            value={foodName}
            onChangeText={val => setFoodName(val)}
          />
          <TextInput
            style={styles.input}
            type="number"
            keyboardType={'numeric'}
            label="Price"
            mode="flat"
            value={foodPrice}
            autoCapitalize="none"
            onChangeText={val => setFoodPrice(val)}
          />
          <TextInput
            style={styles.input}
            label="Description"
            mode="flat"
            autoCapitalize="none"
            value={foodDescription}
            onChangeText={val => setFoodDescription(val)}
          />
          <View
            style={{
              backgroundColor: 'lightgray',
              width: 330,
              marginTop: 14,
            }}>
            <List.Section title={`Category: ${foodCategory}`}>
              <List.Accordion
                title="Select Category"
                left={props => <List.Icon {...props} icon="alpha-c-box" />}>
                <RadioButton.Group
                  value={foodCategoryValue}
                  onValueChange={val => {
                    // console.log(val._id);
                    setFoodCategory(val.name);
                    setCategoryId(val._id);
                    setFoodCategoryValue(val);
                  }}>
                  {/* <RadioButton.Item
                      label="Uncategorise"
                      value="Uncategorise"
                    /> */}
                  {menu.map((val, index) => (
                    <View key={index}>
                      <RadioButton.Item
                        label={menu[index].category.name}
                        value={menu[index].category}
                      />
                    </View>
                  ))}
                </RadioButton.Group>
              </List.Accordion>
            </List.Section>
          </View>

          <View
            style={{
              width: 330,
              marginTop: 50,
              marginBottom: 50,
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Button
              // icon="minus"
              mode="outlined"
              color="red"
              style={{borderColor: 'red', width: '45%'}}
              onPress={() => removeFood()}>
              Remove Food
            </Button>

            <Button
              mode="outlined"
              color="orange"
              style={{borderColor: 'orange', width: '45%'}}
              onPress={() => alert('Draft')}>
              Add to Draft
            </Button>
          </View>
        </View>
      </ScrollView>
      {/* </SafeAreaView> */}
    </>
  );
}

const styles = StyleSheet.create({
  input: {
    width: 330,
    fontSize: 16,
    fontWeight: '500',
    margin: 3,
  },
  images: {
    width: 330,
    height: 200,
    borderColor: 'lightgray',
    borderWidth: 1,
    borderRadius: 10,
    marginHorizontal: 3,
  },
  button: {
    width: 330,
    height: 40,
    backgroundColor: 'rgb(30, 120, 255)',
    borderRadius: 5,
    padding: 5,
    margin: 5,
    marginTop: 15,
    justifyContent: 'center',
  },
});
