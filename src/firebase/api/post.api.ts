import { http } from "@/http/http";
import { post } from "@/types/post";
import { pick } from "lodash";
import { auth, db } from "../setup";
import { getDatabase, ref, set } from "firebase/database";
import { addDoc, collection, doc, getDocs, onSnapshot } from "firebase/firestore";
export type addPostDto = Pick<post, 'title' | 'body'>;
export const postApi = {
    add: async (addPostDto: addPostDto) => {
        const docRef = await addDoc(collection(db, "posts"), addPostDto);
    },
    getAll: async () => {
        // const snapshot = await getDocs(collection(db, "posts"));
        // console.log(snapshot.docs);
        // return snapshot
        
        onSnapshot(doc(db, "posts", "SF"), (doc) => {
            console.log("Current data: ");
        });
    }
}