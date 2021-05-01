import React from "react";
import Heading from "./nav";
import { Text, View, Image, FlatList, Button } from "dripsy";
import { Ionicons, Entypo } from "@expo/vector-icons";
import {
  signIn,
  signOut,
  useSession,
  getSession,
  getCsrfToken,
} from "next-auth/client";
import { PrismaClient } from "@prisma/client";

import {
  StyleSheet,
  TouchableOpacity,
  // Text,
  // View,
  TextInput,

  // Image,
  Linking,
} from "react-native";
import axios from "axios";
import useSWR from "swr";
import { alignItems } from "styled-system";
import { Vieww } from "../styles/comments/commentsStyle";

const ProductFeed = () => {
  const { data, error } = useSWR("/api/postFeed", axios);
  if (error) return <div>error</div>;
  console.log(error);
  if (!data) return <div>loading...</div>;
  const [session] = useSession();
  console.log(session);

  console.log("data.data");

  console.log(data.data.name.following);
  console.log("data.data");

  const LikePost = async () => {
    axios
      .post(`/api/post/likes/${router.query.id}`)
      .then((response) => {
        mutate(`/api/post/${router.query.id}`);
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const UnLikePost = async () => {
    axios
      .delete(`/api/post/likes/${router.query.id}`)
      .then((response) => {
        mutate(`/api/post/${router.query.id}`);
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Heading>
      <View sx={{ justifyContent: "left" }}>
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

                alignItems: "left",
              }}
            >
              <FlatList
                data={item.posts}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item) => item.id}
                numColumns={1}
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
                              width: [100, 250, 550],
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

export default ProductFeed;
