import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthServices } from 'src/services/auth.services';
import { User } from '../models/user.models';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  @Input() user!: User;
  post!: number;
  comment!: number;
  myId!: number;
  myIsAdmin!: boolean;

  constructor(private route: ActivatedRoute, private authService: AuthServices, private router: Router) { }

  ngOnInit(): void {
    const userId = this.route.snapshot.params['id'];
    this.authService.getUser(userId).subscribe({
      next: data => this.user = data,
      error: error => console.log(HttpErrorResponse),
      complete: () => {
        this.authService.getCountOfUser(this.user.id).subscribe({
          next: count => {
            this.post = count.post;
            this.comment = count.comment;
          },
          error: error => console.log(HttpErrorResponse),
          complete: () => this.getLocalUser()
        })
      }
    })
  }

  getLocalUser() {
    const myId = sessionStorage.getItem('userId');
    this.authService.getMyInfo().subscribe({
      next: data => {
        this.myId = data.id,
        this.myIsAdmin = data.isAdmin
      },
      error: error => console.log(HttpErrorResponse)
    })
  }

  deleteUser() {
    const userId = this.route.snapshot.params['id']
    this.authService.deleteUser(userId).subscribe({
      next: data => console.log(data),
      error: error => console.log(HttpErrorResponse),
      complete: () => this.router.navigateByUrl('/')
    })
  }

}
