import PaystackWebView from "react-native-paystack-webview";
import React, { Component } from "react";
import { Text, View, Image } from "dripsy";
import { usePaystackPayment } from "react-paystack";

const MyApp = () => {
  return (
    <View style={{ flex: 1 }}>
      <PaystackWebView
        buttonText="Pay Now"
        showPayButton={true}
        paystackKey="pk_test_8c426dde2d429df56342fd8a14ec3e14ea316c8a"
        amount={120000}
        billingEmail="paystackwebview@something.com"
        billingMobile="09787377462"
        billingName="Oluwatobi Shokunbi"
        ActivityIndicatorColor="green"
        SafeAreaViewContainer={{ marginTop: 5 }}
        SafeAreaViewContainerModal={{ marginTop: 5 }}
        onCancel={(e) => {
          // handle response here
        }}
        onSuccess={(e) => {
          // handle response here
        }}
        autoStart={false}
      />
    </View>
  );
};

export default MyApp;
