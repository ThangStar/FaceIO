import axios, { AxiosInstance } from "axios"
export class Axios {
    http: AxiosInstance;
    static token: string | undefined;
    constructor() {
        this.http = axios.create({
            headers: {
                ['Authorization']: `Bearer ${Axios.token}`,
                ['Content-Type']: 'application/x-www-form-urlencoded',
            },
            baseURL: process.env.BASE_URL_API || "http://localhost:3000",
        });
    }
}


export const http = new Axios().http

