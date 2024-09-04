"use client";

import { deleteInventory, getInventory } from "@/app/(serverActions)/actions";
import { InventoryInterface } from "@/app/allinventory/page";
import Footer from "@/app/footer";
import Loader from "@/app/loader";
import NavigationBar from "@/app/nav";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const GetInventory = ({ params }: { params: { id: string } }) => {
  const theID = params.id;

  const [inventory, setInventory] = useState<InventoryInterface>();

  const [dataLoading, setDataLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    const getData = async () => {
      const data = await getInventory(theID);

      if (data._id) {
        setInventory(data);
        setDataLoading(false);
      }
    };

    getData();
  }, [theID]);

  return (
    <>
      <NavigationBar />

      <main className="min-h-screen">
        <h1 id="gradient-text" className="text-center text-3xl font-bold mt-8">
          Inventory Details
        </h1>

        {dataLoading ? (
          <div className="text-center pt-10">
            {" "}
            <Loader />
          </div>
        ) : (
          <section className="p-4 flex justify-center pt-8">
            <div className="flex-[0_1_630px]">
              <article className="flex mt-6">
                <p className="text-lg min-[520px]:text-xl min-w-[130px] min-[520px]:w-[150px]">
                  Name
                </p>
                <p className="text-lg min-[520px]:text-xl bg-gray-400 font-bold flex-[1_0_0%] py-[0.5] px-1 rounded-lg break-all">
                  {inventory?.name}
                </p>
              </article>

              <article className="flex mt-6">
                <p className="text-lg min-[520px]:text-xl min-w-[130px] min-[520px]:w-[150px]">
                  Category
                </p>
                <p className="text-lg min-[520px]:text-xl bg-gray-400 font-bold flex-[1_0_0%] py-[0.5] px-1 rounded-lg break-all">
                  {inventory?.category}
                </p>
              </article>

              <article className="flex mt-6">
                <p className="text-lg min-[520px]:text-xl min-w-[130px] min-[520px]:w-[150px]">
                  Quantity in stock
                </p>

                <p className="text-lg min-[520px]:text-xl bg-gray-400 font-bold flex-[1_0_0%] py-[0.5] px-1 rounded-lg break-all">
                  {inventory?.quantity}
                </p>
              </article>

              <div className="pt-16 flex justify-center gap-4 min-[520px]:gap-16">
                <button
                  type="button"
                  onClick={() => {
                    router.push(`/editinventory/${inventory?._id}`);
                  }}
                  title="Edit"
                  className="hover:ring-indigo-500 ring-purple-500 ring-4 w-[140px] py-1 rounded-bl-2xl rounded-tr-2xl font-bold text-lg"
                >
                  Edit
                </button>

                <button
                  type="button"
                  title="Delete"
                  onClick={() => {
                    if (inventory?._id) {
                      deleteInventory(inventory._id);
                      router.push(`/allinventory`);
                    }
                  }}
                  className="ring-red-500 ring-4 w-[140px] py-1 rounded-bl-2xl rounded-tr-2xl font-bold text-lg text-red-500"
                >
                  Delete
                </button>
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </>
  );
};

export default GetInventory;
