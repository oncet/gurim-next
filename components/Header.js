import NextLink from "next/link";
import Image from "next/image";
import { Box, Container, Link } from "@chakra-ui/react";

import logo from "../public/logo.png";
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
