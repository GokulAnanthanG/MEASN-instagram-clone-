import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataServiveService } from '../services/data-servive.service';
import { HttpCallService } from '../services/http-call.service';

@Component({
  selector: 'app-home-side',
  templateUrl: './home-side.component.html',
  styleUrls: ['./home-side.component.css']
})
export class HomeSideComponent implements OnInit {
suggestData:any;
data:any;
  constructor(public dataSer:DataServiveService,private httpCall:HttpCallService,private route:Router) { }
  ngOnInit(): void {
    var data=String(localStorage.getItem("userDetail"));

   this.data= JSON.parse(data)
   //
this.httpCall.getUserDetails().subscribe(x=>{
let temp=x.data.splice(0,5);
this.suggestData=temp.splice(1,5);
console.log("--- ",this.suggestData)
},err=>{

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

   viewProfile(id:any):void{
     this.dataSer.idOfViewingProfileId=id;
     localStorage.setItem("idOfViewingProfileId",id);
     this.route.navigateByUrl('/viewProfile/post')
   }

}
