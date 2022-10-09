import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AuthService } from 'src/app/heroes/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {

  private esAutenticado!: boolean;

  constructor(
    private authService: AuthService,
    private router: Router
    ){
    
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    



    return this.authService.verifcarSiYaEstbaLogeado()
                .pipe(
                  tap( (estaAutenticado: boolean) => {
                    if(!estaAutenticado){
                      this.router.navigate(['./auth/login'])
                    }
                  })
                );
  }
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.authService.verifcarSiYaEstbaLogeado()
    .pipe(
      tap( (estaAutenticado: boolean) => {
        if(!estaAutenticado){
          this.router.navigate(['./auth/login'])
        }
      })
    );;
  }
  
}
