import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthServices } from 'src/services/auth.services';
import { CommentServices } from 'src/services/comment.services';
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
  condition!: string;
  myId!: number;
  myIsAdmin!: boolean;
  commentForm: FormGroup;

  constructor(private likeService: LikeServices, 
    private route: ActivatedRoute, 
    private postService: PostServices, 
    private router: Router, 
    private commentService: CommentServices,
    private authService: AuthServices,
    public formBuilder: FormBuilder
    ) {
      this.commentForm = this.formBuilder.group({
        comment: [""]
      })
    }

  ngOnInit(): void {
    this.condition = "J'aime pas"
    const postId = this.route.snapshot.params['id'];
    this.postService.getOnePost(postId).subscribe({
      next: data => {
        this.post = data
      },
      error: error => console.log(HttpErrorResponse),
      complete: (() => {
        this.initLikeText();
        this.getLocalUser();
      })
    })
  }

  initLikeText() {
    if (this.post.likes > 0) {
      this.likeService.isLike(this.post.id).subscribe({
        next: dataLike => {
          console.log(dataLike)
          if (dataLike.message == 'liked') {
            this.likeText = "J'aime pas"
          } else {
            this.likeText = "J'aime"
          }
        },
        error: error => console.log(HttpErrorResponse)
      })
    } else {
      this.likeText = "J'aime"
    }
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

  deletePost() {
    this.postService.deletePost(this.post.id).subscribe({
      next: data => console.log(data),
      error: error => console.log(HttpErrorResponse),
      complete: () => this.router.navigateByUrl('/')
    })
  }

  newComment() {
    var postId = this.post.id;
    var content = this.commentForm.get('comment')?.value;
    this.commentService.addComment(postId, content).subscribe({
      next: data => console.log(data),
      error: error => console.log(HttpErrorResponse),
      complete: () => window.location.reload()
    })
  }
}
