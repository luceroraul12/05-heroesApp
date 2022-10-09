import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of, tap } from 'rxjs';
import { Auth } from 'src/app/auth/interfaces/auth.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _auth: Auth | undefined;

  get auth(): Auth{
    return this._auth!;
  }

  private urlApi = environment.baseUrl;

  constructor(private http: HttpClient) { }

  login(): Observable<Auth> {
    return this.http.get<Auth>(`${this.urlApi}/usuarios/1`)
                .pipe(
                  tap(auth => this._auth = auth),
                  tap(({id}) => localStorage.setItem("id",id)));
  }

  logout(): void {
    this._auth = undefined;
    localStorage.removeItem('id');
  }

  verifcarSiYaEstbaLogeado(): Observable<boolean>{

    if(!localStorage.getItem('id')){
      return of(false);
    }



    return this.http.get<Auth>(`${this.urlApi}/usuarios/1`)
            .pipe(
              map( respuesta => {
                this._auth = respuesta;
                return true;
              })
            );
  }
}
