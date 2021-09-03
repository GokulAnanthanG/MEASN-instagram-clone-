import { Component, OnInit } from '@angular/core';
import { DataServiveService } from '../services/data-servive.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {


  constructor(private dataSer:DataServiveService) {
    this.dataSer.navStatus=true;
   
   }

  ngOnInit(): void {
    this.dataSer.navStatus=true;
  }

}
