import { Component, OnInit,Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpCallService } from 'src/app/services/http-call.service';
@Component({
  selector: 'app-view-comments',
  templateUrl: './view-comments.component.html',
  styleUrls: ['./view-comments.component.css']
})
export class ViewCommentsComponent implements OnInit {
postData:any={
postUrl:''
};
comment:any=[]
userData:any;
  constructor(@Inject(MAT_DIALOG_DATA)public data:any,private httpCall:HttpCallService, ) { 
    this.httpCall.getPos({postId:this.data.postId}).subscribe(async x1=>{
      console.log(x1)
      this.postData=await x1.data
      console.log("post data ",this.postData)
    
    
    
    
      console.log("+userid+ ",this.postData.userid);
      
    var array=this.postData.comment
    
    array.forEach((e:any)=> {
      this.httpCall.getUserDetail({id:e.userId}).subscribe(x2=>{
        console.log("9090 ",this.postData.userid)
       this.userData=x2.data
       console.log("/userdata,",this.userData)
         console.log("userData ",this.userData)
     e.imgurl=this.userData.imgurl
     e.userName=this.userData.userName
       },err=>{
         console.log('http error ',err)
       }) 
        this.comment.push(e)
    });//for each

    
    
    
    
    
    },err=>{
      console.log("http err",err)
    })
    


console.log("comment ",this.comment)

  }
 
  ngOnInit(): void {

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
