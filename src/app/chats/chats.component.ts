import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { element } from 'protractor';
import { DataServiveService } from '../services/data-servive.service';
import { HttpCallService } from '../services/http-call.service';

@Component({
  selector: 'app-chats',
  templateUrl: './chats.component.html',
  styleUrls: ['./chats.component.css']
})
export class ChatsComponent implements OnInit {
data:any//userData
followersArray:any;//
  constructor(private ser:DataServiveService,private route:Router,private httpCall:HttpCallService) {

    var data=String(localStorage.getItem("userDetail"));
    this.data= JSON.parse(data)
   
   }//const

  ngOnInit(): void {
console.log(this.data);

     //////////
     this.followersArray=[];
     var followingA=this.data.following
     followingA.forEach((element:any)=> {
       console.log(element);
      this.httpCall.getUserDetail({id:element.userId}).subscribe(x=>{
       if(x.data!=undefined){
          console.log(x)
       element.userImage=x.data.imgurl
       element.userName=x.data.userName
      this.followersArray.push(element);
       }
      })//sub
    }); //foreach
    console.log("followers array---",this.followersArray);
  }
  displayChats():void{
this.ser.ChatterDetail={
  p1:'12121',
  p2:'w1w222'
}
location.replace('chat/(chat:chats//chatBox:message)')
  }

  checkProfileimg(url:string):string{
    if(url.length>1){
      return url;
    }
    else{
      return "assets/user.png"
    }
       }

       startChat(id:any,name:string):void{
 if(this.route.url=="/chat/(chat:chats//chatBox:message)"){
  localStorage.setItem("chattingWith",id);
  localStorage.setItem("chatterName",name);
location.reload()
}else{
localStorage.setItem("chattingWith",id);
localStorage.setItem("chatterName",name);
this.route.navigateByUrl("/chat/(chat:chats//chatBox:message)")
 }       
}

}
