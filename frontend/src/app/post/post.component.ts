import { Component, Input, OnInit } from '@angular/core';
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
  likes!: number;

  constructor( private postService: PostServices) { }

  ngOnInit(): void {
    this.likeText = "J'aime"
    this.likes = 0;
  }

  onLike() {
    if (this.likeText === "J'aime") {
      this.likes++;
      this.likeText = "J'aime pas";
    } else {
      this.likes--;
      this.likeText = "J'aime"
    }
  }

}
