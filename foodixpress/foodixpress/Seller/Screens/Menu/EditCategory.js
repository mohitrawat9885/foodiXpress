import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import {colors, Header, Icon} from 'react-native-elements';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Avatar, Button, TextInput} from 'react-native-paper';
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

export default function AddCategory({route, navigation}) {
  var imageName = route.params.menu.category.image;

  const [loading, setLoading] = useState(false);
  const [categoryImage, setCategoryImage] = useState();
  const [imageChanged, setImageChanged] = useState(false);
  const [categoryName, setCategoryName] = useState(
    route.params.menu.category.name,
  );

  const editFoodCategory = async image => {
    try {
      setLoading(true);
      if (imageChanged) {
        await uploadCategoryImage();
      }
      console.log(route.params.menu.id);

      const session = JSON.parse(
        await EncryptedStorage.getItem('user_session'),
      );
      const response = await fetch(
        `${global.server}/Restaurant/editFoodCategory`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `foodi ${session.token}`,
          },
          body: JSON.stringify({
            categoryId: route.params.menu.id,
            category: {
              name: categoryName,
              image: imageName,
            },
          }),
        },
      );
      const res = JSON.parse(await response.text());
      if (res.status === 'success') {
        console.log(res);
        setLoading(false);
        global.menuUpdated = true;
        navigation.navigate('Menu');
      } else if (res.status === 'error') {
        setLoading(false);
        alert('Server Error');
      }
    } catch (error) {
      console.log(error);
      alert('Error');
    }
  };

  const removeFoodCategory = async image => {
    try {
      setLoading(true);

      const session = JSON.parse(
        await EncryptedStorage.getItem('user_session'),
      );
      const response = await fetch(
        `${global.server}/Restaurant/removeFoodCategory`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `foodi ${session.token}`,
          },
          body: JSON.stringify({
            categoryId: route.params.menu.id,
          }),
        },
      );
      const res = JSON.parse(await response.text());
      if (res.status === 'success') {
        // console.log(res);
        setLoading(false);
        global.menuUpdated = true;
        navigation.navigate('Menu');
      } else if (res.status === 'error') {
        setLoading(false);
        alert('Server Error');
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
      alert('Error');
    }
  };

  const uploadCategoryImage = async () => {
    // setLoading(true);
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
        body: createFormData(categoryImage),
      });
      const res = JSON.parse(await response.text());

      if (res.status === 'success') {
        // setBannerName(res.imageName);
        imageName = res.imageName;

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
  const chooseCategoryImage = () => {
    launchImageLibrary({}, response => {
      if (response.didCancel) {
      } else if (response.error) {
        console.log(response.error);
        alert('ImagePicker Error: ', response.error);
      } else {
        setImageChanged(true);
        setCategoryImage(response);
      }
    });
  };
  function renderCategoryImage() {
    if (categoryImage) {
      return (
        <Image
          source={{uri: categoryImage.uri}}
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
          text: 'Edit Category',
          style: {color: 'black', fontSize: 22, justifyContent: 'center'},
        }}
        rightComponent={{
          icon: 'check',
          color: 'black',
          size: 28,
          onPress: () => editFoodCategory(),
        }}
        containerStyle={{
          backgroundColor: 'white',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      />

      <SafeAreaView style={styles.container}>
        <ScrollView>
          <View style={{padding: 15, alignItems: 'center'}}>
            <TouchableOpacity
              style={{
                width: 330,
                marginBottom: 10,
                height: 200,
                borderRadius: 2,
                backgroundColor: 'lightgray',
              }}
              onPress={() => chooseCategoryImage()}>
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                {renderCategoryImage()}
              </View>
            </TouchableOpacity>
            <Text
              style={{textAlign: 'center', color: 'black', marginBottom: 20}}>
              Category Image
            </Text>

            <TextInput
              style={styles.input}
              label="Category Name"
              autoCapitalize="none"
              mode="flat"
              value={categoryName}
              onChangeText={val => setCategoryName(val)}
              underlineColor=""
            />
            {/* <TouchableOpacity style={styles.button}>
              <Text style={{textAlign: 'center', color: 'white', fontSize: 18}}>
                ADD CATEGORY
              </Text>
            </TouchableOpacity> */}

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
                icon="minus"
                mode="outlined"
                color="red"
                style={{borderColor: 'red', width: '45%'}}
                onPress={() => removeFoodCategory()}>
                Remove
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
      </SafeAreaView>
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
    backgroundColor: 'brown',
    borderRadius: 5,
    padding: 5,
    margin: 5,
    marginTop: 15,
    justifyContent: 'center',
  },
});
