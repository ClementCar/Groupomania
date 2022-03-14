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
  condition!: string;

  constructor( private postService: PostServices, 
    private router: Router, 
    private likeService: LikeServices, 
    private authService: AuthServices 
    ) { }

  ngOnInit(): void {
    this.condition = "J'aime pas";
    if (this.post.likes > 0) {
      this.authService.getMyId().subscribe({
        next: data => {
          console.log(data)
          for ( let like of this.post.Likes ) {
            if (like.userId === data ) {
              this.likeText = "J'aime pas"
            } else {
              this.likeText = "J'aime"
            }
          }
        },
        error: error => console.log(HttpErrorResponse)
      })
    } else {
      this.likeText = "J'aime"
    }
  }

  onLike() {
    if (this.likeText === "J'aime") {
      this.likeService.likePost(this.post.id, "J'aime").subscribe({
        next: data => console.log(data),
        error: error => console.log(HttpErrorResponse),
        complete: () => this.likeText = "J'aime pas"
      })
      this.post.likes++;
    } else {
      this.likeService.likePost(this.post.id, "J'aime pas").subscribe({
        next: data => console.log(data),
        error: error => console.log(HttpErrorResponse),
        complete: () => this.likeText = "J'aime"
      })
      this.post.likes--;
    }
  }
}
