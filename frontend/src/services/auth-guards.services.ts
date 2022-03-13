import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable, of } from "rxjs";
import { AuthServices } from "./auth.services";

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router, private authService: AuthServices) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        if(this.authService.getToken()) {
            return of(true)
        } else {
            this.router.navigateByUrl('/auth')
            return of(false)
        }
    }
}