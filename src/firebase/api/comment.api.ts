import { addDoc, collection } from "firebase/firestore"
import { db } from "../setup"

export const commentApi = {
    add: async (comment: comment) => {
        const commentRef = await addDoc(collection(db, 'comments'), comment)
    },
}