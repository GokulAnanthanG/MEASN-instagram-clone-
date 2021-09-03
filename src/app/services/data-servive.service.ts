import { Injectable, OnInit } from '@angular/core';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { HttpCallService } from './http-call.service';
 
@Injectable({
  providedIn: 'root'
})
export class DataServiveService implements OnInit {

  userData= localStorage.getItem("userDetail");
  idOfViewingProfileId:any;
  ChatterDetail:object={}
  navStatus:boolean=false;
  CurrentOpendedDialog:any;
postLength:any
postLengthOfviewingProfile:any
  constructor(private snackbar: MatSnackBar,private httpCall:HttpCallService) { }

ngOnInit():void{
   
}


openSnackBar(message:string):void{
this.snackbar.open(message,'X',{duration:3000})
}
  
}
