import { useState } from "react";
import NextLink from "next/link";
import { chakra, Box, Link, ListItem, UnorderedList } from "@chakra-ui/react";
0;
import { AnimatePresence, motion } from "framer-motion";

const AnimatedBox = motion(Box);

const ChakraA = ({ children, ...props }) => (
  <chakra.a cursor="pointer" display="inline-block" py="2" {...props}>
    {children}
  </chakra.a>
);

const Nav = ({ handleClick }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmenuClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <chakra.nav>
      <UnorderedList styleType="none" ml="0" textAlign="right">
        <ListItem>
          <Link as={NextLink} passHref href="https://shop.gurim.com.ar/">
            <ChakraA onClick={handleClick}>Tienda</ChakraA>
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
                      <ChakraA py="1" px="6" onClick={handleClick}>
                        Cuadernos
                      </ChakraA>
                    </Link>
                  </ListItem>
                  <ListItem>
                    <Link as={NextLink} passHref href="/category/bolsos">
                      <ChakraA py="1" px="6" onClick={handleClick}>
                        Bolsos
                      </ChakraA>
                    </Link>
                  </ListItem>
                  <ListItem>
                    <Link as={NextLink} passHref href="/category/accesorios">
                      <ChakraA py="1" px="6" onClick={handleClick}>
                        Accesorios
                      </ChakraA>
                    </Link>
                  </ListItem>
                  <ListItem>
                    <Link as={NextLink} passHref href="/category/delantales">
                      <ChakraA py="1" px="6" onClick={handleClick}>
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
            <ChakraA onClick={handleClick}>Gurim</ChakraA>
          </Link>
        </ListItem>
        <ListItem>
          <Link as={NextLink} passHref href="/contacto">
            <ChakraA onClick={handleClick}>Contacto</ChakraA>
          </Link>
        </ListItem>
      </UnorderedList>
    </chakra.nav>
  );
};

export default Nav;
