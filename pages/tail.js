import { Text, View } from "react-native";
import { t } from "react-native-tailwindcss";
// import styled from 'styled-components/native';

const Tail = () => {
  return (
    <View style={[t.absolute, t.inset0, t.p4, t.bgBlue500]}>
      <Text style={[[t.mB4, t.bgGray200, t.rounded, t.p3]]}>Hey</Text>
    </View>
  );
};

export default Tail;
