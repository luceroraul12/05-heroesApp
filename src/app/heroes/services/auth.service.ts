import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Auth } from 'src/app/auth/interfaces/auth.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private urlApi = environment.baseUrl;

  constructor(private http: HttpClient) { }

  login(): Observable<Auth> {
    return this.http.get<Auth>(`${this.urlApi}/usuarios/1`);
  }
}
