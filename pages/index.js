// @generated: @expo/next-adapter@2.1.53
import React, { useEffect } from "react";
import { Link, useRouting } from "expo-next-react-navigation";
import { Text } from "dripsy";
import Heading from "./nav";
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  Linking,
  Button,
  FlatList,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import useSWR from "swr";
import FormData from "form-data";
import * as uuid from "uuid";
import * as firebase from "firebase";
import {
  signIn,
  signOut,
  useSession,
  getSession,
  getCsrfToken,
} from "next-auth/client";
import initFirebase from "./api/initFirebase";
import { useRouter } from "next/router";

initFirebase();

export default function App() {
  // if (typeof window !== undefined) {
  //   window.addEventListener("scroll", function () {
  //     console.log("scroll!");
  //     console.log(window);
  //   });
  // }
  const [Picker, setPicker] = React.useState(null);
  const [Name, setName] = React.useState("");
  const [session] = useSession();

  const router = useRouter();
  console.log(session);

  // const { data, error } = useSWR("/api/hello", axios);

  const onChooseImagePress = async () => {
    // let result = await ImagePicker.launchCameraAsync();
    let result = await ImagePicker.launchImageLibraryAsync();

    if (!result.cancelled) {
      uploadImage(result.uri, uuid.v4())
        .then((res) => {
          const uri = res.ref.getDownloadURL().then((res) => {
            const url = res;
            setPicker(url);
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

  const Redirect = ({ to }) => {
    useEffect(() => {
      router.push(to);
    }, [to]);
  };

  const click = () => {
    axios
      .post("/api/companies", {
        name: Name,
        image: Picker,
      })
      .then((response) => {
        console.log(response);
        setName("");
        setPicker("");
        alert("done");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const delet = async (id) => {
    await axios
      .delete(`/api/companies`, {
        id: id,
      })
      .then((response) => {
        console.log(response);

        alert("done");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // const login = () => {
  //   signIn();
  //   return Redirect("/createprofile");

  //   // return <Redirect to="/createprofile" />;
  // };

  // const logout = () => {
  //   signOut();
  // };

  const gettoken = () => {
    router.push("/createprofile");
  };

  // if (error) return <div>error</div>;
  // console.log(error);
  // if (!data) return <div>loading...</div>;
  return (
    <Heading>
      <View style={styles.container}>
        <View style={styles.container}>
          <Text
            sx={{
              fontSize: [24, 36, 50], // 14 on mobile, 16 on tablet, 20 on desktop
              color: ["primary", null, "accent"], // `primary` on mobile & tablet, `accent` on desktop
            }}
          >
            Uneevo 👋
          </Text>
          <Text style={styles.text}>The journey don start</Text>
        </View>

        <View style={styles.container}>
          <Image style={styles.thumnail} source={{ uri: Picker }} />
        </View>

        <TouchableOpacity style={styles.container} onPress={onChooseImagePress}>
          <Text style={styles.text}>Pick an Image</Text>
        </TouchableOpacity>
        <View style={styles.container}>
          <TextInput
            onChange={(e) => setName(e.target.value)}
            style={styles.form}
            value={Name}
          />
          <Button title="Name" onPress={click} />
        </View>
        {/* <View style={styles.list}>
        {data.data.names.map((names) => (
          <View style={styles.ind} key={names.id}>
            <View style={styles.obj}>
              <Text style={styles.text}>{names.name}</Text>
              <Image style={styles.thumnail} source={{ uri: names.image }} />
              <Button title="delete" onPress={() => delet(names.id)} />
            </View>
          </View>
        ))}
      </View> */}
        <View>
          {!session ? (
            <View>
              {/* <Button onPress={() => signIn("github")}>GitHub Connect</Button> */}
              <Button onPress={() => signIn()} title="Sign In"></Button>
            </View>
          ) : (
            <>
              {/* <span>{session.user.name}</span>
            {session.user.image && (
              <img
                src={session.user.image}
                style={{ width: "25px", borderRadius: "50%" }}
              />
            )} */}
              <Button onPress={signOut} title="Sign Out"></Button>
              <Link
                style={{ color: "green", fontSize: 20, textAlign: "center" }}
                routeName="createprofile"
              >
                Create Profile
              </Link>
              <Link
                style={{ color: "green", fontSize: 20, textAlign: "center" }}
                routeName="profile"
              >
                My Profile
              </Link>
            </>
          )}
        </View>

        <View>
          <Text
            sx={{
              fontSize: [14, 16, 20], // 14 on mobile, 16 on tablet, 20 on desktop
              color: ["primary", null, "accent"], // `primary` on mobile & tablet, `accent` on desktop
            }}
          >
            Responsive font size?? 🤯
          </Text>
        </View>
      </View>
    </Heading>
  );
}

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

  text: {
    fontSize: 30,
    color: "red",
  },
  thumnail: {
    height: 200,
    width: 200,
    resizeMode: "contain",
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
