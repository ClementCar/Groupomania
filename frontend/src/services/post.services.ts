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
}