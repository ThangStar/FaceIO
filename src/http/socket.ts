import { io } from 'socket.io-client';

const URL = process.env.BASE_URL_API || 'http://localhost:3001';

const userInfo: user = {
    id: 1,
    username: 'Thang van',
    messages: []
}
export const socket = io(URL, {
    extraHeaders: {
        "userinfo": JSON.stringify(userInfo)
    }
})
