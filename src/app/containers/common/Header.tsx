"use client";

import { useEffect, useRef, useState } from "react";
import { Logo } from "../../../components/common/Logo";
import { UserAvatar } from "@/components/header/UserAvatar";

export const Header = () => {
  // const [isVisible, setIsVisible] = useState(true);
  const [isSticky, setIsSticky] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);
  const stickyHeaderRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const headerObserver = new IntersectionObserver(
      ([entry]) => {
        // setIsVisible(entry.isIntersecting);
        setIsSticky(!entry.isIntersecting);
      },
      { threshold: 0 }
    );
    const headerRefCurrent = headerRef.current;
    if (headerRefCurrent) {
      headerObserver.observe(headerRefCurrent);
    }

    return () => {
      if (headerRefCurrent) {
        headerObserver.unobserve(headerRefCurrent);
      }
    };
  }, []);

  const headerContent = (
    <>
      <Logo />
      <div className="flex items-center space-x-4">
        {/* <Search className="w-5 h-5 text-white" /> */}
        {/* <Button
          disabled={!appStore}
          onClick={appStore ? appStore.toggleShowLoginForm : () => {}}
          className="bg-transparent cursor-pointer"
        >
          <User className="w-5 h-5 text-white" />
        </Button> */}
        <UserAvatar />
        {/* <ShoppingCart className="w-5 h-5 text-white" /> */}
      </div>
    </>
  );

  return (
    <>
      <header ref={headerRef} className=" text-white py-4 px-6">
        <div
          className={`container mx-auto flex justify-between items-center transition-all duration-300 ${
            !isSticky
              ? "opacity-100 translate-y-0"
              : "opacity-0 -translate-y-full"
          } `}
        >
          {headerContent}
        </div>
      </header>
      <div
        ref={stickyHeaderRef}
        className={`fixed top-0 left-0 right-0 bg-black text-white py-4 px-6 transition-all duration-300 z-1000 ${
          isSticky ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-full"
        }`}
        // style={{ zIndex: 1000 }}
      >
        <div className="container mx-auto flex justify-between items-center">
          {headerContent}
        </div>
      </div>
    </>
  );
};
