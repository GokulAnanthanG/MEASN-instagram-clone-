import { Component, OnInit ,Inject} from '@angular/core';
 import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataServiveService } from 'src/app/services/data-servive.service';
import { HttpCallService } from 'src/app/services/http-call.service';
import { PermissonComponent } from '../permisson/permisson.component';
@Component({
  selector: 'app-view-post-with-command',
  templateUrl: './view-post-with-command.component.html',
  styleUrls: ['./view-post-with-command.component.css']
})
export class ViewPostWithCommandComponent implements OnInit {
  postData:any={
    postUrl:''
    };
    comment:any=[]
    userData:any;
      constructor(@Inject(MAT_DIALOG_DATA)public data:any,private httpCall:HttpCallService,private dialog:MatDialog,private dataSer:DataServiveService) { 
        this.httpCall.getPos({postId:this.data.postId}).subscribe(async x1=>{
          console.log(x1)
          this.postData=await x1.data
          console.log("post data ",this.postData)
        
        
        
        
          console.log("+userid+ ",this.postData.userid);
          
        var array=this.postData.comment
        
        array.forEach((e:any)=> {
          this.httpCall.getUserDetail({id:this.postData.userid}).subscribe(x2=>{
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
          this.dataSer.openSnackBar("Oops something went wrong")
        })
        
    
    
    console.log("comment ",this.comment)
    
      }
     
      ngOnInit(): void {
    
      }
    
      deletePost(id:any):void{
 var dialogRef=this.dialog.open(PermissonComponent);
 dialogRef.afterClosed().subscribe(x=>{
   if(x){
     ////
    

this.httpCall.deletePost({id:id}).subscribe(x=>{
if(x.data.deletedCount==1){
  this.dataSer.openSnackBar(x.message);
  this.dataSer.CurrentOpendedDialog.close();
  location.reload();
}
else{
  this.dataSer.openSnackBar("Oops something went wrong");
  this.dataSer.CurrentOpendedDialog.close();
}
},(err)=>{
  console.log("Http error ",err)
  this.dataSer.openSnackBar("Oops something went wrong")
})
     /////
   }
 })
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
    