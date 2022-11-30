import { forwardRef } from "react";
import NextLink from "next/link";
import Image from "next/image";

import handcraftedLogo from "../public/handcrafted-logo.png";

const WrappedLink = forwardRef(({ children, ...props }, ref) => (
  <a className="inline-block py-2" {...props} ref={ref}>
    {children}
  </a>
));
WrappedLink.displayName = "WrappedLink";

const Footer = () => {
  return (
    <footer className="border-t-2 border-gray-200 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center">
          <Image
            src={handcraftedLogo}
            alt="Handcrafted"
            width={80}
            height={108}
            style={{
              opacity: 0.9,
            }}
          />
          <nav>
            <ul className="list-none text-right flex flex-col md:flex-row gap-0 md:gap-6 justify-end ml-0">
              <li>
                <NextLink passHref href="https://shop.gurim.com.ar/">
                  <WrappedLink>Tienda</WrappedLink>
                </NextLink>
              </li>
              <li>
                <NextLink passHref href="/contacto">
                  <WrappedLink>Contacto</WrappedLink>
                </NextLink>
              </li>
              <li>
                <NextLink
                  passHref
                  href="https://www.instagram.com/gurim_craft/"
                >
                  <WrappedLink>Instagram</WrappedLink>
                </NextLink>
              </li>
              <li>
                <NextLink passHref href="https://www.facebook.com/gurimcraft/">
                  <WrappedLink>Facebook</WrappedLink>
                </NextLink>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
