"use client";

import { useEffect, useState } from "react";
import NavigationBar from "../nav";
import { MdDelete } from "react-icons/md";
import Loader from "../loader";
import Footer from "../footer";
import Link from "next/link";
import { deleteInventory, getAllInventory } from "../(serverActions)/actions";

export interface InventoryInterface {
  _id?: string;
  name: string;
  category: string;
  quantity: string;
}

const InventoryList = () => {
  const [allInventoryData, setAllInventoryData] = useState<
    InventoryInterface[]
  >([]);
  const [dataLoading, setDataLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      const allInventory = await getAllInventory();
      if (allInventory) {
        setAllInventoryData(allInventory);
        setDataLoading(false);
      }
    };

    getData();
  }, []);

  return (
    <>
      <NavigationBar />

      <section className="min-h-full">
        <h1 id="gradient-text" className="text-center text-3xl font-bold mt-8">
          All inventories
        </h1>

        {dataLoading ? (
          <div className="text-center pt-10">
            {" "}
            <Loader />
          </div>
        ) : allInventoryData.length ? (
          <article className="p-4 pt-0 flex justify-center">
            <ul className="flex-[0_1_614px]">
              {allInventoryData.map((eachData) => {
                return (
                  <li className="mt-6" key={eachData._id}>
                    <figure className="flex items-center justify-center shadow-[0px_5px_15px_rgb(75,0,130)] rounded-2xl p-2">
                      <Link
                        href={`getinventory/${eachData._id}`}
                        className="flex-[0_0_70%]"
                      >
                        <p id="one-line-ellipsis">{eachData.name}</p>
                      </Link>

                      <button
                        title="Delete"
                        type="button"
                        onClick={async () => {
                          // Delete the data from the frontend
                          setAllInventoryData(
                            allInventoryData.filter(
                              (theFilteredData) =>
                                eachData._id !== theFilteredData._id
                            )
                          );

                          // Send a request to delete the data from the backend (database)
                          await deleteInventory(eachData._id as string);
                        }}
                        className="flex-[0_0_0%]"
                      >
                        <MdDelete className="text-4xl" />
                      </button>
                    </figure>
                  </li>
                );
              })}
            </ul>
          </article>
        ) : (
          <p className="text-center text-xl italic mt-10 font-bold p-2">
            You have not created an inventory yet!
          </p>
        )}
      </section>

      <Footer />
    </>
  );
};
export default InventoryList;
