import { forwardRef } from "react";
import NextLink from "next/link";
import {
  chakra,
  Container,
  UnorderedList,
  ListItem,
  Link,
} from "@chakra-ui/react";

const Footer = () => {
  return (
    <chakra.footer borderTop="1px solid" borderColor="gray.200" pt="6" pb="12">
      <Container maxW="container.lg">
        <nav>
          <UnorderedList
            styleType="none"
            textAlign="right"
            display="flex"
            flexDirection={["column", "row"]}
            gridGap={[0, 6]}
            justifyContent="flex-end"
          >
            <ListItem>
              <NextLink passHref href="https://shop.gurim.com.ar/">
                <Link>
                  Tienda
                </Link>
              </NextLink>
            </ListItem>
            <ListItem>
              <NextLink passHref href="/contacto">
                <Link>
                  Contacto
                </Link>
              </NextLink>
            </ListItem>
            <ListItem>
              <NextLink
                passHref
                href="https://www.instagram.com/gurim_craft/"
              >
                <Link>
                  Instagram
                </Link>
              </NextLink>
            </ListItem>
            <ListItem>
              <NextLink
                passHref
                href="https://www.facebook.com/gurimcraft/"
              >
                <Link>
                  Facebook
                </Link>
              </NextLink>
            </ListItem>
          </UnorderedList>
        </nav>
      </Container>
    </chakra.footer>
  );
};

export default Footer;
