import { GetServerSideProps } from "next";
import Image from "next/image";
const Preview = () => {
  return (
    <>
      <div className=" m-10 text-center font-bold">
        Preview of CodeWolf
        <Image
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
