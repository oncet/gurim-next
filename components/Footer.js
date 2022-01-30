import { forwardRef } from "react";
import NextLink from "next/link";
import {
  chakra,
  Container,
  UnorderedList,
  ListItem,
  Link,
} from "@chakra-ui/react";

const WrappedLink = forwardRef(({ children, ...props }, ref) => (
  <Link display="inline-block" py="2" {...props} ref={ref}>
    {children}
  </Link>
));
WrappedLink.displayName = "WrappedLink";

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
            ml="0"
          >
            <ListItem>
              <NextLink passHref href="https://shop.gurim.com.ar/">
                <WrappedLink>
                  Tienda
                </WrappedLink>
              </NextLink>
            </ListItem>
            <ListItem>
              <NextLink passHref href="/contacto">
                <WrappedLink>
                  Contacto
                </WrappedLink>
              </NextLink>
            </ListItem>
            <ListItem>
              <NextLink
                passHref
                href="https://www.instagram.com/gurim_craft/"
              >
                <WrappedLink>
                  Instagram
                </WrappedLink>
              </NextLink>
            </ListItem>
            <ListItem>
              <NextLink
                passHref
                href="https://www.facebook.com/gurimcraft/"
              >
                <WrappedLink>
                  Facebook
                </WrappedLink>
              </NextLink>
            </ListItem>
          </UnorderedList>
        </nav>
      </Container>
    </chakra.footer>
  );
};

export default Footer;
