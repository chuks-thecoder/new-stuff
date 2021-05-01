import React, { useState } from "react";
import { Link, useRouting } from "expo-next-react-navigation";
import axios from "axios";
import swr, { mutate } from "swr";

import { PrismaClient } from "@prisma/client";
import { useRouter } from "next/router";

import Heading from "../nav";

import { Image, View, TextInput, Button } from "dripsy";
import {
  Textt,
  Comment,
  Vieww,
  CommentContainer,
  ImageUser,
  Input,
  Btn,
} from "../../styles/comments/commentsStyle";
import useSWR from "swr";

const PostComments = () => {
  const router = useRouter();
  const [Body, setBody] = useState("");

  const { data, error } = useSWR(`/api/post/${router.query.id}`, axios, {
    revalidateOnFocus: false,
    // initialData: post,
  });

  if (!data) return "loading";
  if (error) return "error dey";

  console.log(router.query.id);
  console.log(data);
  const click = async (id) => {
    axios
      .post(`/api/post/comments/${id}`, {
        body: Body,
      })
      .then((response) => {
        mutate(`/api/post/${router.query.id}`);
        console.log(response);

        setBody("");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <Vieww p={10}>
      <Vieww>
        <Textt fontSize={[10, 15, 20, 25]} mb={50}>
          {data.data.body}
        </Textt>
      </Vieww>
      {data.data.comments.map((comment) => (
        <View sx={{ flexDirection: "row", margin: 10 }} key={comment.id}>
          <Vieww>
            <Image
              sx={{
                height: 60,
                width: 60,
                resizeMode: "contain",
                borderRadius: 600,
                backgroundColor: "#f8f8f8",
              }}
              source={{ uri: comment.profile.image }}
            />
          </Vieww>
          <Vieww>
            <Comment
              key={comment.id}
              background="#f8f8f8"
              fontSize={[10, 15, 20, 25]}
              borderRadius={5}
              padding={11}
              color="#000"
              mt={10}
              ml={1}
              // display={["block", "block", "none", "block"]}
            >
              {comment.body}
            </Comment>
          </Vieww>
        </View>
      ))}
      <TextInput
        sx={{
          padding: 10,
          borderColor: "blue",
          borderWidth: 3,
          borderRadius: 5,
          marginTop: 10,
          marginBottom: 10,
          width: "50%",
        }}
        onChange={(e) => setBody(e.target.value)}
        value={Body}
      ></TextInput>
      <View sx={{ width: "20%" }}>
        <Button
          sx={{ padding: 10 }}
          title="👈Add Comment !"
          onPress={() => click(data.data.id)}
        ></Button>
      </View>
    </Vieww>
  );
};

export default PostComments;
