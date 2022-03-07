import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthServices } from 'src/services/auth.services';
import { User } from '../models/user.models';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  @Input() user!: User;

  constructor(private route: ActivatedRoute, private authService: AuthServices) { }

  ngOnInit(): void {
    const userId = this.route.snapshot.params['id'];
    this.authService.getUser(userId).subscribe({
      next: data => this.user = data,
      error: error => console.log(HttpErrorResponse)
    })
  }

}
