import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IngresoEgresoService } from '../services/ingreso-egreso.service';
import { IngresoEgreso } from '../models/ingreso-egreso';
import Swal from 'sweetalert2';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppStatewithIngreso } from './ingreso-egreso.reducer';

@Component({
  selector: 'app-ingreso-egreso',
  templateUrl: './ingreso-egreso.component.html',
  styles: []
})
export class IngresoEgresoComponent implements OnInit {

  tipo:string = 'ingreso';
  ingresoForm:FormGroup;
  isLoading:Boolean;
  subscripcion:Subscription;
  constructor(private fb:FormBuilder,
              private _ingresoEgreso:IngresoEgresoService,
              private store:Store<AppStatewithIngreso>) { }

  ngOnInit() {
    this.ingresoForm = this.fb.group({
      descripcion:['',Validators.required],
      monto:['',Validators.required]
    })

    this.subscripcion = this.store.select('ui').subscribe(
      (resp)=>{
        this.isLoading = resp.isLoading;
      },
      err=>{
        console.error(err);
        
      }
    )

  }

  guardar(){
    if(this.ingresoForm.invalid){ return;}
    this.isLoading = true;
    const { descripcion,monto } = this.ingresoForm.value;
    
    const ingresoEgreso = new IngresoEgreso(descripcion,monto,this.tipo);
    this._ingresoEgreso.crearIngresoEgreso(ingresoEgreso)
      .then( (ref)=> {
        Swal.fire('Success',`The Item was saved with success `,'success');
        this.ingresoForm.reset();
        this.isLoading = false;
      })
      .catch(err=> {
        Swal.fire('Error',`There was a issue with the ${this.tipo}`,'error');
        this.isLoading = false;
      })
    
  }

  ngOnDestroy(){
    this.subscripcion.unsubscribe();
  }

}
