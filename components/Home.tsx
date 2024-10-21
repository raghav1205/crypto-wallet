"use client"
import React from "react";
import BlockchainAnimation from "./BlockchainAnimation";


interface HomeScreenProps {
    handleScroll: (arg?: string) => void;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ handleScroll }) => {
    return (
        <div className="flex-col flex mt-[3rem] min-h-screen text-white  ">
            <div className=" pb-[17rem]  flex flex-col md:flex-row items-center justify-center md:justify-between ">
                <div className="text-center md:text-left text-wrap overflow-hidden">
                    <h1 className="text-4xl md:text-5xl font-semibold mb-[1rem] ">
                        The best crypto wallet out there
                    </h1>
                    <p className="text-lg md:text-xl text-gray-300 mb-4">
                        Generate your own wallet in seconds
                    </p>
                    <button className="text-xl p-2.5 mt-8 bg-green-500 btn btn-green" onClick={() => handleScroll('mnemonicDisplay')}>
                        Get Started
                    </button>
                </div>
                <div className="md:w-[20rem] flex justify-center">
                    <BlockchainAnimation />
                </div>
            </div>
        </div>
    );
};

export default HomeScreen;
