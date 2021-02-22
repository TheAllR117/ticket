import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides, NavController } from '@ionic/angular';
import { UsuarioService } from '../../services/usuario.service';
import { Balance } from '../../interfaces/interfaces';
import { AnimationItem } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.page.html',
  styleUrls: ['./historial.page.scss'],
})
export class HistorialPage implements OnInit {
  @ViewChild('sliderPrincipal', {static: true}) slides: IonSlides;

  balance: Balance[] = [];
  share: Balance[] = [];
  received: Balance[] = [];
  payment: Balance[] = [];

  // configuraciones del slide
  slideOpts = {
    slidesPerView: 1
  };

  // variables para cambiar entre  slides con los chips.
  sliderIndex: number;
  pagosP = true;
  tranferP = false;
  abonosP = false;

  // variables para ocultar y mostrar componentes de la pagina
  spiner = false;
  cardAbonos = true;
  cardPagos = true;
  animacionAbonos = false;
  animacionTrans = false;
  animacionPagos = false;
  ocultarFecha = true;
  ocultarFechaTrans = true;
  ocultarBotonEnvioTranferencias: any;

  // limitar calendarios
  minGeneral = '2020-01-01';
  fechaActu = new Date().toISOString();

  // formularios

  calPagos = {
    fechaIni: '',
    fechafin: ''
  };

  calAbonos = {
    fechaIni: '',
    fechafin: ''
  };

  calTransfer = {
    fechaIni: '',
    fechafin: ''
  };

   // tslint:disable-next-line: ban-types
   public lottieConfig: Object;
   // tslint:disable-next-line: ban-types
   public lottieConfigTra: Object;
   private anim: any;

  constructor(
    private navCtrl: NavController,
    private usuarioService: UsuarioService,
    ) {
      //LottieAnimationViewModule.forRoot();
      this.lottieConfig = {
        path: 'assets/animation/3617-shopping-bag-error.json',
        autoplay: true,
        loopt: true
      };

    }

  ngOnInit() {

    this.ocultarBotonEnvioTranferencias = true;

    this.usuarioService.historialAbonos('payment', this.fechaActu.split('T')[0], this.fechaActu.split('T')[0]).subscribe( resp => {
      if (resp.ok) {
        this.payment = resp.payments;
      } else {
        this.animacionPagos = true;
        this.cardPagos = false;
      }
    });

    this.usuarioService.historialAbonos('balance', this.fechaActu.split('T')[0], this.fechaActu.split('T')[0]).subscribe( resp => {
      // console.log(resp);
      if (resp.ok) {
        this.balance = resp.balances;
      } else {
        this.cardAbonos = false;
        this.animacionAbonos = true;
      }
    });

    this.usuarioService.historialAbonos('share', this.fechaActu.split('T')[0], this.fechaActu.split('T')[0]).subscribe( resp => {
      if (resp.ok) {
        this.share = resp.balances;
      } else {
        this.animacionTrans = true;
      }
    });

    this.usuarioService.historialAbonos('received', this.fechaActu.split('T')[0], this.fechaActu.split('T')[0]).subscribe( resp => {
      if (resp.ok) {
        this.received = resp.balances;
      }
    });
  }

  regresar() {
    this.navCtrl.back({animationDirection: 'back'});
  }

  handleAnimation(anim: any) {
    this.anim = anim;
  }

  buscarPago() {
    this.cardPagos = false;
    this.payment = [];
    this.spiner = true;
    this.usuarioService.historialAbonos(
        'payment',
        this.calPagos.fechaIni.split('T')[0],
        this.calPagos.fechafin.split('T')[0]
      ).subscribe( resp => {
        if (resp.ok) {
          this.payment = resp.payments;
          this.spiner = false;
          this.cardPagos = true;
          this.animacionPagos = false;
        } else {
          this.animacionPagos = true;
          this.cardPagos = false;
          this.spiner = false;
          this.cardPagos = false;
        }
    });
  }

  buscarAbono() {
    this.cardAbonos = false;
    this.balance = [];
    this.spiner = true;
    this.usuarioService.historialAbonos(
        'balance',
        this.calAbonos.fechaIni.split('T')[0],
        this.calAbonos.fechafin.split('T')[0]
      ).subscribe( resp => {
      if (resp.ok) {
        this.balance = resp.balances;
        this.spiner = false;
        this.cardAbonos = true;
        this.animacionAbonos = false;
      } else {
        this.spiner = false;
        this.cardAbonos = false;
        this.animacionAbonos = true;
      }
    });
  }

  buscarTranferencia() {

    this.ocultarBotonEnvioTranferencias = !this.ocultarBotonEnvioTranferencias;
    this.received = [];
    this.share = [];

    this.spiner = true;

    this.usuarioService.historialAbonos(
        'share',
        this.calTransfer.fechaIni.split('T')[0],
        this.calTransfer.fechafin.split('T')[0]
      ).subscribe( resp => {
      if (resp.ok) {
        this.share = resp.balances;
        this.spiner = false;
        this.ocultarBotonEnvioTranferencias = !this.ocultarBotonEnvioTranferencias;
        this.animacionTrans = false;
      } else {
        this.spiner = false;
        this.ocultarBotonEnvioTranferencias = !this.ocultarBotonEnvioTranferencias;
        this.animacionTrans = true;
      }
    });

    this.usuarioService.historialAbonos(
      'received',
      this.calTransfer.fechaIni.split('T')[0],
      this.calTransfer.fechafin.split('T')[0]
    ).subscribe( resp => {
    if (resp.ok) {
      this.received = resp.balances;

    } else {

    }
  });
  }

  vaciarFecha() {
    this.calAbonos.fechafin = '';
    this.calTransfer.fechafin = '';
  }

  async slideDidChange() {

    this.sliderIndex = await this.slides.getActiveIndex();

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

  cambiarEntreEnviosPercepciones() {
    this.ocultarBotonEnvioTranferencias = !this.ocultarBotonEnvioTranferencias;
  }

}
