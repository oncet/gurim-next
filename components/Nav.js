import { useState } from "react";
import NextLink from "next/link";
import {
  chakra,
  Button,
  Link,
  ListItem,
  UnorderedList,
} from "@chakra-ui/react";
0;
import { AnimatePresence, motion } from "framer-motion";

const AnimatedUnorderedList = motion(UnorderedList);

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
          <Link as={NextLink} href="https://shop.gurim.com.ar/">
            <ChakraA onClick={handleClick}>Tienda</ChakraA>
          </Link>
        </ListItem>
        <ListItem>
          <ChakraA onClick={handleSubmenuClick}>Catálogo</ChakraA>
          <AnimatePresence>
            {isOpen && (
              <AnimatedUnorderedList
                initial={{ height: 0 }}
                animate={{ height: "auto" }}
                transition={{
                  duration: 0.3,
                  ease: "easeOut",
                }}
                exit={{ height: 0 }}
                backgroundColor="black"
                color="white"
                maxWidth="160px"
                ml="auto"
                overflow="hidden"
              >
                <ListItem>
                  <Link as={NextLink} href="/category/cuadernos">
                    <ChakraA px="4" onClick={handleClick}>
                      Cuadernos
                    </ChakraA>
                  </Link>
                </ListItem>
                <ListItem>
                  <Link as={NextLink} href="/category/bolsos">
                    <ChakraA px="4" onClick={handleClick}>
                      Bolsos
                    </ChakraA>
                  </Link>
                </ListItem>
                <ListItem>
                  <Link as={NextLink} href="/category/accesorios">
                    <ChakraA px="4" onClick={handleClick}>
                      Accesorios
                    </ChakraA>
                  </Link>
                </ListItem>
                <ListItem>
                  <Link as={NextLink} href="/category/delantales">
                    <ChakraA px="4" onClick={handleClick}>
                      Delantales
                    </ChakraA>
                  </Link>
                </ListItem>
              </AnimatedUnorderedList>
            )}
          </AnimatePresence>
        </ListItem>
        <ListItem>
          <Link as={NextLink} href="/nosotros">
            <ChakraA onClick={handleClick}>Gurim</ChakraA>
          </Link>
        </ListItem>
        <ListItem>
          <Link as={NextLink} href="/contacto">
            <ChakraA onClick={handleClick}>Contacto</ChakraA>
          </Link>
        </ListItem>
      </UnorderedList>
    </chakra.nav>
  );
};

export default Nav;
