import React, { createContext, useState } from "react";

export const ProductContext = createContext();

const UserContextProvider = (props) => {
  const [name, setName] = React.useState("");
  const [discription, setDiscription] = React.useState("");
  const [discount_price, setDiscount_price] = React.useState(0);
  const [price, setPrice] = React.useState(0);
  const [Image, setImage] = React.useState("");
  const [users, SetUsers] = useState([]);

  getProducts = async () => {
    const { data, error } = useSWR("/api/productFeed", axios);
    const users = data;
  };

  return (
    <UserContext.Provider value={{ users }}>
      {props.children}
    </UserContext.Provider>
  );
};
