import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DataServiveService } from 'src/app/services/data-servive.service';
import { HttpCallService } from 'src/app/services/http-call.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  data:any;
file:any;
fileName:string='';

  name:any;
  website:any='';
  bio:any='';
  email:any='';
  phoneNo:any='';
  gender:any='';
  userId:any;
  constructor(public dataSer:DataServiveService,private httpCall:HttpCallService) { }
  ngOnInit(): void {
    var data=String(localStorage.getItem("userDetail"));

   this.data= JSON.parse(data)
  this.name=this.data.userName;
  this.website=this.data.websiteUrl;
  this.bio=this.data.bio;
  this.email=this.data.email;
  this.phoneNo=this.data.phoneNo;
  this.gender=this.data.gender;
this.userId=this.data._id
  }


  submitForm(data:NgForm):void{
var formData=new FormData();
formData.append("data",JSON.stringify(data.value));
formData.append("file",this.file)
this.httpCall.updateUser(formData).subscribe((x)=>{
console.log(x)
if(x.data.modifiedCount==1){
  this.httpCall.getUserDetail({id:localStorage.getItem("instaCloneUserId")}).subscribe(x=>{
    console.log("user detail "+x)
    localStorage.setItem("userDetail",JSON.stringify(x.data)) 
  },(err)=>{
    console.log("http error ",err)
  })
this.dataSer.openSnackBar(x.message)
this.dataSer.CurrentOpendedDialog.close();
location.reload();
}//if
else
this.dataSer.openSnackBar("OOps Something Went Wrong")

},(err)=>{
  this.dataSer.openSnackBar("OOps Something Went Wrong")
  console.log("http err ",err)
})
  }
  fileChange(event:any){
    console.log(event.target.files[0])
this.file=event.target.files[0];
this.fileName=event.target.files[0].name
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
