import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServices } from 'src/services/auth.services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  logForm: FormGroup;

  constructor(
    private router: Router,
    private authService: AuthServices,
    public formBuilder: FormBuilder
  ) {
    // Reactiv Form
    this.logForm = this.formBuilder.group({
      email: [""],
      password: [""]
    })
  }

  ngOnInit(): void {
  }

  toSignup(): void {
    this.router.navigateByUrl('auth/signup');
  }

  login(): void {
    const inputEmail = this.logForm.get('email')?.value;
    const inputPassword = this.logForm.get('password')?.value;
    this.authService.login(inputEmail, inputPassword).subscribe({
      next: data => {
        sessionStorage.setItem('userId', data.userId);
        sessionStorage.setItem('token', data.token)
      },
      error: error => console.log(HttpErrorResponse),
      complete: () => this.router.navigateByUrl('')
      
    })

  }
}
