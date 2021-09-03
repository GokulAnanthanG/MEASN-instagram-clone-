import { Component, OnInit } from '@angular/core';
 import { DataServiveService } from '../services/data-servive.service';
import { HttpCallService } from '../services/http-call.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
message:string='';
chatterName=localStorage.getItem("chatterName");
chatData:any;
style:any[]=[];
style2:any[]=[];

  constructor(private ser:DataServiveService,private httpCall:HttpCallService) { }
 
  ngOnInit():void{
 setInterval(()=>{
//http call for chat
this.httpCall.getChat({chatter1:localStorage.getItem('instaCloneUserId'),chatter2:localStorage.getItem("chattingWith")}).subscribe(x=>{
  if(x.data){
   this.chatData=x.data;
for(let i=0;i<this.chatData.length;i++){
  this.style.push(false);
  this.style2.push(true);
}
  }
  else{
    this.ser.openSnackBar("Ooops something went wrong");
  }

},(err)=>{
  console.log("Http error ",err);
  this.ser.openSnackBar("Ooops something went wrong");
})
 //
 },1000)
  }


  sendMessage():void{
if(this.message.trim().length==0){
  this.ser.openSnackBar("Empty messages not allowed");
}
else{
var obj={
  chatter1:localStorage.getItem('instaCloneUserId'),
  chatter2:localStorage.getItem("chattingWith"),
  sendedBy:localStorage.getItem('instaCloneUserId'),
  message:this.message
}
console.log(obj)
this.httpCall.addChat({data:obj}).subscribe(x=>{
  if(x.data){
    console.log('chat  addded ',x.data)
    this.message=' '
  }
  else{
  this.ser.openSnackBar("Ooops something went wrong")
  }
},(err)=>{
  this.ser.openSnackBar("Ooops something went wrong")

console.log("http error " ,err)
})
}//else
  }


  checkStyle(senderid:any,index:any):void{
if(senderid==localStorage.getItem('instaCloneUserId')){
  this.style[index]=true
this.style2[index]=false
}
  }

}
