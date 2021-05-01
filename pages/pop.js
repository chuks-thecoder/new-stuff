import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from "react-native-popup-menu";
import { Text, Image, Button, View } from "dripsy";
import { Popable, Popover } from "react-native-popable";

export const Pop = () => (
  <View>
    <Text>Hello world!</Text>
    <Menu>
      <MenuTrigger text="Select action" />
      <MenuOptions>
        <MenuOption onSelect={() => alert(`Save`)} text="Save" />
        <MenuOption onSelect={() => alert(`Delete`)}>
          <Text style={{ color: "red" }}>Delete</Text>
        </MenuOption>
        <MenuOption
          onSelect={() => alert(`Not called`)}
          disabled={true}
          text="Disabled"
        />
      </MenuOptions>
    </Menu>
    <Popable
      content={
        <View
          style={{
            padding: 10,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "white",
          }}
        >
          <Text>Anything :)</Text>
        </View>
      }
    >
      <Text>@morning_cafe</Text>
    </Popable>
    <Popable action="hover" content="See profile">
      <Text>@morning_cafe</Text>
    </Popable>
    <Popover>@morning_cafe</Popover>
  </View>
);

export default Pop;
