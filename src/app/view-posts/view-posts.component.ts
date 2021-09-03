import { Component, OnInit } from '@angular/core';
import { DataServiveService } from '../services/data-servive.service';
import { HttpCallService } from '../services/http-call.service';

@Component({
  selector: 'app-view-posts',
  templateUrl: './view-posts.component.html',
  styleUrls: ['./view-posts.component.css']
})
export class ViewPostsComponent implements OnInit {
data:any[]=[];
postLength:boolean=false;

  constructor(private httpCall:HttpCallService,public dataSer:DataServiveService) { }

  ngOnInit(): void {
    this.httpCall.getPost({userId:localStorage.getItem('idOfViewingProfileId')}).subscribe(x=>{
      this.data=x.data;
      this.dataSer.postLengthOfviewingProfile=this.data.length
      if(this.data.length==0){
        this.postLength=true;
      }
        console.log(x)
      },(err)=>{
        console.log("http error ",err)
      })
      
        }
      
  
}
