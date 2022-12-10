import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad {

  constructor(private authService: AuthService,
    private router: Router){
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      return this.authService.verificaAuth()
        .pipe(
          tap(estaAutenticado =>{
            if(!estaAutenticado){
              this.router.navigate(['./auth/login']);
            }
          })
        );
      // if(this.authService.auth.id){
      //   return true;
      // }
      
      // console.log("Bloqueado por el AuthGuard - canActivate");
    
      // return false;
  }

  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
      return this.authService.verificaAuth()
        .pipe(
          tap(estaAutenticado =>{
            if(!estaAutenticado){
              this.router.navigate(['./auth/login']);
            }
          })
        );
      // if(this.authService.auth.id){
      //   return true;
      // }
      
      // console.log("Bloqueado por el AuthGuard - canLoad");
    
      // return false;
  }
}
