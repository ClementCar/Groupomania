import { Injectable } from "@angular/core"


@Injectable({
    providedIn: 'root'
})

export class AuthServices {

    login(email: string, password: string): void {
        const userInfo = {
            email: email,
            password: password
        }
        fetch('http://localhost:3000/api/auth/login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userInfo)
        })
        .then()
        .catch(error => console.log("erreur", error))
    }

    signup(email: string, username: string, password: string, bio: string): void {
        const userInfo = {
            email: email,
            username: username,
            password: password,
            bio: bio
        }
    }
}