import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { UsuarioService } from '../../services/usuario.service';
import { PostsService } from '../../services/posts.service';
import { async } from '@angular/core/testing';

@Component({
  selector: 'app-code',
  templateUrl: './code.page.html',
  styleUrls: ['./code.page.scss'],
})
export class CodePage implements OnInit {

  codeUser = {
    code: '',
  };

  constructor(private navCtrl: NavController, private usuarioService: UsuarioService, private postsService: PostsService) { }

  ngOnInit() {
  }

  regresar() {
    this.navCtrl.back();
  }

  async code(){
    this.postsService.presentLoading('Espere por favor...');
    await this.usuarioService.codigoReferencia(this.codeUser.code).subscribe( resp => {
      //console.log(resp);
      this.postsService.loading.dismiss();
      if(resp.ok){
       this.postsService.mostrarNotificacion('CaritaVerde', resp.message, 1);
      }else{
       this.postsService.mostrarNotificacion('Triste_Mesadetrabajo1', resp.message, 2);
      }
     });
  }

}
