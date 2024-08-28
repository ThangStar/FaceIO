import firebaseConfig, { auth } from '@/firebase/setup';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { error } from 'console';
import { FirebaseApp, initializeApp } from 'firebase/app';
import { Auth, AuthCredential, getAdditionalUserInfo, getAuth, GoogleAuthProvider, signInWithCredential, UserCredential } from 'firebase/auth';
import { Firestore, getFirestore } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
export let db: Firestore;
export let app: FirebaseApp;
export const AuthProvider = ({ children }: any) => {
    const idToken = useLocalStorage("idToken");
    const router = useRouter()
    const [isLogined, setIsLogined] = useState(false)
    const [reloginFailed, setReloginFailed] = useState(false)

    const relogin = () => {
        const credential = GoogleAuthProvider.credential(idToken)
        signInWithCredential(auth, credential)
            .then((value: UserCredential) => {
                console.log('relogin success!');
                toast(`Chào ${value.user.displayName}!`);
                setIsLogined(true);
                router.replace('/home')
            })
            .catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.email;
                // The credential that was used.
                const credential = GoogleAuthProvider.credentialFromError(error);
                console.log('relogin failed!', error);
                setReloginFailed(true)
                router.replace('/');
            });
    }
    const checkIsLogined = () => {
        idToken ? relogin() : router.replace('/');
    }
    useEffect(() => {
        checkIsLogined()
        return () => {
        }
    }, [])

    if (idToken && !reloginFailed) {
        if (isLogined) {
            return (
                <>
                    {children}
                </>
            )
        }
        return (
            <span className="loading loading-ball loading-lg"></span>
        )
    } else {
        return (
            <>
                {children}
            </>
        )
    }
}

