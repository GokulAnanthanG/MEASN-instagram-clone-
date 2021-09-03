import { Component, OnInit } from '@angular/core';
import { DataServiveService } from 'src/app/services/data-servive.service';
import { HttpCallService } from 'src/app/services/http-call.service';

@Component({
  selector: 'app-add-story',
  templateUrl: './add-story.component.html',
  styleUrls: ['./add-story.component.css']
})
export class AddStoryComponent implements OnInit {
  fileName:string=' ';
  file: any;
  constructor(private httpCall:HttpCallService,private dataSer:DataServiveService) { }

  ngOnInit(): void {
  }
  fileChange(event:any){
    console.log(event.target.files[0])
    this.file=event.target.files[0];
    this.fileName=event.target.files[0].name
      };
      addStory():void{
        var obj={
          userId:localStorage.getItem('instaCloneUserId')
        }
        var formData=new FormData();
        formData.append("file",this.file);
        formData.append("data",JSON.stringify(obj))
        this.httpCall.addStory(formData).subscribe(x=>{
          if(x.data){
            console.log(x);
            this.dataSer.openSnackBar(x.message);
            this.dataSer.CurrentOpendedDialog.close();
            location.reload();
          }
          else{
            this.dataSer.openSnackBar("oops something went wrong");

          }
        },(err)=>{
          console.log("Http error ",err);
          this.dataSer.openSnackBar("oops something went wrong");
        })
      }
}
