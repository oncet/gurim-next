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

const Nav = ({ handleClick }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmenuClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <chakra.nav>
      <UnorderedList styleType="none" ml="0" textAlign="right">
        <ListItem py="2">
          <Link as={NextLink} href="https://shop.gurim.com.ar/">
            <a onClick={handleClick}>Tienda</a>
          </Link>
        </ListItem>
        <ListItem py="2">
          <a onClick={handleSubmenuClick}>Catálogo</a>
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
                mt="2"
                overflow="hidden"
              >
                <ListItem py="2" px="4">
                  <Link as={NextLink} href="/category/cuadernos">
                    <a onClick={handleClick}>Cuadernos</a>
                  </Link>
                </ListItem>
                <ListItem py="2" px="4">
                  <Link as={NextLink} href="/category/bolsos">
                    <a onClick={handleClick}>Bolsos</a>
                  </Link>
                </ListItem>
                <ListItem py="2" px="4">
                  <Link as={NextLink} href="/category/accesorios">
                    <a onClick={handleClick}>Accesorios</a>
                  </Link>
                </ListItem>
                <ListItem py="2" px="4">
                  <Link as={NextLink} href="/category/delantales">
                    <a onClick={handleClick}>Delantales</a>
                  </Link>
                </ListItem>
              </AnimatedUnorderedList>
            )}
          </AnimatePresence>
        </ListItem>
        <ListItem py="2">
          <Link as={NextLink} href="/nosotros">
            <a onClick={handleClick}>Gurim</a>
          </Link>
        </ListItem>
        <ListItem py="2">
          <Link as={NextLink} href="/contacto">
            <a onClick={handleClick}>Contacto</a>
          </Link>
        </ListItem>
      </UnorderedList>
    </chakra.nav>
  );
};

export default Nav;
