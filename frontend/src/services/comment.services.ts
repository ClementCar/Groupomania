import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";


@Injectable({
    providedIn: 'root'
})

export class CommentServices {
    apiUrl = 'http://localhost:3000/api/post';

    constructor(private httpClient: HttpClient) {}

    httpHeader = {
        headers: new HttpHeaders({
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        })
    }

    addComment(postId: number, content: string): Observable<any> {
        return this.httpClient.post(this.apiUrl + `/${postId}` + '/comment', {
            content: content
        }, {
            headers: new HttpHeaders({
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            })
        })
    }

    getComment(postId: number): Observable<Comment[]> {
        return this.httpClient.get<Comment[]>(this.apiUrl + `/${postId}` + '/comment',{
            headers: new HttpHeaders({
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            })
        })
    }

    deleteComment(commentId: number): Observable<any> {
        return this.httpClient.delete(this.apiUrl + '/comment' + `/${commentId}`, {
            headers: new HttpHeaders({
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            })
        })
    }
}