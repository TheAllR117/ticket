import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Station } from '../../interfaces/interfaces';
import { UsuarioService } from '../../services/usuario.service';
import { PostsService } from '../../services/posts.service';

declare var window: any;

@Component({
  selector: 'app-abonos',
  templateUrl: './abonos.page.html',
  styleUrls: ['./abonos.page.scss'],
})
export class AbonosPage implements OnInit {

  tempImages: string[] = [];
  stations: Station[] = [];
  imageDat = '';
  abonoUser = {
    deposit: '100',
    id_station: null
  };
  barPro = 0;
  // loading: any;

  constructor(
    private usuarioService: UsuarioService,
    private camera: Camera,
    private navCtrl: NavController,
    private postsService: PostsService
  ) { }

  ngOnInit() {
    this.usuarioService.lista_estaciones().subscribe( resp => {
      this.stations.push(...resp.stations);
    });
  }

  async crear_abono() {
    this.postsService.presentLoading('Espere por favor...');

    const valido = await this.usuarioService.realizar_abono(this.imageDat, this.abonoUser.id_station, this.abonoUser.deposit );
    if (valido) {
        this.tempImages = [];
        this.abonoUser.id_station = '';
        this.abonoUser.deposit = '';
        this.postsService.loading.dismiss();
        this.postsService.mostrarPop('21349-tick-green', 'Solicitud de Abono', 'Abono solicitado correctamente.', 2500);
      } else {
        this.postsService.loading.dismiss();
        this.postsService.mostrarPop('14331-error', 'Solicitud de Abono', 'Ha occurrido un error.', 1900);
      }
  }

  regresar() {
    this.navCtrl.back({animated: true});
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
      this.postsService.presentToast('Error al cargar la imagen.');
     });
  }


}
