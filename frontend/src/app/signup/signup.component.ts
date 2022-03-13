import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServices } from 'src/services/auth.services';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signForm: FormGroup;

  constructor(
    private router: Router,
    private authService: AuthServices,
    public formBuilder: FormBuilder
  ) {
    // Reactiv Form
    this.signForm = this.formBuilder.group({
      email: [""],
      username: [""],
      password: [""],
      description: [""]
    })
  }

  ngOnInit(): void {
  }

  signup(): void {
    const email = this.signForm.get('email')?.value;
    const username = this.signForm.get('username')?.value;
    const password = this.signForm.get('password')?.value;
    const bio = this.signForm.get('description')?.value;
    this.authService.signup(email, username, password, bio).subscribe({
      next: data => console.log(data),
      error: error => console.log(HttpErrorResponse),
      complete: () => this.router.navigateByUrl('auth')
    })
  }

}
