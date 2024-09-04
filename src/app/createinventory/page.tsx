"use client";

import { IoIosCreate } from "react-icons/io";
import { BiCategory } from "react-icons/bi";
import { SiNamebase } from "react-icons/si";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Footer from "../footer";
import NavigationBar from "../nav";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import { createInventory } from "../(serverActions)/actions";

const CreateInventory = () => {
  const router = useRouter();
  // This useRef is added to the form, so we can reset the form when the email is sent
  const formRef = useRef(null);

  const [createLoading, setCreateLoading] = useState(false);

  return (
    <>
      <NavigationBar />
      <section className="flex justify-center">
        <div className="flex-[0_1_614px]">
          <h1
            id="gradient-text"
            className="text-center text-3xl font-bold mt-8"
          >
            Create an Inventory
          </h1>

          <form
            className="p-4"
            ref={formRef}
            action={async (formData) => {
              setCreateLoading(true);
              const result = await createInventory(formData);

              if (result?._id) {
                router.push("/allinventory");
              }

              setCreateLoading(false);
            }}
          >
            <div className="flex flex-col-reverse mb-8 relative mt-8">
              <input
                type="text"
                required
                placeholder=" "
                id="name"
                disabled={createLoading}
                name="name"
                className="h-10 rounded-xl ring-1 ring-purple-500 bg-blue-100 p-1 peer disabled:cursor-not-allowed disabled:bg-gray-600 disabled:ring-gray-600 disabled:text-gray-400"
              />

              <label
                htmlFor="name"
                className="cursor-text p-1 absolute peer-placeholder-shown:top-[50%] peer-placeholder-shown:translate-y-[-50%] peer-focus:top-[-90%] peer-focus:translate-y-[0] top-[-90%] transition-all duration-500 ease-linear"
              >
                <span className="flex items-center gap-2 text-base text-gray-400">
                  <SiNamebase className="" />
                  <span>
                    Name&nbsp;<span className="text-red-500">&#42;</span>
                  </span>
                </span>
              </label>
            </div>

            <div className="flex flex-col-reverse mb-8 relative mt-16">
              <input
                type="text"
                required
                placeholder=" "
                id="category"
                disabled={createLoading}
                name="category"
                className="h-10 rounded-xl ring-1 ring-purple-500 bg-blue-100 p-1 peer disabled:cursor-not-allowed disabled:bg-gray-600 disabled:ring-gray-600 disabled:text-gray-400"
              />

              <label
                htmlFor="category"
                className="cursor-text p-1 absolute peer-placeholder-shown:top-[50%] peer-placeholder-shown:translate-y-[-50%] peer-focus:top-[-90%] peer-focus:translate-y-[0] top-[-90%] transition-all duration-500 ease-linear"
              >
                <span className="flex items-center gap-2 text-base text-gray-400">
                  <BiCategory className="" />
                  <span>
                    Category&nbsp;<span className="text-red-500">&#42;</span>
                  </span>
                </span>
              </label>
            </div>

            <div className="flex flex-col-reverse mb-8 relative mt-16 w-fit">
              <input
                type="number"
                required
                placeholder=" "
                id="quantity"
                disabled={createLoading}
                name="quantity"
                className="h-10 rounded-xl ring-1 ring-purple-500 bg-blue-100 p-1 peer disabled:cursor-not-allowed disabled:bg-gray-600 disabled:ring-gray-600 disabled:text-gray-400"
              />

              <label
                htmlFor="quantity"
                className="cursor-text p-1 absolute peer-placeholder-shown:top-[50%] peer-placeholder-shown:translate-y-[-50%] peer-focus:top-[-90%] peer-focus:translate-y-[0] top-[-90%] transition-all duration-500 ease-linear"
              >
                <span className="flex items-center gap-2 text-base text-gray-400">
                  <MdOutlineProductionQuantityLimits className="" />
                  <span>
                    Quantity in stock&nbsp;
                    <span className="text-red-500">&#42;</span>
                  </span>
                </span>
              </label>
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                disabled={createLoading}
                className="flex-[0_1_800px] relative inline-flex items-center justify-center py-3 pl-4 pr-12 overflow-hidden font-semibold transition-all duration-150 ease-in-out rounded-2xl hover:pl-10 hover:pr-6  text-white bg-purple-500  group w-full mb-4 min-[420px]:mb-8"
              >
                <span className="absolute bottom-0 left-0 w-full h-1 transition-all duration-150 ease-in-out bg-black group-hover:h-full"></span>
                <span className="relative uppercase flex justify-center w-full text-left transition-colors duration-200 ease-in-out group-hover:text-white">
                  <span className="flex items-center gap-2">
                    <IoIosCreate className="text-2xl" /> <span>Create</span>
                  </span>
                </span>
              </button>
            </div>
          </form>
        </div>
      </section>

      <Footer />
    </>
  );
};
export default CreateInventory;
