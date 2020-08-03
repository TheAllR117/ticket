import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { IonSlides, ModalController, NavController, IonChip } from '@ionic/angular';
import { NgForm } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import { Balance } from '../../interfaces/interfaces';
import { LottieAnimationViewModule } from 'ng-lottie';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.page.html',
  styleUrls: ['./historial.page.scss'],
})
export class HistorialPage implements OnInit {
  @ViewChild('sliderPrincipal', {static: true}) slides: IonSlides;

  balance: Balance[] = [];
  share: Balance[] = [];

  // configuraciones del slide
  slideOpts = {
    slidesPerView: 1
  };

  // variables para cambiar entre chips y slides
  sliderIndex: number;
  pagosP = true;
  tranferP = false;
  abonosP = false;

  // variables para ocultar y mostrar componentes de la pagina
  spiner = false;
  cardAbonos = true;
  animacionAbonos = false;
  animacionTrans = false;
  ocultarFecha = true;
  ocultarFechaTrans = true;

  // limitar calendarios
  minGeneral = '2020-01-01';
  fechaActu = new Date().toISOString();

  // formulario abonos
  calAbonos = {
    fechaIni: '',
    fechafin: ''
  };

   // tslint:disable-next-line: ban-types
   public lottieConfig: Object;
   // tslint:disable-next-line: ban-types
   public lottieConfigTra: Object;
   private anim: any;
   // tslint:disable-next-line: no-inferrable-types
   private animationSpeed: number = 1;

  constructor(
    private modalCtrl: ModalController,
    private navCtrl: NavController,
    private usuarioService: UsuarioService,
    ) {
      LottieAnimationViewModule.forRoot();
      this.lottieConfig = {
        path: '../../../assets/animation/3617-shopping-bag-error.json',
        autoplay: true,
        loopt: true
      };

      this.lottieConfigTra = {
        path: '../../../assets/animation/10271-money-transfer.json',
        autoplay: true,
        loopt: true
      };
    }

  ngOnInit() {

    this.usuarioService.historialAbonos('balance', '', '').subscribe( resp => {
      if (resp.ok) {
        this.balance = resp.balances;
      } else {
        this.cardAbonos = false;
        this.animacionAbonos = true;
        this.ocultarFecha = false;
      }
    });

    this.usuarioService.historialAbonos('share', '', '').subscribe( resp => {
      if (resp.ok) {
        this.share = resp.balances;
      } else {
        this.ocultarFechaTrans = false;
        this.animacionTrans = true;
      }
    });
  }

  regresar() {
    this.navCtrl.back({animationDirection: 'back'});
  }

  handleAnimation(anim: any) {
    this.anim = anim;
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

  vaciarFecha() {
    this.calAbonos.fechafin = '';
  }

  protected async slideDidChange(): Promise<void> {

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

}
