import React from "react";
import { Image, View, Text, FlatList } from "dripsy";
import { Link } from "expo-next-react-navigation";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { Ionicons, Entypo, AntDesign } from "@expo/vector-icons";
import Modal from "modal-enhanced-react-native-web";
import swr, { mutate } from "swr";
import { useCart } from "react-use-cart";

import {
  StyleSheet,

  // View,
  TextInput,
  TouchableOpacity,
  // Image,
  Linking,
  Button,
} from "react-native";
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
  renderers,
} from "react-native-popup-menu";
import {
  Textt,
  Comment,
  Vieww,
  CommentContainer,
  ImageUser,
  Input,
  Btn,
} from "../styles/comments/commentsStyle";
import axios from "axios";
import useSWR from "swr";
import Heading from "./nav";
import { signIn, signOut, useSession } from "next-auth/client";

// import { Link, useRouting } from "expo-next-react-navigation";

const Profile = () => {
  const [name, setName] = React.useState(false);
  const { SlideInMenu } = renderers;
  const [visibleModal, setvisibleModal] = React.useState(null);
  const [session, loading] = useSession();
  const { addItem } = useCart();

  const renderButton = (text, onPress) => (
    <TouchableOpacity onPress={onPress}>
      <View>
        <View>{text}</View>
      </View>
    </TouchableOpacity>
  );

  const renderModalContent = () => (
    <View
      sx={{
        alignItems: "center",
        backgroundColor: "#fff",
        padding: 30,
        borderRadius: 5,
      }}
    >
      <Text>Hello!</Text>
      {renderButton("Close", () => setvisibleModal(false))}
    </View>
  );

  const handleOnScroll = (event) => {
    setvisibleModal({
      scrollOffset: event.nativeEvent.contentOffset.y,
    });
  };

  const handleScrollTo = (p) => {
    if (this.scrollViewRef) {
      this.scrollViewRef.scrollTo(p);
    }
  };
  const { data, error } = useSWR("/api/myprofile", axios);

  if (error) return <div>error</div>;
  console.log(error);
  if (!data) return <div>loading...</div>;
  console.log("hossw fa");
  const newfin = data.data.names.followedBy.filter((item) => {
    return item.accountId === session.token.id;
  });
  const deleteProd = async (id) => {
    axios
      .delete(`/api/product/${id}`)
      .then((response) => {
        console.log(response);
        mutate("/api/myprofile");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  console.log(data.data.names.followedBy);
  console.log("how fa");

  return (
    <Heading>
      <View>
        <View
          sx={{
            flex: 1,
            justifyContent: "top",
            alignItems: "center",
            width: "100%",
            padding: 30,
          }}
        >
          <Image
            sx={{
              width: [100, 150, 200],
              height: [100, 150, 200],

              borderRadius: 600,
              backgroundColor: "#888888",
              overFlow: "hidden",
              alignItems: "center",

              // resizeMode: "contain",
            }}
            source={{ uri: data.data.names.image }}
            // style={styles.image2}
          />

          <Textt
            fontSize={[15, 20, 25, 30]}
            color="red"
            textAlign="center"

            // style={styles.text}
          >
            {data.data.names.username}
          </Textt>
          <View
            sx={{
              flexDirection: "row",
              alignItems: "center",
              width: "100",
            }}
          >
            <Textt m={10}>{data.data.names.followedBy.length} Folloers</Textt>
            <Textt m={10}>{data.data.names.following.length} Following</Textt>
            <Textt m={10}>50 Posts</Textt>
            <Textt m={10}>30 Products</Textt>
          </View>
          <Textt
            fontSize={[15, 20, 25, 30]}
            color="black"
            textAlign="center"

            // style={styles.text}
          >
            {data.data.names.bio}
          </Textt>
        </View>

        <View>
          <Tabs>
            <TabList>
              <View
                sx={{ flexDirection: "row", justifyContent: "space-around" }}
              >
                <Tab>
                  <Ionicons
                    name="add-circle-outline"
                    size={24}
                    color="#000"
                    style={{ padding: 10 }}
                  />
                </Tab>

                <Tab>
                  <Ionicons
                    name="add-circle-outline"
                    size={24}
                    color="#000"
                    style={{ padding: 10 }}
                  />
                </Tab>
              </View>
            </TabList>

            <TabPanel>
              <View
                sx={{
                  flex: 1,

                  marginTop: 30,
                  // marginLeft: 50,
                  justifyContent: ["left", null, "center"],

                  width: "100%",
                  backgroundColor: "#f8f8f8",
                  borderRadius: 5,

                  alignItems: "center",
                  marginBottom: 150,
                }}
              >
                <FlatList
                  data={data.data.names.posts}
                  showsHorizontalScrollIndicator={false}
                  showsVerticalScrollIndicator={false}
                  keyExtractor={(item) => item.id}
                  numColumns={3}
                  renderItem={({ item }) => (
                    <View>
                      <Link
                        routeName="post"
                        params={{ id: `${item.id}` }}
                        web={{ as: `/postpage/${item.id}` }}
                      >
                        <View
                          sx={{
                            width: [90, 200, 300],
                            height: [90, 200, 300],
                            // margin: 30,
                            borderWidth: 1,
                            borderRadius: 5,

                            borderColor: "#888888",
                            marginHorizontal: -18,
                            marginVertical: -18,
                          }}
                        >
                          <View
                          // style={styles.obj}
                          // sx={{
                          //   margin: 30,
                          // }}
                          >
                            <Image
                              sx={{
                                height: [90, 200, 300],
                                width: [90, 200, 300],
                                resizeMode: "contain",
                                borderRadius: 600,
                              }}
                              source={{ uri: item.image }}
                            />
                          </View>
                        </View>
                      </Link>
                    </View>
                  )}
                ></FlatList>
              </View>
            </TabPanel>
            <TabPanel>
              <View
                sx={{
                  flex: 1,

                  marginTop: 30,
                  // marginLeft: 50,
                  justifyContent: ["left", null, "center"],

                  width: "100%",
                  backgroundColor: "#f8f8f8",
                  borderRadius: 5,

                  alignItems: "center",
                  marginBottom: 150,
                }}
              >
                <FlatList
                  data={data.data.names.products}
                  showsHorizontalScrollIndicator={false}
                  showsVerticalScrollIndicator={false}
                  keyExtractor={(item) => item.id}
                  numColumns={2}
                  renderItem={({ item }) => (
                    <View>
                      <Link
                        routeName="post"
                        params={{ id: `${item.id}` }}
                        web={{ as: `/productpage/${item.id}` }}
                      >
                        <View
                          sx={{
                            width: [100, 200, 300],
                            height: [150, 200, 350],
                            // margin: 30,
                            borderWidth: 1,
                            borderRadius: 5,

                            borderColor: "#888888",
                            marginHorizontal: -10,
                            marginVertical: -10,
                          }}
                        >
                          <View
                          // style={styles.obj}
                          // sx={{
                          //   margin: 30,
                          // }}
                          >
                            <Image
                              sx={{
                                height: [90, 200, 300],
                                width: [90, 200, 300],
                                resizeMode: "contain",
                                borderRadius: 600,
                              }}
                              source={{ uri: item.image }}
                            />
                          </View>
                        </View>
                      </Link>
                      <Button
                        sx={{ marginTop: 50 }}
                        title="👈 delete"
                        onPress={() => deleteProd(item.id)}
                      ></Button>
                      <Button
                        sx={{ marginTop: 50 }}
                        title="👈 Add"
                        onPress={() => addItem(item)}
                      ></Button>
                    </View>
                  )}
                ></FlatList>
              </View>
            </TabPanel>
          </Tabs>

          <View>
            <Button
              sx={{ marginTop: 50 }}
              title="👈 Go back"
              onPress={() => goBack()}
            ></Button>
            <Link
              style={{ color: "green", fontSize: 20, textAlign: "center" }}
              routeName="createpost"
            >
              Create Post
            </Link>
          </View>
        </View>
      </View>
    </Heading>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "top",
    alignItems: "center",
    width: "100%",
    padding: 30,
  },
  form: {
    padding: 10,
    borderColor: "blue",
    borderWidth: 3,
    borderRadius: 7,
  },

  text: {
    fontSize: 30,
    color: "red",
    textAlign: "left",
  },

  smalltext: {
    fontSize: 20,
    color: "black",
    textAlign: "left",
  },
  thumnail: {
    height: 100,
    width: 100,
    resizeMode: "contain",
    borderRadius: 600,
  },
  list: {
    flex: 5,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "left",

    backgroundColor: "#000",
    alignItems: "stretch",
  },
  ind: {
    // justifyContent: "space-between",
    margin: 30,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#fff",
  },
  obj: {
    // flex: 1,
    // flexDirection: "row",
    margin: 30,
    // flexWrap: "wrap",
  },
  dash: {
    fontSize: 15, // 14 on mobile, 16 on tablet, 20 on desktop

    alignItems: "left",
    textAlign: "center",
    marginTop: 10,
    marginLeft: 20,
    backgroundColor: "blue",
    padding: 10,
    width: 200,
    color: "#fff",
  },
});
