import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import Swal from 'sweetalert2';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';

import { Subscription } from 'rxjs';
import * as ui from '../../shared/ui.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit {

  loginForm:FormGroup;
  cargando: boolean = false;
  uiSubscription:Subscription;
  constructor(private fb:FormBuilder,private _auth:AuthService,
              private router:Router,
              private store:Store<AppState>) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      correo:['',[Validators.required,Validators.email]],
      password:['',Validators.required]
    })

    this.uiSubscription = this.store.select('ui')
    .subscribe( ui =>{
      this.cargando = ui.isLoading;
      console.log('cargando subs');

    });
  }

  login(){
    if(this.loginForm.invalid){
      Swal.fire('Error','Algun campo no es valido.','error');
      return;
    }
    this.store.dispatch(ui.isLoading());


    const {correo,password} = this.loginForm.value;
    this._auth.loginUsuario(correo,password)
      .then(res=>{

        this.store.dispatch(ui.stopLoading());
        this.router.navigateByUrl('');
        
      })
      .catch(err=>{
        this.store.dispatch(ui.stopLoading());
        console.error(err);
        
      })



  }

  ngOnDestroy(){
    this.uiSubscription.unsubscribe();
  }

}
