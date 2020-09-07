import { Injectable } from '@angular/core';
import { CanActivate, Router, CanLoad } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { tap, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {

  constructor(private _auth:AuthService,
              private router:Router){}

  canLoad(): Observable<boolean> {
    console.log('Ahora');
    
    return this._auth.isAuth().pipe(
      tap(estado=>{
        if(!estado) {this.router.navigateByUrl('login')}
      }),
      take(1)
    )
  }

  canActivate(): Observable<boolean> {
    console.log('canActivate');
    return this._auth.isAuth().pipe(
      tap(estado=>{
        if(!estado) {this.router.navigateByUrl('login')}
      })
    )
  }
  
}
