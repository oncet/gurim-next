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
    setIsOpen(false);
  }, [router.asPath]);

  return (
    <header>
      <Container maxW="container.lg">
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <NextLink href="/" passHref>
            <Link>
              <Image src={logo} alt="Gurim logo" />
            </Link>
          </NextLink>
          <Box display="flex" gap={5}>
            {!isMobile && (
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
                  >
                    <Nav />
                  </AnimatedBox>
                )}
              </AnimatePresence>
            )}
            <IconButton
              aria-label="Alternar menú"
              icon={<Icon as={isOpen ? BsX : BsList} w="8" h="8" color="rgba(0, 0, 0, 0.5)" />}
              variant="ghost"
              onClick={() => setIsOpen(!isOpen)}
            />
          </Box>
        </Box>
        {isMobile && (
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
              >
                <Nav />
              </AnimatedBox>
            )}
          </AnimatePresence>
        )}
      </Container>
    </header>
  );
};

export default Header;
