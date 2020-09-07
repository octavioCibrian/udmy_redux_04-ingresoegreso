import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { IngresoEgreso } from 'src/app/models/ingreso-egreso';
import { IngresoEgresoService } from 'src/app/services/ingreso-egreso.service';
import Swal from 'sweetalert2';
import { AppStatewithIngreso } from '../ingreso-egreso.reducer';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styles: []
})
export class DetalleComponent implements OnInit {
  subItems:Subscription;
  items:IngresoEgreso[];
  constructor(private store:Store<AppStatewithIngreso>,
              private _ingrEgre:IngresoEgresoService) { }

  ngOnInit() {
    
    this.subItems = this.store.select('ingresoEgreso')
      .subscribe(({items})=>{
        //console.log(items);
        
        this.items = items;
    },err=>{
      console.error(err);
      
    })
  }

  delete(uid:string){
    this._ingrEgre.deleteIngresoEgreso(uid)
    .then(()=>{
      Swal.fire('Success','The item was removed of the DB','success')
    })
    .catch(err=>{
      Swal.fire('Error',err.message,'error')
      
    })
    
  }

  ngOnDestroy(){
    this.subItems.unsubscribe()
  }

}
