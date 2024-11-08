"use client";
import { useState } from "react";
import Link from "next/link";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";

const NavigationBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-onyx fixed top-0 left-0 right-0 z-10">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link
              href="/"
              className="text-xl font-semibold text-alice hover:text-frost"
            >
              Code Wolf AI
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link
                href="/"
                className="text-alice hover:text-frost px-3 py-2 rounded-md text-sm font-medium"
              >
                Home
              </Link>
              <Link
                href="/About"
                className="text-alice hover:text-frost px-3 py-2 rounded-md text-sm font-medium"
              >
                About
              </Link>
              <Link
                href="/Code"
                className="text-alice hover:text-frost px-3 py-2 rounded-md text-sm font-medium"
              >
                Code Review
              </Link>
            </div>
          </div>
          <div className="hidden md:block">
            <SignedOut>
              <SignInButton>
                <button className="bg-frost text-onyx py-2 px-4 rounded-xl hover:scale-105 transition duration-200">
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
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-alice hover:text-frost focus:outline-none"
            >
              <svg
                className={`${isMenuOpen ? "hidden" : "block"} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              <svg
                className={`${isMenuOpen ? "block" : "hidden"} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </nav>
      <div className={`${isMenuOpen ? "block" : "hidden"} md:hidden`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link
            href="/"
            className="text-alice hover:text-frost block px-3 py-2 rounded-md text-base font-medium"
          >
            Home
          </Link>
          <Link
            href="/About"
            className="text-alice hover:text-frost block px-3 py-2 rounded-md text-base font-medium"
          >
            About
          </Link>
          <Link
            href="/Code"
            className="text-alice hover:text-frost block px-3 py-2 rounded-md text-base font-medium"
          >
            Code Review
          </Link>
        </div>
        <div className="pt-4 pb-3 border-t border-gray-700">
          <SignedOut>
            <SignInButton>
              <button className="bg-frost text-onyx py-2 px-4 rounded-xl hover:scale-105 transition duration-200 w-full">
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
    </header>
  );
};

export default NavigationBar;
