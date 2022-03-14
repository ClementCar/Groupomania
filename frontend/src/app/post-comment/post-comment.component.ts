import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { AuthServices } from 'src/services/auth.services';
import { CommentServices } from 'src/services/comment.services';
import { Comment } from '../models/comment.models';

@Component({
  selector: 'app-post-comment',
  templateUrl: './post-comment.component.html',
  styleUrls: ['./post-comment.component.scss']
})
export class PostCommentComponent implements OnInit {
  @Input() comment!: Comment;
  myId!: number;
  myIsAdmin!: boolean;

  constructor(private commentService: CommentServices, private authService: AuthServices) { }

  ngOnInit(): void {
    const myId = sessionStorage.getItem('userId');
    this.authService.getMyInfo().subscribe({
      next: data => {
        this.myId = data.id,
        this.myIsAdmin = data.isAdmin
      },
      error: error => console.log(HttpErrorResponse)
    })
    console.log(this.myIsAdmin)
  }

  deleteCom(id: number): void {
    this.commentService.deleteComment(id).subscribe({
      next: data => console.log(data),
      error: error => console.log(HttpErrorResponse),
      complete: () => window.location.reload()
    })
  }
}
