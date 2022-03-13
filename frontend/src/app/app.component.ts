import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServices } from 'src/services/auth.services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'frontend';
  constructor(private router: Router, private authService: AuthServices) {}

  notAuth() {
    return this.authService.getToken()
  }
}
