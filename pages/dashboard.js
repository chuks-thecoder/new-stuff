import React from "react";
import Heading from "./nav";
import { Text, View, Image } from "dripsy";
import { Ionicons, Entypo } from "@expo/vector-icons";
import { Link } from "@react-navigation/native";

import {
  StyleSheet,
  // Text,
  // View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  // Image,
  Linking,
  Button,
  FlatList,
} from "react-native";
import axios from "axios";
import useSWR from "swr";

const Dashboard = () => {
  return (
    <Heading>
      <View>
        <ScrollView>
          <Link to="/feed">feed</Link>
          <View
            sx={{
              flex: 1,
              flexDirection: "row",
              flexWrap: "wrap",
              itemAlign: "center",
              width: "100%",
              justifyContent: "center",
            }}
          >
            <View
              sx={{
                backgroundColor: "#A1C0C4",
                width: 250,
                height: 250,
                margin: 20,
              }}
            >
              <View
                sx={{
                  marginTop: 120,
                  textAlign: "center",
                }}
              >
                <Text>Sales</Text>
                <Text>Products</Text>
              </View>
            </View>
            <View
              sx={{
                backgroundColor: "#f8f8f8",
                width: 250,
                height: 250,
                margin: 20,
              }}
            >
              <View
                sx={{
                  marginTop: 120,
                  textAlign: "center",
                }}
              >
                <Text>Profit</Text>
                <Text>Products</Text>
              </View>
            </View>
          </View>
          <View
            sx={{
              flex: 1,
              flexDirection: "row",
              itemAlign: "center",
              width: "100%",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            <View
              sx={{
                backgroundColor: "#f8f8f8",
                width: 250,
                height: 250,
                margin: 20,
              }}
            >
              <View
                sx={{
                  marginTop: 120,
                  textAlign: "center",
                }}
              >
                <Text>Products</Text>
                <Text>Products</Text>
              </View>
            </View>
            <View
              sx={{
                backgroundColor: "#A1C0C4",
                width: 250,
                height: 250,
                margin: 20,
              }}
            >
              <View
                sx={{
                  marginTop: 120,
                  textAlign: "center",
                }}
              >
                <Text>Add Product</Text>
                <Text>Products</Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </Heading>
  );
};

export default Dashboard;
