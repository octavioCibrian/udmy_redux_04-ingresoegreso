import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Usuario } from '../models/usuario.model';
import { AngularFirestore } from '@angular/fire/firestore';
import 'firebase/firestore';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import * as auth from '../auth/auth.actions';
import { Subscription } from 'rxjs';
import { unSetItems } from '../ingreso-egreso/ingreso-egreso.actions';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _user:Usuario;

  get user()
  {
    return this._user;
  }
  subscripcion:Subscription;
  constructor(public auth:AngularFireAuth,
              private router:Router,
              private firestore:AngularFirestore,
              private store:Store<AppState>) { }

  initAuthListener(){
    this.auth.authState.subscribe(fuser=>{
      
      
      if(fuser){
        this.subscripcion = this.firestore.doc(`${fuser.uid}/usuario`).valueChanges()
        .subscribe( (fireUser:Usuario)=>{
          //const user = new Usuario('abc','borrarme','aahha@gmail.com')
          this._user = fireUser;
          this.store.dispatch(auth.setUser({user:fireUser})); 
        })
      }else{
        this._user = null;
        this.subscripcion?.unsubscribe();
        this.store.dispatch(auth.unSetUser());
        this.store.dispatch(unSetItems());
          
      }
      
    })
  }
  
  crearUsuario(nombre:string,email:string,password:string){
    return this.auth.createUserWithEmailAndPassword(email,password)
                .then(({user})=>{
                  const newUser = new Usuario(user.uid,nombre,email);
                  return this.firestore.doc(`${user.uid}/usuario`)
                            .set({...newUser})
                });
  }

  loginUsuario(email:string,password:string){
    return this.auth.signInWithEmailAndPassword(email,password);
  }

  logOut(){
    this.auth.signOut();
    this.store.dispatch(auth.unSetUser());
    this.router.navigateByUrl('login');
  }

  isAuth(){
    return this.auth.authState.pipe(
      map(fuser=> fuser != null)
    );
  }


}
