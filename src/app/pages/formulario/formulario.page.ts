import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { UsuarioService } from '../../services/usuario.service';
import { Station } from '../../interfaces/interfaces';
import { PostsService } from '../../services/posts.service';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.page.html',
  styleUrls: ['./formulario.page.scss'],
})
export class FormularioPage implements OnInit {
  stations: Station[] = [];

  ticketUser = {
    qr: '',
    code: '',
    station: null,
    sale: ''
  };

  constructor(private navCtrl: NavController, private usuarioService: UsuarioService, private postsService: PostsService) { }

  ngOnInit() {
    this.usuarioService.lista_estaciones().subscribe( resp => {
      this.stations.push(...resp.stations);
    });
  }

  regresar() {
    this.navCtrl.back({animated: true});
  }

  async solicitarSuma() {
    this.postsService.presentLoading('Espere por favor...');

    await this.usuarioService.sumarPuntos(this.ticketUser.qr, this.ticketUser.code, this.ticketUser.station, this.ticketUser.sale).subscribe( resp => {
     //console.log(resp);
     this.postsService.loading.dismiss();
     if(resp.ok){
      this.ticketUser.code = '';
      this.ticketUser.station = null;
      this.ticketUser.sale = '';
      this.postsService.mostrarNotificacion('CaritaVerde', resp['points'], 1);
     }else{
      this.postsService.mostrarNotificacion('Triste_Mesadetrabajo1', resp.message, 2);
     }
    });
    /*if (valido['ok']) {
        this.ticketUser.code = null;
        this.ticketUser.station = null;
        this.ticketUser.sale = null;
      } else {
        //this.postsService.loading.dismiss();
        //this.postsService.mostrarPop('14331-error', 'Solicitud de Abono', 'Ha ocurrido un error.', 1900);
      }*/

      //this.postsService.loading.dismiss();

  }

}
