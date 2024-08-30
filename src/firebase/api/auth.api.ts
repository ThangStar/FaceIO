import { http } from "@/http/http";
import { user } from "@/types/user";
import { auth, db } from "../setup";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile, UserCredential } from "firebase/auth";
import { toast } from "react-toastify";
import { addDoc, collection, doc, getDoc, getDocs, query, setDoc, updateDoc, where } from "firebase/firestore";
import { pick } from "lodash";
import { userAuthToUserDb } from "../utils";
// import GoogleProvider from "next-auth/providers/google";
export type registerDto = Pick<user, "displayName" | "password" | "email">
export type loginDto = Pick<user, "email" | "password">
export type profileDto = { displayName?: string; photoURL?: string }
// export const authApi = {
//     register: async (registerDto: registerDto) => (await http.post("/auth/register", registerDto)).data,
//     login: async (loginDto: loginDto) => (await http.post("/auth/login", loginDto)).data
// }

export const authApi = {
    register: async (registerDto: registerDto) => (await createUserWithEmailAndPassword(auth, registerDto.email!, registerDto.password!)),
    logout: async () => (await signOut(auth)),
    login: async (loginDto: loginDto) => (await signInWithEmailAndPassword(auth, loginDto.email!, loginDto.password!)),
    updateProfile: async (profileDto: profileDto) => (await updateProfile(auth.currentUser!, profileDto)),
    setProfileToDb: async () => {
        const user = auth.currentUser
        if (user) {
            const q = query(collection(db, "users"), where("uid", "==", user.uid));
            const querySnapshot = await getDocs(q);
            const userDb: user = userAuthToUserDb(user);
            if (querySnapshot.size > 0) {
                const userRef = doc(db, 'users', querySnapshot.docs[0].id)
                await updateDoc(userRef, { ...userDb });
                return true
            } else {
                await addDoc(collection(db, 'users'), userDb);
                return true
            }
        }
        return false
    }
}