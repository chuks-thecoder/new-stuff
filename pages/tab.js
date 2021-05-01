import "react-native-gesture-handler";
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { Ionicons, Entypo, AntDesign } from "@expo/vector-icons";
import Heading from "./nav";
//

import Feed from "./feed";
import Dashboard from "./dashboard";
import Profile from "./profile";

// import Theme from "../utils/Theme";

const Tab = createMaterialBottomTabNavigator();
const Stack = createStackNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Quiz"
        options={{
          tabBarIcon: (
            <Ionicons
              name="add-circle-outline"
              size={24}
              color="#fff"
              style={{ padding: 10 }}
            />
          ),
        }}
        component={Feed}
      />
      <Tab.Screen
        name="About"
        options={{
          tabBarIcon: (
            <Ionicons
              name="add-circle-outline"
              size={24}
              color="#fff"
              style={{ padding: 10 }}
            />
          ),
        }}
        component={Dashboard}
      />

      <Tab.Screen
        name="Profile"
        options={{
          tabBarIcon: (
            <Ionicons
              name="add-circle-outline"
              size={24}
              color="#fff"
              style={{ padding: 10 }}
            />
          ),
        }}
        component={Profile}
      />
    </Tab.Navigator>
  );
}

export default function MainContainer() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Uneevo" component={TabNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
