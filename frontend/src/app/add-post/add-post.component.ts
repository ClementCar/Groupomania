import { convertPropertyBinding } from '@angular/compiler/src/compiler_util/expression_converter';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PostServices } from 'src/services/post.services';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.scss']
})
export class AddPostComponent implements OnInit {

  constructor(
    private router: Router,
    private postService: PostServices
  ) { }

  ngOnInit(): void {
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

}
