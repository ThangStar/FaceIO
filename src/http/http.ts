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
            baseURL: process.env.BASE_URL_API || "http://192.168.10.223:3001",
        });
    }
}


export const http = new Axios().http