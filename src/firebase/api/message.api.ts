import { http } from "@/http/http";
import { post } from "@/types/post";
import { omit, pick } from "lodash";
import { auth, db, storage } from "../setup";
import { getDatabase, set } from "firebase/database";
import { addDoc, arrayRemove, arrayUnion, collection, doc, DocumentData, DocumentReference, getDoc, getDocs, onSnapshot, Query, query, setDoc, updateDoc, where } from "firebase/firestore";
import { ref, uploadBytes } from "firebase/storage";
import moment from "moment";
export type addPostDto = Pick<post, 'title' | 'body' | 'images' | 'createdAt' | 'likes' | 'createdBy'> & {
    fileImages?: File[]
}
export const messageApi = {
    sendText: async (message: message) => {
        const messageRef = await addDoc(collection(db, 'messages'), { ...message })
    },
    chated: async () => {
        const q = query(collection(db, "messages"), where("uid", "in", auth.currentUser?.uid));
        const snapshot = await getDocs(q)
        return snapshot;
    }
}