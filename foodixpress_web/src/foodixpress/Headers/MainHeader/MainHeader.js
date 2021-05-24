import React from "react";
import "./MainHeader.css";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
// Profile Icon
import AccountCircleSharpIcon from "@material-ui/icons/AccountCircleSharp";
// Menu Icon
import MenuRoundedIcon from "@material-ui/icons/MenuRounded";
// Cart Icon
import Badge from "@material-ui/core/Badge";
import { withStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";

import GlobalState from "../../GlobalState";

const StyledBadge = withStyles((theme) => ({
  badge: {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
    backgroundColor: "green",
  },
}))(Badge);

export default function MainHeader() {
  const [cartValue] = React.useContext(GlobalState);

  const LogOutButton = () => {
    if (localStorage.getItem("session")) {
      return (
        <div>
          <Button
            onClick={() => {
              localStorage.clear("session");
              // window.location.reload();
            }}
          >
            Logout
          </Button>
        </div>
      );
    } else {
      return <></>;
    }
  };

  const GetInButton = () => {
    if (!localStorage.getItem("session")) {
      return (
        <Link to="/GetIn">
          <AccountCircleSharpIcon style={{ fontSize: 30 }} />
        </Link>
      );
    } else {
      return <></>;
    }
  };
  const [menuOpen, setMenuOpen] = React.useState(false);
  const SideMenu = () => {
    if (menuOpen) {
      return (
        <div className="sidemenu_div d-col-null">
          <div
            className="sidemenu_fade"
            onClick={() => setMenuOpen(false)}
          ></div>
          <div className="sidemenu" onClick={() => setMenuOpen(false)}>
            <div>
              <Link to="/">Home</Link>
            </div>
            <div>
              <Link to="/Restaurants">Restaurants</Link>
            </div>
            <div>
              <Link to="/Addresses">My Addresses</Link>
            </div>
            <div>
              <Link to="/My-Orders">My Orders</Link>
            </div>
            <div>
              <Link to="/Foods">Foods</Link>
            </div>

            <div>
              <LogOutButton />
            </div>
          </div>
        </div>
      );
    } else {
      return <></>;
    }
  };
  return (
    <>
      <SideMenu />
      {/* <div className="mainheader_div" style={{ display: isMid }}>
        <div className="header_fade"></div>
      </div> */}

      <div className="header_top">
        <div className="m-col-2 d-col-null">
          <MenuRoundedIcon
            onClick={() => setMenuOpen(true)}
            style={{ fontSize: 32 }}
          />
        </div>
        <div className="header_logo m-col-3 d-col-2">
          <Link to="/">foodiXpress</Link>
        </div>
        <div className="m-col-null d-col-6">
          <Link to="/">Home</Link>
        </div>
        <div className="m-col-null d-col-7">
          <Link to="/">Offers</Link>
        </div>
        <div className="m-col-null d-col-8">
          <Link to="/">Restaurants</Link>
        </div>
        <div className="m-col-11 d-col-11">
          <GetInButton />
        </div>
        <div className="m-col-12 d-col-12">
          <Link to="/Cart">
            <IconButton aria-label="cart" style={{ color: "blue" }}>
              <StyledBadge badgeContent={cartValue} color="secondary">
                <ShoppingCartIcon />
              </StyledBadge>
            </IconButton>
          </Link>
        </div>
      </div>
      <div
        style={{
          height: "10vh",
        }}
      ></div>

      {/* <div className="header_mid">
        <p>Find best food at Your Door Step</p>
      </div> */}
    </>
  );
}
