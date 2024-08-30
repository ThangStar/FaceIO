import { user } from "./user"

export interface post {
    id: string
    title: string
    body: string
    images?: string
    createdAt?: string
    uid?: number
    likes?: string[]
    createdBy?: string,
    userCreated?: user
}