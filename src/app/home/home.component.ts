import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataServiveService } from '../services/data-servive.service';
import { HttpCallService } from '../services/http-call.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private dataSer:DataServiveService,private httpCall:HttpCallService,private route:Router) {
    this.dataSer.navStatus=true;
    this.httpCall.getUserDetail({id:localStorage.getItem("instaCloneUserId")}).subscribe(x=>{
      console.log("user detail "+x)
      localStorage.setItem("userDetail",JSON.stringify(x.data)) 
    },(err)=>{
      console.log("http error ",err)
    })//
 
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
 
  }//const

  ngOnInit(): void {
    this.dataSer.navStatus=true;
    
  }
   
}
