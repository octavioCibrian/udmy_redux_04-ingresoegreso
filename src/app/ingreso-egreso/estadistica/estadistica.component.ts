import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { ChartType } from 'chart.js';
import { MultiDataSet, Label } from 'ng2-charts';
import { AppStatewithIngreso } from '../ingreso-egreso.reducer';

@Component({
  selector: 'app-estadistica',
  templateUrl: './estadistica.component.html',
  styles: []
})
export class EstadisticaComponent implements OnInit {

  totalIngresos = 0;
  totalEgresos = 0;

  ingresos = 0;
  egresos = 0;
  subsc:Subscription;
  
  // Doughnut
  public doughnutChartLabels: Label[] = ['Ingresos', 'Egresos'];
  public doughnutChartData: MultiDataSet = [
    [this.totalIngresos, this.totalEgresos],
  ];
  public doughnutChartType: ChartType = 'doughnut';

  constructor(private store:Store<AppStatewithIngreso>) { }

  ngOnInit() {
    this.subsc = this.store.select('ingresoEgreso').subscribe((resp:any)=>{
      this.totalIngresos = 0;
      this.ingresos = 0;
      this.totalEgresos = 0;
      this.egresos = 0;
      
      for(let item of resp.items){
        if(item.tipo === 'ingreso'){
          this.totalIngresos += parseInt(item.monto);
          this.ingresos++;
          console.log(item.monto);
          
        }else{
          this.totalEgresos += parseInt(item.monto);
          this.egresos++;
        }
      }

      this.doughnutChartData = [
        [this.totalIngresos, this.totalEgresos],
      ];
    })

  }

  ngOnDestroy(){
    this.subsc.unsubscribe();
  }

}
