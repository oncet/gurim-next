import NextLink from "next/link";
import Image from "next/image";
import { Box, Container, Link } from "@chakra-ui/react";

import logo from "../public/logo-2.png";
import Nav from "./Nav";

const Header = () => {
  return (
    <header>
      <Container maxW="container.lg">
        <Box
          display="flex"
          alignItems={["start", "center"]}
          justifyContent="space-between"
        >
          <NextLink href="/" passHref>
            <Link width={90}>
              <Image
                src={logo}
                width={180}
                height={226}
                alt="Gurim logo"
                priority
              />
            </Link>
          </NextLink>
          <Nav />
        </Box>
      </Container>
    </header>
  );
};

export default Header;
