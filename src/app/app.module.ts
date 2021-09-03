import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MaterialModule} from './material/material.module'
import {IvyCarouselModule} from 'angular-responsive-carousel';
import { FeedComponent } from './feed/feed.component';
import { SuugestComponent } from './suugest/suugest.component';
import { HomeSideComponent } from './home-side/home-side.component';
import { ChatComponent } from './chat/chat.component';
import { ChatsComponent } from './chats/chats.component';
import { ProfileComponent } from './profile/profile.component';
import { EmptyComponent } from './empty/empty.component';
import { HomeComponent } from './home/home.component';
import { PostsComponent } from './posts/posts.component';
import { SavedComponent } from './saved/saved.component';
import { IgtvComponent } from './igtv/igtv.component';
import { MessagesComponent } from './messages/messages.component';
import { AddPostComponent } from './dialog/add-post/add-post.component';
import { AddStoryComponent } from './dialog/add-story/add-story.component';
import { ViewStoryComponent } from './dialog/view-story/view-story.component';
import { ViewPostWithCommandComponent } from './dialog/view-post-with-command/view-post-with-command.component';
import { ExploreComponent } from './explore/explore.component';
import { CreateAccountComponent } from './create-account/create-account.component';
import { LoginComponent } from './login/login.component';
import { CreateComponent } from './dialog/create/create.component';
import { EditProfileComponent } from './dialog/edit-profile/edit-profile.component';
import{HttpClientModule} from '@angular/common/http';
import { ViewCommentsComponent } from './dialog/view-comments/view-comments.component';
import { PermissonComponent } from './dialog/permisson/permisson.component';
import { ViewProfileComponent } from './view-profile/view-profile.component';
import { ViewPostsComponent } from './view-posts/view-posts.component';
import { ViewSaveComponent } from './view-save/view-save.component';
@NgModule({
  declarations: [
    AppComponent,
    FeedComponent,
    SuugestComponent,
    HomeSideComponent,
    ChatComponent,
    ChatsComponent,
    ProfileComponent,
    EmptyComponent,
    HomeComponent,
    PostsComponent,
    SavedComponent,
    IgtvComponent,
    MessagesComponent,
    AddPostComponent,
    AddStoryComponent,
    ViewStoryComponent,
    ViewPostWithCommandComponent,
    ExploreComponent,
    CreateAccountComponent,
    LoginComponent,
    CreateComponent,
    EditProfileComponent,
    ViewCommentsComponent,
    PermissonComponent,
    ViewProfileComponent,
    ViewPostsComponent,
    ViewSaveComponent,
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    IvyCarouselModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
