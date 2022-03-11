import { Component, Input, OnInit } from '@angular/core';
import { CommentServices } from 'src/services/comment.services';
import { Comment } from '../models/comment.models';

@Component({
  selector: 'app-post-comment',
  templateUrl: './post-comment.component.html',
  styleUrls: ['./post-comment.component.scss']
})
export class PostCommentComponent implements OnInit {
  @Input() comment!: Comment;

  constructor(private commentService: CommentServices) { }

  ngOnInit(): void {
  }

}
