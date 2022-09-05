export interface Environment {
    apiKey: string,
    production: boolean,
    fbDbUrl: string
}

export interface FBAuthResponse {
    idToken: string,
    expiresIn: string
}