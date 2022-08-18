import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { User } from "./interface";
import { Observable, Subject, throwError } from "rxjs";
import { environment } from "src/environments/environment";
import { catchError, tap } from 'rxjs/operators'
import { FBAuthResponse } from "src/environments/interface";

@Injectable({ providedIn: 'root', })

export class AuthService {
    
    public error$: Subject<string> = new Subject<string>();

    constructor(private http: HttpClient) {}
    
    get token(): string | null {
        const dateStr = localStorage.getItem('fb-token-exp');
        if(dateStr) {
            const expDate = new Date(dateStr);
            
            if(new Date() > expDate) {
                this.logout();
                return null;
            }
        }
        return localStorage.getItem('fb-token');
    }

    login(user: User): Observable<any> {
        user.returnSecureToken = true;
        return this.http.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.apiKey}`, user)
        .pipe(
            tap<any>(this.setToken),
            catchError<HttpErrorResponse, any>(this.handleError.bind(this))
        )
    }

    logout() {
        this.setToken(null)
    }

    isAuthenticated(): boolean {
        return !!this.token;
    }
    
    private setToken(res: FBAuthResponse | null) {
        if(res) {
            const expDate = new Date(new Date().getTime() + +res.expiresIn * 1000)
            localStorage.setItem('fb-token', res.idToken)
            localStorage.setItem('fb-token-exp', expDate.toString())
        } else {
            localStorage.clear()
        }
    }

    private handleError(error: HttpErrorResponse) {
        const {message} = error.error.error

        switch(message) {
            case 'EMAIL_NOT_FOUND':
                this.error$.next('There is no such email in the database')
                break
            case 'INVALID_EMAIL':
                this.error$.next('This email is invalid')
                break
            case 'INVALID_PASSWORD':
                this.error$.next('This password is invalid')
                break
        }

        return throwError(error)
    }
}