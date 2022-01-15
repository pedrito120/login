import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenService } from '../service/token.service';

@Injectable({
  providedIn: 'root'
})
export class NoAuthGuard implements CanActivate {
  constructor(private tokenService:TokenService, private router:Router){}
  canActivate() {
    // If the user is not logged in we'll send them back to the home page
    
    const token = this.tokenService.getToken(); 
    console.log(token);
    if (token) {
        console.log('Estás logueado');
        this.router.navigate(['home']);
        return true;
    }

    return true;
}
  
}
