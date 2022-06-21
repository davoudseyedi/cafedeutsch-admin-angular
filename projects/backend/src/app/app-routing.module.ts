import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./pages/login/login.component";
import {AdminGuardService} from "./services/guard.service";
import {DashboardComponent} from "./pages/dashboard/dashboard.component";
import {AllPostComponent} from "./pages/posts/all-post/all-post.component";
import {SinglePostComponent} from "./pages/posts/single-post/single-post.component";
import {CategoryComponent} from "./pages/category/category.component";
import {SingleCategoryComponent} from "./pages/category/single-category/single-category.component";
import {UsersComponent} from "./pages/users/users.component";
import {SingleUserComponent} from "./pages/users/single-user/single-user.component";
import {SingleTermComponent} from "./pages/term/single-term/single-term.component";
import {TermComponent} from "./pages/term/term.component";
import {EpisodeComponent} from "./pages/episode/episode.component";
import {SingleEpisodeComponent} from "./pages/episode/single-episode/single-episode.component";
import {ContactSubmissionsComponent} from "./pages/contact-submissions/contact-submissions.component";

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'panel',
    canActivate: [AdminGuardService],
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'dashboard'
      },
      {
        component: DashboardComponent,
        canActivate: [AdminGuardService],
        path: 'dashboard'
      },
      {
        path: 'posts',
        canActivate: [AdminGuardService],
        component: AllPostComponent
      },
      {
        path: 'posts/:id',
        canActivate: [AdminGuardService],
        component: SinglePostComponent
      },
      {
        path: 'episodes',
        canActivate: [AdminGuardService],
        component: EpisodeComponent
      },
      {
        path: 'episodes/:id',
        canActivate: [AdminGuardService],
        component: SingleEpisodeComponent
      },
      {
        path: 'categories',
        canActivate: [AdminGuardService],
        component: CategoryComponent
      },
      {
        path: 'categories/:id',
        canActivate: [AdminGuardService],
        component: SingleCategoryComponent
      },
      {
        path: 'categories/:pid/term',
        canActivate: [AdminGuardService],
        component: TermComponent
      },
      {
        path: 'categories/:pid/term/:cid',
        canActivate: [AdminGuardService],
        component: SingleTermComponent
      },
      {
        path: 'users',
        canActivate: [AdminGuardService],
        component: UsersComponent
      },
      {
        path: 'users/:id',
        canActivate: [AdminGuardService],
        component: SingleUserComponent
      },
      {
        path: 'submissions',
        canActivate: [AdminGuardService],
        component: ContactSubmissionsComponent
      },
      {
        path: '**',
        redirectTo: 'dashboard'
      },
    ]
  },
  {
    path: '**',
    redirectTo: 'login'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
