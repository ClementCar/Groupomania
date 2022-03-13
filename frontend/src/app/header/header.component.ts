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
    const userId = sessionStorage.getItem('userId');
    this.router.navigateByUrl(`profile/${userId}`)
  }

  disconnect(): void {
    sessionStorage.clear();
    this.router.navigateByUrl('auth');
  }

}
