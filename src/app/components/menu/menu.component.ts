import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { LoadingController } from '@ionic/angular';
import { PostsService } from '../../services/posts.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {

  constructor(private usuarioService: UsuarioService, private loadingController: LoadingController, private postsService: PostsService) { }

  ngOnInit() {}

  async logout() {
    this.postsService.presentLoading('Cerrando sesión, espere por favor...');
    const valido = await this.usuarioService.logout();

    if (valido) {
      this.postsService.loading.dismiss();
    } else {
      this.postsService.loading.dismiss();
    }
  }

}
