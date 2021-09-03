import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateComponent } from '../dialog/create/create.component';
import { LoginComponent } from '../login/login.component';
import { DataServiveService } from '../services/data-servive.service';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent implements OnInit {

  constructor(private dialog:MatDialog,private dataSer:DataServiveService) { }

  ngOnInit():void {
    this.dataSer.navStatus=false;
this.openDialog();
  }


  openDialog():void{
  
  var dialogref=  this.dialog.open(CreateComponent)
 this.dataSer.CurrentOpendedDialog=dialogref
  }
  openDialog2():void{
    this.dataSer.CurrentOpendedDialog.close();
   var dialogref= this.dialog.open(LoginComponent)
    this.dataSer.CurrentOpendedDialog=dialogref
  }

}