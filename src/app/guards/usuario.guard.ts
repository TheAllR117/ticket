import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, CanLoad } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuarioService } from '../services/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioGuard implements CanLoad {

  constructor( private usuarioService: UsuarioService) {}

  canLoad(): Observable<boolean> | Promise<boolean> | boolean {
    return this.usuarioService.validaToken();
  }
}
