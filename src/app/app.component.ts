import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
 import { AddPostComponent } from './dialog/add-post/add-post.component';
import { AddStoryComponent } from './dialog/add-story/add-story.component';
import { PermissonComponent } from './dialog/permisson/permisson.component';
import { DataServiveService } from './services/data-servive.service';
import { HttpCallService } from './services/http-call.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit{
userData:any;
   arraySeach:any[]=[
     {userName:" ",imgurl:' '},
    ];
  constructor(private dialog: MatDialog, public dataSer: DataServiveService,private httpCall:HttpCallService,private route:Router) { }

ngOnInit():void{
  this.dataSer.navStatus=false;
  this.httpCall.getUserDetail({id:localStorage.getItem("instaCloneUserId")}).subscribe(x=>{
    console.log("user detail "+x)
    this.userData=x.data;
    localStorage.setItem("userDetail",JSON.stringify(x.data)) 
  },(err)=>{
    this.dataSer.openSnackBar("Oops something went wrong")
    console.log("http error ",err)
  })
}


  openAddPostDialog(): void {
    var dialogRef = this.dialog.open(AddPostComponent)
    this.dataSer.CurrentOpendedDialog = dialogRef
  }
  openAddStoryDialog(): void {
    var dialogRef = this.dialog.open(AddStoryComponent)
    this.dataSer.CurrentOpendedDialog = dialogRef
  }

  logout():void{
    var dialogref=this.dialog.open(PermissonComponent);
    dialogref.afterClosed().subscribe(x=>{
      console.log("dalof x",x)
      if(x){
       localStorage.clear();
      this.route.navigateByUrl('/create');
      }
    })
  }
  checkProfileimg(url:string):string{
    if(url.length>1){
      return url;
    }
    else{
      return "assets/user.png"
    }
       }

       displayFn(subject:any){
return subject.userName
       }
       //search
       search(event:any):void{
 this.httpCall.getUserDetailWithName({name:event.target.value}).subscribe(x=>{
   if(x.data){
     this.arraySeach=x.data
   }
   else{
    this.dataSer.openSnackBar("Oops something went wrong")

   }
 },(err)=>{
   console.log("Http error ",err);
   this.dataSer.openSnackBar("Oops something went wrong")

 })
       }
       //viewProfile

       viewProfile(id:any):void{
        if(id==localStorage.getItem('instaCloneUserId')){
          this.route.navigateByUrl('/profile/post')
        }
        else{
          
        localStorage.setItem("idOfViewingProfileId",id);
        this.dataSer.idOfViewingProfileId=id;
       if(this.route.url=="/viewProfile/post"){
        localStorage.setItem("idOfViewingProfileId",id);
        location.reload();
        }
       else{
        this.route.navigateByUrl('/viewProfile/post')
       }
        }
        
       }
}
