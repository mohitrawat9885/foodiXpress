import React, { useState } from "react";

import "./Addresses.css";

import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import LinearProgress from "@material-ui/core/LinearProgress";

import "react-notifications/lib/notifications.css";

export default function AddAddress() {
  const [load, setLoad] = useState(true);
  const [addresses, setAddresses] = useState();

  const [number, setNumber] = useState("");
  const [pincode, setPincode] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [area, setArea] = useState("");
  const [landmark, setLandmark] = useState("");

  const [editAddress, setEditAddress] = useState(false);
  const [addingAddress, setAddingAddress] = useState(false);
  const [editId, setEditId] = useState("");

  const getAddresses = async (e) => {
    try {
      const session = JSON.parse(localStorage.getItem("session"));
      const responce = await fetch("/Customer/getAddresses", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `foodi ${session.token}`,
        },
      }).catch((err) => console.log(err));
      const res = JSON.parse(await responce.text());
      if (res.status === "success") {
        setAddresses(res.addresses);
        setLoad(false);
      } else {
        setLoad(false);
        // alert("Not Gotted");
      }
    } catch (error) {
      setLoad(false);
      console.log(error);
      // alert("Error");
    }
  };

  const addAddress = async (act) => {
    try {
      // console.log(foodId)
      let action;
      if (editAddress) {
        action = "edit";
        if (act === "remove") {
          action = "remove";
        }
      } else {
        action = "add";
      }
      const session = JSON.parse(localStorage.getItem("session"));
      console.log(session.token);
      const responce = await fetch("/Customer/addAddress", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `foodi ${session.token}`,
        },
        body: JSON.stringify({
          action: action,
          editId: editId,
          number: number,
          state: state,
          city: city,
          area: area,
          pincode: pincode,
          landmark: landmark,
        }),
      }).catch((err) => console.log(err));
      const res = JSON.parse(await responce.text());
      if (res.status === "success") {
        setEditAddress(false);
        setAddingAddress(false);
        // setEditingAddress(null);
        setLoad(true);
      } else {
        alert(res.message);
      }
    } catch (error) {
      // setLoad(false);
    }
  };

  const getAddingAddressButton = () => {
    if (addingAddress || editAddress) {
      return (
        <div
          style={{
            padding: "1rem",
          }}
        >
          <Button
            className="add-address-btn"
            variant="outlined"
            color="primary"
            onClick={() => {
              setAddingAddress(false);
              setEditAddress(false);
            }}
          >
            Cancel
          </Button>
        </div>
      );
    } else {
      return <></>;
    }
  };

  const getRemoveButton = () => {
    if (editAddress) {
      return (
        <div
          style={{
            padding: "1rem",
          }}
        >
          <Button
            className="add-address-btn"
            variant="outlined"
            onClick={() => addAddress("remove")}
          >
            Remove
          </Button>
        </div>
      );
    } else {
      return <></>;
    }
  };

  const setEditingAddress = (index) => {
    setEditId(addresses[index]._id);
    setNumber(addresses[index].number);
    setState(addresses[index].state);
    setCity(addresses[index].city);
    setArea(addresses[index].area);
    setPincode(addresses[index].pincode);
    setLandmark(addresses[index].landmark);
  };

  if (load) {
    getAddresses();
    return (
      <>
        <LinearProgress />
      </>
    );
  } else if (
    addresses[0] === null ||
    addresses[0] === undefined ||
    addresses[0] === "" ||
    editAddress === true ||
    addingAddress === true
  ) {
    return (
      <>
        <div className="add-address-div">
          <div className="add-address">
            <div className="add-address-page">
              <div className="add-address-tag">
                <span>Add Your Address</span>
              </div>

              <TextField
                className="address-input-a address-name"
                label="Number"
                size="small"
                variant="outlined"
                required
                value={number}
                onChange={(e) => setNumber(e.target.value)}
              />
              <br />
              <br />

              <TextField
                className="address-input-b address-name"
                label="Pincode"
                size="small"
                variant="outlined"
                required
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
              />
              <br />
              <br />
              <div className="state-city-div">
                <TextField
                  className="address-input-b address-name"
                  label="State"
                  size="small"
                  variant="outlined"
                  required
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                />
                <TextField
                  className="address-input-b address-name"
                  label="City"
                  size="small"
                  variant="outlined"
                  required
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
                <br />
                <br />
              </div>
              <br />
              <TextField
                className="address-input-a address-name"
                label="House No, Building Name"
                size="small"
                variant="outlined"
                required
                value={area}
                onChange={(e) => setArea(e.target.value)}
              />
              <br />
              <br />
              <TextField
                className="address-input-a address-name"
                label="Road Name, Area Coloney"
                size="small"
                variant="outlined"
                required
                value={landmark}
                onChange={(e) => setLandmark(e.target.value)}
              />
              <br />
              <br />
              <div
                style={{
                  padding: "1rem",
                }}
              >
                <Button
                  className="add-address-btn"
                  variant="outlined"
                  color="primary"
                  onClick={() => addAddress()}
                >
                  Add This Address
                </Button>
              </div>

              {getRemoveButton()}

              {getAddingAddressButton()}
            </div>
          </div>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div className="add-address-div">
          <div className="add-address">
            <div className="add-address-page">
              <div className="add-address-tag">
                <span>Your Delivery Address</span>
              </div>
              {/* <div className="address-input-a address-name">
                <span>Full Name</span>
                <h4>Mohit Rawat</h4>
              </div> */}
              {/* <div className="address-input-a address-name">
                <span>Contact Number</span>
                <h4>+91-7895995686</h4>
              </div>
              <br /> */}

              {/* <div className="address-input-b address-name">
                <span>Country:- </span>
                <p>India</p>
              </div> */}
              {addresses.map((val, index) => (
                <>
                  <div>
                    <span>{val.number}</span>
                    <br />
                    <span>
                      {val.state} {val.city} {val.area}
                      {val.pincode}
                    </span>
                    <br />
                    <span>{val.landmark}</span>
                  </div>
                  <Button
                    className="add-address-btn"
                    variant="outlined"
                    color="primary"
                    onClick={() => {
                      setEditingAddress(index);
                      setEditAddress(true);
                    }}
                  >
                    Edit
                  </Button>
                  <br />
                  <br />
                </>
              ))}
            </div>
            <div
              style={{
                padding: "1rem",
              }}
            >
              <Button
                className="add-address-btn"
                variant="outlined"
                color="primary"
                onClick={() => setAddingAddress(true)}
              >
                Add New Address
              </Button>
            </div>
          </div>
        </div>
      </>
    );
  }
}
