import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';

import { Store } from '@ngrx/store';
import * as ui from '../../shared/ui.actions';
import { AppState } from 'src/app/app.reducer';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: []
})
export class RegisterComponent implements OnInit {

  registroForm:FormGroup;
  uiSubscription:Subscription;
  cargando:boolean;
  constructor(private fb:FormBuilder,private _auth:AuthService,
              private router:Router,
              private store:Store<AppState>) { }

  ngOnInit() {
    this.registroForm = this.fb.group({
      nombre: ['',Validators.required],
      correo: ['',[Validators.required,Validators.email]],
      password:['',Validators.required]
    })

    this.uiSubscription = this.store.select('ui')
      .subscribe(res=>{
        this.cargando = res.isLoading;
      });
  }

  altaUsuario(){
    if(this.registroForm.invalid){ 
      Swal.fire('Error','Llenar todos los campos','error');
      return;
    }
    
    this.store.dispatch(ui.isLoading());


    const { nombre,correo,password } =  this.registroForm.value;
    
    this._auth.crearUsuario(nombre,correo,password)
      .then( (resp)=>{
        this.store.dispatch(ui.stopLoading());
        this.router.navigateByUrl('/dashboard');
        
      })
      .catch( err=>{
        this.store.dispatch(ui.stopLoading());
        console.error(err);
        
      } )
  }

  ngOnDestroy(){
    this.uiSubscription.unsubscribe();
  }

}
