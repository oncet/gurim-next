import { extendTheme } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";

const colors = {
  yellow: {
    50: "#fffef6",
    100: "#fef7b9",
    200: "#fff189",
    300: "#ffeb5a",
    400: "#ffe635",
    500: "#e6cc26",
    600: "#b39f1d",
    700: "#807113",
    800: "#4d4407",
    900: "#1a1700",
  },
};

const styles = {
  global: (props) => {
    return {
      body: {
        bg: mode("yellow.50", "gray.800")(props),
      },
      ".user-content": {
        ">": {
          "h2, p, ul, blockquote, figure": {
            marginBottom: props.theme.space[4],
          },
        },
        ul: {
          marginInlineStart: props.theme.space[10],
          listStyleType: "square",
        },
        "figure img": {
          borderRadius: props.theme.radii.md,
        },
        figcaption: {
          textAlign: "center",
        },
        ".blocks-gallery-grid": {
          marginInlineStart: 0,
        },
        ".wp-block-image, .wp-block-image figure": {
          marginTop: 0,
          marginBottom: 0,
        },
        ".wp-block-image img": {
          marginBottom: 2,
          borderRadius: props.theme.radii.md,
        },
        [`@media screen and (max-width: ${props.theme.breakpoints.sm})`]: {
          ".blocks-gallery-item": {
            width: "100%",
            marginRight: 0,
          },
        },
        [`@media screen and (max-width: ${props.theme.breakpoints.md})`]: {
          "figure.alignleft": {
            width: "100%",
            marginRight: 0,
          },
          img: {
            width: "100%",
          },
        },
      },
    };
  },
};

const components = {
  Link: {
    baseStyle: {
      textUnderlineOffset: "6px",
      _hover: {
        textDecorationThickness: "2px",
      },
      _focus: {
        textDecoration: "underline",
        textDecorationThickness: "2px",
        boxShadow: "none",
      },
    },
  },
};

export default extendTheme({
  components,
  colors,
  styles,
});
