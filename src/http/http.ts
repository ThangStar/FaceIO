import axios, { AxiosInstance } from "axios"
class Axios {
    http: AxiosInstance;
    constructor(header: string, token: string) {
        this.http = axios.create({
            headers: {
                ['Authorization']: token
            },
            baseURL: process.env.BASE_URL_API || "https://api.github.com",
        });
    }
}


export const http = new Axios("Authorization", "token").http