export const useLocalStorage = (key: string, value?: any) => {
    if (value) {
        localStorage.setItem(key, JSON.stringify(value));
        return value;
    } else {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : "No data found";
    }
}

