import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";


@Injectable({
    providedIn: 'root'
})

export class LikeServices {
    apiUrl = 'http://localhost:3000/api/post/';

    constructor(private httpClient: HttpClient) {}

    httpHeader = {
        headers: new HttpHeaders({
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        })
    }

    likePost(postId: number, postType: "J'aime" | "J'aime pas"): Observable<any> {
        if(postType === "J'aime") {
            return this.httpClient.post(this.apiUrl + `${postId}` + '/like', {
                like: 1
            }, {
                headers: new HttpHeaders({
                    'Authorization': 'Bearer ' + sessionStorage.getItem('token')
                })
            })
        } else {
            return this.httpClient.post(this.apiUrl + `${postId}` + '/like', {
                like: 0
            }, {
                headers: new HttpHeaders({
                    'Authorization': 'Bearer ' + sessionStorage.getItem('token')
                })
            })
        }
    }

    isLike(postId: number): Observable<any> {
        return this.httpClient.get(this.apiUrl + `${postId}` + '/like', {
            headers: new HttpHeaders({
                'Authorization': 'Bearer ' + sessionStorage.getItem('token')
            })
        })
    }
}