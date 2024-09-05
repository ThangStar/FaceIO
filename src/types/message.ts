import { user } from "./user"

export type message = {
    id?: string
    message: string
    user_send: string
    user_receive: string
    images?: string[],
    createdAt?: string,
    imagesFile? : File[],
    user?: user,
    seenUserId? : string[]
}