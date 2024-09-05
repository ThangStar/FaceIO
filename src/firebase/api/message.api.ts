import { http } from "@/http/http";
import { post } from "@/types/post";
import { omit, pick } from "lodash";
import { auth, db, storage } from "../setup";
import { getDatabase, set } from "firebase/database";
import { addDoc, arrayRemove, arrayUnion, collection, doc, DocumentData, DocumentReference, getDoc, getDocs, onSnapshot, Query, query, setDoc, updateDoc, where } from "firebase/firestore";
import { ref, uploadBytes } from "firebase/storage";
import moment from "moment";
import { message } from "@/types/message";
export type sendMessageDto = Omit<message, 'id'>
export const messageApi = {
    send: async (message: sendMessageDto) => {
        await addDoc(collection(db, 'messages'), {
            ...omit({
                ...message,
                createdAt: moment(moment.now()).format(),
                seenUserId: [auth.currentUser?.uid],
            }, 'imagesFile')
        } as sendMessageDto)
    },
    addImage: async (files: File[]) => {
        let mids: string[] = [];
        await Promise.all(files.map(async (file) => {
            const mid = Date.now().toString();
            const imagesRef = ref(storage, `images/chats/${mid}.jpg`);
            await uploadBytes(imagesRef, file).then((snapshot) => {
                console.log('Uploaded a blob or file: ', file.name);
                mids.push(mid);
            });
        }))
        return mids;
    },
    chated: async () => {
        const q = query(collection(db, "messages"), where("uid", "in", auth.currentUser?.uid));
        const snapshot = await getDocs(q)
        return snapshot;
    },
    seen: async (mid: string) => {
        await updateDoc(doc(db, 'messages', mid), {
            seenUserId: arrayUnion(auth.currentUser?.uid)
        })
    },
    recall: async (mid: string) => {

    }
}