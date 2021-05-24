import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import {colors, Header, Icon} from 'react-native-elements';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {
  Avatar,
  List,
  Button,
  Menu,
  Divider,
  Provider,
  Dialog,
} from 'react-native-paper';
import EncryptedStorage from 'react-native-encrypted-storage';
const wait = timeout => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};

export default function MenuScreen({navigation}) {
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = React.useState(false);
  const [menu, setMenu] = useState([]);
  const [foodCategorys, setFoodCategorys] = useState([]);

  const onRefresh = React.useCallback(() => {
    getMenu();
    setRefreshing(true);
    wait(1000).then(() => setRefreshing(false));
  }, []);

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      if (global.menuUpdated) {
        getMenu();
      }
    });
    return unsubscribe;
  }, [navigation]);

  const getMenu = async e => {
    try {
      const session = JSON.parse(
        await EncryptedStorage.getItem('user_session'),
      );

      const response = await fetch(
        `${global.server}/Restaurant/getMenu/${session.id}`,
      );
      const res = JSON.parse(await response.text());
      if (res.status === 'success') {
        setLoading(false);
        // setMenu(res.menu);
        let i = 0,
          j = 0,
          menuArray = [];
        for (i = 0; i < res.menu.foodCategorys.length; i++) {
          let foodArray = [],
            indi = 0;
          for (j = 0; j < res.menu.foods.length; j++) {
            if (
              res.menu.foodCategorys[i]._id === res.menu.foods[j].categoryId
            ) {
              foodArray[indi++] = res.menu.foods[j];
              // console.log(foodArray[indi], '  ');
            }
          }
          // console.log(foodArray[i]);
          menuArray[i] = {
            _id: res.menu.foodCategorys[i]._id,
            category: res.menu.foodCategorys[i],
            food: foodArray,
          };
        }
        setFoodCategorys(res.menu.foodCategorys);
        setMenu(menuArray);
        global.menuUpdated = false;
        // console.log('Food Menu ', menuArray, '  ');

        // console.log(res.menu.foodCategorys.length);
      } else {
        setLoading(false);
        // console.log(res);
        alert('Server Error');
      }
    } catch (err) {
      console.log(err);
      setLoading(false);
      alert('Error');
    }
  };

  if (loading) {
    getMenu();
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
            text: 'Food Menu',
            style: {color: 'black', fontSize: 25, justifyContent: 'center'},
          }}
          rightComponent={
            <View style={{flex: 1, flexDirection: 'row'}}>
              <TouchableOpacity
                onPress={() => navigation.navigate('AddCategory')}>
                <Avatar.Icon
                  style={{backgroundColor: 'white'}}
                  size={42}
                  icon="table-column-plus-after"
                  color="gray"
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('AddFood', {
                    menu: menu,
                  })
                }>
                <Avatar.Icon
                  style={{backgroundColor: 'white'}}
                  size={42}
                  icon="food"
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
        <View style={{height: '100%'}}>
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
            text: 'Food Menu',
            style: {color: 'black', fontSize: 25, justifyContent: 'center'},
          }}
          rightComponent={
            <View style={{flex: 1, flexDirection: 'row'}}>
              <TouchableOpacity
                onPress={() => navigation.navigate('AddCategory')}>
                <Avatar.Icon
                  style={{backgroundColor: 'white'}}
                  size={42}
                  icon="table-column-plus-after"
                  color="gray"
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('AddFood', {
                    menu: menu,
                  })
                }>
                <Avatar.Icon
                  style={{backgroundColor: 'white'}}
                  size={42}
                  icon="food"
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
        <View style={{flex: 1, width: '100%', height: '100%', zIndex: 1}}>
          <ScrollView
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }>
            {menu.map((val, index) => (
              <List.Accordion
                key={index}
                onLongPress={() =>
                  navigation.navigate('EditCategory', {
                    menu: {
                      id: val._id,
                      category: val.category,
                    },
                  })
                }
                titleStyle={{fontSize: 25, color: 'black'}}
                title={menu[index].category.name}
                id="1"
                style={{backgroundColor: 'white'}}>
                <View style={{width: '100%'}}>
                  {menu[index].food.map((val2, index2) => (
                    <TouchableOpacity
                      key={index2}
                      onLongPress={() =>
                        navigation.navigate('EditFood', {
                          food: val2,
                          menu: menu,
                          category: menu[index].category,
                        })
                      }>
                      <View style={styles.foodStyle}>
                        <Image
                          source={{
                            uri: `${global.server}/assets/images/${val2.images[0]}`,
                          }}
                          style={styles.foodImage}
                        />
                        <Text style={{fontSize: 22, marginLeft: 16}}>
                          {val2.name}
                        </Text>
                        <View style={{right: 10, position: 'absolute'}}>
                          <Text style={{fontSize: 18}}>$ {val2.price}</Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                  ))}
                </View>
              </List.Accordion>
            ))}
          </ScrollView>
        </View>
      </>
    );
  }
}
const styles = StyleSheet.create({
  categoryStyle: {
    marginTop: 10,
    paddingLeft: 10,
    width: '98%',
    height: 60,
    backgroundColor: 'white',
    justifyContent: 'center',

    // alignItems: 'center'
  },
  foodStyle: {
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
    paddingLeft: 10,
    width: '98%',
    height: 90,
    backgroundColor: 'white',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  foodImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 1,
    borderColor: 'black',
  },
});
