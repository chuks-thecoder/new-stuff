import React from "react";
import Heading from "./nav";
import { Text, View, Image, TouchableOpacity, Button } from "dripsy";
import { Ionicons, Entypo } from "@expo/vector-icons";

import {
  StyleSheet,
  // Text,
  // View,
  TextInput,
  FlatList,

  // Image,
  Linking,
} from "react-native";
import axios from "axios";
import useSWR from "swr";
import { alignItems } from "styled-system";
import { Vieww } from "../styles/comments/commentsStyle";

const Products = () => {
  const { data, error } = useSWR("/api/productFeed", axios);
  if (error) return <div>error</div>;
  console.log(error);
  if (!data) return <div>loading...</div>;
  console.log("data.data");

  console.log(data.data.name.following);
  console.log("data.data");

  const LikePost = async () => {
    axios
      .post(`/api/product/likes/${router.query.id}`)
      .then((response) => {
        mutate(`/api/product/${router.query.id}`);
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const UnLikePost = async () => {
    axios
      .delete(`/api/product/likes/${router.query.id}`)
      .then((response) => {
        mutate(`/api/product/${router.query.id}`);
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const newfin = true;

  return (
    <Heading>
      <View>
        <FlatList
          data={data.data.name.following}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View
              sx={{
                flex: 1,
                justifyContent: "center",
                itemAlign: "center",
                width: "100%",

                alignItems: "center",
              }}
            >
              <FlatList
                data={item.products}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item) => item.id}
                numColumns={2}
                renderItem={({ item }) => (
                  <View>
                    <View>
                      <View sx={{ justifyContent: "space-between" }}>
                        <View>
                          <View sx={{ flexDirection: "row" }}>
                            <Image
                              sx={{
                                height: 50,
                                width: 50,
                                borderRadius: 600,
                                resizeMode: "contain",
                                backgroundColor: "#f8f8f8",

                                margin: 10,
                              }}
                              source={{ uri: item.profile.image }}
                            />
                            <Text
                              sx={{
                                marginTop: 30,
                              }}
                            >
                              {item.profile.username}
                            </Text>
                          </View>
                          <Image
                            sx={{
                              height: [150, 300, 500],
                              width: [100, 250, 340],
                              borderRadius: 5,
                              resizeMode: "contain",
                              backgroundColor: "#f8f8f8",
                            }}
                            source={{ uri: item.image }}
                          />
                        </View>
                        <View
                          sx={{
                            flex: 2,
                            flexDirection: "row",
                            itemAlign: "left",
                            marginTop: 5,
                          }}
                        >
                          <View sx={{ flexDirection: "row" }}>
                            {newfin ? (
                              <TouchableOpacity onPress={() => UnLikePost()}>
                                <Ionicons
                                  name="heart"
                                  size={24}
                                  color="red"
                                  style={{ padding: 10 }}
                                />
                              </TouchableOpacity>
                            ) : (
                              <TouchableOpacity onPress={() => LikePost()}>
                                <Ionicons
                                  name="heart-outline"
                                  size={24}
                                  color="black"
                                  style={{ padding: 10 }}
                                />
                              </TouchableOpacity>
                            )}
                            <Ionicons
                              name="md-chatbox-outline"
                              size={24}
                              color="black"
                              style={{ padding: 10 }}
                            />
                            <Ionicons
                              name="logo-whatsapp"
                              size={24}
                              color="black"
                              style={{ padding: 10 }}
                            />

                            <Ionicons
                              name="logo-whatsapp"
                              size={24}
                              color="black"
                              style={{ padding: 10 }}
                            />
                          </View>
                        </View>
                        <View
                          sx={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            itemAlign: "left",
                            marginTop: 5,
                          }}
                        >
                          <View>
                            <Text>{item.name}</Text>
                            <Text sx={{ marginBottom: 50 }}>{item.body}</Text>
                          </View>
                        </View>
                      </View>
                    </View>
                  </View>
                )}
              ></FlatList>
            </View>
          )}
        ></FlatList>
      </View>
    </Heading>
  );
};

export default Products;
