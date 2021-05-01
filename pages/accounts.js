import React from "react";
import Heading from "./nav";
import { Text, View, Image } from "dripsy";

import {
  StyleSheet,
  // Text,
  // View,
  TextInput,
  TouchableOpacity,
  // Image,
  Linking,
  Button,
  FlatList,
} from "react-native";
import axios from "axios";
import useSWR from "swr";

import { Link, useRouting } from "expo-next-react-navigation";

const Profile = () => {
  const { data, error } = useSWR("/api/allprofiles", axios);
  const { goBack } = useRouting();

  if (error) return <div>error</div>;
  console.log(error);
  if (!data) return <div>loading...</div>;

  return (
    <Heading>
      <View style={styles.container}>
        {/* <Image
        style={styles.thumnail}
        source={{ uri: data.data.profile.image }}
      />
      <Text> {data.data.profile.username} </Text>
      <Text> {data.data.profile.bio} </Text> */}

        {data.data.names.map((names) => (
          <View style={styles.ind} key={names.id}>
            <Link
              routeName="account"
              params={{ id: `${names.id}` }}
              web={{ as: `/account/${names.id}` }}
            >
              <View style={styles.obj}>
                <Image
                  sx={{
                    width: [200],
                    height: [200],
                    backgroundColor: "#888888",
                    border: [33, 34, 35],
                    borderRadius: 600,
                    borderColor: "#000",
                  }}
                  // style={styles.thumnail}
                  source={{ uri: names.image }}
                />
                <Text style={styles.text}>{names.username}</Text>
              </View>
            </Link>
          </View>
        ))}
        <Button title="👈 Go back" onPress={() => goBack()} />

        {/* 

      <Link style={{ color: "green", fontSize: 20 }} routeName="createprofile">
        Click me to open profile :)
      </Link> */}
      </View>
    </Heading>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "top",
    alignItems: "left",
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
    height: 200,
    width: 200,
    // resizeMode: "contain",
    // borderRadius: 600,
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
});
