import {
  Textt,
  Comment,
  Vieww,
  CommentContainer,
  ImageUser,
  Input,
  Btn,
} from "../../styles/comments/commentsStyle";
import Modal from "modal-enhanced-react-native-web";

import axios from "axios";
import useSWR from "swr";
import Heading from "../nav";
import { useRouter } from "next/router";
import { Ionicons, Entypo, AntDesign } from "@expo/vector-icons";
import { useRouting } from "expo-next-react-navigation";

import { Text, Image, Button, View } from "dripsy";
import { TouchableOpacity } from "react-native";

const Post = () => {
  const router = useRouter();

  const [visibleModal, setvisibleModal] = React.useState(null);

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
        Edit
      </Text>
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
        Delete
      </Text>
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
  const { data, error } = useSWR(`/api/post/${router.query.id}`, axios, {
    revalidateOnFocus: false,
    // initialData: post,
  });
  const CommentOnPost = (id) => {
    return router.push(`/postComments/${id}`);
  };

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

  if (!data) return "loading";
  if (error) return "error dey";
  console.log(data);

  const newfin = data.data.likes.filter((item) => {
    return item.profile.accountId === session.token.id;
  });
  return (
    <Heading>
      <Vieww p={10} width={[250, 500, 500]} height={[400, 500, 500]}>
        <View
          sx={{
            flexDirection: "row",

            justifyContent: "space-between",
            marginLeft: [-18, null, 18],
            marginBottom: -15,
          }}
        >
          <View>
            <Textt>username</Textt>
          </View>
          <View>
            <View>
              {renderButton(
                <Ionicons
                  name="add-circle-outline"
                  size={24}
                  color="#000"
                  style={{ padding: 10 }}
                />,
                () => setvisibleModal(true)
              )}
              <Modal
                isVisible={visibleModal}
                onBackdropPress={() => setvisibleModal(false)}
              >
                {renderModalContent()}
              </Modal>
            </View>
          </View>
        </View>
        <View
          sx={{
            alignItems: ["center", "center", "left"],
            marginTop: -15,
            marginBottom: -15,
          }}
        >
          <View>
            <Image
              sx={{
                height: [400, 500, 500],
                width: [400, 500, 500],
                backgroundColor: "#f8f8f8",
                borderRadius: 5,
                resizeMode: "contain",
              }}
              source={{ uri: data.data.image }}
            ></Image>
          </View>
        </View>
        <View
          sx={{
            flexDirection: "row",

            marginLeft: [-18, null, 18],
          }}
        >
          {newfin.length > 0 ? (
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
          <TouchableOpacity onPress={() => CommentOnPost(item.id)}>
            <Ionicons
              name="md-chatbox-outline"
              size={24}
              color="black"
              style={{ padding: 10 }}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons
              name="logo-whatsapp"
              size={24}
              color="black"
              style={{ padding: 10 }}
            />
          </TouchableOpacity>
        </View>
        <View sx={{ marginLeft: [-18, null, 18] }}>
          <TouchableOpacity onPress={() => CommentOnPost(data.data.id)}>
            <Textt>{data.data.comments.length} comments</Textt>
          </TouchableOpacity>
          <Textt>{data.data.body}</Textt>
        </View>
      </Vieww>
    </Heading>
  );
};

export default Post;
