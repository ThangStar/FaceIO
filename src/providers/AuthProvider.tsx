import firebaseConfig, { auth } from '@/firebase/setup';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { error } from 'console';
import { FirebaseApp, initializeApp } from 'firebase/app';
import { Auth, AuthCredential, getAdditionalUserInfo, getAuth, GoogleAuthProvider, signInWithCredential, UserCredential } from 'firebase/auth';
import { Firestore, getFirestore } from 'firebase/firestore';
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
export let db: Firestore;
export let app: FirebaseApp;
export const AuthProvider = ({ children }: any) => {
    const idToken = useLocalStorage("idToken");
    const router = useRouter()
    const [isLogined, setIsLogined] = useState(false)
    const pathname = usePathname()
    const relogin = () => {
        if(typeof idToken != "string") return
        const credential = GoogleAuthProvider.credential(idToken)
        signInWithCredential(auth, credential)
            .then((value: UserCredential) => {
                console.log('relogin success!');
                toast(`Chào ${value.user.displayName}!`);
                setIsLogined(true);
                pathname !== '/home' && router.replace('/home')
            })
            .catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.email;
                // The credential that was used.
                setIsLogined(true);
                pathname !== '/' && router.replace('/');
                const credential = GoogleAuthProvider.credentialFromError(error);
                console.log('relogin failed!', error);
            });
    }
    const checkIsLogined = () => {
        idToken ? relogin() : (pathname !== '/' && router.replace('/'));
    }
    useEffect(() => {
        checkIsLogined()
        return () => {
        }
    }, [])
    return (
        <>
            {children}
        </>
    )
}

