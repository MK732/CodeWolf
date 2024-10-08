"use client";
import { GetServerSideProps } from "next";
import { useEffect, useState } from "react";
import Link from "next/link";

import page from "../../Login/page";
import CustomPage2 from "../Content/CTA";
import {
  Protect,
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
  UserProfile,
} from "@clerk/nextjs";

const NavigationBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <div className="flex bg-onyx justify-center  items-center fixed top-0 left-0 right-0 z-10 ">
        <header className="flex flex-wrap   md:justify-start md:flex-nowrap w-full text-sm py-3 dark:bg-neutral-800 ">
          <nav className="max-w-[125rem]  w-full mx-auto px-4 flex flex-wrap  items-center justify-evenly ">
            <a
              className="sm:order-1 flex-none text-xl font-semibold hover:text-frost text-alice"
              href="/"
            >
              Code Wolf AI
            </a>
            <div className="sm:order-3 flex items-center gap-x-2">
              <button
                type="button"
                className="sm:hidden hs-collapse-toggle relative size-7 flex justify-center items-center gap-x-2 rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-transparent dark:border-neutral-700 dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10"
                onClick={toggleMenu}
                aria-expanded={isMenuOpen}
                aria-controls="hs-navbar-alignment"
                aria-label="Toggle navigation"
              >
                {isMenuOpen ? (
                  <svg
                    className=" size-4"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M18 6 6 18" />
                    <path d="m6 6 12 12" />
                  </svg>
                ) : (
                  <svg
                    className="size-4"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="3" x2="21" y1="6" y2="6" />
                    <line x1="3" x2="21" y1="12" y2="12" />
                    <line x1="3" x2="21" y1="18" y2="18" />
                  </svg>
                )}
                <span className="sr-only">Toggle</span>
              </button>

              <div className="w-[100px] h-[20px] md:w-[200px] md:h-[40px] flex justify-end items-center">
                <SignedOut>
                  <SignInButton>
                    <button className="bg-frost py-1 px-3 rounded-xl hover:scale-105">
                      Login
                    </button>
                  </SignInButton>
                </SignedOut>

                <SignedIn>
                  <UserButton
                    userProfileMode="navigation"
                    userProfileUrl="/user-profile"
                    showName={true}
                  />
                </SignedIn>
              </div>
            </div>
            <div
              id="hs-navbar-alignment"
              className={`hs-collapse overflow-hidden transition-all duration-300 basis-full grow sm:grow-0 sm:basis-auto sm:block sm:order-2 ${
                isMenuOpen ? "block" : "hidden"
              }`}
              aria-labelledby="hs-navbar-alignment-collapse"
            >
              <div className="flex flex-col gap-5 mt-5 sm:flex-row sm:items-center sm:mt-0 sm:ps-5">
                <a
                  className="font-medium text-alice hover:text-frost focus:outline-none focus:text-frost"
                  href="/"
                >
                  Home
                </a>
                <a
                  className="font-medium text-alice hover:text-frost focus:outline-none focus:text-frost"
                  href="/About"
                >
                  About
                </a>
                <a
                  className="font-medium text-alice hover:text-frost focus:outline-none focus:text-frost"
                  href="/Code"
                >
                  Code Review
                </a>
                {/* <a
                  className="font-medium text-alice hover:text-frost focus:outline-none focus:text-frost"
                  href="#"
                >
                  Contact
                </a> */}
              </div>
            </div>
          </nav>
        </header>
      </div>
    </>
  );
};

export default NavigationBar;
