import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DataServiveService } from 'src/app/services/data-servive.service';
import { HttpCallService } from 'src/app/services/http-call.service';
import { AddStoryComponent } from '../add-story/add-story.component';

@Component({
  selector: 'app-view-story',
  templateUrl: './view-story.component.html',
  styleUrls: ['./view-story.component.css']
})
export class ViewStoryComponent implements OnInit {
storyArray:any=[];

  cborderRadius:number=300
  ccellWidth:number=700
  loop:boolean=true;
    cheight:number=300
    autoplay:boolean=true;
    autoplayInterval=2000;
   ccellsToShow:number=1
   ccellsToScroll:number=1
   pauseOnHover=true;
   dots:boolean=true;
  constructor(@Inject(MAT_DIALOG_DATA)public data:any,private httpCall:HttpCallService,private dialog:MatDialog,private dataSer:DataServiveService,private route:Router) { }

  ngOnInit(): void {
    this.httpCall.getStoryOfUser({id:this.data.userId}).subscribe(x=>{
      if(x.data.length!=0){
    console.log("x ",x.data);    
        this.storyArray=x.data;
        console.log(this.storyArray);
      }else{
        this.dataSer.CurrentOpendedDialog.close();
       this.dialog.open(AddStoryComponent);
      }
    },(err)=>{
      this.dataSer.openSnackBar("Ooops something went wrong");
console.log("Http error failed to get story ",err);
    })
  }
  viewProfile(id:any):void{
    this.dataSer.CurrentOpendedDialog.close()
    if(id==localStorage.getItem('instaCloneUserId')){
       this.route.navigateByUrl('/profile/post')    
    }
    else{
      this.dataSer.idOfViewingProfileId=id;
      localStorage.setItem("idOfViewingProfileId",id);
      this.route.navigateByUrl('/viewProfile/post')
    }
 
}
checkProfileimg(url:string):string{
  if(url.length>1){
    return url;
  }
  else{
    return "assets/user.png"
  }
     }
}
