import { Component, OnInit, ViewChild  } from '@angular/core';
import { IonSlides, ModalController, NavController, MenuController } from '@ionic/angular';
import { NgForm } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import { Balance } from '../../interfaces/interfaces';


@Component({
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.scss'],
})
export class HistorialComponent implements OnInit {

  pagos = true;
  transferencias = false;
  abonos = false;

  balance: Balance[] = [];
  share: Balance[] = [];

  constructor(private modalCtrl: ModalController, private navCtrl: NavController, private usuarioService: UsuarioService) { }

  ngOnInit() {
    this.usuarioService.historialAbonos('balance').subscribe( resp => {
      if (resp.ok) {
        this.balance = resp.balances;
      }
    });

    this.usuarioService.historialAbonos('share').subscribe( resp => {
      if (resp.ok) {
        this.share = resp.balances;
      }
    });
  }

  regresar() {
    this.modalCtrl.dismiss();
  }

  mostrarPagos() {
    this.pagos = true;
    this.transferencias = false;
    this.abonos = false;
  }

  mostrarTrans() {
    this.pagos = false;
    this.transferencias = true;
    this.abonos = false;
  }

  mostrarAbonos() {
    this.pagos = false;
    this.transferencias = false;
    this.abonos = true;
  }


}
