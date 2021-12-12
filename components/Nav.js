import { useEffect, forwardRef, useState } from "react";
import NextLink from "next/link";
import { useRouter } from "next/router";
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
  const router = useRouter();

  useEffect(() => {
    setIsOpen(false);
  }, [router.asPath]);

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
      >
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
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                transition={{
                  duration: 0.3,
                  ease: "easeOut",
                }}
                exit={{ height: 0, opacity: 0 }}
                overflow="hidden"
                position={["relative", "absolute"]}
                zIndex="1"
              >
                <UnorderedList
                  backgroundColor="black"
                  color="white"
                  width="160px"
                  py="2"
                  ml={["auto", 0]}
                  textAlign={["right", "left"]}
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
