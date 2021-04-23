import { Component, Injectable, EventEmitter } from '@angular/core';
import { NavController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})

export class TabsPage {
  lottieConfig: any;
  public actualizarUser = new EventEmitter<boolean>();

  constructor(private navCtrl: NavController) {
    this.lottieConfig = {
      path: 'assets/animation/scan_w.json',
      autoplay: false,
      loopt: true
    };
  }

  async ionViewDidEnter() {
    this.actualizarUser.emit(true);
    // this.events.publish('UpdateHome');
  }

  async navRouting(ruta: string) {
    await this.navCtrl.navigateForward(ruta);
  }

}
