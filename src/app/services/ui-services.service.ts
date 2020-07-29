import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UiServicesService {

  constructor(private alertCtrl: AlertController) { }

  async alertaInformativa(message: string) {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      message,
      buttons: ['OK']
    });

    await alert.present();
  }
}
