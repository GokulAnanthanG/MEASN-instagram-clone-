import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataServiveService } from '../services/data-servive.service';
import { HttpCallService } from '../services/http-call.service';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.css']
})
export class ExploreComponent implements OnInit {
data:any=[]
  constructor(private dataSer:DataServiveService,private httpCall:HttpCallService,private route:Router) {
    this.dataSer.navStatus=true;

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
    this.dataSer.navStatus=true;
    this.httpCall.getAllPost().subscribe(x=>{
this.data=x.data
console.log(this.data);

    },(err)=>{
      console.log("http eror ",err);
      this.dataSer.openSnackBar("Oops something went wrong")
    })
  }

}
