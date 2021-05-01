import React from "react";
import { Link, useRouting } from "expo-next-react-navigation";
import axios from "axios";
import * as ImagePicker from "expo-image-picker";
import * as uuid from "uuid";
import * as firebase from "firebase";
import initFirebase from "./api/initFirebase";
import Heading from "./nav";

import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  Linking,
  Button,
  FlatList,
} from "react-native";

initFirebase();

const CreateProfile = () => {
  // const { goBack } = useRouting();
  const [name, setName] = React.useState("");
  const [discription, setDiscription] = React.useState("");
  const [discount_price, setDiscount_price] = React.useState(0);
  const [price, setPrice] = React.useState(0);
  const [Image, setImage] = React.useState("");

  const onChooseImagePress = async () => {
    // let result = await ImagePicker.launchCameraAsync();
    let result = await ImagePicker.launchImageLibraryAsync();

    if (!result.cancelled) {
      uploadImage(result.uri, uuid.v4())
        .then((res) => {
          const uri = res.ref.getDownloadURL().then((res) => {
            const url = res;
            setImage(url);
            alert("Image done!");
          });
          // console.log(uri);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const uploadImage = async (uri, imageName) => {
    const response = await fetch(uri);
    console.log(response);
    const blob = await response.blob();
    console.log(blob);

    var ref = firebase.default
      .storage()
      .ref()
      .child("Name/" + imageName);
    const path = ref.put(blob);

    return path;
  };

  const { goBack } = useRouting();
  const click = () => {
    axios
      .post("/api/createmyproduct", {
        name: name,
        image: Image,
        discription: discription,
        discount_price: discount_price,
        price: price,
      })
      .then((response) => {
        console.log(response);
        setName("");
        setDiscription("");
        setPrice("");
        setDiscount_price("");
        setImage("");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Heading>
      <View style={styles.container}>
        <View>
          <Text> Create Product </Text>

          {/* <Button text="👈 Go back" onPress={() => goBack()} />
      <Link style={{ color: "green", fontSize: 20 }} routeName="profile">
        Click me to open profile :)
      </Link> */}
          <TouchableOpacity
            style={styles.container}
            onPress={onChooseImagePress}
          >
            <Text style={styles.text}>Pick an Image</Text>
          </TouchableOpacity>
        </View>
        <View>
          <Text> Product Name </Text>
          <TextInput
            onChange={(e) => setName(e.target.value)}
            style={styles.form}
            value={name}
          />
          {/* <Button text="👈 Go back" onPress={() => goBack()} />
    <Link style={{ color: "green", fontSize: 20 }} routeName="profile">
      Click me to open profile :)
    </Link> */}
        </View>
        <View>
          <Text> discription </Text>
          <TextInput
            onChange={(e) => setDiscription(e.target.value)}
            style={styles.form}
            value={discription}
          />
          {/* <Button text="👈 Go back" onPress={() => goBack()} />
  <Link style={{ color: "green", fontSize: 20 }} routeName="profile">
    Click me to open profile :)
  </Link> */}
        </View>

        <View>
          <Text> discount_price </Text>
          <TextInput
            onChange={(e) => setDiscount_price(e.target.value)}
            style={styles.form}
            value={discount_price}
          />
          {/* <Button text="👈 Go back" onPress={() => goBack()} />
  <Link style={{ color: "green", fontSize: 20 }} routeName="profile">
    Click me to open profile :)
  </Link> */}
        </View>

        <View>
          <Text> price </Text>
          <TextInput
            onChange={(e) => setPrice(e.target.value)}
            style={styles.form}
            value={price}
          />
          {/* <Button text="👈 Go back" onPress={() => goBack()} />
  <Link style={{ color: "green", fontSize: 20 }} routeName="profile">
    Click me to open profile :)
  </Link> */}
        </View>
        <Button title="Submit" onPress={click} />
        <Button title="👈 Go back" onPress={() => goBack()} />
      </View>
    </Heading>
  );
};

export default CreateProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  form: {
    padding: 10,
    borderColor: "blue",
    borderBottomWidth: 3,
    // borderRadius: 7,
    borderTopWidth: 0,
    borderRightWidth: 0,
    borderLeftWidth: 0,
  },

  text: {
    fontSize: 30,
    color: "red",
  },
  thumnail: {
    height: 200,
    width: 200,
    resizeMode: "contain",
  },
});
