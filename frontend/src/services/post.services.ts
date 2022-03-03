import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";


@Injectable({
    providedIn: 'root'
})

export class PostServices {
    apiUrl= 'http://localhost:3000/api/post';

    constructor(private httpClient: HttpClient) {}

    getAllPost(): Observable<any> {
        return this.httpClient.get(this.apiUrl)
    }

    getOnePost(postId: number): Observable<any> {
        return this.httpClient.get(this.apiUrl + `/${postId}`)
    }
    
    addPost(title: string, content: string, attachment: string): Observable<any> {
        return this.httpClient.post(this.apiUrl, {
            title: title,
            content: content,
            attachment: attachment
        })
    }

    deletePost(postId: number): Observable<any> {
        return this.httpClient.delete(this.apiUrl + `/${postId}`)
    }
}