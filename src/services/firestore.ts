import {
  addDoc,
  collection,
  onSnapshot,
  query,
  orderBy,
  deleteDoc,
  doc,
} from "firebase/firestore";

import { db } from "../firebase/config";

export const addFoodToFirestore =
  async (food: any) => {
    await addDoc(
      collection(db, "foods"),
      {
        ...food,
        createdAt: Date.now(),
      }
    );
  };

export const deleteFood =
  async (id: string) => {
    await deleteDoc(
      doc(db, "foods", id)
    );
  };

export const subscribeFoods = (
  callback: (foods: any[]) => void
) => {
  const q = query(
    collection(db, "foods"),
    orderBy("createdAt", "desc")
  );

  return onSnapshot(q, (snapshot) => {
    const foods = snapshot.docs.map(
      (doc) => ({
        id: doc.id,
        ...doc.data(),
      })
    );

    callback(foods);
  });
};