import { UsuarioService } from 'src/app/service/usuario.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class GuardiaoGuard implements CanActivate {

  //constructor do nosso service injeção da dependency
  constructor(private userService: UsuarioService) {

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      //vai verificar pra gente se for false n libera a rota ao contrário libera
      return this.userService.userAutenticado();
  }

}
