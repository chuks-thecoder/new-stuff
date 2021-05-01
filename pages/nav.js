import React from "react";
import { Text, View, Button, ScrollView } from "dripsy";
import { Ionicons, Entypo, AntDesign } from "@expo/vector-icons";
import { Link, useRouting } from "expo-next-react-navigation";
import Modal from "modal-enhanced-react-native-web";
import { useCart } from "react-use-cart";

// import {
//   signIn,
//   signOut,
//   useSession,
//   getSession,
//   getCsrfToken,
// } from "next-auth/client";
import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  Linking,
  FlatList,
} from "react-native";
import { Vieww } from "../styles/comments/commentsStyle";

const Heading = (props) => {
  // const [session] = useSession();
  // const login = () => {
  //   signIn();
  //   return Redirect("/createprofile");

  //   // return <Redirect to="/createprofile" />;
  // };

  // const logout = () => {
  //   signOut();
  // };
  const [visibleModal, setvisibleModal] = React.useState(null);

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
  console.log(items);
  console.log(metadata);

  const reduceQuantity = (item) => {
    updateItemQuantity(item.id, item.quantity - 1);
  };

  const increaseQuantity = (item) => {
    updateItemQuantity(item.id, item.quantity + 1);
  };

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
        paddingTop: 50,
        paddingBottom: 50,
        paddingLeft: 10,
        paddingRight: 10,
        borderRadius: 5,
      }}
    >
      <View sx={{ marginTop: 10 }}>
        <Link routeName="createpost">
          <Text
            sx={{
              backgroundColor: "#f8f8f8",
              borderWidth: 1,
              borderColor: "#000",
              padding: 10,
              borderRadius: 5,
              marginTop: 10,
              margin: 5,
            }}
          >
            Create Post
          </Text>
        </Link>
      </View>
      <View sx={{ marginTop: 10 }}>
        <Link routeName="createproduct">
          <Text
            sx={{
              backgroundColor: "#f8f8f8",
              borderWidth: 1,
              borderColor: "#000",
              padding: 10,
              borderRadius: 5,
              margin: 5,
            }}
          >
            Create product
          </Text>
        </Link>
      </View>
      <View sx={{ marginTop: 10 }}>
        <Link routeName="profile">
          <Text
            sx={{
              backgroundColor: "#f8f8f8",
              borderWidth: 1,
              borderColor: "#000",
              padding: 10,
              borderRadius: 5,
              margin: 5,
            }}
          >
            Profile
          </Text>
        </Link>
      </View>
      <View sx={{ marginTop: 10 }}>
        <Text
          sx={{
            backgroundColor: "#f8f8f8",
            borderWidth: 1,
            borderColor: "#000",
            padding: 10,
            borderRadius: 5,
            margin: 5,
          }}
        >
          Hello!
        </Text>
      </View>
      {renderButton("Close", () => setvisibleModal(false))}
    </View>
  );
  const renderThirdModalContent = () => (
    <View>
      <View style={styles.scrollableModal}>
        <ScrollView
        // ref={(ref) => (scrollViewRef = ref)}
        // onScroll={handleOnScroll}
        // scrollEventThrottle={16}
        >
          <View style={styles.scrollableModalContent1}>
            <Text>Scroll me up</Text>
          </View>
          <View style={styles.scrollableModalContent1}>
            <Text>Scroll me up</Text>
          </View>
        </ScrollView>
      </View>
      {renderButton("Close", () => setvisibleModal(false))}
    </View>
  );

  const renderSecModalContent = () => (
    <ScrollView>
      <View
        sx={{
          alignItems: "stretch",
          backgroundColor: "#fff",
          paddingTop: 50,
          paddingBottom: 50,
          paddingLeft: 10,
          paddingRight: 10,
          borderRadius: 5,
        }}
      >
        {renderButton(
          <Ionicons
            name="cart-outline"
            size={30}
            color="#000"
            style={{ padding: 10 }}
          />,
          () => setvisibleModal(null)
        )}
        <TouchableOpacity onPress={() => emptyCart()}>
          <Text>Empty Cart</Text>
        </TouchableOpacity>
        <View sx={{ marginBottom: 10, marginTop: 10 }}>
          {items.map((item) => (
            <View
              key={item.id}
              sx={{ flexDirection: "row", justifyContent: "space-evenly" }}
            >
              <Text
                sx={{
                  width: [90, 100, 200],
                  height: [90, 100, 200],
                  backgroundColor: "#f8f8f8",
                  borderRadius: 5,
                  borderWidth: 1,
                  borderColor: "#000",
                  borderRadius: 5,
                }}
              >
                Image
              </Text>
              <Text
                sx={{
                  backgroundColor: "#000",
                  borderWidth: 1,
                  borderColor: "#f8f8f8",
                  padding: 10,
                  margin: 5,
                  borderRadius: 50,
                  color: "#fff",
                }}
              >
                {item.cartId}
              </Text>
              <Text
                sx={{
                  backgroundColor: "#f8f8f8",
                  borderWidth: 1,
                  borderColor: "#000",
                  padding: 10,
                  margin: 5,
                  borderRadius: 5,
                }}
              >
                {item.name}
              </Text>
              <Text
                sx={{
                  backgroundColor: "#f8f8f8",
                  borderWidth: 1,
                  borderColor: "#000",
                  padding: 10,
                  margin: 5,
                  borderRadius: 5,
                }}
              >
                {item.price}
              </Text>
              <Text
                sx={{
                  backgroundColor: "#f8f8f8",
                  borderWidth: 1,
                  borderColor: "#000",
                  padding: 10,
                  margin: 5,
                  borderRadius: 5,
                }}
              >
                {item.itemTotal}
              </Text>
            </View>
          ))}
        </View>
        <View
          sx={{
            backgroundColor: "#000",
            justifyContent: "space-evenly",
            padding: 20,
            borderRadius: 300,
            flexDirection: "row",
          }}
        >
          <Text sx={{ color: "#fff", padding: 5 }}>
            Total in Cart: {totalItems}
          </Text>
          <Text sx={{ color: "#fff", padding: 5 }}>
            Total Price: {cartTotal}
          </Text>
          <Text sx={{ color: "#fff", padding: 5 }}>
            Total Items: {totalUniqueItems}
          </Text>
        </View>
      </View>
    </ScrollView>
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
  return (
    <View>
      <View
        sx={{
          flex: 3,
          flexDirection: "row",
          itemAlign: "center",
          width: "100%",
          justifyContent: "space-between",
          backgroundColor: "#15616D",
          padding: 20,
        }}
      >
        <View>
          <Text
            sx={{
              // color: "red",
              // flex: 1,

              color: "#fff",
              // overFlow: "hidden",
            }}
            // style={styles.loremIpsum}
          >
            Lorem Ipsum
          </Text>
        </View>
        <View
          sx={{
            flexDirection: "row",
            // itemAlign: "left",
          }}
        >
          <View>
            <View>
              {renderButton(
                <Ionicons
                  name="cart-outline"
                  size={24}
                  color="#fff"
                  style={{ padding: 10 }}
                />,
                () => setvisibleModal(3)
              )}
              <Modal
                isVisible={visibleModal === 3}
                onSwipe={() => setvisibleModal(null)}
                onBackdropPress={() => setvisibleModal(null)}
                swipeDirection="down"
                // scrollTo={handleScrollTo}
                style={styles.bottomModal}
              >
                <View
                  sx={{
                    backgroundColor: "#fff",
                    alignItems: "stretch",
                    borderRadius: 10,
                    justifyContent: "left",
                  }}
                >
                  <View
                    sx={{
                      flexDirection: "row",
                      justifyContent: "space-around",
                      backgroundColor: "#f8f8f8",
                      padding: 15,
                    }}
                  >
                    {renderButton(
                      <Ionicons
                        name="cart-outline"
                        size={30}
                        color="#000"
                        style={{ padding: 10 }}
                      />,
                      () => setvisibleModal(null)
                    )}
                    <TouchableOpacity onPress={() => emptyCart()}>
                      <Text>Empty Cart</Text>
                    </TouchableOpacity>
                  </View>
                  <ScrollView
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                  >
                    <View
                      sx={{
                        height: 500,
                      }}
                    >
                      {items.map((item) => (
                        <View
                          key={item.id}
                          sx={{
                            flexDirection: "row",
                            justifyContent: "space-around",
                            marginBottom: 10,
                            marginTop: 10,
                          }}
                        >
                          <View sx={{ flexDirection: "row" }}>
                            <View>
                              <View>
                                <TouchableOpacity
                                  onPress={() => removeItem(item.id)}
                                >
                                  <Text> remove </Text>
                                </TouchableOpacity>
                              </View>
                              <Text
                                sx={{
                                  width: [90, 100, 200],
                                  height: [90, 100, 200],
                                  backgroundColor: "#f8f8f8",
                                  borderRadius: 5,
                                  borderWidth: 1,
                                  borderColor: "#000",
                                  borderRadius: 5,
                                  margin: 20,
                                }}
                              >
                                Image
                              </Text>
                            </View>

                            <View sx={{ justifyContent: "center" }}>
                              <View>
                                <Text
                                  sx={{
                                    backgroundColor: "#f8f8f8",
                                    borderWidth: 1,
                                    borderColor: "#000",
                                    padding: 10,
                                    margin: 5,
                                    borderRadius: 5,
                                  }}
                                >
                                  {item.name}
                                </Text>
                              </View>
                              <View>
                                <Text
                                  sx={{
                                    backgroundColor: "#f8f8f8",
                                    borderWidth: 1,
                                    borderColor: "#000",
                                    padding: 10,
                                    margin: 5,
                                    borderRadius: 5,
                                  }}
                                >
                                  {item.price}
                                </Text>
                              </View>
                              <View
                                sx={{
                                  flexDirection: "row",
                                }}
                              >
                                <View
                                  sx={{
                                    justifyContent: "center",
                                    fontSize: 18,
                                  }}
                                >
                                  <TouchableOpacity
                                    onPress={() => increaseQuantity(item)}
                                  >
                                    <Text> + </Text>
                                  </TouchableOpacity>
                                </View>
                                <View>
                                  <Text
                                    sx={{
                                      backgroundColor: "#f8f8f8",
                                      borderWidth: 1,
                                      borderColor: "#000",
                                      padding: 10,
                                      margin: 5,
                                      borderRadius: 5,
                                    }}
                                  >
                                    {item.quantity}
                                  </Text>
                                </View>
                                <View
                                  sx={{
                                    justifyContent: "center",
                                    fontSize: 18,
                                  }}
                                >
                                  <TouchableOpacity
                                    onPress={() => reduceQuantity(item)}
                                  >
                                    <Text> - </Text>
                                  </TouchableOpacity>
                                </View>
                              </View>
                            </View>
                          </View>

                          <View sx={{ justifyContent: "center" }}>
                            <Text
                              sx={{
                                backgroundColor: "#f8f8f8",
                                borderWidth: 1,
                                borderColor: "#000",
                                padding: 10,
                                margin: 5,
                                borderRadius: 5,
                              }}
                            >
                              {item.itemTotal}
                            </Text>
                          </View>
                        </View>
                      ))}
                    </View>
                  </ScrollView>
                  <view
                    sx={{
                      backgroundColor: "#f8f8f8",
                    }}
                  >
                    <View
                      sx={{
                        flexDirection: "row",
                        justifyContent: "space-around",
                        backgroundColor: "#f8f8f8",
                        padding: 15,
                        marginBottom: 20,
                      }}
                    >
                      <View>
                        <Text>SubTotal</Text>
                      </View>
                      <View>
                        <Text
                          sx={{
                            backgroundColor: "#f8f8f7",
                            borderWidth: 1,
                            borderColor: "#000",
                            padding: 10,
                            margin: 5,
                            borderRadius: 5,
                          }}
                        >
                          {cartTotal}
                        </Text>
                      </View>
                    </View>
                    <View
                      sx={{
                        backgroundColor: "#f8f8f8",
                        padding: 15,
                        alignItems: "center",
                      }}
                    >
                      <View
                        sx={{
                          backgroundColor: "#000",
                          padding: 15,
                          borderRadius: 100,
                          marginTop: -50,

                          width: "50%",
                        }}
                      >
                        <TouchableOpacity>
                          <Text sx={{ color: "#fff", textAlign: "center" }}>
                            Check out
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </view>
                </View>
              </Modal>
            </View>
          </View>
          <View>
            <View>
              {renderButton(
                <Ionicons
                  name="add-circle-outline"
                  size={24}
                  color="#fff"
                  style={{ padding: 10 }}
                />,
                () => setvisibleModal(1)
              )}
              <Modal
                isVisible={visibleModal === 1}
                onBackdropPress={() => setvisibleModal(null)}
              >
                {renderModalContent()}
              </Modal>
            </View>
          </View>
          {/* 
          {!session ? (
            <View>
              <Button
                sx={{
                  backgroundColor: "transparent",
                  borderWidth: 1,
                  borderColor: "#fff",
                  borderRadius: 5,
                }}
                title="Auth0 Connect"
                onPress={login}
              />
            </View>
          ) : (
            <>
              <Button
                sx={{
                  backgroundColor: "transparent",
                  borderWidth: 1,
                  borderColor: "#fff",
                  borderRadius: 5,
                }}
                title="Sign Out"
                onPress={logout}
              />
            </>
          )} */}
        </View>
      </View>

      <View>{props.children}</View>

      <View
        sx={{
          flex: 3,
          flexDirection: "row",
          alignItems: "center",
          width: "100%",
          justifyContent: "space-around",
          backgroundColor: "#15616D",
          padding: 20,
        }}
      >
        <View>
          <Link routeName="">
            <Ionicons
              name="cart-outline"
              size={24}
              color="#fff"
              style={{ padding: 10 }}
            />
          </Link>
        </View>

        <View>
          <Link routeName="feed">
            <Ionicons
              name="cart-outline"
              size={24}
              color="#fff"
              style={{ padding: 10 }}
            />
          </Link>
        </View>
        <View>
          <Link routeName="productFeed">
            <Ionicons
              name="cart-outline"
              size={24}
              color="#fff"
              style={{ padding: 10 }}
            />
          </Link>
        </View>
        <View
        // sx={{
        //   flexDirection: "row",
        //   // itemAlign: "left",
        // }}
        >
          <Link routeName="profile">
            <Ionicons
              name="add-circle-outline"
              size={24}
              color="#fff"
              style={{ padding: 10 }}
            />
          </Link>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  form: {
    padding: 10,
    borderColor: "blue",
    borderWidth: 3,
    borderRadius: 7,
  },
  bottomModal: {
    justifyContent: "flex-end",
    margin: 0,
  },
  scrollableModal: {
    height: 300,
  },
  scrollableModalContent1: {
    height: 200,
    backgroundColor: "orange",
    alignItems: "center",
    justifyContent: "center",
  },
  scrollableModalContent2: {
    height: 200,
    backgroundColor: "lightgreen",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    flex: 3,
    fontSize: 30,
    color: "red",
    textAlign: "right",
  },
  text1: {
    flex: 3,
    fontSize: 30,
    color: "red",
    textAlign: "right",
  },
  thumnail: {
    height: 200,
    width: 200,
    resizeMode: "contain",
  },
  list: {
    flexDirection: "row",
    marginLeft: 50,
    // flexWrap: "wrap",
    // justifyContent: "center",
    // // alignSelf: "stretch",
    // alignContent: "space-between",

    // backgroundColor: "#000",
    // alignItems: "stretch",
  },
  ind: {
    // justifyContent: "space-between",
    margin: 30,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#fff",
    alignSelf: "baseline",
  },
  obj: {
    // flex: 1,
    // flexDirection: "row",
    margin: 30,
    // flexWrap: "wrap",
  },
});

export default Heading;
