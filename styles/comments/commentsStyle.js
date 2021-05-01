import styled from "styled-components";
import { Image } from "react-native";
import {
  space,
  width,
  fontSize,
  color,
  alignItems,
  textAlign,
  margin,
  borderRadius,
  marginBottom,
  marginTop,
  marginLeft,
  marginRight,
  padding,
  background,
  display,
  flexDirection,
  height,
} from "styled-system";

export const Vieww = styled.div`
  ${color}
  ${space}
  ${width}
  ${fontSize}
  ${textAlign}
  ${margin}
  ${flexDirection}
`;

export const Textt = styled.div`
  ${color}
  ${space}
  ${width}
  ${fontSize}
  ${alignItems}
  ${textAlign}
  ${background}
`;

export const Comment = styled.div`
  ${color}
  ${space}
  ${width}
  ${fontSize}
  ${alignItems}
  ${textAlign}
  ${borderRadius}
  ${background}
  ${padding}
  ${display}
  ${space}
`;

export const CommentContainer = styled.div`
  ${width}
  ${fontSize}
  ${alignItems}
  ${textAlign}
  ${borderRadius}
  ${background}
  ${padding}
  ${display}
  ${flexDirection}
`;

export const ImageUser = styled.image`
  ${width}
  ${background}
  ${height}
`;

export const Input = styled.input`
  ${width}
  ${background}
  ${height}
  ${space}
`;

export const Btn = styled.button`
  ${width}
  ${background}
  ${height}
  ${space}
`;
