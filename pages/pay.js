import PaystackWebView from "react-native-paystack-webview";
import React, { Component } from "react";
import { Text, View, Image } from "dripsy";
import { usePaystackPayment } from "react-paystack";

export const config = {
  reference: new Date().getTime(),
  email: "user@example.com",
  amount: 20000,
  publicKey: "pk_test_8c426dde2d429df56342fd8a14ec3e14ea316c8a",
};

// you can call this function anything
const onSuccess = (reference) => {
  // Implementation for whatever you want to do with reference and after success call.
  console.log(reference);
};

// you can call this function anything
const onClose = () => {
  // implementation for  whatever you want to do when the Paystack dialog closed.
  console.log("closed");
};

const PaystackHookExample = () => {
  const initializePayment = usePaystackPayment(config);
  return (
    <div>
      <button
        onClick={() => {
          initializePayment(onSuccess, onClose);
        }}
      >
        Paystack Hooks Implementation
      </button>
    </div>
  );
};

export default PaystackHookExample;
