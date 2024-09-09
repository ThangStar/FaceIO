export const saveToStorage = (key: string, value: any) => {
    localStorage.setItem(key, JSON.stringify(value));
    return value;
};
export const getInStorage = (key: string) => {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : "No data found!";
}

export const redirectConfig = () => {
    return (process.env.NEXT_PUBLIC_NODE_ENV || "PRODUCTION") == "PRODUCTION" ? '/FaceIO' : ''
}