import { http } from "@/http/http";
import { post } from "@/types/post";
import { omit, pick } from "lodash";
import { auth, db, storage } from "../setup";
import { getDatabase, set } from "firebase/database";
import { addDoc, collection, doc, DocumentData, DocumentReference, getDoc, getDocs, onSnapshot, setDoc } from "firebase/firestore";
import { ref, uploadBytes } from "firebase/storage";
export type addPostDto = Pick<post, 'title' | 'body' | 'images' | 'createdAt'> & {
    fileImages?: File[]
}
export const postApi = {
    add: async (addPostDto: addPostDto): Promise<DocumentReference<DocumentData, DocumentData>> => {
        const postRef = await addDoc(collection(db, 'posts'), { ...omit({ ...addPostDto, createdAt: Date.now().toLocaleString() }, 'fileImages') });
        return postRef
    },
    addImage: async (files: File[]) => {
        let pids: string[] = [];
        await Promise.all(files.map(async (file) => {
            const pid = Date.now().toString();
            const imagesRef = ref(storage, `images/${pid}.jpg`);
            await uploadBytes(imagesRef, file).then((snapshot) => {
                console.log('Uploaded a blob or file: ', file.name);
                pids.push(pid);
            });
        }))
        return pids;
    },
    getAll: () => {
        let docs: post[] = []
        // onSnapshot(collection(db, "posts"), (doc) => {
        //     docs = doc.docs.map(doc => doc.data() as post);
        // });
        return docs;
    }
}