import React from "react";
import RoomIcon from "@material-ui/icons/Room";

import Rating from "@material-ui/lab/Rating";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

export default function RestaurantDiv(props) {
  const [value, setValue] = React.useState(4);
  return (
    <>
      <div
        style={{
          width: "100%",
          display: "flex",

          justifyContent: "center",
        }}
      >
        <div
          style={{
            width: "22rem",
            height: "30rem",
            flexDirection: "column",
            //   justifyContent: "center",
            alignItems: "center",
            backgroundColor: "white",
          }}
        >
          <div
            style={{
              height: "21.5rem",
            }}
          >
            <div style={{ width: "22rem", height: "15.7rem" }}>
              <img
                //   style={{
                //     borderRadius: ".5rem .5rem 0 0",
                //   }}
                src={props.backgroundImg}
                alt="Restaurant Background Image"
              />
              <img
                style={{
                  width: "10rem",
                  height: "10rem",
                  borderRadius: "5rem",
                  position: "relative",
                  left: 0,
                  top: -90,
                  border: ".2rem solid white",
                }}
                src={props.profileImg}
                alt="Restaurant"
              />

              <Rating
                style={{
                  position: "relative",
                  left: 20,
                  top: -110,
                }}
                name="read-only"
                value={props.rating}
                readOnly
              />
            </div>
          </div>

          <div>
            <p
              style={{
                fontSize: 22,
                textAlign: "center",
              }}
            >
              {props.restaurantName}
            </p>

            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                color: "gray",
                padding: "1rem",
              }}
            >
              <RoomIcon />
              <p>{props.restaurantAddress}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export function RestaurantDiv2(props) {
  const [value, setValue] = React.useState(4);
  return (
    <>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            // width: "12rem",
            height: "20.5rem",
            flexDirection: "column",
            //   justifyContent: "center",
            alignItems: "center",
            borderBottom: ".1rem solid lightgray",
            backgroundColor: "white",
          }}
        >
          <div
            style={{
              height: "12rem",
            }}
          >
            <div style={{ width: "12rem", height: "8.8rem" }}>
              <img
                //   style={{
                //     borderRadius: ".5rem .5rem 0 0",
                //   }}
                src={props.backgroundImg}
                alt="Restaurant Background Image"
              />
              <img
                style={{
                  width: "5rem",
                  height: "5rem",
                  borderRadius: "2.5rem",
                  position: "relative",
                  left: 0,
                  top: -40,
                  border: ".2rem solid white",
                }}
                src={props.profileImg}
                alt="Restaurant"
              />

              <Rating
                size="small"
                style={{
                  position: "relative",
                  left: 10,
                  top: -50,
                }}
                name="read-only"
                value={props.rating}
                readOnly
              />
            </div>
          </div>

          <div>
            <p
              style={{
                fontSize: 19,
                textAlign: "center",
              }}
            >
              {props.restaurantName}
            </p>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: ".8rem",
              }}
            >
              <RoomIcon style={{ fontSize: 18 }} />
            </div>

            {/* <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                color: "gray",
                border: "1px solid",
              }}
            > */}
            <p
              style={{
                fontSize: 12,
                textAlign: "center",
                padding: "1rem",
              }}
            >
              {props.restaurantAddress}
            </p>
            {/* </div> */}
          </div>
        </div>
      </div>
    </>
  );
}

export function RestaurantDiv3(props) {
  const [value, setValue] = React.useState(4);
  return (
    <>
      <div
        style={{
          width: "100%",
          display: "flex",

          justifyContent: "center",
        }}
      >
        <div
          style={{
            width: "100%",
            height: "35rem",
            flexDirection: "column",
            //   justifyContent: "center",
            alignItems: "center",
            backgroundColor: "white",
            padding: ".6rem",
          }}
        >
          <div
            style={{
              height: "24rem",
            }}
          >
            <div style={{ width: "100%", height: "18rem" }}>
              <img
                //   style={{
                //     borderRadius: ".5rem .5rem 0 0",
                //   }}
                src={props.backgroundImg}
                alt="Restaurant Background Image"
              />
              <img
                style={{
                  width: "10rem",
                  height: "10rem",
                  borderRadius: "5rem",
                  position: "relative",
                  left: 0,
                  top: -90,
                  border: ".2rem solid white",
                }}
                src={props.profileImg}
                alt="Restaurant"
              />

              <Rating
                size="large"
                style={{
                  position: "relative",
                  left: 60,
                  top: -100,
                }}
                name="read-only"
                value={props.rating}
                readOnly
              />
            </div>
          </div>

          <div>
            <p
              style={{
                fontSize: 28,
                textAlign: "center",
              }}
            >
              {props.restaurantName}
            </p>

            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                color: "gray",
                padding: "1rem",
              }}
            >
              <RoomIcon />
              <p style={{ fontSize: 18 }}>{props.restaurantAddress}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
