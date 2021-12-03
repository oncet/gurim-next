import { forwardRef, useState } from "react";
import NextLink from "next/link";
import { chakra, Box, Link, ListItem, UnorderedList } from "@chakra-ui/react";
import { AnimatePresence, motion } from "framer-motion";

const AnimatedBox = motion(Box);

const ChakraA = forwardRef(({ children, ...props }, ref) => (
  <chakra.a cursor="pointer" display="inline-block" py="2" {...props} ref={ref}>
    {children}
  </chakra.a>
));
ChakraA.displayName = "ChakraA";

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmenuClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <chakra.nav>
      <UnorderedList styleType="none" ml="0" textAlign="right">
        <ListItem>
          <Link as={NextLink} passHref href="https://shop.gurim.com.ar/">
            <ChakraA>Tienda</ChakraA>
          </Link>
        </ListItem>
        <ListItem>
          <ChakraA onClick={handleSubmenuClick}>Catálogo</ChakraA>
          <AnimatePresence>
            {isOpen && (
              <AnimatedBox
                initial={{ height: 0 }}
                animate={{ height: "auto" }}
                transition={{
                  duration: 0.3,
                  ease: "easeOut",
                }}
                exit={{ height: 0 }}
                overflow="hidden"
              >
                <UnorderedList
                  backgroundColor="black"
                  color="white"
                  maxWidth="160px"
                  ml="auto"
                  py="2"
                >
                  <ListItem>
                    <Link as={NextLink} passHref href="/category/cuadernos">
                      <ChakraA py="1" px="6">
                        Cuadernos
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
                    <Link as={NextLink} passHref href="/category/accesorios">
                      <ChakraA py="1" px="6">
                        Accesorios
                      </ChakraA>
                    </Link>
                  </ListItem>
                  <ListItem>
                    <Link as={NextLink} passHref href="/category/delantales">
                      <ChakraA py="1" px="6">
                        Delantales
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
