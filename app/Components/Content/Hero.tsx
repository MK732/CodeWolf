"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import Prism from "prismjs";
import "prismjs/themes/prism-tomorrow.css";
import "prismjs/components/prism-javascript";

const Hero = () => {
  useEffect(() => {
    Prism.highlightAll();
  }, []);

  return (
    <div className="flex flex-col lg:flex-row items-center justify-center gap-10 w-full max-w-7xl mx-auto p-5 mt-20">
      {/* Left Column */}
      <div className="w-full lg:w-1/2 space-y-6">
        <h1 className="text-3xl lg:text-5xl font-bold text-gray-800 text-center lg:text-left">
          Speeding up your code reviews with AI
        </h1>
        <p className="text-lg text-gray-600 text-center lg:text-left">
          Leverage AI to make your code reviews faster, smarter, and more
          efficient. Let the machine suggest improvements, catch errors, and
          help your team deploy code faster.
        </p>
        <Link
          href="/Code"
          className="mt-6 text-center py-3 px-6 bg-frost text-onyx font-semibold rounded-xl hover:scale-105 transition duration-200 inline-block"
        >
          Try it for free
        </Link>
      </div>

      {/* Right Column - Code Example */}
      <div className="w-full lg:w-1/2 rounded-xl p-4 shadow-xl shadow-frost hover:scale-[100.5%] transition duration-300 bg-gray-900">
        <div className="font-mono text-sm text-white">
          <p className="text-lg mb-2">Code Snippet</p>
          <pre className="p-4 rounded-lg bg-gray-800 overflow-x-auto">
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
+ throw new Error('Product not found'); // More appropriate for handling not found errors`}
            </code>
          </pre>
        </div>
        <p className="mt-4 text-white text-sm">
          <span className="font-extrabold text-frost">AI Suggestion:</span>{" "}
          Status code 400 might not be appropriate. It is suggested to use 404
          instead for missing data scenarios.
        </p>
      </div>
    </div>
  );
};

export default Hero;
