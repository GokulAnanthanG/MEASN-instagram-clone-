import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { DataServiveService } from './services/data-servive.service';
import { HttpCallService } from './services/http-call.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  permossionStatus:any;//for canactivate

  constructor(private httpCall:HttpCallService,private router:Router,private dataSer:DataServiveService){  }
   canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
   
      
   
    return false;
  }
  

   

}
