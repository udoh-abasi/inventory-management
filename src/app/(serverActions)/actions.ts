"use server";

import { ObjectId } from "mongodb";
import { connectToMongo } from "../(utils)/mongoDBClient";
import { InventoryInterface } from "../allinventory/page";

export const createInventory = async (formData: FormData) => {
  try {
    if (formData) {
      const name = formData.get("name") as string;
      const category = formData.get("category") as string;
      const quantity = formData.get("quantity") as string;

      const inventoryDB = await connectToMongo();
      if (inventoryDB && name && category && quantity) {
        const inventoryCollection =
          inventoryDB.collection<InventoryInterface>("inventory");

        const result = await inventoryCollection.insertOne({
          name,
          category,
          quantity,
        });

        if (result.acknowledged) {
          // Convert the object ID to string, else Next JS will throw an error that classes are not allowed to be sent to the client (because result.insertedId is a class i.e new ObjectId())
          return { _id: result.insertedId.toString() };
        }
      }

      throw new Error("Something went wrong");
    }
  } catch (e) {
    console.log(e);
    return { _id: null };
  }
};

export const editInventory = async (theID: string, formData: FormData) => {
  try {
    if (formData) {
      const name = formData.get("name") as string;
      const category = formData.get("category") as string;
      const quantity = formData.get("quantity") as string;

      const inventoryDB = await connectToMongo();
      if (inventoryDB && name && category && quantity && theID) {
        const inventoryCollection = inventoryDB.collection("inventory");

        const result = await inventoryCollection.updateOne(
          { _id: new ObjectId(theID) },
          {
            $set: {
              name,
              category,
              quantity,
            },
          }
        );

        if (result.acknowledged) {
          // Convert the object ID to string, else Next JS will throw an error that classes are not allowed to be sent to the client (because result.insertedId is a class i.e new ObjectId())
          return { done: true };
        }
      }

      throw new Error("Something went wrong");
    }
  } catch (e) {
    console.log(e);
    return { done: false };
  }
};

export const getAllInventory = async () => {
  try {
    const inventoryDB = await connectToMongo();

    if (inventoryDB) {
      const inventoryCollection =
        inventoryDB.collection<InventoryInterface>("inventory");

      const result = await inventoryCollection
        .find()
        .sort({ name: 1 })
        .toArray();

      return result.map((eachData) => ({
        _id: eachData._id.toString(),
        name: eachData.name,
        category: eachData.category,
        quantity: eachData.quantity,
      }));
    }
  } catch (e) {
    console.log(e);
    return [];
  }
};

export const deleteInventory = async (id: string) => {
  try {
    const inventoryDB = await connectToMongo();

    if (inventoryDB) {
      const inventoryCollection = inventoryDB.collection("inventory");

      const result = await inventoryCollection.deleteOne({
        _id: new ObjectId(id),
      });

      if (result.deletedCount === 1) {
        return { done: true };
      }
    }
    return { done: false };
  } catch (e) {
    console.log(e);
    return { done: false };
  }
};

export const getInventory = async (id: string) => {
  try {
    const inventoryDB = await connectToMongo();

    if (inventoryDB) {
      const inventoryCollection = inventoryDB.collection("inventory");

      const result = await inventoryCollection.findOne({
        _id: new ObjectId(id),
      });

      if (result) {
        return {
          _id: result._id.toString(),
          name: result.name,
          category: result.category,
          quantity: result.quantity,
        };
      }
    }
    return { done: false };
  } catch (e) {
    console.log(e);
    return { done: false };
  }
};
