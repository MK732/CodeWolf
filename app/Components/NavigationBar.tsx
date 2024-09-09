"use client";
import { GetServerSideProps } from "next";
import { useState } from "react";

const NavigationBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <div className="flex bg-onyx justify-center items-center">
        <header className="flex flex-wrap sm:justify-start sm:flex-nowrap w-full text-sm py-3 dark:bg-neutral-800">
          <nav className="max-w-[85rem] w-full mx-auto px-4 flex flex-wrap basis-full items-center justify-between">
            <a
              className="sm:order-1 flex-none text-xl font-semibold text-alice"
              href="/"
            >
              AI Code Review
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
                    className="shrink-0 size-4"
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
                    className="shrink-0 size-4"
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
              <button
                type="button"
                className="py-2 rounded-xl bg-blurple1 px-3 inline-flex items-center gap-x-2 text-sm font-medium hover:scale-105 text-alice bg-frost shadow-sm focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
              >
                Login
              </button>
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
                  href="#"
                >
                  About
                </a>
                <a
                  className="font-medium text-alice hover:text-frost focus:outline-none focus:text-frost"
                  href="#"
                >
                  Contribute
                </a>
                <a
                  className="font-medium text-alice hover:text-frost focus:outline-none focus:text-frost"
                  href="#"
                >
                  Contact
                </a>
              </div>
            </div>
          </nav>
        </header>
      </div>
    </>
  );
};

export default NavigationBar;
