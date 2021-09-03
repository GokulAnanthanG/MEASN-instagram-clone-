import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ViewCommentsComponent } from '../dialog/view-comments/view-comments.component';
import { ViewPostWithCommandComponent } from '../dialog/view-post-with-command/view-post-with-command.component';
import { DataServiveService } from '../services/data-servive.service';
 import { HttpCallService } from '../services/http-call.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
data:any
  constructor(private httpCall:HttpCallService,private dialog:MatDialog,private dataSer:DataServiveService) { }

  ngOnInit(): void {

this.httpCall.getPost({userId:localStorage.getItem('instaCloneUserId')}).subscribe(x=>{
this.data=x.data;
this.dataSer.postLength=this.data.length;
  console.log(x)
},(err)=>{
  console.log("http error ",err)
})

  }

  viewComment(id:any):void{
   var dialogRef= this.dialog.open(ViewPostWithCommandComponent,{data:{postId:id}});
   this.dataSer.CurrentOpendedDialog=dialogRef;
   }

}
