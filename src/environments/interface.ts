export interface Environment {
    apiKey: string,
    production: boolean
}

export interface FBAuthResponse {
    idToken: string,
    expiresIn: string
}