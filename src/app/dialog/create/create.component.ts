import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CreateAccountComponent } from 'src/app/create-account/create-account.component';
import { LoginComponent } from 'src/app/login/login.component';
import { DataServiveService } from 'src/app/services/data-servive.service';
import { HttpCallService } from 'src/app/services/http-call.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  constructor(private dialog:MatDialog,private httpSer:HttpCallService,private dataSer:DataServiveService,private route:Router) { 
    this.httpSer.checkToken({token:localStorage.getItem("loginToken")}).subscribe(  x=>{
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
    this.dataSer.navStatus=false;

  }
  openDialog2():void{
    this.dataSer.CurrentOpendedDialog.close()
   var dialogref= this.dialog.open(LoginComponent)
   this.dataSer.CurrentOpendedDialog=dialogref;
  }


  formSubmit(data:NgForm):void{
   
  if(data.valid){
if(data.value.password==data.value.confirmPassword){
  this.httpSer.resgister(data.value).subscribe(x=>{
    console.log(x)
    localStorage.setItem('instaCloneUserId',`${x.data.insertedId}`);
    localStorage.setItem("loginToken",x.toke);
    this.dataSer.openSnackBar(x.message);
    this.dataSer.CurrentOpendedDialog.close()
this.route.navigateByUrl("/home/(first:feed//second:homeSide)");
  },(err)=>{
    console.log("http error",err)
  })
}//second if
else
this.dataSer.openSnackBar("Password and confirm must be same")
}//first if
  else
  this.dataSer.openSnackBar("Invalid Details")
}

}
