import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { filter } from 'rxjs/operators';
import { IngresoEgresoService } from '../services/ingreso-egreso.service';
import * as ingegresos  from '../ingreso-egreso/ingreso-egreso.actions';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: []
})
export class DashboardComponent implements OnInit {
  subscripcion:Subscription;
  subsUser:Subscription;
  constructor(private store: Store<AppState>,
    private _ingresoEgreso: IngresoEgresoService) { }

  ngOnInit() {

    this.subsUser = this.store.select('user')
      .pipe(
        filter(auth => auth.user != null)
      )
      .subscribe(({ user }) => {

        this.subscripcion = this._ingresoEgreso.initIngresosEgresosListener(user.uid)
          .subscribe(items => {
            this.store.dispatch(ingegresos.setItems({ items }));

          }, err => {
            console.error(err);

          })

      }, err => {
        console.error(err);

      })
  }

  ngOnDestroy() {
    console.log('ngOnDestroy','dashboard');
  
    this.subscripcion?.unsubscribe();
    this.subsUser?.unsubscribe();
  }

}
