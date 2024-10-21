"use client"
import HomeScreen from "@/components/Home";
import Navbar from "@/components/Navbar";
import WalletGenerator from "@/components/WalletGenerator";

export default function Home() {
  const handleScroll = (multiple: number = 1) => {
    console.log("scrolling");
    window.scrollTo({
      top: window.innerHeight * multiple,
      behavior: "smooth",
    });
  }
  return (
    <div className="  w-full ">
      <div className="md:max-w-[80rem] mx-auto w-[90%] ">
        <Navbar />
        <HomeScreen handleScroll={handleScroll}/>
        <WalletGenerator handleScroll={handleScroll} />
      </div>
    </div>
  );
}
