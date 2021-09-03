import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
 import { AppComponent } from './app.component';
import { AuthGuard } from './auth.guard';
import { ChatComponent } from './chat/chat.component';
import { ChatsComponent } from './chats/chats.component';
import { CreateAccountComponent } from './create-account/create-account.component';
import { ViewPostWithCommandComponent } from './dialog/view-post-with-command/view-post-with-command.component';
import { EmptyComponent } from './empty/empty.component';
import { ExploreComponent } from './explore/explore.component';
import { FeedComponent } from './feed/feed.component';
import { HomeSideComponent } from './home-side/home-side.component';
import { HomeComponent } from './home/home.component';
import { IgtvComponent } from './igtv/igtv.component';
import { MessagesComponent } from './messages/messages.component';
import { PostsComponent } from './posts/posts.component';
import { ProfileComponent } from './profile/profile.component';
import { SavedComponent } from './saved/saved.component';
import { ViewPostsComponent } from './view-posts/view-posts.component';
import { ViewProfileComponent } from './view-profile/view-profile.component';

const routes: Routes = [
  {
    path:'home',component: HomeComponent,
    children:[
      {path:'feed',outlet:'first',component:FeedComponent},
      {path:'homeSide',outlet:'second',component:HomeSideComponent}],
   },
  {
    path:'profile',component: ProfileComponent,
    children:[{path:'post',component:PostsComponent},
    {path:'igtv',component:IgtvComponent},
    {path:'save',component:SavedComponent}
  ]
  },
  {
    path:"create",
    component:CreateAccountComponent
  },
  {
    path:'chat',component: ChatComponent,
    children:[
      {path:'chats',outlet:'chat',component:ChatsComponent},
      {path:'empty',outlet:'chatBox',component:EmptyComponent},
      {path:'message',outlet:'chatBox',component:MessagesComponent}
    ]
  },{
    path:'explore',
    component:ExploreComponent
  },
{
path:"viewProfile",
component:ViewProfileComponent,
children:[{path:"post",component:ViewPostsComponent}]
},
  {
    path: '',
    redirectTo: 'create',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
