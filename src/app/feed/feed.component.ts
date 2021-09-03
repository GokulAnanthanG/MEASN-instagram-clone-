import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ViewCommentsComponent } from '../dialog/view-comments/view-comments.component';
import { ViewStoryComponent } from '../dialog/view-story/view-story.component';
import { DataServiveService } from '../services/data-servive.service';
import { HttpCallService } from '../services/http-call.service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {
  likedStaus = false;
  heartAppearance = "favorite_border";
  storyArray: any = [];
  data: any;
  style: any[] = [];
  style1: any[] = [];
  public feeds: any[] = [];
  followingFeeds: any = [];
  comment: string = '';
  commentBox: string = '';
  cborderRadius: number = 300
  ccellWidth: number = 80
  cheight: number = 80
  ccellsToShow: number = 5
  ccellsToScroll: number = 3
  bookmark: any = []
  constructor(private httpCall: HttpCallService, private dataSer: DataServiveService, private dialog: MatDialog, private route: Router) {

  }

  ngOnInit(): void {
    var data = String(localStorage.getItem("userDetail"));
    this.data = JSON.parse(data)
    //////////

    this.httpCall.getUserDetailForStory({ followingArray: this.data.following }).subscribe(x => {
      if (x.data.length != 0) {
        console.log("story array ", x);
        //////
        x.data.forEach((e: any) => {
          this.httpCall.getUserDetail({ id: e.userId }).subscribe(userX => {
            e.imgurl = userX.data.imgurl;
            e.userName = userX.data.userName;
          })
          this.storyArray.push(e);
        });//for each
        /////
        console.log("Story array%", this.storyArray)
      }
      else {
        console.log("No data for story");
      }
    }, (err) => {
      console.log("Http error for story ", err);
      this.dataSer.openSnackBar("Oops semthing went wrong")
    })

    ///story///

    //////////



    /////getting followers feed
    this.httpCall.getPostOfFollowers({ followingArray: this.data.following }).subscribe(x => {
      console.log("folloers feed ", x);
      if (x.data) {
        x.data.forEach((element: any) => {
          console.log("followers feed element ", element)
          this.httpCall.getUserDetail({ id: element.userid }).subscribe(x => {
            element.imgurl = x.data.imgurl
            element.userName = x.data.userName
          })
          this.feeds.push(element);
          for (var i = 0; i<this.feeds.length; i++) {
            this.bookmark[i] = 'bookmark';
          }
         
        });
      }
      else {
        this.dataSer.openSnackBar("Oops semthing went wrong")
      }
    }, (err) => {
      console.log("http error ", err);
      this.dataSer.openSnackBar("Oops semthing went wrong")

    })
    /////



    setTimeout(() => {
      this.httpCall.getPost({ userId: localStorage.getItem('instaCloneUserId') }).subscribe(async x => {
        await x.data.forEach((e: any) => {
          console.log(e)
          var eData;
          this.httpCall.getUserDetail({ id: e.userid }).subscribe(x => {
            console.log("x ", x)
            e.imgurl = x.data.imgurl
            e.userName = x.data.userName
          })
          console.log(eData)
          this.feeds.push(e)
          for (var i = 0; i<this.feeds.length; i++) {
            this.bookmark[i] = 'bookmark_outline';
          }
         
        });
        console.log("feed ", this.feeds)
        for (var i = 0; i < this.feeds.length; i++) {
          this.style.push(false);
          this.style1.push(false);
        }
        console.log("leng of post ", this.feeds.length)
        console.table(this.style)
      }, (err) => {
        console.log("http error ", err)
      })



    }, 2000)

    //////for bookmark
    for (var i = 0; i<this.feeds.length; i++) {
      this.bookmark[i] = 'bookmark_outline';
    }
   
    ////
  }//oninit

  getName(data: any): any {
    console.log(data + 'ss')
    return data + "---"
  }

  typingComment(event: any) {
    this.comment = event.target.value
  }
  addComment(id: any, commentArray: any[]): void {

    if (this.comment.trim().length < 1) {
      this.dataSer.openSnackBar("Empty Messages Not Allowed")
    }
    else {
      var obj = {
        userId: this.data._id,
        userName: this.data.userName,
        comment: this.comment
      }
      commentArray.push(obj);
      this.httpCall.updateComment({ postId: id, data: commentArray }).subscribe(x => {
        console.log(x)
        if (x.data.modifiedCount == 1) {
          this.commentBox = ' ';
          this.comment = ' '
          this.dataSer.openSnackBar(x.message);
        } else
          this.dataSer.openSnackBar("Oops semthing went wrong")
      }, err => {
        console.log("error ", err)
        this.dataSer.openSnackBar("Oops semthing went wrong")

      })
    }//else

  }//addcomment fn

  viewComment(id: any): void {
    this.dialog.open(ViewCommentsComponent, { data: { postId: id } })
  }
  //addlike
  addLike(index: any, likeArray: any[], postId: any): void {
    likeArray.forEach(element => {
      if (element.userId == localStorage.getItem('instaCloneUserId')) {
        this.likedStaus = true
      }
    });
    if (this.likedStaus == true) {
      console.log(likeArray)
      var counter = 0;
      likeArray.forEach(element => {
        if (element.userId == localStorage.getItem('instaCloneUserId')) {
          let newArray = likeArray.splice(counter, counter);
          this.httpCall.updatelike({ postId: postId, data: newArray }).subscribe(x => {
            if (x.data.modifiedCount) {
              this.dataSer.openSnackBar("Like removed")
              this.style1[index] = true
            }//if
            else
              this.dataSer.openSnackBar("Oops semthing went wrong")
          }, err => {
            this.dataSer.openSnackBar("Oops semthing went wrong")
          })//subscribe
        }//if
        counter++;
      });//foreach
      console.log("you already liked it")
    }//
    else {
      var obj = {
        userId: localStorage.getItem('instaCloneUserId')
      }
      likeArray.push(obj)
      this.httpCall.updatelike({ postId: postId, data: likeArray }).subscribe(x => {
        if (x.data.modifiedCount == 1) {
          this.dataSer.openSnackBar("liked added")
          this.style[index] = true;
        }
      })
    }//else add like
  }//fn

  //checkLike
  checkLike(index: any, likeArray: any[]): any {
    likeArray.forEach((element) => {
      if (element.userId == localStorage.getItem('instaCloneUserId')) {
        this.style[index] = true;
      }
    });
    if (this.style[index] == true) {
      return "favorite"
    }
    else {
      return "favorite_border"
    }
  }//fn

  checkProfileimg(url: string): string {
    if (url.length > 1) {
      return url;
    }
    else {
      return "assets/user.png"
    }
  }

  viewProfile(id: any): void {
    if (id == localStorage.getItem('instaCloneUserId')) {
      this.route.navigateByUrl('/profile/post')
    }
    else {
      this.dataSer.idOfViewingProfileId = id;
      localStorage.setItem("idOfViewingProfileId", id);
      this.route.navigateByUrl('/viewProfile/post')
    }

  }

  viewStory(userId: any, userImg: any, userName: any): void {
    var obj = {
      userId: userId,
      userImg: userImg,
      userName: userName,
    }
    var dialogRef = this.dialog.open(ViewStoryComponent, { data: obj });
    this.dataSer.CurrentOpendedDialog = dialogRef;
  }

  addSave(postId: any,index:any): void {
    this.httpCall.getUserDetail({ id: localStorage.getItem('instaCloneUserId') }).subscribe(x => {
      console.log("saved array ", x.data.saves)
      if (x.data.saves.length == 0) {
        var obj = {
          postId: postId
        }
        x.data.saves.push(obj)
        this.httpCall.addSave({ data: { userId: localStorage.getItem('instaCloneUserId'), ArrayData: x.data.saves } }).subscribe(x => {
          console.log(x);
          if (x.data.matchedCount==1) {
this.bookmark[index]="bookmark";
            this.dataSer.openSnackBar(x.message)
          }
        }, (err) => {
          console.log("unable to save ", err)
          this.dataSer.openSnackBar("Oops something went wrong")
        })//if sub
      }//if
      else {
        var postAvailability: any;
        x.data.saves.forEach((element: any) => {
          if (element.postId == postId) {
            postAvailability = true
          }
        });//foreach
        if (postAvailability == true) {
          console.log("already in save");
          var counter = 0;
          x.data.saves.forEach((element: any) => {
            if (element.postId == postId) {
              x.data.saves.splice(counter, counter);
              this.httpCall.addSave({ data: { userId: localStorage.getItem('instaCloneUserId'), ArrayData: x.data.saves } }).subscribe(x => {
                console.log(x);
                if (x.data.modifiedCount == 1) {
                  this.dataSer.openSnackBar("Removed from save");
                  this.bookmark[index]="bookmark_outline";
                }
                else {
                  this.dataSer.openSnackBar("Oops something went wrong")
                }
              }, (err) => {
                console.log("unable to save ", err)
                this.dataSer.openSnackBar("Oops something went wrong")
              })
            }
            counter++
          });//foreach
        }//if
        else {
          console.log("save");
          var obj = {
            postId: postId
          }
          x.data.saves.push(obj)
          this.httpCall.addSave({ data: { userId: localStorage.getItem('instaCloneUserId'), ArrayData: x.data.saves } }).subscribe(x => {
            console.log(x);
            if (x.data.matchedCount==1) {
              this.dataSer.openSnackBar(x.message)
              this.bookmark[index]="bookmark";
            }
          }, (err) => {
            console.log("unable to save ", err)
            this.dataSer.openSnackBar("Oops something went wrong")
          })//if sub
        }///boolean check
      }//else
    }, (err) => {
      console.log("Failed to get user http error ", err)
      this.dataSer.openSnackBar("Oops something went wrong")
    })
  }

  checkBookMark(index:any,postId:any):void{
    this.data.saves.forEach((element:any) => {
      if(element.postId==postId){
        this.bookmark[index]="bookmark"
      }
    });
   }

}
