import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class HttpCallService {

  constructor(private http:HttpClient) { }


resgister(obj:Object):Observable<any>{
 return this.http.post("http://localhost:3000/user/register",obj)
}
addPost(obj:FormData):Observable<any>{
  return this.http.post(" http://localhost:3000/post/addPost",obj)
}
addSave(obj:object):Observable<any>{
  return this.http.post(" http://localhost:3000/post/addSave",obj)
}
addStory(obj:FormData):Observable<any>{
  return this.http.post(" http://localhost:3000/story/add",obj)
}
addChat(obj:object):Observable<any>{
  return this.http.post(" http://localhost:3000/chat/add",obj)
}
getPos(obj:object):Observable<any>{
  return this.http.post(" http://localhost:3000/post/getPost",obj)
}
getChat(obj:object):Observable<any>{
  return this.http.post(" http://localhost:3000/chat/getChatt",obj)
}
getPost(obj:object):Observable<any>{
  return this.http.post(" http://localhost:3000/post/getPosts",obj)
}
getAllPost( ):Observable<any>{
  return this.http.get("http://localhost:3000/post/getALLPosts")
}
getPostOfFollowers(obj:object):Observable<any>{
  return this.http.post(" http://localhost:3000/post/getPostsOfFollowers",obj)
}
updateUser(obj:FormData):Observable<any>{
  return this.http.post(" http://localhost:3000/user/updateUser",obj)
}
updateComment(obj:object):Observable<any>{
  return this.http.post(" http://localhost:3000/post/updateComment",obj)
}
deletePost(obj:object):Observable<any>{
  return this.http.post(" http://localhost:3000/post/deletePost",obj)
}
updatelike(obj:object):Observable<any>{
  return this.http.post(" http://localhost:3000/post/updatelike",obj)
}

updateFollowing(obj:object):Observable<any>{
  return this.http.post(" http://localhost:3000/user/updateFolloing",obj)
}
updateFollowers(obj:object):Observable<any>{
  return this.http.post(" http://localhost:3000/user/updateFollowers",obj)
}
login(obj:object):Observable<any>{
  return this.http.post(" http://localhost:3000/login",obj)
}
getUserDetail(obj:object):Observable<any>{
  return this.http.post(" http://localhost:3000/getUserDetail",obj)
}
getStoryOfUser(obj:object):Observable<any>{
  return this.http.post(" http://localhost:3000/story/get",obj)
}
getUserDetailForStory(obj:object):Observable<any>{
  return this.http.post(" http://localhost:3000/user/getStoryUser",obj)
}
getUserDetailWithName(obj:object):Observable<any>{
  return this.http.post(" http://localhost:3000/user/getUserWithName",obj)
}
getUserDetails( ):Observable<any>{
  return this.http.get(" http://localhost:3000/user/getUsers")
}
checkToken(obj:object):Observable<any>{
  return this.http.post(" http://localhost:3000/check",obj)
}

}
