import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit {
  subsc:Subscription;
  nombre:string;
  constructor(private _auth:AuthService,private store:Store<AppState>) { }

  ngOnInit() { 
    this.subsc = this.store.select('user').pipe(
      filter(({user})=> user != null)
    ).subscribe(({user})=>{
      console.log(user);
      
      this.nombre = user.nombre;
    })
  }

  cerrarSesion(){
    this._auth.logOut();
  }
ngOnDestro(){
    this.subsc.unsubscribe();
  }
}
