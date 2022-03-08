import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServices } from 'src/services/auth.services';
import { LikeServices } from 'src/services/like.services';
import { PostServices } from 'src/services/post.services';
import { Post } from '../models/post.models';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  @Input() post!: Post;
  likeText!: string;
  username!: string;

  constructor( private postService: PostServices, private router: Router, private likeService: LikeServices, private authService: AuthServices ) { }

  ngOnInit(): void {
    this.likeText = "J'aime";
    // this.authService.getUser(this.post.userId).subscribe({
    //   next: data => this.username = data.username,
    //   error: error => console.log(HttpErrorResponse)
    // })
  }

  // setUsername(): void {
  //   this.authService.getUser(this.post.userId).subscribe({
  //     next: data => this.username = data.username,
  //     error: error => console.log(HttpErrorResponse)
  //   })
  // }

  onLike() {
    if (this.likeText === "J'aime") {
      this.likeService.likePost(this.post.id, "J'aime").subscribe({
        next: data => console.log(data),
        error: error => console.log(HttpErrorResponse),
        complete: () => this.likeText = "J'aime pas"
      })
    } else {
      this.likeService.likePost(this.post.id, "J'aime pas").subscribe({
        next: data => console.log(data),
        error: error => console.log(HttpErrorResponse),
        complete: () => this.likeText = "J'aime"
      })
    }
  }
}
