import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DataServiveService } from 'src/app/services/data-servive.service';
import { HttpCallService } from 'src/app/services/http-call.service';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent implements OnInit {

  constructor(private http:HttpCallService,private dataSer:DataServiveService) { }
  fileName:string=' ';
  file: any;
  ngOnInit(): void {
   
  }
  fileChange(event:any){
console.log(event.target.files[0])
this.file=event.target.files[0];
this.fileName=event.target.files[0].name
  }

  formSubmit(data:NgForm){
    var formData=new FormData();
    formData.append('description',JSON.stringify(data.value.description));
     formData.append('file',this.file);
     formData.append('userid',JSON.stringify(localStorage.getItem('instaCloneUserId')))
     this.http.addPost(formData).subscribe(x=>{
       this.dataSer.CurrentOpendedDialog.close();
       this.dataSer.openSnackBar(x.message)
       location.reload()
      },(err)=>{
        this.dataSer.openSnackBar("Oops Something Went Wrong")
      })
  }
  
}
