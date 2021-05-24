import React from "react";

import Rating from "@material-ui/lab/Rating";
import AddToCart from "./AddToCart/AddToCart";
export default function FoodDiv(props) {
  const [value, setValue] = React.useState(4);
  return (
    <>
      <div
        style={{
          width: "100%",
          //   height: "15.1rem",
          display: "flex",
          justifyContent: "center",
          //   borderBottom: ".1rem solid lightgray",
          //   marginTop: ".5rem",
          //   marginBottom: ".5rem",
          padding: ".1rem",
        }}
      >
        <div
          style={{
            // width: "11.5rem",
            // height: "15.5rem",
            backgroundColor: "white",
            padding: ".2rem",
          }}
        >
          <img
            style={{
              height: "9rem",
              borderRadius: ".3rem .3rem .3rem .3rem",
              //   border: "1px solid",
            }}
            src={props.foodImg}
            alt="Food Image"
          />

          <div
            style={{
              paddingLeft: ".5rem",
              // marginBottom: ".5rem"
            }}
          >
            <p
              style={{
                fontSize: 16,
                color: "gray",
                display: "inline-block",
                marginTop: ".3rem",
                marginBottom: ".8rem",
              }}
            >
              {props.foodName}
            </p>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: ".8rem",
              }}
            >
              <span
                style={{
                  color: "green",
                }}
              >
                $ {props.foodPrice}
              </span>

              {/* <Box
                style={{
                  border: "1px solid",
                }}
                component="fieldset"
                mb={3}
                borderColor="transparent"
              > */}
              <Rating
                name="read-only"
                size="small"
                value={props.rating}
                readOnly
              />
              {/* </Box> */}
            </div>
          </div>
          <AddToCart foodId={props.foodId} />
        </div>
      </div>
    </>
  );
}

export function FoodDiv2(props) {
  return (
    <>
      <div
        style={{
          width: "100%",
          // height: "21.8rem",
          display: "flex",
          justifyContent: "center",
          //   borderBottom: ".1rem solid lightgray",
          marginTop: ".5rem",
          marginBottom: ".5rem",
        }}
      >
        <div
          style={{
            width: "23rem",
            // height: "23rem",
            backgroundColor: "white",
            padding: ".4rem",
          }}
        >
          <img
            style={{
              height: "16rem",
              borderRadius: ".3rem .3rem .3rem .3rem",
              //   border: "1px solid",
            }}
            src={props.foodImg}
            alt="Food Image"
          />

          <div
            style={{
              paddingLeft: ".5rem",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div>
                <p
                  style={{
                    fontSize: 20,

                    display: "inline-block",
                    marginTop: ".4rem",
                  }}
                >
                  {props.foodName}
                </p>
                <br />
                <span
                  style={{
                    color: "green",

                    marginTop: ".4rem",
                  }}
                >
                  $ {props.foodPrice}
                </span>
              </div>

              <Rating name="read-only" value={props.rating} readOnly />
            </div>
          </div>
          <AddToCart />
        </div>
      </div>
    </>
  );
}

export function FoodDiv3(props) {
  const [value, setValue] = React.useState(4);
  return (
    <>
      <div
        style={{
          width: "100%",
          // height: "15.1rem",
          display: "flex",
          justifyContent: "center",
          //   borderBottom: ".1rem solid lightgray",
          //   marginTop: ".5rem",
          //   marginBottom: ".5rem",
        }}
      >
        <div
          style={{
            width: "100%",
            height: "8rem",
            display: "flex",
            flexDirection: "row",
            backgroundColor: "white",
            padding: ".5rem",
            margin: ".5rem",
          }}
        >
          <img
            style={{
              width: "7rem",
              height: "7rem",
              borderRadius: ".3rem .3rem .3rem .3rem",
              //   border: "1px solid",
            }}
            src={props.foodImg}
            alt="Food Image"
          />

          <div
            style={{
              paddingLeft: ".5rem",
              width: "100%",
              display: "",
            }}
          >
            <p
              style={{
                fontSize: 18,
                color: "gray",
                display: "inline-block",
                marginTop: ".3rem",
              }}
            >
              {props.foodName}
            </p>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span
                style={{
                  color: "green",
                }}
              >
                $ {props.foodPrice}
              </span>

              <Rating
                name="read-only"
                size="small"
                value={props.rating}
                readOnly
              />
            </div>
            <AddToCart />
          </div>
        </div>
      </div>
    </>
  );
}
