import { Provider } from "next-auth/client";
// import { View, Text, StyleSheet } from "react-native";
import { DripsyProvider } from "dripsy";
// import "raf/polyfill";
import { ToastProvider, useToasts } from "react-toast-notifications";
import NextNprogress from "nextjs-progressbar";
import { CartProvider, useCart } from "react-use-cart";
import { MenuProvider } from "react-native-popup-menu";

const theme = {
  colors: {
    text: "#000",
    background: "#fff",
    primary: "tomato",
  },
  fonts: {
    root: "circular",
  },
  // custom fonts are easy!
  customFonts: {
    circular: {
      default: "Circular-StdBook",
      bold: "Circular-StdBold",
      black: "Circular-StdBlack",
    },
  },
  space: [10, 12, 14],
  text: {
    thick: {
      fontFamily: "root",
      fontWeight: "black", // 'Circular-StdBlack'
    },
  },
};

export default function App({ Component, pageProps }) {
  return (
    <Provider session={pageProps.session}>
    <CartProvider>
      <MenuProvider>
        <NextNprogress color="#29D"></NextNprogress>
        <DripsyProvider theme={theme}>
          <ToastProvider>
            <Component {...pageProps} />
          </ToastProvider>
        </DripsyProvider>
      </MenuProvider>
    </CartProvider>
     </Provider>
  );
}
