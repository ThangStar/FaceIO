import { user } from "@/types/user"
import { User } from "firebase/auth"

export const userAuthToUserDb = (userAuth: User | null): user => {
    return {
        photoURL: userAuth?.photoURL || '',
        displayName: userAuth?.displayName || '',
        uid: userAuth?.uid || '',
        verified: userAuth?.emailVerified,
    }
}