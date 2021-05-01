import styled from "styled-components";
import {
  space,
  width,
  fontSize,
  color,
  alignItems,
  textAlign,
  margin,
} from "styled-system";
import { View } from "dripsy";

// Add styled-system functions to your component
const Vieww = styled.div`
  ${color}
  ${space}
  ${width}
  ${fontSize}
  ${textAlign}
  ${margin}
`;

const Textt = styled.div`
  ${color}
  ${space}
  ${width}
  ${fontSize}
  ${alignItems}
  ${textAlign}
`;

const Syst = () => {
  return (
    <Vieww>
      <Vieww
        color={["red", "blue", "yellow", "black"]}
        fontSize={[10, 15, 20, 25]}
        textAlign={["center", "left", "right", "center"]}
        margin={[10, 15, 20, 25]}
      >
        Red
      </Vieww>
      <Textt textAlign={["center", "left"]}>Black</Textt>
    </Vieww>
  );
};

export default Syst;
