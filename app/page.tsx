import Image from "next/image";
import NavigationBar from "./Components/UI/NavigationBar";
import Hero from "./Components/Content/Hero";
import CTA from "./Components/Content/CTA";
import Preview from "./Components/Content/Preview";

export default function Home() {
  return (
    <div className="flex flex-col w-screen justify-center items-center">
      <Hero />
      <CTA />
      <Preview />
    </div>
  );
}
