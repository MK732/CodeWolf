import { GetServerSideProps } from "next";
import Image from "next/image";
import React from "react";
const Preview = () => {
  return (
    <>
      <div className=" m-10 text-center font-bold">
        Preview of CodeWolf
        <Image
          className=" rounded-xl"
          src="/aigif.gif" // Path to your GIF in the public directory
          alt="Preview GIF"
          width={1000} // Set appropriate width
          height={1000} // Set appropriate height
        />
      </div>
    </>
  );
};

export default Preview;
