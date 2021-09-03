import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ViewPostWithCommandComponent } from '../dialog/view-post-with-command/view-post-with-command.component';
import { DataServiveService } from '../services/data-servive.service';
import { HttpCallService } from '../services/http-call.service';

@Component({
  selector: 'app-saved',
  templateUrl: './saved.component.html',
  styleUrls: ['./saved.component.css']
})
export class SavedComponent implements OnInit {
data:any;
feeds:any=[];
  constructor(private httpCall:HttpCallService,private dialog:MatDialog,private dataSer:DataServiveService) { }
  ngOnInit(): void {
this.httpCall.getUserDetail({id:localStorage.getItem('instaCloneUserId')}).subscribe(x=>{
this.data=x.data;
this.data.saves.forEach((element:any) => {
  this.httpCall.getPos({postId:element.postId}).subscribe(x=>{
    this.feeds.push(x.data)
    console.log("feed ",this.feeds);
    
  })
});
})
 
  }


  viewComment(id:any):void{
    var dialogRef= this.dialog.open(ViewPostWithCommandComponent,{data:{postId:id}});
    this.dataSer.CurrentOpendedDialog=dialogRef;
    }


}
