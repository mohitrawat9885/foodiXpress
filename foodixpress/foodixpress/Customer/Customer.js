import React, {useEffect, useState} from 'react';
import {BackHandler, ActivityIndicator, View} from 'react-native';
import {WebView} from 'react-native-webview';

export default function Customer() {
  const [loading, setLoading] = useState(true);
  let webview = {
    canGoBack: false,
    ref: null,
  };

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackButton);
    BackHandler.removeEventListener('hardwareBackPress');
  });

  const handleBackButton = () => {
    if (webview.canGoBack && webview.ref) {
      webview.ref.goBack();
      return true;
    }
    return false;
  };

  const onNavigationStateChange = navState => {
    webview.canGoBack = navState.canGoBack;
  };

  const Indicator = () => {
    return (
      <View
        style={{
          flex: 1,
          width: '100%',
          height: '100%',
          position: 'absolute',
          justifyContent: 'center',
          alignItems: 'center',
          // backgroundColor: 'red',
          zIndex: 2,
        }}>
        <ActivityIndicator
          // style={styles.indicator}
          size={60}
          color="tomato"
        />
      </View>
    );
  };

  return (
    <>
      <WebView
        startInLoadingState={true}
        source={{
          uri: `${global.server}`,
        }}
        renderLoading={() => <Indicator />}
        ref={webView => {
          webview.ref = webView;
        }}
        onNavigationStateChange={val => onNavigationStateChange(val)}
      />
    </>
  );
}

// import React, {useEffect} from 'react';
// import {BackHandler} from 'react-native';
// import {WebView} from 'react-native-webview';

// export default function Customer() {
//   let WEBVIEW_REF = React.createRef();

//   useEffect(() => {
//     BackHandler.addEventListener('hardwareBackPress', handleBackButton);
//     // BackHandler.removeEventListener('hardwareBackPress');
//   });

//   const handleBackButton = () => {
//     WEBVIEW_REF.current.goBack();

//     return true;
//   };

//   // onNavigationStateChange(navState) {
//   //   this.setState({
//   //     canGoBack: navState.canGoBack,
//   //   });
//   // }

//   return (
//     <WebView
//       source={{uri: `${global.server}`}}
//       ref={WEBVIEW_REF}
//       // onNavigationStateChange={this.onNavigationStateChange.bind(this)}
//     />
//   );
// }

// {
/* <Header
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
          text: 'foodiXpress',
          style: {color: 'black', fontSize: 25, justifyContent: 'center'},
        }}
        rightComponent={
          <View style={{flex: 1, flexDirection: 'row'}}>
            <TouchableOpacity
              onPress={() => navigation.navigate('AddCategory')}>
              <Avatar.Icon
                style={{backgroundColor: 'white'}}
                size={42}
                icon="account-circle"
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
                icon="cart"
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
      /> */
// }
// {
/* <Header backgroundColor="lightgray" barStyle="dark-content" /> */
// }
