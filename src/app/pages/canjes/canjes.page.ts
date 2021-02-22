import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController, IonSlides, IonSegment } from '@ionic/angular';
import { UsuarioService } from '../../services/usuario.service';
import { Station, Exchanges } from '../../interfaces/interfaces';
import { PostsService } from '../../services/posts.service';

@Component({
  selector: 'app-canjes',
  templateUrl: './canjes.page.html',
  styleUrls: ['./canjes.page.scss'],
})
export class CanjesPage implements OnInit {

  @ViewChild(IonSlides) slides: IonSlides;
  @ViewChild(IonSegment) segment: IonSegment;
  @ViewChild('sliderSecundario', {static: true}) slidesSe: IonSlides;

  //informacion de las estaciones
  stations: Station[] = [];
  exchange: Exchanges[] = [];
  exchangeH: Exchanges[] = [];

  // limitar calendarios
  minGeneral = '2020-01-01';
  fechaActu = new Date().toISOString();

  calHistorial = {
    fechaIni: '',
    fechafin: ''
  };

  animacionPagos = false;
  animacionEntregar = true;

  public lottieConfig: Object;
  private anim: any;

  spiner = false;

  cardCanje = false;

  //-----

  currentSegment = 0;
  currentSlide = 0;

  selectSlideSec = 0;

  select = 0;

  slideOpts = {
    slidesPerView: 1.5,
    freeMode: false,
    
  };

  aceptarDenegar = false;

  constructor(private navCtrl: NavController, private usuarioService: UsuarioService, private postsService: PostsService) { 
    this.lottieConfig = {
      path: 'assets/animation/3617-shopping-bag-error.json',
      autoplay: true,
      loopt: true
    };
  }

  ngOnInit() {
    this.usuarioService.lista_estaciones().subscribe( resp => {
      this.stations = resp.stations;
      if(resp.exchanges.length > 0){
        this.animacionEntregar = false;
        this.exchange = resp.exchanges;
      }else{
        this.animacionEntregar = true;
      }
    });

    this.usuarioService.historialAbonos('exchange', this.fechaActu.split('T')[0], this.fechaActu.split('T')[0]).subscribe( resp => {
      if (resp.ok) {
        this.exchangeH = resp.exchanges;
      } else {
        this.animacionPagos = true;
      }
    });
  }

  vaciarFecha() {
    this.calHistorial.fechafin = '';
  }

  regresar() {
    this.navCtrl.back({animated: true});
  }

  // funciones slide principal
  async segmentChanged(){
    this.currentSegment = await parseInt(this.segment.value);
    this.slides.slideTo(this.currentSegment);
    //console.log(this.currentSegment);
  }

  async onSlideDidChange() {
    this.currentSlide = await this.slides.getActiveIndex();
    this.segment.value = this.currentSlide.toString();
    //console.log(this.currentSlide);
  }

  // funciones slide secundario

  async onSlideDidChangeSec() {
    this.selectSlideSec = await this.slidesSe.getActiveIndex();
    //console.log(this.selectSlideSec);
  }

  async solicitarCanje(id: string) {
    if(await this.postsService.mostrarNotificacion('Q_Mesadetrabajo1', '¿Estas seguro de solicitar un canje en esta estación?', 0)){
      //console.log(true);
      this.postsService.presentLoading('Espere por favor...');
      await this.usuarioService.solicitarCanje(id).subscribe( resp => {
        this.postsService.loading.dismiss();
        (resp.ok) ? [ this.usuarioService.lista_estaciones().subscribe( respu => {
          if(respu.exchanges){
            this.animacionEntregar = false;
            this.exchange = respu.exchanges;
          }else{
            this.animacionEntregar = true;
          }
        }), this.postsService.mostrarNotificacion('CaritaVerde', resp.message, 1)] :  this.postsService.mostrarNotificacion('Regalo', resp.message, 2);
      });
   
    }
    
  }

  async buscarPago() {
    this.cardCanje = false;
    this.exchangeH = [];
    this.spiner = true;
    this.animacionPagos = false;
    await this.usuarioService.historialAbonos(
        'exchange',
        this.calHistorial.fechaIni.split('T')[0],
        this.calHistorial.fechafin.split('T')[0]
      ).subscribe( resp => {
        if (resp.ok) {
          this.exchangeH = resp.exchanges;
          this.spiner = false;
          this.cardCanje = true;
          this.animacionPagos = false;
        } else {
          this.animacionPagos = true;
          this.cardCanje = false;
          this.spiner = false;
        }
    });
  }


}
