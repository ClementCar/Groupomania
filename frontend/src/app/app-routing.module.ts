import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AddPostComponent } from "./add-post/add-post.component";
import { LoginComponent } from "./login/login.component";
import { PostListComponent } from "./post-list/post-list.component";
import { SignupComponent } from "./signup/signup.component";
import { SinglePostComponent } from "./single-post/single-post.component";
import { UserComponent } from "./user/user.component";

const routes: Routes = [
    { path: 'auth', component: LoginComponent},
    { path: 'auth/signup', component: SignupComponent},
    { path: '', component: PostListComponent},
    { path: 'post/new', component: AddPostComponent},
    { path: 'post/:id', component: SinglePostComponent},
    { path: 'profile/:id', component: UserComponent}
    
]

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule
    ]
})

export class AppRoutingModule {}