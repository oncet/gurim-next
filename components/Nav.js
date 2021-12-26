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

const ChakraA = forwardRef(({ children, ...props }, ref) => (
  <chakra.a cursor="pointer" display="inline-block" py="2" {...props} ref={ref}>
    {children}
  </chakra.a>
));
ChakraA.displayName = "ChakraA";

const Nav = () => {
  const ref = useRef();
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const duration = useBreakpointValue([0.3, 0.2]);
  const height = useBreakpointValue([0, "auto"]);

  useEffect(() => {
    setIsOpen(false);
  }, [router.asPath]);

  useOutsideClick({
    ref,
    handler: () => setIsOpen(false),
  });

  const handleSubmenuClick = () => {
    setIsOpen(!isOpen);
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
        <ListItem>
          <Link as={NextLink} passHref href="https://shop.gurim.com.ar/">
            <ChakraA>Tienda</ChakraA>
          </Link>
        </ListItem>
        <ListItem ref={ref}>
          <ChakraA onClick={handleSubmenuClick}>Blog</ChakraA>
          <AnimatePresence>
            {isOpen && (
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
                    <Link as={NextLink} passHref href="/category/bordado">
                      <ChakraA py="1" px="6">
                        Bordado
                      </ChakraA>
                    </Link>
                  </ListItem>
                  <ListItem>
                    <Link as={NextLink} passHref href="/category/fieltro">
                      <ChakraA py="1" px="6">
                        Fieltro
                      </ChakraA>
                    </Link>
                  </ListItem>
                  <ListItem>
                    <Link as={NextLink} passHref href="/category/bolsos">
                      <ChakraA py="1" px="6">
                        Bolsos
                      </ChakraA>
                    </Link>
                  </ListItem>
                  <ListItem>
                    <Link as={NextLink} passHref href="/category/ecoprint">
                      <ChakraA py="1" px="6">
                        Ecoprint
                      </ChakraA>
                    </Link>
                  </ListItem>
                  <ListItem>
                    <Link
                      as={NextLink}
                      passHref
                      href="/category/encuadernacion"
                    >
                      <ChakraA py="1" px="6">
                        Encuadernación
                      </ChakraA>
                    </Link>
                  </ListItem>
                </UnorderedList>
              </AnimatedBox>
            )}
          </AnimatePresence>
        </ListItem>
        <ListItem>
          <Link as={NextLink} passHref href="/nosotros">
            <ChakraA>Gurim</ChakraA>
          </Link>
        </ListItem>
        <ListItem>
          <Link as={NextLink} passHref href="/contacto">
            <ChakraA>Contacto</ChakraA>
          </Link>
        </ListItem>
      </UnorderedList>
    </chakra.nav>
  );
};

export default Nav;
