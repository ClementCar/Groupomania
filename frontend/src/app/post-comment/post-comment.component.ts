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
  id!: number;

  constructor(private commentService: CommentServices, private authService: AuthServices) { }

  ngOnInit(): void {
    this.authService.getMyId().subscribe({
      next: myId => this.id = myId,
      error: error => console.log(HttpErrorResponse)
    })
  }

  deleteCom(id: number): void {
    this.commentService.deleteComment(id).subscribe({
      next: data => console.log(data),
      error: error => console.log(HttpErrorResponse),
    })
  }

}
