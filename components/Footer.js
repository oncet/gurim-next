import { forwardRef } from "react";
import NextLink from "next/link";
import { chakra, UnorderedList, ListItem, Link } from "@chakra-ui/react";

const ChakraA = forwardRef(({ children, ...props }, ref) => (
  <chakra.a cursor="pointer" display="inline-block" py="2" {...props} ref={ref}>
    {children}
  </chakra.a>
));
ChakraA.displayName = "ChakraA";

const Footer = () => {
  return (
    <chakra.footer borderTop="1px solid" borderColor="gray.200" pt="6" pb="12">
      <nav>
        <UnorderedList
          styleType="none"
          ml="0"
          textAlign="right"
          display="flex"
          flexDirection={["column", "row"]}
          gridGap={[0, 6]}
          justifyContent="flex-end"
        >
          <ListItem>
            <Link as={NextLink} passHref href="https://shop.gurim.com.ar/">
              <ChakraA>Tienda</ChakraA>
            </Link>
          </ListItem>
          <ListItem>
            <Link as={NextLink} passHref href="/contacto">
              <ChakraA>Contacto</ChakraA>
            </Link>
          </ListItem>
          <ListItem>
            <Link
              as={NextLink}
              passHref
              href="https://www.instagram.com/gurim_craft/"
            >
              <ChakraA>Instagram</ChakraA>
            </Link>
          </ListItem>
          <ListItem>
            <Link
              as={NextLink}
              passHref
              href="https://www.facebook.com/gurimcraft/"
            >
              <ChakraA>Facebook</ChakraA>
            </Link>
          </ListItem>
        </UnorderedList>
      </nav>
    </chakra.footer>
  );
};

export default Footer;
