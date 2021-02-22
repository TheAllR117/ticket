import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides, IonSegment, NavController } from '@ionic/angular';
import { UsuarioService } from '../../services/usuario.service';
import { Points } from '../../interfaces/interfaces';

@Component({
  selector: 'app-movimientos',
  templateUrl: './movimientos.page.html',
  styleUrls: ['./movimientos.page.scss'],
})

export class MovimientosPage implements OnInit {

  @ViewChild(IonSlides) slides: IonSlides;
  @ViewChild(IonSegment) segment: IonSegment;


  acumulados: Points[] = [];
  redimidos: Points[] = [];

   // limitar calendarios
   minGeneral = '2020-01-01';
   fechaActu = new Date().toISOString();
 
   calAcumulados = {
     fechaIni: '',
     fechafin: ''
   };

  calRedimidos = {
    fechaIni: '',
    fechafin: ''
  };

  currentSegment = 0;
  currentSlide = 0;

  public lottieConfig: Object;
  private anim: any;

  spiner = false;
  animacionPagos = false;

  spiner2 = false;
  animacionPagos2 = false;

  constructor(private navCtrl: NavController,private usuarioService: UsuarioService,) {
    this.lottieConfig = {
      path: 'assets/animation/3617-shopping-bag-error.json',
      autoplay: true,
      loopt: true
    };
  }

  ngOnInit() {
    this.usuarioService.historialAbonos('points', this.fechaActu.split('T')[0], this.fechaActu.split('T')[0]).subscribe( resp => {
      if (resp.ok) {
        this.acumulados = resp.points;
      } else {
        this.animacionPagos = true;
      }
    });

    this.usuarioService.historialAbonos('exchange', this.fechaActu.split('T')[0], this.fechaActu.split('T')[0]).subscribe( resp => {
      if (resp.ok) {
        this.redimidos = resp.exchanges;
      } else {
        this.animacionPagos2 = true;
      }
    });
  }

  regresar() {
    this.navCtrl.back({animated: true});
  }

  async segmentChanged(){
    this.currentSegment = await parseInt(this.segment.value);
    this.slides.slideTo(this.currentSegment);
    //console.log(this.currentSegment);
  }

  vaciarFecha() {
    this.calAcumulados.fechafin = '';
  }

  async onSlideDidChange() {
    this.currentSlide = await this.slides.getActiveIndex();
    this.segment.value = this.currentSlide.toString();
    //console.log(this.currentSlide);
  }

  async buscarMovimientos() {
    this.spiner = true;
    this.animacionPagos = false;
    await this.usuarioService.historialAbonos(
        'points',
        this.calAcumulados.fechaIni.split('T')[0],
        this.calAcumulados.fechafin.split('T')[0]
      ).subscribe( resp => {
        //console.log(resp);
        if (resp.ok) {
          this.spiner = false;
          this.animacionPagos = false;
          this.acumulados = resp.points;
        } else {
          this.spiner = false;
          this.animacionPagos = true;
        }
    });

  
  }

  async buscarMovimientosV() {
    this.spiner2 = true;
    this.animacionPagos2 = false;
    await this.usuarioService.historialAbonos(
        'exchange',
        this.calRedimidos.fechaIni.split('T')[0],
        this.calRedimidos.fechafin.split('T')[0]
      ).subscribe( resp => {
        //console.log(resp);
        if (resp.ok) {
          this.spiner2 = false;
          this.animacionPagos2 = false;
          this.redimidos = resp.exchanges;
        } else {
          this.spiner2 = false;
          this.animacionPagos2 = true;
        }
    });
  }


}
