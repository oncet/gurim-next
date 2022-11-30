import NextLink from "next/link";
import Image from "next/image";

import logo from "../public/logo.png";
import Nav from "./Nav";

const Header = () => {
  return (
    <header>
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex justify-between items-start md:items-center">
          <NextLink href="/" passHref>
            <a>
              <Image src={logo} width={90} height={113} alt="Gurim logo" />
            </a>
          </NextLink>
          <Nav />
        </div>
      </div>
    </header>
  );
};

export default Header;
