import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { RespuestaPosts } from '../interfaces/interfaces';
import { LoadingController, ToastController, PopoverController } from '@ionic/angular';
import { PopinfoComponent } from '../components/popinfo/popinfo.component';

const URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  paginaPosts = 0;
  public loading: any;

  constructor(
    private http: HttpClient,
    private loadingController: LoadingController,
    private toastCtrl: ToastController,
    private popoverCtrl: PopoverController
    ) { }

  getPosts() {
    this.paginaPosts ++;
    return this.http.get<RespuestaPosts>(`${URL}/posts?pagina=${this.paginaPosts}`);
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
      mode: 'md',
      cssClass: 'animate__animated animate__fadeIn',
      showBackdrop: true,
      backdropDismiss: false,
      componentProps: {
        srcAnimation,
        encabezado,
        message,
        time,
      }
    });

    await popover.present();
  }
}
