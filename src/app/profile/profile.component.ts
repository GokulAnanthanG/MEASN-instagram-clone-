import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { EditProfileComponent } from '../dialog/edit-profile/edit-profile.component';
import { DataServiveService } from '../services/data-servive.service';
import { HttpCallService } from '../services/http-call.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  cborderRadius:number=300
  ccellWidth:number=10
    cheight:number=120
   ccellsToShow:number=6
   ccellsToScroll:number=3
data:any;
//active
positive:Array<boolean>=[true,false,false,false];
negative:Array<boolean>=[false,true,true,true];
  constructor(private router:Router,public dataSer:DataServiveService,private dialog:MatDialog,private httpCall:HttpCallService) { 
    this.dataSer.navStatus=true;
  //
  this.httpCall.checkToken({token:localStorage.getItem("loginToken")}).subscribe(  x=>{
    console.log("auth check ",x)   
    if(x.result==true){

      }
    else{
     this.router.navigateByUrl('/create');
   }
       },(err)=>{
         console.log("http err ",err)
       })
  }//const

  ngOnInit(): void {
    var data=String(localStorage.getItem("userDetail"));
    this.data= JSON.parse(data)
    //////////
    this.dataSer.navStatus=true;
     if(this.router.url=="/profile/post"){
      this.positive=[true,false,false,false]
      this.negative=[false,true,true,true];
     }
     else if(this.router.url=="/profile/igtv"){
      this.positive=[false,true,false,false]
     this.negative=[true,false,true,true];
     }
     else if(this.router.url=="/profile/save"){
      this.positive=[false,false,true,false]
         this.negative=[true,true,false,true];
     }
   
      
  }

/////////////////
  changeActive1():void{
this.positive=[true,false,false,false]
 this.negative=[false,true,true,true];

  }
  changeActive2():void{
    this.positive=[false,true,false,false]
     this.negative=[true,false,true,true];
    
      }
      changeActive3():void{
        this.positive=[false,false,true,false]
         this.negative=[true,true,false,true];
        
          }
          changeActive4():void{
            this.positive=[false,false,false,true]
             this.negative=[true,true,true,false];
            
              }
              openEditDialog():void{
var dialogRef=this.dialog.open(EditProfileComponent);
this.dataSer.CurrentOpendedDialog=dialogRef;
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
