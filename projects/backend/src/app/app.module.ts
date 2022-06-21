import { NgModule } from '@angular/core';
import {BrowserModule, BrowserTransferStateModule} from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AllPostComponent } from './pages/posts/all-post/all-post.component';
import { CategoryComponent } from './pages/category/category.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {CustomInterceptor} from "./interceptor/custom.interceptor";
import {AdminApiService} from "./services/api.service";
import {MetaService} from "./services/meta.service";
import {LocalStorageService} from "./services/local-storage.service";
import {AuthService} from "./services/auth.service";
import {HelpersService} from "./services/helpers.service";
import {MessageService} from "./services/message.service";
import {AlertService} from "./services/alert.service";
import {AdminGuardService} from "./services/guard.service";
import {LinkService} from "./services/link.service";
import {ToastrModule} from "ngx-toastr";
import { UsersComponent } from './pages/users/users.component';
import { SingleUserComponent } from './pages/users/single-user/single-user.component';
import { SinglePostComponent } from './pages/posts/single-post/single-post.component';
import {PipeModule} from "./pipes/pipe.module";
import {ComponentsModule} from "./components/components.module";
import { SingleCategoryComponent } from './pages/category/single-category/single-category.component';
import { SingleTermComponent } from './pages/term/single-term/single-term.component';
import { TermComponent } from './pages/term/term.component';
import { EpisodeComponent } from './pages/episode/episode.component';
import { SingleEpisodeComponent } from './pages/episode/single-episode/single-episode.component';
import { ContactSubmissionsComponent } from './pages/contact-submissions/contact-submissions.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    AllPostComponent,
    CategoryComponent,
    UsersComponent,
    SingleUserComponent,
    SinglePostComponent,
    SingleCategoryComponent,
    SingleTermComponent,
    TermComponent,
    EpisodeComponent,
    SingleEpisodeComponent,
    ContactSubmissionsComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({appId: 'cd-admin'}),
    BrowserTransferStateModule,
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    PipeModule,
    ReactiveFormsModule,
    ComponentsModule,
    ToastrModule.forRoot(),
  ],
  providers: [
    AdminApiService,
    {
      multi: true,
      provide: HTTP_INTERCEPTORS,
      useClass: CustomInterceptor
    },
    MetaService,
    LocalStorageService,
    AuthService,
    HelpersService,
    MessageService,
    AlertService,
    LinkService,
    AdminGuardService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
