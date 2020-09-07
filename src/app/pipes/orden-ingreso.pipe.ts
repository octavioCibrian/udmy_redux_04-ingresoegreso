import { Pipe, PipeTransform } from '@angular/core';
import { IngresoEgreso } from '../models/ingreso-egreso';

@Pipe({
  name: 'ordenIngreso'
})
export class OrdenIngresoPipe implements PipeTransform {

  transform(items:IngresoEgreso[]):IngresoEgreso[] {
    
    //
    if(items.length <=0){return [];}
    console.log(items);
    let algo =  items.sort((a,b)=>{
      if(a.tipo === 'ingreso'){
       // console.log(a.tipo);
        return -1;
      }else{
        return 1;
      }
    })

    console.log(algo);
    return algo;    
  }

}
