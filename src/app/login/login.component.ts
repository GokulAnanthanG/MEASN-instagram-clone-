import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CreateAccountComponent } from '../create-account/create-account.component';
import { CreateComponent } from '../dialog/create/create.component';
import { DataServiveService } from '../services/data-servive.service';
import { HttpCallService } from '../services/http-call.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private dataSer:DataServiveService,private dialog:MatDialog,private httpCall:HttpCallService,private route:Router) { }

  ngOnInit(): void {
  }
  openDialog2():void{
    this.dataSer.CurrentOpendedDialog.close()
    var dialogref= this.dialog.open(CreateComponent)
    this.dataSer.CurrentOpendedDialog=dialogref;
  }


  formSumit(data:NgForm):void{
    if(data.valid){
this.httpCall.login(data.value).subscribe(x=>{
  if(x.data){
    console.log(x.data);
    localStorage.setItem("loginToken",x.token);
    localStorage.setItem('instaCloneUserId',`${x.data._id}`)
    this.dataSer.CurrentOpendedDialog.close();
this.route.navigateByUrl("/home/(first:feed//second:homeSide)")
  }
},(err)=>{
  console.log("Http err,",err)
  this.dataSer.openSnackBar("Invalid Details Or something went wrong");
})
    }
    else
    this.dataSer.openSnackBar("Invalid Details")
   }

}
