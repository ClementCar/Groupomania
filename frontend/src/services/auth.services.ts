import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core"
import { Observable } from "rxjs";


@Injectable({
    providedIn: 'root'
})

export class AuthServices {

    apiUrl= 'http://localhost:3000/api/auth';

    constructor (private httpClient: HttpClient) {}

    httpHeader= {
        headers: new HttpHeaders({
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        })
    }

    login(email: string, password: string): Observable<any> {
        return this.httpClient.post(this.apiUrl + '/login', {
            email: email,
            password: password
        })
    }

    signup(email: string, username: string, password: string, bio: string): Observable<any> {
        return this.httpClient.post(this.apiUrl + '/signup', {
            email: email,
            username: username,
            password: password,
            bio: bio
        })
    }

    getUser(userId: number): Observable<any> {
        return this.httpClient.get(this.apiUrl + `/${userId}`, {
            headers: new HttpHeaders({
                'Authorization': 'Bearer ' + sessionStorage.getItem('token')
            })
        })
    }

    deleteUser(userId: number): Observable<any> {
        return this.httpClient.delete(this.apiUrl + `/${userId}`, {
            headers: new HttpHeaders({
                'Authorization': 'Bearer ' + sessionStorage.getItem('token')
            })
        })
    }

    getMyInfo(): Observable<any> {
        return this.httpClient.get(this.apiUrl + `/${sessionStorage.getItem('userId')}`, {
            headers: new HttpHeaders({
                'Authorization': 'Bearer ' + sessionStorage.getItem('token')
            })
        })
    }

    getMyId():Observable<any> {
        return this.httpClient.get(this.apiUrl + '/me', {
            headers: new HttpHeaders({
                'Authorization': 'Bearer ' + sessionStorage.getItem('token')
            })
        })
    }

    getCountOfUser(userId: number): Observable<any> {
        return this.httpClient.get(this.apiUrl + `/${userId}` + '/count', {
            headers: new HttpHeaders({
                'Authorization': 'Bearer ' + sessionStorage.getItem('token')
            })
        })
    }

    getToken() {
        return sessionStorage.getItem('token');
    }
}