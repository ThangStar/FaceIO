import LogoProgress from '@/components/layout/LogoProgress';
import firebaseConfig, { auth } from '@/firebase/setup';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { redirectConfig } from '@/utils/utils';
import { error } from 'console';
import { FirebaseApp, initializeApp } from 'firebase/app';
import { Auth, AuthCredential, EmailAuthProvider, getAdditionalUserInfo, getAuth, getIdToken, getRedirectResult, GoogleAuthProvider, reauthenticateWithCredential, signInWithCredential, signInWithCustomToken, UserCredential } from 'firebase/auth';
import { Firestore, getFirestore } from 'firebase/firestore';
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
export let db: Firestore;
export let app: FirebaseApp;
export const AuthProvider = ({ children }: any) => {
    const idToken = useLocalStorage("idToken");
    const [mounted, setMounted] = useState(false)
    const router = useRouter()
    const [isLogined, setIsLogined] = useState(false)
    const pathname = usePathname()
    const relogin = async () => {
        if (typeof idToken != "string") return
        // signInWithCustomToken(auth, idToken)
        //     .then((value: UserCredential) => {
        //         console.log('relogin success!');
        //         toast(`Chào ${value.user.displayName}!`);
        //         setIsLogined(true);
        //         pathname == '/' && (window.location.href = `${redirectConfig()}/home`)
        //     })
        //     .catch((error) => {
        //         // Handle Errors here.
        //         const errorCode = error.code;
        //         const errorMessage = error.message;
        //         // The email of the user's account used.
        //         const email = error.email;
        //         // The credential that was used.
        //         setIsLogined(true);
        //         pathname !== '/' && router.replace('/');
        //         const credential = GoogleAuthProvider.credentialFromError(error);
        //         console.log('relogin failed!', error);
        //     }).finally(() => {
        //         setMounted(true)
        //     });

        getRedirectResult(auth).then((result) => {
            if (result) {
                const credential = GoogleAuthProvider.credentialFromResult(result)
                if (credential) {
                    const token = credential.accessToken;
                    console.log('relogin success!');
                    toast(`Chào ${result.user.displayName}!`);
                    setIsLogined(true);
                    pathname == '/' && (window.location.href = `${redirectConfig()}/home`)
                }
            }
        }, (error) => {
            console.log('relogin failed!', error);
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.email;
            // The credential that was used.
            setIsLogined(true);
            pathname !== '/' && router.replace('/');
            const credential = GoogleAuthProvider.credentialFromError(error);
        }).finally(() => {
            setMounted(true)
        })
    }
    const checkIsLogined = () => {
        if (idToken) {
            pathname == '/' && router.replace('/home')
            relogin()
        } else {
            pathname !== '/' && router.replace('/')
            setMounted(true)
        };
    }
    useEffect(() => {
        checkIsLogined()
        return () => {
        }
    }, [])
    return (
        <>
            {mounted ? (<>{children}</>) : pathname == "/" ? <></> : (<LogoProgress label='Đang xác thực thông tin..' />)}
        </>
    )
}

