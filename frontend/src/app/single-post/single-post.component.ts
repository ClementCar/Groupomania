import { Component, Input, OnInit } from '@angular/core';
import { Post } from '../models/post.models';

@Component({
  selector: 'app-single-post',
  templateUrl: './single-post.component.html',
  styleUrls: ['./single-post.component.scss']
})
export class SinglePostComponent implements OnInit {
  @Input() post!: Post;
  likeText!: string;
  likes!: number;

  constructor() { }

  ngOnInit(): void {
    this.likeText = "J'aime";
    this.likes = 0
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
