import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { PostServices } from 'src/services/post.services';
import { Post } from '../models/post.models';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {
  posts!: Post[];

  constructor(private postService: PostServices) { }

  ngOnInit(): void {
    this.postService.getAllPost().subscribe({
      next: data => this.posts = data,
      error: error => console.log(HttpErrorResponse)
    });
  }

}
