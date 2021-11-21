import { useState } from "react";
import NextLink from "next/link";
import NextImage from "next/image";
import {
  Box,
  Image,
  Link,
  ListItem,
  UnorderedList,
  IconButton,
} from "@chakra-ui/react";
import { BsList } from "react-icons/bs";

import logo from "../public/logo.png";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header>
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Link as={NextLink} href="/">
          <a>
            <Image as={NextImage} src={logo} alt="Gurim logo" />
          </a>
        </Link>
        <IconButton
          icon={<BsList size="2em" color="rgba(0, 0, 0, 0.5)" />}
          variant="ghost"
          onClick={() => setIsOpen(!isOpen)}
        />
      </Box>
      {isOpen && (
        <UnorderedList>
          <ListItem>
            <Link as={NextLink} href="https://shop.gurim.com.ar/">
              <a>Tienda</a>
            </Link>
          </ListItem>
          <ListItem>
            Catálogo
            <UnorderedList>
              <ListItem>
                <Link as={NextLink} href="/category/cuadernos">
                  <a>Cuadernos</a>
                </Link>
              </ListItem>
              <ListItem>
                <Link as={NextLink} href="/category/bolsos">
                  <a>Bolsos</a>
                </Link>
              </ListItem>
              <ListItem>
                <Link as={NextLink} href="/category/accesorios">
                  <a>Accesorios</a>
                </Link>
              </ListItem>
              <ListItem>
                <Link as={NextLink} href="/category/delantales">
                  <a>Delantales</a>
                </Link>
              </ListItem>
            </UnorderedList>
          </ListItem>
          <ListItem>
            <Link as={NextLink} href="/nosotros">
              <a>Gurim</a>
            </Link>
          </ListItem>
          <ListItem>
            <Link as={NextLink} href="/contacto">
              <a>Contacto</a>
            </Link>
          </ListItem>
        </UnorderedList>
      )}
    </header>
  );
};

export default Header;
