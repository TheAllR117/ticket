import { Component, OnInit, ApplicationRef } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { LoadingController, NavController } from '@ionic/angular';
import { PostsService } from '../../services/posts.service';
import { User } from '../../interfaces/interfaces';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {

  user: User = {};
  noMenu: any;

  constructor(
    private usuarioService: UsuarioService,
    private loadingController: LoadingController,
    private postsService: PostsService,
    private applicationRef: ApplicationRef,
    private navCtrl: NavController) { }

  async ngOnInit() {
    await this.cargarUser();
  }

  async logout() {
    this.postsService.presentLoading('Cerrando sesión, espere por favor...');
    const valido = await this.usuarioService.logout();

    if (valido) {
      this.postsService.loading.dismiss();
    } else {
      this.postsService.loading.dismiss();
    }
  }

  cargarUser() {
    this.usuarioService.initUser.subscribe(noti => {
      this.user = this.usuarioService.getUsuario();
      if (noti) {
        this.noMenu = true;
      } else {
        this.noMenu = false;
      }
      this.applicationRef.tick();
    });
  }

  navRouting(ruta: string) {
    this.navCtrl.navigateForward(ruta);
  }

}
