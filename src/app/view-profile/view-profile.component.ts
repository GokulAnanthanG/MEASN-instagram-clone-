import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { EditProfileComponent } from '../dialog/edit-profile/edit-profile.component';
import { PermissonComponent } from '../dialog/permisson/permisson.component';
import { DataServiveService } from '../services/data-servive.service';
import { HttpCallService } from '../services/http-call.service';

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.css']
})
export class ViewProfileComponent implements OnInit {
viewProfileOf:any;
data:any//user data;
userData:any;
IamAlreadyFollowingThisProfile:any;

//
iMFollowing:any=false;
openentFollowing:any=false;
followFollowingTextStaus:string="Follow"
//
///
cborderRadius:number=300
  ccellWidth:number=10
    cheight:number=120
   ccellsToShow:number=6
   ccellsToScroll:number=3
 
//active
positive:Array<boolean>=[true,false,false,false];
negative:Array<boolean>=[false,true,true,true];
///
  constructor(private httpCall:HttpCallService,public dataSer:DataServiveService,private route:Router,private dialog:MatDialog) {
//
this.dataSer.navStatus=true;

this.httpCall.getUserDetail({id:localStorage.getItem("instaCloneUserId")}).subscribe(x=>{
  console.log("user detail "+x)
  this.userData=x.data;
  localStorage.setItem("userDetail",JSON.stringify(x.data)) 
},(err)=>{
  console.log("http error ",err)
})
 //
this.httpCall.checkToken({token:localStorage.getItem("loginToken")}).subscribe(  x=>{
  console.log("auth check ",x)   
  if(x.result==true){

    }
  else{
   this.route.navigateByUrl('/create');
 }
     },(err)=>{
       console.log("http err ",err)
     })


   }

  ngOnInit(): void {
    this.viewProfileOf=localStorage.getItem("idOfViewingProfileId");
    if(!localStorage.getItem("idOfViewingProfileId")){
      this.route.navigateByUrl("/home")
     }
     
    this.httpCall.getUserDetail({id:localStorage.getItem("idOfViewingProfileId")}).subscribe(x=>{
      if(x.data){
this.data=x.data
      }
    },(err)=>{
      console.log("Http err ",err);
      
    })
  }
  //////

  changeActive1():void{
    this.positive=[true,false,false,false]
     this.negative=[false,true,true,true];
    
      }
      changeActive2():void{
        this.positive=[false,true,false,false]
         this.negative=[true,false,true,true];
        
          }
          changeActive3():void{
            this.positive=[false,false,true,false]
             this.negative=[true,true,false,true];
            
              }
              changeActive4():void{
                this.positive=[false,false,false,true]
                 this.negative=[true,true,true,false];
                
                  }
                      
                  checkProfileimg(url:string):string{
                    if(url.length>1){
                      return url;
                    }
                    else{
                      return "assets/user.png"
                    }
                       }

                       followFolowingButtonClick(followersArray:any[],followingArray:any[],userId:any):void{ 
//
//following a profile
this.userData.following.forEach((element:any) => {
  if(element.userId==userId){
this.IamAlreadyFollowingThisProfile=true;
  }//if first 
});//foreach

if(this.IamAlreadyFollowingThisProfile==true){
   var count=0;
this.userData.following.forEach((element:any) => {
  if(element.userId==userId){
this.userData.following.splice(count,count);
var newFollowingMyData=this.userData.following
this.httpCall.updateFollowing({id:this.userData._id,data:newFollowingMyData}).subscribe(x=>{
  if(x.data.modifiedCount==1){
    this.followFollowingTextStaus="Follow"
    this.dataSer.openSnackBar("Unfollowed");
    location.reload();
////
var count2:any;
followersArray.forEach(element => {
  if(element.userId==this.userData._id){
    followersArray.splice(count2,count2);
    var newFollowersOfopData=followersArray;
    this.httpCall.updateFollowers({id:userId,data:newFollowersOfopData}).subscribe(x=>{
      if(x.data.modifiedCount==1){
        this.dataSer.openSnackBar("MY ID REmoved From Op followers array");
      }
      },(err)=>{console.log("Http err ",err);
      this.dataSer.openSnackBar("Ooops soemthing went wrong");
    })//sub

  }//if
  count2++
});//foreach
////

  }//modific if
},(err)=>{
  console.log("Http error ",err);
  this.dataSer.openSnackBar("Ooops soemthing went wrong");
})
  }//if
  count++;
});//foreach
}//if boolean check
else{
  this.userData.following.push(this.userData._id);
 var newObj={
   userId:userId
 }
 this.userData.following.push(newObj)
 console.log("following arra of mew ",this.userData.following)

  this.httpCall.updateFollowing({id:this.userData._id,data:this.userData.following}).subscribe(x=>{
  if(x.data.modifiedCount==1){
this.dataSer.openSnackBar("Followed");
//
var newObj2={
  userId:this.userData._id
}
followersArray.push(newObj2);
console.log("followers arra of ops ",followersArray)
this.httpCall.updateFollowers({id:userId,data:followersArray}).subscribe(x=>{
  if(x.data.modifiedCount==1){
   }else{
    this.dataSer.openSnackBar("OOps something went wrong");
  }
},(err)=>{
  this.dataSer.openSnackBar("OOps something went wrong");
  console.log("Http error ",err)
})
//

}//if
else{
  this.dataSer.openSnackBar("OOps something went wrong");
}
 },(err)=>{

   console.log("Http error ",err);
   
 })//subscribe
}//else boolean check

                      }//fn

checkFollowFollowingStatus(followersArray:any[],followingArray:any[],userId:any,accountSatus:any):void{
   
this.userData.following.forEach((element:any) => {
  if(element.userId==userId){
    this.iMFollowing=true;
  }
});//foreach

  followingArray.forEach((element:any) => {
  if(element.userId==this.userData._id){
    this.openentFollowing=true;
  }
});//foreach
if(this.iMFollowing==true&&this.openentFollowing==false){
  this.followFollowingTextStaus="Following"
}
if(this.iMFollowing==true&&this.openentFollowing==true){
  this.followFollowingTextStaus="Friends"
}
if(this.iMFollowing==false&&this.openentFollowing==true){
  this.followFollowingTextStaus="Follow back"
}
if(this.iMFollowing==true&&this.openentFollowing==false&&accountSatus=="private"){
  this.followFollowingTextStaus="Requested";
}
if(this.iMFollowing==false&&this.openentFollowing==false){
  this.followFollowingTextStaus="Follow"
}
}//fn

startChat(id:any,name:string):void{
  if(this.route.url=="/chat/(chat:chats//chatBox:message)"){
   localStorage.setItem("chattingWith",id);
   localStorage.setItem("chatterName",name);
 location.reload()
 }else{
 localStorage.setItem("chattingWith",id);
 localStorage.setItem("chatterName",name);
 this.route.navigateByUrl("/chat/(chat:chats//chatBox:message)")
  }       
 }

}
