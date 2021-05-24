import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  HashRouter,
} from "react-router-dom";

// Import Screens
import Home from "./Screens/Home/Home";
import Getin from "./Screens/Getin/Getin";
import Cart from "./Screens/Cart/Cart";
import Restaurants from "./Screens/Restaurants/Restaurants";
import Restaurant from "./Screens/Restaurant/Restaurant";
import Foods from "./Screens/Foods/Foods";
import Addresses from "./Screens/Addresses/Addresses";
import MyOrders from "./Screens/MyOrders/MyOrders";
// Import Headers
import MainHeader from "./Headers/MainHeader/MainHeader";

// Global State
import GlobalState from "./GlobalState";

export default function App() {
  const [cartValue, setCartValue] = useState(0);
  return (
    <GlobalState.Provider value={[cartValue, setCartValue]}>
      <HashRouter>
        <Switch>
          {/* Rendering Pages for Web Application */}
          <Route path="/" exact={true}>
            <MainHeader />
            <Home />
          </Route>
          <Route path="/Getin">
            <Getin />
          </Route>
          <Route path="/Cart">
            <MainHeader />
            <Cart />
          </Route>
          <Route path="/Restaurants">
            <MainHeader />
            <Restaurants />
          </Route>

          <Route path="/My-Orders">
            <MainHeader />
            <MyOrders />
          </Route>
          <Route path="/Foods">
            <MainHeader />
            <Foods />
          </Route>
          <Route path="/Addresses">
            <MainHeader />
            <Addresses />
          </Route>
          {/* Rendering Pages for Native Application */}
          <Route path="/foodixpress-native-home" exact={true}>
            <Home />
          </Route>
          <Route path="/foodixpress-native-Getin" exact={true}>
            <Getin />
          </Route>
          <Route path="/foodixpress-native-Cart" exact={true}>
            <Cart />
          </Route>
          <Route path="/foodixpress-native-Restaurants" exact={true}>
            <Restaurants />
          </Route>
          <Route path="/foodixpress-native-Restaurant" exact={true}>
            <Restaurant />
          </Route>
          <Route path="/foodixpress-native-Foods" exact={true}>
            <Foods />
          </Route>
          <Route path="/foodixpress-native-Addresses" exact={true}>
            <Addresses />
          </Route>
        </Switch>
      </HashRouter>
    </GlobalState.Provider>
  );
}
