import { useEffect, forwardRef, useState, useRef, useCallback } from "react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { Transition } from "@headlessui/react";

const WrappedLink = forwardRef(({ children, ...props }, ref) => (
  <a className="inline-block py-2" {...props} ref={ref}>
    {children}
  </a>
));
WrappedLink.displayName = "WrappedLink";

const Nav = () => {
  const ref = useRef();
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const clickOutsideHandler = useCallback(
    (event) => {
      if (!ref.current.contains(event.target)) {
        setIsOpen(false);
      }
    },
    [setIsOpen]
  );

  useEffect(() => {
    setIsOpen(false);
  }, [router.asPath]);

  useEffect(() => {
    if (isOpen) {
      window.addEventListener("click", clickOutsideHandler);
    } else {
      window.removeEventListener("click", clickOutsideHandler);
    }

    return () => {
      window.removeEventListener("click", clickOutsideHandler);
    };
  }, [isOpen, clickOutsideHandler]);

  const handleSubmenuClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav>
      <ul className="list-none text-right flex flex-col md:flex-row gap-0 md:gap-6 justify-end ml-0">
        <li>
          <NextLink passHref href="https://shop.gurim.com.ar/">
            <WrappedLink>Tienda</WrappedLink>
          </NextLink>
        </li>
        <li ref={ref}>
          <WrappedLink onClick={handleSubmenuClick} href="#">
            Blog
          </WrappedLink>
          <ul className="py-2">
            <li>
              <NextLink passHref href="/category/bordado">
                <a className="px-6 py-1 inline-block">Bordado</a>
              </NextLink>
            </li>
            <li>
              <NextLink passHref href="/category/fieltro">
                <a className="px-6 py-1 inline-block">Fieltro</a>
              </NextLink>
            </li>
            <li>
              <NextLink passHref href="/category/bolsos">
                <a className="px-6 py-1 inline-block">Bolsos</a>
              </NextLink>
            </li>
            <li>
              <NextLink passHref href="/category/ecoprint">
                <a className="px-6 py-1 inline-block">Ecoprint</a>
              </NextLink>
            </li>
            <li>
              <NextLink passHref href="/category/encuadernacion">
                <a className="px-6 py-1 inline-block">Encuadernación</a>
              </NextLink>
            </li>
            <li>
              <NextLink passHref href="/blog">
                <a className="px-6 py-1 inline-block">Ver todo</a>
              </NextLink>
            </li>
          </ul>
        </li>
        <li>
          <NextLink passHref href="/contacto">
            <WrappedLink>Contacto</WrappedLink>
          </NextLink>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
