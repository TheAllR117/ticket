import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { IonSlides, ModalController, NavController, IonChip } from '@ionic/angular';
import { NgForm } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import { Balance } from '../../interfaces/interfaces';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.page.html',
  styleUrls: ['./historial.page.scss'],
})
export class HistorialPage implements OnInit {
  @ViewChild('sliderPrincipal', {static: true}) slides: IonSlides;
  @ViewChild('chipPagos', {static: true}) chipPagos: IonChip;
  @ViewChild('chipTrans', {static: true}) chipTrans: IonChip;

  pagos = true;
  transferencias = false;
  abonos = false;

  balance: Balance[] = [];
  share: Balance[] = [];

  slideOpts = {
    slidesPerView: 1
  };

  sliderIndex: number;
  pagosP = true;
  tranferP = false;
  abonosP = false;

  // limitar calendarios
  minGeneral = '2020-01-01';

  calAbonos = {
    fechaIni: '',
    fechafin: ''
  };

  minAbonos = '2020-01-01';

  constructor(
    private modalCtrl: ModalController,
    private navCtrl: NavController,
    private usuarioService: UsuarioService,
    ) { }

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
    this.navCtrl.back({animationDirection: 'back'});
  }

  protected async slideDidChange(): Promise<void> {

    this.sliderIndex = await this.slides.getActiveIndex();

    // console.log(this.sliderIndex );

    if ( this.sliderIndex === 0 ) {
      this.pagosP = true;
      this.tranferP = false;
      this.abonosP = false;
    } else if (this.sliderIndex === 1) {
      this.pagosP = false;
      this.tranferP = true;
      this.abonosP = false;
    } else if (this.sliderIndex === 2) {
      this.pagosP = false;
      this.tranferP = false;
      this.abonosP = true;
    }
    return Promise.resolve();
  }

  mostrarPagos() {
    this.slides.slideTo(0);
  }

  mostrarTrans() {
    this.slides.slideTo(1);
  }

  mostrarAbonos() {
    this.slides.slideTo(2);
  }

  buscarFechaAbono() {
    console.log(this.calAbonos.fechaIni);
    console.log(this.calAbonos.fechafin);
  }

}
