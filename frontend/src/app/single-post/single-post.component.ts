import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthServices } from 'src/services/auth.services';
import { LikeServices } from 'src/services/like.services';
import { PostServices } from 'src/services/post.services';
import { Post } from '../models/post.models';

@Component({
  selector: 'app-single-post',
  templateUrl: './single-post.component.html',
  styleUrls: ['./single-post.component.scss']
})
export class SinglePostComponent implements OnInit {
  @Input() post!: Post;
  likeText!: string;
  // username!: string;

  constructor(private likeService: LikeServices, private route: ActivatedRoute, private postService: PostServices, private authService: AuthServices) { }

  ngOnInit(): void {
    this.likeText = "J'aime";
    const postId = this.route.snapshot.params['id'];
    this.getPost(postId);
  }

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

  deletePost() {
    this.postService.deletePost(this.post.id).subscribe({
      next: data => console.log(data),
      error: error => console.log(HttpErrorResponse)
    })
  }

  getPost(id: number): void {
    this.postService.getOnePost(id).subscribe({
      next: data => this.post = data,
      error: error => console.log(HttpErrorResponse),
    })

  }
}
