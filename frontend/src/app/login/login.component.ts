import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServices } from 'src/services/auth.services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private router: Router,
    private authService: AuthServices
  ) { }

  ngOnInit(): void {
  }

  toSignup(): void {
    this.router.navigateByUrl('signup');
  }

  login(): void {
    const inputEmail = (<HTMLInputElement>document.getElementById('inputEmail')).value;
    const inputPassword = (<HTMLInputElement>document.getElementById('inputPassword')).value
    this.authService.login(inputEmail, inputPassword).subscribe({
      next: data => console.log(data),
      error: error => console.log(HttpErrorResponse),
      complete: () => this.router.navigateByUrl('signup')
      
    })

  }
  // (<HTMLInputElement>document.getElementById(elementId)).value;
}
