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
        <ListItem>
          <Link as={NextLink} href="https://shop.gurim.com.ar/">
            <chakra.a display="inline-block" py="2" onClick={handleClick}>
              Tienda
            </chakra.a>
          </Link>
        </ListItem>
        <ListItem>
          <chakra.a display="inline-block" py="2" onClick={handleSubmenuClick}>
            Catálogo
          </chakra.a>
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
                    <chakra.a
                      display="inline-block"
                      py="2"
                      px="4"
                      onClick={handleClick}
                    >
                      Cuadernos
                    </chakra.a>
                  </Link>
                </ListItem>
                <ListItem>
                  <Link as={NextLink} href="/category/bolsos">
                    <chakra.a
                      display="inline-block"
                      py="2"
                      px="4"
                      onClick={handleClick}
                    >
                      Bolsos
                    </chakra.a>
                  </Link>
                </ListItem>
                <ListItem>
                  <Link as={NextLink} href="/category/accesorios">
                    <chakra.a
                      display="inline-block"
                      py="2"
                      px="4"
                      onClick={handleClick}
                    >
                      Accesorios
                    </chakra.a>
                  </Link>
                </ListItem>
                <ListItem>
                  <Link as={NextLink} href="/category/delantales">
                    <chakra.a
                      display="inline-block"
                      py="2"
                      px="4"
                      onClick={handleClick}
                    >
                      Delantales
                    </chakra.a>
                  </Link>
                </ListItem>
              </AnimatedUnorderedList>
            )}
          </AnimatePresence>
        </ListItem>
        <ListItem>
          <Link as={NextLink} href="/nosotros">
            <chakra.a display="inline-block" py="2" onClick={handleClick}>
              Gurim
            </chakra.a>
          </Link>
        </ListItem>
        <ListItem>
          <Link as={NextLink} href="/contacto">
            <chakra.a display="inline-block" py="2" onClick={handleClick}>
              Contacto
            </chakra.a>
          </Link>
        </ListItem>
      </UnorderedList>
    </chakra.nav>
  );
};

export default Nav;
