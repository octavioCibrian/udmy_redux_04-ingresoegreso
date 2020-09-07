import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import 'firebase/firestore';
import { IngresoEgreso } from '../models/ingreso-egreso';
import { AuthService } from './auth.service';
import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';


@Injectable({
  providedIn: 'root'
})
export class IngresoEgresoService {

  constructor(private firestore:AngularFirestore,
              private _auth:AuthService,
              private store:Store<AppState>) { }

  crearIngresoEgreso(ingresoEgreso:IngresoEgreso){
    delete ingresoEgreso.uid;
    console.log(ingresoEgreso);
    //console.log(`${this._auth.user.uid}/ingreso-egreso`);
    
    
    return this.firestore.doc(`${this._auth.user.uid}/ingreso-egreso`)
      .collection('items')
      .add({...ingresoEgreso});
  }

  initIngresosEgresosListener(uid:string){
    
    return this.firestore.collection(`${uid}/ingreso-egreso/items`)
      .snapshotChanges()
        .pipe(
          map(snapshot=>{
            return snapshot.map(doc =>{
              return {
                uid: doc.payload.doc.id,
                ...doc.payload.doc.data() as any
              }
            })
          })
        );
        
  }

  deleteIngresoEgreso(uidItem:string){

    return this.firestore.doc(`${this._auth.user.uid}/ingreso-egreso/items/${uidItem}`).delete();

  }
}
