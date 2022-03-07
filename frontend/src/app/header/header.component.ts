import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PostServices } from 'src/services/post.services';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(
    private router: Router,
    private postService: PostServices
  ) { }

  ngOnInit(): void {
  }

  myProfile(): void {
    const userId = localStorage.getItem('userId');
    this.router.navigateByUrl(`profile/${userId}`)
  }

  disconnect(): void {
    localStorage.clear();
    this.router.navigateByUrl('auth');
  }

}
