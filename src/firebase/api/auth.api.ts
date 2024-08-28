import { http } from "@/http/http";
import { user } from "@/types/user";
import { auth } from "../setup";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile, UserCredential } from "firebase/auth";
import { toast } from "react-toastify";
// import GoogleProvider from "next-auth/providers/google";
export type registerDto = Pick<user, "username" | "password" | "email" | "displayName">
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
}