import { Text, Image, Button, View, TextInput } from "dripsy";
import { PrismaClient } from "@prisma/client";
import React, { useContext } from "react";

import axios from "axios";
import useSWR from "swr";
// import PickerModal from "react-native-picker-modal-view";
import { MaterialIcons } from "@expo/vector-icons";
import SectionedMultiSelect from "react-native-sectioned-multi-select";
import Select from "react-select";
import { useRouting } from "expo-next-react-navigation";
import { useRouter } from "next/router";

// import MultiSelect from "react-native-multiple-select";
export async function getStaticProps() {
  const prisma = new PrismaClient();
  const post = await prisma.profile.findMany({
    where: { username: { contains: "6" } },
    include: {
      posts: true,
      products: true,
    },
  });

  prisma.$disconnect();
  return {
    props: {
      post,
    },
  };
}
const url = "/api/searchPro";
const Search = ({ post }) => {
  const [name, setName] = React.useState([]);
  const [dumba, setDumba] = React.useState(null);
  const [pro, setPro] = React.useState("");
  const fetcher = (url) => axios.get(url).then((res) => res.data);
  const { data, error } = useSWR(url, fetcher);
  const { navigate, push, getParam, goBack } = useRouting();
  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

  const router = useRouter();
  //   if (!post) return <div>loading...</div>;
  console.log(data.names);

  //   console.log(data);
  const list = () => {
    const options = data.names.map((name) => ({
      value: name.id,
      label: name.username,
    }));
    return options;
  };

  //   const options = [
  //     { value: "chocolate", label: "Chocolate" },
  //     { value: "strawberry", label: "Strawberry" },
  //     { value: "vanilla", label: "Vanilla" },
  //   ];

  const icons = {
    search: {
      name: "search", // search input
      size: 24,
    },
    arrowUp: {
      name: "keyboard-arrow-up", // dropdown toggle
      size: 22,
    },
    arrowDown: {
      name: "keyboard-arrow-down", // dropdown toggle
      size: 22,
    },
    selectArrowDown: {
      name: "keyboard-arrow-down", // select
      size: 24,
    },
    close: {
      name: "close", // chip close
      size: 16,
    },
    check: {
      name: "check", // selected item
      size: 26,
    },
    cancel: {
      name: "cancel", // cancel button
      size: 18,
    },
  };

  const items = [
    // this is the parent or 'item'
    {
      name: "Fruits",
      id: 0,
      // these are the children or 'sub items'
      children: [
        {
          name: "Apple",
          id: 10,
        },
        {
          name: "Strawberry",
          id: 17,
        },
        {
          name: "Pineapple",
          id: 13,
        },
        {
          name: "Banana",
          id: 14,
        },
        {
          name: "Watermelon",
          id: 15,
        },
        {
          name: "Kiwi fruit",
          id: 16,
        },
      ],
    },
  ];

  const onSelectedItemsChange = (dumba) => {
    setDumba(dumba);
    console.log(`Option selected:`, dumba.value);
    return router.push(`/account/${dumba.value}`);
  };

  return (
    <View>
      <TextInput
        onChange={(e) => setName(e.target.value)}
        sx={{
          borderRadius: 5,
          padding: 10,
        }}
        value={name}
      ></TextInput>
      <View>
        <SectionedMultiSelect
          items={items}
          IconRenderer={MaterialIcons}
          uniqueKey="id"
          subKey="children"
          selectText="Choose some things..."
          //   single={true}
          showDropDowns={false}
          readOnlyHeadings={false}
          modalAnimationType="fade"
          onSelectedItemsChange={(name) => setName(name)}
          selectedItems={name}
        />
      </View>
      <View>
        <Select
          value={dumba}
          onChange={(dumba) => onSelectedItemsChange(dumba)}
          options={list()}
          isSearchable={true}
        />
      </View>
    </View>
  );
};

export default Search;
