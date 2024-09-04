"use client";

import { IoIosCreate } from "react-icons/io";
import { BiCategory } from "react-icons/bi";
import { SiNamebase } from "react-icons/si";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import NavigationBar from "@/app/nav";
import Footer from "@/app/footer";
import { editInventory, getInventory } from "@/app/(serverActions)/actions";
import Loader from "@/app/loader";

const EditInventory = ({ params }: { params: { id: string } }) => {
  const router = useRouter();
  const theID = params.id;

  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");

  const [editLoading, setEditLoading] = useState(false);

  const [dataLoading, setDataLoading] = useState(true);

  useEffect(() => {
    const getOldData = async () => {
      const data = await getInventory(theID);

      if (data._id) {
        setName(data.name);
        setCategory(data.category);
        setQuantity(data.quantity);

        setDataLoading(false);
      }
    };

    getOldData();
  }, [theID]);

  return (
    <>
      <NavigationBar />
      <section className="flex justify-center">
        <div className="flex-[0_1_614px]">
          <h1
            id="gradient-text"
            className="text-center text-3xl font-bold mt-8"
          >
            Edit Inventory
          </h1>

          {dataLoading ? (
            <div className="text-center pt-10">
              {" "}
              <Loader />
            </div>
          ) : (
            <form
              className="p-4"
              action={async (formData) => {
                setEditLoading(true);
                const result = await editInventory(theID, formData);

                console.log(result);

                if (result?.done) {
                  router.push("/allinventory");
                }

                setEditLoading(false);
              }}
            >
              <div className="flex flex-col-reverse mb-8 relative mt-8">
                <input
                  type="text"
                  required
                  placeholder=" "
                  id="name"
                  disabled={editLoading}
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
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
                  disabled={editLoading}
                  value={category}
                  onChange={(e) => {
                    setCategory(e.target.value);
                  }}
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
                  disabled={editLoading}
                  value={quantity}
                  onChange={(e) => {
                    setQuantity(e.target.value);
                  }}
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
                  disabled={editLoading}
                  className="flex-[0_1_800px] relative inline-flex items-center justify-center py-3 pl-4 pr-12 overflow-hidden font-semibold transition-all duration-150 ease-in-out rounded-2xl hover:pl-10 hover:pr-6  text-white bg-purple-500  group w-full mb-4 min-[420px]:mb-8"
                >
                  <span className="absolute bottom-0 left-0 w-full h-1 transition-all duration-150 ease-in-out bg-black group-hover:h-full"></span>
                  <span className="relative uppercase flex justify-center w-full text-left transition-colors duration-200 ease-in-out group-hover:text-white">
                    <span className="flex items-center gap-2">
                      <IoIosCreate className="text-2xl" /> <span>Edit</span>
                    </span>
                  </span>
                </button>
              </div>
            </form>
          )}
        </div>
      </section>

      <Footer />
    </>
  );
};
export default EditInventory;
