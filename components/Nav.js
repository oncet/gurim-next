import { useEffect, forwardRef, useState, useRef } from "react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import {
  chakra,
  Box,
  Link,
  ListItem,
  UnorderedList,
  useOutsideClick,
  useBreakpointValue,
} from "@chakra-ui/react";
import { AnimatePresence, motion } from "framer-motion";

const AnimatedBox = motion(Box);

const WrappedLink = forwardRef(({ children, ...props }, ref) => (
  <Link display="inline-block" py="2" {...props} ref={ref}>
    {children}
  </Link>
));
WrappedLink.displayName = "WrappedLink";

const Nav = () => {
  const shopRef = useRef();
  const blogRef = useRef();
  const [isShopOpen, setIsShopOpen] = useState(false);
  const [isBlogOpen, setIsBlogOpen] = useState(false);
  const router = useRouter();

  const duration = useBreakpointValue([0.3, 0.2]);
  const height = useBreakpointValue([0, "auto"]);

  useEffect(() => {
    setIsShopOpen(false);
    setIsBlogOpen(false);
  }, [router.asPath]);

  useOutsideClick({
    ref: shopRef,
    handler: () => setIsShopOpen(false),
  });

  useOutsideClick({
    ref: blogRef,
    handler: () => setIsBlogOpen(false),
  });

  const handleShopClick = () => {
    setIsShopOpen(!isShopOpen);
  };

  const handleBlogClick = () => {
    setIsBlogOpen(!isBlogOpen);
  };

  return (
    <chakra.nav>
      <UnorderedList
        styleType="none"
        textAlign="right"
        display="flex"
        flexDirection={["column", "row"]}
        gridGap={[0, 6]}
        justifyContent="flex-end"
        ml="0"
      >
        <ListItem ref={shopRef}>
          <WrappedLink onClick={handleShopClick} href="#">
            Tienda
          </WrappedLink>
          <AnimatePresence>
            {isShopOpen && (
              <AnimatedBox
                initial={{ height, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                transition={{
                  duration,
                  ease: "easeOut",
                }}
                exit={{ height, opacity: 0 }}
                overflow="hidden"
                position={["relative", "absolute"]}
                zIndex="1"
                boxShadow={[null, "md"]}
                borderRight={["1px solid", null]}
                borderColor="gray.200"
                rounded={[null, "md"]}
              >
                <UnorderedList
                  backgroundColor="yellow.50"
                  listStyleType="none"
                  width="160px"
                  py="2"
                  ml={["auto", 0]}
                  textAlign={["right", "left"]}
                >
                  <ListItem>
                    <NextLink passHref href="https://shop.gurim.com.ar/">
                      <Link px="6" py="1" display="inline-block">
                        Argentina
                      </Link>
                    </NextLink>
                  </ListItem>
                  <ListItem>
                    <NextLink passHref href="/shop">
                      <Link px="6" py="1" display="inline-block">
                        Global
                      </Link>
                    </NextLink>
                  </ListItem>
                </UnorderedList>
              </AnimatedBox>
            )}
          </AnimatePresence>
        </ListItem>
        <ListItem ref={blogRef}>
          <WrappedLink onClick={handleBlogClick} href="#">
            Blog
          </WrappedLink>
          <AnimatePresence>
            {isBlogOpen && (
              <AnimatedBox
                initial={{ height, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                transition={{
                  duration,
                  ease: "easeOut",
                }}
                exit={{ height, opacity: 0 }}
                overflow="hidden"
                position={["relative", "absolute"]}
                zIndex="1"
                boxShadow={[null, "md"]}
                borderRight={["1px solid", null]}
                borderColor="gray.200"
                rounded={[null, "md"]}
              >
                <UnorderedList
                  backgroundColor="yellow.50"
                  listStyleType="none"
                  width="160px"
                  py="2"
                  ml={["auto", 0]}
                  textAlign={["right", "left"]}
                >
                  <ListItem>
                    <NextLink passHref href="/category/bordado">
                      <Link px="6" py="1" display="inline-block">
                        Bordado
                      </Link>
                    </NextLink>
                  </ListItem>
                  <ListItem>
                    <NextLink passHref href="/category/fieltro">
                      <Link px="6" py="1" display="inline-block">
                        Fieltro
                      </Link>
                    </NextLink>
                  </ListItem>
                  <ListItem>
                    <NextLink passHref href="/category/bolsos">
                      <Link px="6" py="1" display="inline-block">
                        Bolsos
                      </Link>
                    </NextLink>
                  </ListItem>
                  <ListItem>
                    <NextLink passHref href="/category/ecoprint">
                      <Link px="6" py="1" display="inline-block">
                        Ecoprint
                      </Link>
                    </NextLink>
                  </ListItem>
                  <ListItem>
                    <NextLink passHref href="/category/encuadernacion">
                      <Link px="6" py="1" display="inline-block">
                        Encuadernación
                      </Link>
                    </NextLink>
                  </ListItem>
                  <ListItem>
                    <NextLink passHref href="/blog">
                      <Link px="6" py="1" display="inline-block">
                        Ver todo
                      </Link>
                    </NextLink>
                  </ListItem>
                </UnorderedList>
              </AnimatedBox>
            )}
          </AnimatePresence>
        </ListItem>
        <ListItem>
          <NextLink passHref href="/nosotros">
            <WrappedLink>Gurim</WrappedLink>
          </NextLink>
        </ListItem>
        <ListItem>
          <NextLink passHref href="/contacto">
            <WrappedLink>Contacto</WrappedLink>
          </NextLink>
        </ListItem>
      </UnorderedList>
    </chakra.nav>
  );
};

export default Nav;
