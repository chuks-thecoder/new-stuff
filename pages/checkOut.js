import React, { Component } from "react";
import { Text, View, Image, TextInput, Button } from "dripsy";
import { usePaystackPayment } from "react-paystack";
import { config } from "./pay";
import { Vieww } from "../styles/comments/commentsStyle";
import { useCart } from "react-use-cart";
import Heading from "./nav";
import axios from "axios";

const CheckOut = () => {
  const click = () => {
    axios
      .post("/api/checkout", {
        name: name,
        email: email,
        address: address,
        state: state,
        delivery: delivery,
        phone: phone,
      })
      .then((response) => {
        console.log(response);
        setName("");
        setEmail("");
        setAddress("");
        setState("");
        setDelivery("");
        setPhone("");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const initializePayment = usePaystackPayment(config);
  const {
    items,
    totalItems,
    totalUniqueItems,
    cartTotal,
    metadata,
    emptyCart,
    updateItemQuantity,
    updateItem,
    removeItem,
  } = useCart();
  const onSuccess = async (reference) => {
    axios
      .post("/api/checkout", {
        name: name,
        email: email,
        address: address,
        state: state,
        delivery: delivery,
        phone: phone,
      })
      .then(async (response) => {
        console.log(response);
        setName("");
        setEmail("");
        setAddress("");
        setState("");
        setDelivery("");
        setPhone("");
        for (const i in items) {
          axios
            .post("/api/sales", {
              profile: items[i].profileId,
              product: items[i].id,
            })
            .then((response) => {
              console.log(response);
            });
        }
      })
      .catch((error) => {
        console.log(error);
      });
    emptyCart();
    console.log("done");
    // Implementation for whatever you want to do with reference and after success call.
    console.log(reference);
  };

  // you can call this function anything
  const onClose = () => {
    // implementation for  whatever you want to do when the Paystack dialog closed.
    console.log("closed");
  };
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [state, setState] = React.useState("Lagos");
  const [delivery, setDelivery] = React.useState("");
  const [phone, setPhone] = React.useState("070");
  return (
    <Heading>
      <View sx={{ flexDirection: "row", justifyContent: "space-around" }}>
        <View>
          <View>
            <Text>Your Name</Text>
            <TextInput
              sx={{
                padding: 10,
                borderColor: "blue",
                borderBottomWidth: 3,
                // borderRadius: 7,
                borderTopWidth: 0,
                borderRightWidth: 0,
                borderLeftWidth: 0,
                marginBottom: 50,
              }}
              onChange={(e) => setName(e.target.value)}
              value={name}
            ></TextInput>
          </View>
          <View>
            <Text>Your Email</Text>
            <TextInput
              sx={{
                padding: 10,
                borderColor: "blue",
                borderBottomWidth: 3,
                // borderRadius: 7,
                borderTopWidth: 0,
                borderRightWidth: 0,
                borderLeftWidth: 0,
                marginBottom: 50,
              }}
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            ></TextInput>
          </View>
          <View>
            <Text>Your Address</Text>
            <TextInput
              sx={{
                padding: 10,
                borderColor: "blue",
                borderBottomWidth: 3,
                // borderRadius: 7,
                borderTopWidth: 0,
                borderRightWidth: 0,
                borderLeftWidth: 0,
                marginBottom: 50,
              }}
              onChange={(e) => setAddress(e.target.value)}
              value={address}
            ></TextInput>
          </View>
          <View>
            <Text>Your State</Text>
            <TextInput
              sx={{
                padding: 10,
                borderColor: "blue",
                borderBottomWidth: 3,
                // borderRadius: 7,
                borderTopWidth: 0,
                borderRightWidth: 0,
                borderLeftWidth: 0,
                marginBottom: 50,
              }}
              onChange={(e) => setState(e.target.value)}
              value={state}
            ></TextInput>
          </View>
          <View>
            <Text>Your Delivery</Text>
            <TextInput
              sx={{
                padding: 10,
                borderColor: "blue",
                borderBottomWidth: 3,
                // borderRadius: 7,
                borderTopWidth: 0,
                borderRightWidth: 0,
                borderLeftWidth: 0,
                marginBottom: 50,
              }}
              onChange={(e) => setDelivery(e.target.value)}
              value={delivery}
            ></TextInput>
          </View>
          <View>
            <Text>Your Phone</Text>
            <TextInput
              sx={{
                padding: 10,
                borderColor: "blue",
                borderBottomWidth: 3,
                // borderRadius: 7,
                borderTopWidth: 0,
                borderRightWidth: 0,
                borderLeftWidth: 0,
                marginBottom: 50,
              }}
              onChange={(e) => setPhone(e.target.value)}
              value={phone}
            ></TextInput>
          </View>
          {/* <Button title="Submit" onPress={click} /> */}
        </View>

        <View
          sx={{
            width: 200,
            height: 200,
            backgroundColor: "#f8f8f8",
            justifyContent: "center",
            itemAlign: "center",
            borderRadius: 5,
          }}
        >
          <Text sx={{ textAlign: "center" }}>{cartTotal}</Text>
          <button
            onClick={() => {
              initializePayment(onSuccess, onClose);
            }}
          >
            Paystack Hooks Implementation
          </button>
        </View>
      </View>
    </Heading>
  );
};

export default CheckOut;
