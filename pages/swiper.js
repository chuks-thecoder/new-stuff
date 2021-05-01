import React from "react";
import { StyleSheet } from "react-native";
import { Text, View, Button, ScrollView } from "dripsy";
import Swiper from "react-native-web-swiper";
import { Ionicons, Entypo, AntDesign } from "@expo/vector-icons";
import { Vieww } from "../styles/comments/commentsStyle";

// const styles = StyleSheet.create({
//   container: {
//     height: 300,
//     width: 300,
//     justifyContent: "center",
//   },
//   slideContainer: {
//     flex: 1,
//   },
//   slide1: {
//     flex: 1,
//     alignItems: "center",
//     justifyContent: "center",
//     backgroundColor: "rgba(20,20,200,0.3)",
//   },
//   slide2: {
//     flex: 1,
//     alignItems: "center",
//     justifyContent: "center",
//     backgroundColor: "rgba(20,200,20,0.3)",
//   },
//   slide3: {
//     flex: 1,
//     alignItems: "center",
//     justifyContent: "center",
//     backgroundColor: "rgba(200,20,20,0.3)",
//   },
// });

const Swipers = () => {
  return (
    <View sx={{ justifyContent: "center", alignItems: "center" }}>
      <View sx={{ height: 300, width: 300, justifyContent: "center" }}>
        <Swiper
          controlsEnabled
          controlsProps={{
            prevTitle: (
              <Ionicons
                name="cart-outline"
                size={30}
                color="#000"
                style={{ padding: 10 }}
              />
            ),
            nextTitle: (
              <Ionicons
                name="cart-outline"
                size={30}
                color="#000"
                style={{ padding: 10 }}
              />
            ),
            prevPos: "left",
            nextPos: "right",
            dotsTouchable: true,
          }}
        >
          <View sx={{ flex: 1 }}>
            <View
              sx={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "rgba(20,20,200,0.3)",
              }}
            >
              <Text>Slide 1</Text>
            </View>
          </View>
          <View sx={{ flex: 1 }}>
            <View
              sx={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "rgba(20,200,20,0.3)",
              }}
            >
              <Text>Slide 2</Text>
            </View>
          </View>
          <View sx={{ flex: 1 }}>
            <View
              sx={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "rgba(200,20,20,0.3)",
              }}
            >
              <Text>Slide 3</Text>
            </View>
          </View>
        </Swiper>
      </View>
    </View>
  );
};

export default Swipers;
