import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { UsuarioService } from '../../services/usuario.service';
import { StationQR } from '../../interfaces/interfaces';


@Component({
  selector: 'app-abonar-qr',
  templateUrl: './abonar-qr.component.html',
  styleUrls: ['./abonar-qr.component.scss'],
})
export class AbonarQrComponent implements OnInit {
  // tslint:disable-next-line: variable-name
  @Input() id_payment;

  station: StationQR[] = [];
  resp: any;


  constructor(private modalCtrl: ModalController, private usuarioService: UsuarioService) {
   }

  ngOnInit() {
    this.usuarioService.informacionQrAbono(this.id_payment).subscribe( respuesta => {
      if (respuesta.ok) {
        this.resp = 'membership=' + respuesta.membership + '&id_payment=' + respuesta.station.id;
      } else {
        this.modalCtrl.dismiss();
      }
    });
  }

  regresar() {
    this.modalCtrl.dismiss();
  }

}
