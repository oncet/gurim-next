import { Transition } from "@headlessui/react";

import Header from "./Header";
import Footer from "./Footer";

const Layout = ({ children }) => {
  return (
    <Transition
      show
      appear
      enter="transition-opacity"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition-opacity"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <div className="min-h-screen flex flex-col gap-10 bg-yellow-50">
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
      </div>
    </Transition>
  );
};

export default Layout;
