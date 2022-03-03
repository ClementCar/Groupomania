import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServices } from 'src/services/auth.services';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  constructor(
    private router: Router,
    private authService: AuthServices
  ) { }

  ngOnInit(): void {
  }

  signup(): void {
    const email = (<HTMLInputElement>document.getElementById('email')).value;
    const username = (<HTMLInputElement>document.getElementById('username')).value;
    const password = (<HTMLInputElement>document.getElementById('password')).value;
    const bio = (<HTMLInputElement>document.getElementById('description')).value;
    this.authService.signup(email, username, password, bio).subscribe({
      next: data => console.log(data),
      error: error => console.log(HttpErrorResponse),
      complete: () => this.router.navigateByUrl('auth')
    })
  }

}
