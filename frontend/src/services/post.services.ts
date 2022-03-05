import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Post } from "src/app/models/post.models";


@Injectable({
    providedIn: 'root'
})

export class PostServices {
    apiUrl= 'http://localhost:3000/api/post';

    constructor(private httpClient: HttpClient) {}

    httpHeader= {
        headers: new HttpHeaders({
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        })
    }

    getAllPost(): Observable<Post[]> {
        return this.httpClient.get<Post[]>(this.apiUrl, {
            headers: new HttpHeaders({
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            })
        })
    }

    getOnePost(postId: number): Observable<Post> {
        return this.httpClient.get<Post>(this.apiUrl + `/${postId}`, {
            headers: new HttpHeaders({
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            })
        })
    }
    
    addPost(title: string, content: string, attachment: string): Observable<any> {
        return this.httpClient.post(this.apiUrl, {
            title: title,
            content: content,
            attachment: attachment
        }, {
            headers: new HttpHeaders({
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            })
        })
    }

    deletePost(postId: number): Observable<any> {
        return this.httpClient.delete(this.apiUrl + `/${postId}`, {
            headers: new HttpHeaders({
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            })
        })
    }
}