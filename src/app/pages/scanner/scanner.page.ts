import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { PostsService } from '../../services/posts.service';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-scanner',
  templateUrl: './scanner.page.html',
  styleUrls: ['./scanner.page.scss'],
})
export class ScannerPage implements OnInit {
  ticketUser = {
    qr: '',
    code: '',
    station: '',
    sale: ''
  };
  constructor(private navCtrl: NavController, private barcodeScanner: BarcodeScanner,  private usuarioService: UsuarioService, private postsService: PostsService) { }

  ngOnInit() {
  }

  regresar() {
    this.navCtrl.back({animated: true});
  }

  navRouting(ruta: string) {
    this.navCtrl.navigateForward(ruta);
  }

  async scan(){
      await this.postsService.presentLoading('Espere por favor...');
      this.barcodeScanner.scan().then( barcodeData => {
        this.postsService.loading.dismiss();
        //console.log('data qr', barcodeData);
        if (!barcodeData.cancelled) {
          this.ticketUser.qr = barcodeData.text;
          this.usuarioService.sumarPuntos(this.ticketUser.qr, this.ticketUser.code, this.ticketUser.station, this.ticketUser.sale).subscribe( resp => {
            //console.log(resp);
            this.ticketUser.qr = '';
            (resp.ok) ? this.postsService.mostrarNotificacion('CaritaVerde', resp['points'], 1) :  this.postsService.mostrarNotificacion('Triste_Mesadetrabajo1', resp.message, 2);
          });
        }
      }).catch(err => {
        this.postsService.loading.dismiss();
        this.postsService.mostrarNotificacion('Triste_Mesadetrabajo1', 'Ocurrio un error al escanear', 2);
        // console.log('Error', err);
      });
  }

}
