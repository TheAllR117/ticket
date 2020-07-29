import { Component, OnInit, Input } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-menu-pop',
  templateUrl: './menu-pop.component.html',
  styleUrls: ['./menu-pop.component.scss'],
})
export class MenuPopComponent implements OnInit {

  constructor(private usuarioService: UsuarioService, private popoverCtrl: PopoverController) { }

  ngOnInit() {}

  logout() {
    this.usuarioService.logout();
  }

}
