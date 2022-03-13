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
                'Authorization': 'Bearer ' + sessionStorage.getItem('token')
            })
        })
    }

    getOnePost(postId: number): Observable<Post> {
        return this.httpClient.get<Post>(this.apiUrl + `/${postId}`, {
            headers: new HttpHeaders({
                'Authorization': 'Bearer ' + sessionStorage.getItem('token')
            })
        })
    }
    
    addPost(title: string, content: string, attachment: File): Observable<any> {
        const formData = new FormData();
        formData.append('title', title)
        formData.append('content', content)
        formData.append('image', attachment)
        return this.httpClient.post(this.apiUrl, formData, {
            headers: new HttpHeaders({
                'Authorization': 'Bearer ' + sessionStorage.getItem('token')
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

    modifyPost(postId: number, title: string, content: string): Observable<any> {
        return this.httpClient.put(this.apiUrl + `/${postId}`, {
            title: title,
            content: content,
        }, {
            headers: new HttpHeaders({
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            })
        })
    }
}