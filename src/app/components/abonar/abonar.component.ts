import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController, ToastController, PopoverController } from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Station } from '../../interfaces/interfaces';
import { UsuarioService } from '../../services/usuario.service';
import { LoadingController } from '@ionic/angular';
import { PopinfoComponent } from '../popinfo/popinfo.component';

declare var window: any;

@Component({
  selector: 'app-abonar',
  templateUrl: './abonar.component.html',
  styleUrls: ['./abonar.component.scss'],
})
export class AbonarComponent implements OnInit {

  tempImages: string[] = [];
  stations: Station[] = [];
  imageDat = '';
  abonoUser = {
    deposit: '100',
    id_station: null
  };
  barPro = 0;
  loading: any;

  constructor(
    private modalCtrl: ModalController,
    private usuarioService: UsuarioService,
    private camera: Camera,
    private toastCtrl: ToastController,
    private loadingController: LoadingController,
    private popoverCtrl: PopoverController,
    ) { }

  ngOnInit() {
    this.usuarioService.lista_estaciones().subscribe( resp => {
      this.stations.push(...resp.stations);
    });
  }

  async presentLoading(message: string) {
    this.loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message,
    });
    return await this.loading.present();
  }

  async presentToast(message: string) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 4000,
      mode: 'md',
      position: 'middle',
    });
    toast.present();
  }

  async mostrarPop(srcAnimation: string, encabezado: string, message: string, time: number) {
    const popover = await this.popoverCtrl.create({
      component: PopinfoComponent,
      animated: true,
      cssClass: 'animate__animated animate__fadeIn',
      backdropDismiss: false,
      mode: 'ios',
      componentProps: {
        srcAnimation,
        encabezado,
        message,
        time,
      }
    });

    await popover.present();
  }

  async crear_abono() {
    this.presentLoading('Espere por favor...');

    const valido = await this.usuarioService.realizar_abono(this.imageDat, this.abonoUser.id_station, this.abonoUser.deposit );
    if (valido) {
        this.tempImages = [];
        this.abonoUser.id_station = '';
        this.abonoUser.deposit = '';
        this.loading.dismiss();
        this.mostrarPop('21349-tick-green', 'Envio de saldo', 'Abono realizado correctamente.', 2500);
      } else {
        this.loading.dismiss();
        this.mostrarPop('14331-error', 'Envio de saldo', 'Ha occurrido un error.', 1900);
      }
  }

  regresar() {
    this.modalCtrl.dismiss();
  }

  camara() {
    this.tempImages = [];
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      sourceType: this.camera.PictureSourceType.CAMERA
    };

    this.procesarImagen(options);
  }

  libreria() {
    this.tempImages = [];
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    };

    this.procesarImagen(options);
  }

  procesarImagen( options: CameraOptions ) {
    this.camera.getPicture(options).then(async (imageData) => {
      const img = window.Ionic.WebView.convertFileSrc( imageData );
      this.tempImages.push(img);
      this.imageDat = imageData;

     }, (err) => {
      this.presentToast('Error al cargar la imagen.');
     });
  }

}
