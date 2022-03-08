import { HttpErrorResponse } from '@angular/common/http';
import { convertPropertyBinding } from '@angular/compiler/src/compiler_util/expression_converter';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PostServices } from 'src/services/post.services';
import { Post } from '../models/post.models';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.scss']
})
export class AddPostComponent implements OnInit {
  @Input() post!: Post;

  constructor(
    private router: Router,
    private postService: PostServices,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const postId = this.route.snapshot.params['id'];
    this.postService.getOnePost(postId).subscribe({
      next: data => this.post = data,
      error: error => console.log(HttpErrorResponse)
    })
  }

  addPost(): void {
    const title = (<HTMLInputElement>document.getElementById('title')).value;
    const content = (<HTMLInputElement>document.getElementById('content')).value;
    const attachment = (<HTMLInputElement>document.getElementById('attachment')).value;
    this.postService.addPost(title, content, attachment).subscribe({
      next: data => console.log(data),
      error: error => console.log(error),
      complete: () => this.router.navigateByUrl('/')
    })
  }

  addRoute() {
    return this.router.url === '/post/new';
  }

  modifyRoute() {
    return this.router.url.includes('/post/modify')
  }

  modifyPost(): void {
    const title = (<HTMLInputElement>document.getElementById('title')).value;
    const content = (<HTMLInputElement>document.getElementById('content')).value;
    const attachment = (<HTMLInputElement>document.getElementById('attachment')).value;
    this.postService.modifyPost(title, content, attachment).subscribe({
      next: data => console.log(data),
      error: error => console.log(HttpErrorResponse),
      complete: () => this.router.navigateByUrl(`/post/${this.route.snapshot.params['id']}`)
    })
  }

}
