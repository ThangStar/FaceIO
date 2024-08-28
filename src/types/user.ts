export interface user {
    id: number,
    username: string,
    messages?: message[],
    accessToken?: string
    refreshToken?: string
    password?: string
    email?: string
    displayName?: string
}

