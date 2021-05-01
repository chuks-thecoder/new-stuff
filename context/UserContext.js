import React, {createContext, useState} from 'react';


export const UserContext = createContext();

const UserContextProvider = (props) => {
    const [users, SetUsers] = useState([   ]);

    addUser = async (email, password) => {
    axios.post('http://127.0.0.1:8000/users/', { email,password}
        .then(response => {
          console.log(response)
        })
        .catch(error => {
          console.log(error)
        }))
    }

    getUsers = async () => {
         axios.get(`http://127.0.0.1:8000/users/?limit=100`).then(response => {
            const users = response.data
            console.log(users)
          })
          .catch(error => {
            console.log(error)
          })
      }

    return(
        <UserContext.Provider value={{users}}>
            {props.children}
        </UserContext.Provider>
    );
}

export default UserContextProvider;

