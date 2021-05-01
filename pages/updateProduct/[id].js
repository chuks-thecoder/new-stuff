import React from "react";
import { Link, useRouting } from "expo-next-react-navigation";
import axios from "axios";

import { PrismaClient } from "@prisma/client";
import { useRouter } from "next/router";

import useSWR from "swr";
import Heading from "../nav";
import swr, { mutate } from "swr";

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

export async function getStaticProps({ params }) {
  const prisma = new PrismaClient();
  const post = await prisma.product.findUnique({
    where: { id: Number(params.id) },
  });
  return {
    props: {
      post,
    },
  };
}

export async function getStaticPaths() {
  const prisma = new PrismaClient();
  const names = await prisma.product.findMany();

  return {
    paths: names.map((name) => ({
      params: {
        id: name.id.toString(),
      },
    })),
    fallback: false,
  };
}

const UpgradeProduct = ({ post }) => {
  const router = useRouter();

  // const { goBack } = useRouting();

  const [name, setName] = React.useState(post.name);
  const [discription, setDiscription] = React.useState(post.discription);
  const [discount_price, setDiscount_price] = React.useState(
    post.discount_price
  );
  const [price, setPrice] = React.useState(post.price);
  const [Image, setImage] = React.useState(post.image);
  console.log(post);
  const { goBack } = useRouting();
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

  const click = async (id) => {
    axios
      .put(`/api/product/${id}`, {
        name: name,
        image: Image,
        discription: discription,
        discount_price: discount_price,
        price: price,
      })
      .then((response) => {
        console.log(response);
        goBack();
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
        <Button title="Submit" onPress={() => click(post.id)} />
        <Button title="👈 Go back" onPress={() => goBack()} />
      </View>
    </Heading>
  );
};

export default UpgradeProduct;

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
