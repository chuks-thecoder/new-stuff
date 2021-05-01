// import { useRouter } from "next/router";
import { useRouting } from "expo-next-react-navigation";
import axios from "axios";
import useSWR from "swr";

import React from "react";
import { useRouter } from "next/router";
// import { Link, useRouting } from "expo-next-react-navigation";
import { PrismaClient } from "@prisma/client";
import Heading from "../nav";
import { Text, Image, Button, View } from "dripsy";
import { Link } from "expo-next-react-navigation";

import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

import { useToasts } from "react-toast-notifications";

import { useCart } from "react-use-cart";
import swr, { mutate } from "swr";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { Ionicons, Entypo, AntDesign } from "@expo/vector-icons";

import {
  Textt,
  Comment,
  Vieww,
  CommentContainer,
  ImageUser,
  Input,
  Btn,
} from "../../styles/comments/commentsStyle";
import {
  StyleSheet,
  // Text,
  // View,
  TextInput,
  TouchableOpacity,
  // Image,
  Linking,
  // Button,
  FlatList,
} from "react-native";

import {
  signIn,
  signOut,
  useSession,
  getSession,
  getCsrfToken,
} from "next-auth/client";

// export async function getStaticProps({ params }) {
//   const prisma = new PrismaClient();
//   const post = await prisma.profile.findUnique({
//     where: { id: Number(params.id) },
//     include: {
//       posts: {
//         include: {
//           comments: true,
//         },
//       },
//       products: {
//         include: {
//           comments: true,
//         },
//       },
//     },
//   });
//   return {
//     props: {
//       post,
//     },
//   };
// }

// export async function getStaticPaths() {
//   const prisma = new PrismaClient();
//   const names = await prisma.profile.findMany();

//   return {
//     paths: names.map((name) => ({
//       params: {
//         id: name.id.toString(),
//       },
//     })),
//     fallback: false,
//   };
// }

const Post = ({ content }) => {
  const [name, setName] = React.useState(true);
  const [session] = useSession();

  const router = useRouter();

  const { goBack } = useRouting();
  const { addItem, items, cartTotal } = useCart();

  const notify = () => toast("Make sense !");
  const { addToast } = useToasts();
  const count = () => {
    console.log("ready");
    for (const i in items) {
      console.log(
        `${i}: ${items[i].itemTotal}, ${items[i].id}, ${items[i].profileId} `
      );
    }
  };
  console.log(items);
  console.log(cartTotal);
  console.log(router.query.id);
  const deleteProd = async (id) => {
    axios
      .delete(`/api/product/${id}`)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const updateProduct = (id) => {
    return router.push(`/updateProduct/${id}`);
  };

  const CommentOnPost = (id) => {
    return router.push(`/postComments/${id}`);
  };
  const follow = () => {
    axios
      .put(`/api/follow/${router.query.id}`)
      .then(async (res) => {
        mutate(`/api/profile/${router.query.id}`);
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const unfollow = () => {
    axios
      .put(`/api/unfollow/${router.query.id}`)
      .then(async (res) => {
        mutate(`/api/profile/${router.query.id}`);
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const { data, error } = useSWR(`/api/profile/${router.query.id}`, axios, {
    revalidateOnFocus: false,
    // initialData: post,
  });

  if (!data) return "loading";
  if (error) return "error dey";
  console.log("data.data");

  console.log(data.data);
  console.log("data.data");
  const newfin = data.data.followedBy.filter((item) => {
    return item.accountId === session.token.id;
  });
  console.log(session);

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
            source={{ uri: data.data.image }}
            // style={styles.image2}
          />

          <Textt
            fontSize={[15, 20, 25, 30]}
            color="red"
            textAlign="center"

            // style={styles.text}
          >
            {data.data.username}
          </Textt>
          <View
            sx={{
              flexDirection: "row",
              alignItems: "center",
              width: "100",
            }}
          >
            <Textt m={10}>
              {" "}
              {data.data.followedBy.length }{" "}
              Followers
            </Textt>
            <Textt m={10}>
              {data.data.following.length }{" "}
              Following
            </Textt>
            <Textt m={10}>50 Posts</Textt>
            <Textt m={10}>30 Products</Textt>
          </View>
          <Textt
            fontSize={[15, 20, 25, 30]}
            color="black"
            textAlign="center"

            // style={styles.text}
          >
            {data.data.bio}
          </Textt>

          <View
            sx={{
              alignItems: "center",
            }}
          >
            {newfin.length > 0 ? (
              <TouchableOpacity onPress={unfollow}>
                <Textt
                  fontSize={[15, 20, 25, 30]}
                  color="white"
                  textAlign="center"
                  background="blue"
                  p={10}
                  mt={3}

                  // style={styles.text}
                >
                  Following
                </Textt>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={follow}>
                <Textt
                  fontSize={[15, 20, 25, 30]}
                  color="white"
                  textAlign="center"
                  background="blue"
                  p={10}
                  mt={3}

                  // style={styles.text}
                >
                  Follow
                </Textt>
              </TouchableOpacity>
            )}
          </View>
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
                  flexDirection: "row",
                  flexWrap: "wrap",
                  marginTop: 30,
                  // marginLeft: 50,
                  justifyContent: ["center", null, "center"],

                  width: "100%",
                  backgroundColor: "#f8f8f8",
                  borderRadius: 5,

                  alignItems: "center",
                  marginBottom: 150,
                }}
              >
                {data.data.posts.map((post) => (
                  <View key={post.id}>
                    <Link
                      routeName="post"
                      params={{ id: `${post.id}` }}
                      web={{ as: `/postpage/${post.id}` }}
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
                            source={{ uri: post.image }}
                          />
                        </View>
                      </View>
                    </Link>
                  </View>
                ))}
              </View>
            </TabPanel>
            <TabPanel>
              <View
                sx={{
                  flex: 1,
                  flexDirection: "row",
                  flexWrap: "wrap",
                  marginTop: 30,
                  // marginLeft: 50,
                  justifyContent: ["center", null, "center"],

                  width: "100%",
                  backgroundColor: "#f8f8f8",
                  borderRadius: 5,

                  alignItems: "center",
                  marginBottom: 150,
                }}
              >
                {data.data.products.map((post) => (
                  <View key={post.id}>
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
                      <View>
                        <Link
                          routeName="product"
                          params={{ id: `${post.id}` }}
                          web={{ as: `/productpage/${post.id}` }}
                        >
                          <Image
                            sx={{
                              height: [90, 200, 300],
                              width: [90, 200, 300],
                              resizeMode: "contain",
                              borderRadius: 600,
                            }}
                            source={{ uri: post.image }}
                          />
                        </Link>
                        <Button
                          sx={{ padding: 10 }}
                          title="👈Add To cart !"
                          onPress={() => addItem(post, 1)}
                        ></Button>
                      </View>
                    </View>
                  </View>
                ))}
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
            <Button onPress={notify} title="👈 Notify !"></Button>
            <ToastContainer autoClose={5000}></ToastContainer>

            <Button
              onPress={() =>
                addToast(content, {
                  content: "Something went wrong",
                  appearance: "info",
                  autoDismiss: true,
                })
              }
              title="👈Add Toast !"
            ></Button>
          </View>
        </View>
      </View>
    </Heading>
  );
};

export default Post;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  form: {
    padding: 10,
    borderColor: "blue",
    borderWidth: 3,
    borderRadius: 7,
  },

  text: {
    color: "red",
    textAlign: "center",
  },

  smalltext: {
    color: "black",
    textAlign: "center",
  },
  thumnail: {
    height: 200,
    width: 200,
    resizeMode: "contain",
    borderRadius: 600,
  },
  list: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 30,
    justifyContent: "center",
    width: "90%",
    backgroundColor: "#f8f8f8",
    borderRadius: 5,
    alignItems: "center",
  },
  ind: {
    // justifyContent: "space-between",
    margin: 30,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#888888",
  },
  obj: {
    // flex: 1,
    // flexDirection: "row",
    margin: 30,
    // flexWrap: "wrap",
  },
  but: {
    width: 50,
    height: 50,
    borderRadius: 5,
  },
  image2: {
    width: 142,
    height: 134,
    borderWidth: 1,
    borderColor: "#000000",
    borderRadius: 100,
    marginTop: -528,
    marginLeft: 9,
  },
  iconRow: {
    height: 47,
    flex: 1,
    flexDirection: "row",

    alignItems: "center",
  },
  loremIpsum: {
    fontFamily: "roboto-700",
    color: "#121212",
    lineHeight: 30,
    fontSize: 25,
    marginTop: 18,
    marginLeft: 14,
  },
  loremIpsum3: {
    fontFamily: "roboto-regular",
    color: "#121212",
    fontSize: 20,
    marginTop: 18,
    marginLeft: 14,
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
