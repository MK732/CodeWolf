"use client";
import { GetServerSideProps } from "next";
import { useEffect } from "react";
import Prism from "prismjs";
// Adjust the path as necessary

const Hero = () => {
  useEffect(() => {
    Prism.highlightAll();
  }, []);
  return (
    <>
      <div className="flex flex-col md:flex-row  items-center justify-center  gap-10 md:gap-20 w-full md:w-[1500px]  mx-auto p-5 md:p-10 mt-10 md:mt-20">
        {/* Left Column */}
        <div className="w-full md:w-1/2">
          <h1 className="text-2xl md:text-5xl  font-bold text-gray-800 text-center md:text-left">
            Speeding up your code reviews with AI
          </h1>
          <p className="mt-4 text-gray-600 text-center md:text-left">
            Leverage AI to make your code reviews faster, smarter, and more
            efficient. Let the machine suggest improvements, catch errors, and
            help your team deploy code faster.
          </p>
          <button className="mt-6 px-4 py-2 bg-frost text-white rounded-xl hover:scale-105 transition duration-200 block mx-auto md:mx-0">
            Try it for free
          </button>
        </div>

        {/* Right Column - Code Example */}
        <div className="w-full md:w-1/2  rounded-lg p-4 shadow-xl shadow-alice">
          <div className="font-mono text-sm text-gray-800 bg-white p-4 rounded-lg">
            <p className="text-green-600">+ AI Code Review Suggestions</p>
            <pre>
              <code className="language-javascript">
                {`function fetchProduct(id: number): Promise<Product | null> {
      return fetch(\`/api/products/\${id}\`)
          .then(response => {
              if (response.status === 404) {
                  return null; // Return null if product is not found
              }
              return response.json();
          })
          .then(data => data as Product)
          .catch(() => null); // Handle errors and return null
  }

  // Suggested Fix
  - return null
  + throw new Error('Product not found'); // More appropriate for handling not found errors
  `}
              </code>
            </pre>
          </div>
          <p className="mt-4 text-gray-500  text-sm">
            <span className="font-bold text-blue-500">AI Suggestion:</span>{" "}
            Status code 400 might not be appropriate. It is suggested to use 404
            instead for missing data scenarios.
          </p>
        </div>
      </div>
    </>
  );
};

export default Hero;
