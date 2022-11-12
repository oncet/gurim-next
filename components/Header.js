import { useEffect, useState } from "react";
import NextLink from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import {
  Box,
  Container,
  Link,
  Icon,
  IconButton,
  useBreakpointValue,
} from "@chakra-ui/react";
import { BsList, BsX } from "react-icons/bs";
import { AnimatePresence, motion } from "framer-motion";

import logo from "../public/logo.png";
import Nav from "./Nav";

const AnimatedBox = motion(Box);

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const isMobile = useBreakpointValue([true, false]);

  useEffect(() => {
    if (isMobile) setIsOpen(false);
  }, [isMobile, router.asPath]);

  return (
    <header>
      <Container maxW="container.lg">
        <Box
          display="flex"
          alignItems={["start", "center"]}
          justifyContent="space-between"
        >
          <NextLink href="/" passHref>
            <Link>
              <Image src={logo} width={90} height={113} alt="Gurim logo" />
            </Link>
          </NextLink>
          <Nav />
        </Box>
      </Container>
    </header>
  );
};

export default Header;
