import { useState } from "react";
import NextLink from "next/link";
import NextImage from "next/image";
import {
  Box,
  Image,
  Link,
  ListItem,
  UnorderedList,
  Icon,
  IconButton,
} from "@chakra-ui/react";
import { BsList } from "react-icons/bs";
import { AnimatePresence, motion } from "framer-motion";

import logo from "../public/logo.png";
import Nav from "./Nav";

const AnimatedBox = motion(Box);

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(false);
  };

  return (
    <header>
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Link as={NextLink} href="/">
          <a>
            <Image as={NextImage} src={logo} alt="Gurim logo" />
          </a>
        </Link>
        <IconButton
          icon={<Icon as={BsList} w="8" h="8" color="rgba(0, 0, 0, 0.5)" />}
          variant="ghost"
          onClick={() => setIsOpen(!isOpen)}
        />
      </Box>
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
            <Nav handleClick={handleClick} />
          </AnimatedBox>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
