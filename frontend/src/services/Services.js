import { db } from "../firebase/config";

import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";

const questionRef = collection(db, "questions");

class QuestionServices {
  getQuestions = async () => {
    let data = await getDocs(questionRef);
    return data;
  };

    addQuestion = async (newQuestion) => {
      return await addDoc(questionRef, newQuestion);
    };

  deleteAttraction = async (id) => {
    const questionDoc = await doc(questionRef, id);
    return await deleteDoc(questionDoc);
  };
}

let qustionServices = new QuestionServices();
export default qustionServices;
