export interface User {
    email: string,
    password: string,
    returnSecureToken?: boolean
}

export interface Task {
    id?: string,
    text: string;
    date: Date
}

export interface FbCreateResponse {
    name: string;
}