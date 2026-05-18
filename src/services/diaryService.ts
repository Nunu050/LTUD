import {
  addDoc,
  collection,
  getDocs,
  deleteDoc,
  doc,
  orderBy,
  query,
} from "firebase/firestore";

import { db } from "../firebase/config";

const diaryCollection = collection(
  db,
  "nhật ký"
);

export const addDiary = async (
  mood: string,
  food: string
) => {
  await addDoc(diaryCollection, {
    "tâm trạng": mood,
    "đồ ăn": food,
    createdAt: new Date(),
  });
};

export const getDiaries = async () => {
  const q = query(
    diaryCollection,
    orderBy("createdAt", "desc")
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};

export const deleteDiary = async (
  id: string
) => {
  const diaryDoc = doc(
    db,
    "nhật ký",
    id
  );

  await deleteDoc(diaryDoc);
};