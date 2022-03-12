import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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
  newForm: FormGroup;
  imageUrl?: string;
  sendFile!: File;

  constructor(
    private router: Router,
    private postService: PostServices,
    private route: ActivatedRoute,
    public formBuilder: FormBuilder
  ) {
    // Form reactiv
    this.newForm = this.formBuilder.group({
      title: [""],
      content: [""],
      file: [null]
    })
  }

  ngOnInit(): void {
    const postId = this.route.snapshot.params['id'];
    this.postService.getOnePost(postId).subscribe({
      next: data => this.post = data,
      error: error => console.log(HttpErrorResponse)
    })
  }

  preview(event: { target: any; }) {
    const filess = (<HTMLInputElement>document.getElementById('attachment')).files
    console.log(filess![0])
    const file = event.target.files
    console.log(file[0])
    this.sendFile = file[0];
    console.log(this.sendFile)

    const reader = new FileReader();

    reader.onload = () => {
      this.imageUrl = reader.result as string;
    }
    reader.readAsDataURL(this.sendFile)
  }

  addPost(): void {
    const title = this.newForm.get('title')?.value;
    const content = this.newForm.get('content')?.value;
    this.postService.addPost(title, content, this.sendFile).subscribe({
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
    this.postService.modifyPost(this.post.id,title, content).subscribe({
      next: data => console.log(data),
      error: error => console.log(HttpErrorResponse),
      complete: () => this.router.navigateByUrl(`/post/${this.route.snapshot.params['id']}`)
    })
  }

}
