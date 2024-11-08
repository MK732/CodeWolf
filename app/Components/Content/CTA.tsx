import Link from "next/link";
import React from "react";

const CTA = () => {
  return (
    <div className="relative mx-auto max-w-5xl mt-20">
      <div className="rounded-xl p-1 bg-gradient-to-r from-frost to-alice">
        <div className="rounded-2xl bg-onyx p-8 sm:p-16">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="lg:max-w-xl">
              <h2 className="text-3xl sm:text-4xl font-bold text-frost mb-4">
                Enhancing Code Reviews with Artificial Intelligence
              </h2>
              <p className="text-alice text-lg leading-relaxed">
                Natural Language Processing (NLP): Code Wolf understands and
                interprets natural language commands, allowing users to
                communicate with it effortlessly.
              </p>
            </div>
            <Link
              href="/Code"
              className="bg-frost text-onyx rounded-xl hover:scale-105 font-semibold flex items-center justify-center whitespace-nowrap transition-all duration-300 px-8 py-4 text-lg"
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CTA;
