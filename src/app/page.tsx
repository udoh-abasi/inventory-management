"use client";

import Footer from "./footer";
import { useRouter } from "next/navigation";

const HomePage = () => {
  const router = useRouter();

  return (
    <main className="min-h-full">
      <div
        id="homePageBg"
        className="flex items-center justify-center h-[50vh]"
      >
        <h1 className="text-center uppercase font-bold text-4xl min-[480px]:text-5xl min-[700px]:text-6xl drop-shadow-[2px_2px_#000 drop-shadow-[2px_2px_#fff]">
          <strong id="gradient-text">Inventory Management</strong>
        </h1>
      </div>

      <div className="pt-20 flex justify-center p-4">
        <button
          type="button"
          onClick={() => {
            router.push("/createinventory");
          }}
          className="flex-[0_1_800px] relative inline-flex items-center justify-center py-3 pl-4 pr-12 overflow-hidden font-semibold transition-all duration-150 ease-in-out rounded-2xl hover:pl-10 hover:pr-6  text-white bg-purple-500  group w-full mb-4 min-[420px]:mb-8"
        >
          <span className="absolute bottom-0 left-0 w-full h-1 transition-all duration-150 ease-in-out bg-black group-hover:h-full"></span>
          <span className="absolute right-0 pr-4 duration-200 ease-out group-hover:translate-x-12">
            <svg
              className="w-5 h-5 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              ></path>
            </svg>
          </span>
          <span className="absolute left-0 pl-2.5 -translate-x-12 group-hover:translate-x-0 ease-out duration-200">
            <svg
              className="w-5 h-5 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              ></path>
            </svg>
          </span>
          <span className="relative uppercase flex justify-center w-full text-left transition-colors duration-200 ease-in-out group-hover:text-white">
            Get Started
          </span>
        </button>
      </div>

      <Footer />
    </main>
  );
};

export default HomePage;
