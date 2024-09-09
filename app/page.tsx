import Image from "next/image";
import NavigationBar from "./Components/NavigationBar";
import Hero from "./Components/Content/Hero";

export default function Home() {
  return (
    <div className="flex flex-col w-screen justify-center items-center">
      <Hero />
    </div>
  );
}
