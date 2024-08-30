import { http } from "@/http/http";
import { post } from "@/types/post";
import { omit, pick } from "lodash";
import { auth, db, storage } from "../setup";
import { getDatabase, set } from "firebase/database";
import { addDoc, arrayRemove, arrayUnion, collection, doc, DocumentData, DocumentReference, getDoc, getDocs, onSnapshot, setDoc, updateDoc } from "firebase/firestore";
import { ref, uploadBytes } from "firebase/storage";
import moment from "moment";
export type addPostDto = Pick<post, 'title' | 'body' | 'images' | 'createdAt' | 'likes' | 'createdBy'> & {
    fileImages?: File[]
}
export type likePostDto = Pick<post, 'likes'>
export const postApi = {
    add: async (addPostDto: addPostDto): Promise<DocumentReference<DocumentData, DocumentData>> => {
        const postRef = await addDoc(collection(db, 'posts'), {
            ...omit({
                ...addPostDto,
                likes: [auth.currentUser?.uid],
                createdAt: moment(moment.now()).format(),
                createdBy: auth.currentUser?.uid
            }, 'fileImages')
        });
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
    },
    like: async (pid: string) => {
        await updateDoc(doc(db, 'posts', pid), {
            likes: arrayUnion(auth.currentUser?.uid)
        });
        return true;
    },

    unLike: async (pid: string) => {
        await updateDoc(doc(db, 'posts', pid), {
            likes: arrayRemove(auth.currentUser?.uid)
        });
        return true;
    },
    comment: async (pid: string, comment: string) => {
        await setDoc(doc(db, 'posts', pid), {
            comments: [comment]
        });
        return true;
    }
}