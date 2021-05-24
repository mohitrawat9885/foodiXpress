import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import "./Getin.css";

import MuiPhoneNumber from "material-ui-phone-number";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      marginBottom: theme.spacing(3),
      width: "38ch",
    },
  },
  loginBtn: {
    "& > *": {
      marginBottom: theme.spacing(3),
      width: "100%",
      height: "auto",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      color: "white",
    },
  },
  signupBtn: {
    "& > *": {
      marginBottom: theme.spacing(3),
      width: "100%",
      height: "auto",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
  },
}));

export default function Getin() {
  const [number, setNumber] = useState();
  const [isSignup, setIsSignUp] = useState(false);
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const classes = useStyles();
  const Getin = async (e) => {
    try {
      const response = await fetch("/Customer/Getin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          number: number,
        }),
      });
      const res = JSON.parse(await response.text());
      if (res.status === "success") {
        if (res.action === "signup") {
          localStorage.setItem(
            "session",
            JSON.stringify({
              firstName: "",
              lastName: "",
              token: res.token,
            })
          );
          setIsSignUp(true);
        } else if (res.action === "signin") {
          localStorage.setItem(
            "session",
            JSON.stringify({
              firstName: res.firstName,
              lastName: res.lastName,
              token: res.token,
            })
          );
          window.location.href = "/";
        }
      }
    } catch (error) {
      console.log("Something went wrong!");
    }
  };
  const signupUpdate = async (e) => {
    try {
      let session = JSON.parse(localStorage.getItem("session"));
      const response = await fetch("/Customer/signupUpdate", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `foodi ${session.token}`,
        },
        body: JSON.stringify({
          firstName: firstName,
          lastName: lastName,
          email: email,
        }),
      });
      const res = JSON.parse(await response.text());
      if (res.status === "success") {
        session.firstName = res.firstName;
        session.lastName = res.lastName;
        localStorage.setItem("session", JSON.stringify(session));
        window.location.href = "/";
      }
    } catch (error) {
      console.log("Something went wrong!");
    }
  };
  if (isSignup) {
    return (
      <>
        <div className="signup-body">
          <div className="signup-div">
            <div id="logo">
              <a href="/">
                {/* <img src="./assets/icons/gbd-logo.jpeg" alt="HWs" /> */}
                foodiXpress
              </a>
            </div>
            <div className="signup-page">
              <div id="signup-tag">
                <span>Provide Your Detail</span>
              </div>
              <form className={classes.root} noValidate autoComplete="off">
                <TextField
                  required
                  size="small"
                  label="Your First Name"
                  variant="outlined"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
                <br />

                <TextField
                  required
                  size="small"
                  label="Your Last Name"
                  variant="outlined"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
                <br />

                <TextField
                  size="small"
                  label="Email Id"
                  variant="outlined"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <br />

                <div className={classes.signupBtn}>
                  <Button
                    variant="contained"
                    style={{ backgroundColor: "gray", color: "white" }}
                    onClick={() => signupUpdate()}
                  >
                    Submit
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </>
    );
  }
  return (
    <>
      <div className="login-body">
        <div className="login-div">
          <div id="logo">
            <Link to="/">foodiXpress</Link>
          </div>
          <div className="login-page">
            <div id="login-tag">
              <span>Enter Number</span>
            </div>
            <form className={classes.root} noValidate autoComplete="off">
              <MuiPhoneNumber
                defaultCountry="in"
                required
                label="Contact Number"
                variant="outlined"
                value={number}
                onChange={(val) => setNumber(val)}
              />
              <br />

              <div className={classes.loginBtn}>
                <Button
                  variant="contained"
                  style={{ backgroundColor: "gray" }}
                  onClick={() => {
                    Getin();
                  }}
                >
                  Get OTP
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
