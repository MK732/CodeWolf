import { GetServerSideProps } from "next";
import Link from "next/link";
import React from "react";

const CTA = () => {
  return (
    <>
      <div className="relative mx-auto max-w-5xl mt-20 hover:scale-[100.3%] ">
        <div className="rounded-xl p-1">
          <div className="rounded-2xl bg-onyx ">
            <div className="flex w-full flex-wrap items-center justify-between gap-4 px-8 py-10 sm:px-16 lg:flex-nowrap">
              <div className="lg:max-w-xl">
                <h2 className="block w-full pb-2 bg-gradient-to-b from-frost to-alice bg-clip-text font-bold text-transparent text-3xl sm:text-4xl">
                  Enhancing Code Reviews with Artificial Intelligence
                </h2>
                <p className="my-4 bg-transparent font-medium leading-relaxed tracking-wide text-alice">
                  Natural Language Processing (NLP): Code Wolf understands and
                  interprets natural language commands, allowing users to
                  communicate with it effortlessly.
                </p>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-6 ">
                <Link
                  href="/Code"
                  className="bg-frost rounded-xl hover:scale-105 font-semibold text-onyx button-text flex items-center justify-center whitespace-nowrap  transition-all duration-300 px-8 py-3 text-xs sm:text-sm"
                >
                  Get Started
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CTA;
