import { Component, Injectable, EventEmitter } from '@angular/core';
import { LottieAnimationViewModule } from 'ng-lottie';
import { UsuarioService } from '../../services/usuario.service';
import { PopoverController } from '@ionic/angular';
import { ScanComponent } from 'src/app/components/scan/scan.component';
// import { Events } from '@ionic/angular';

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

  constructor(private usuarioService: UsuarioService, private popoverCtrl: PopoverController) {
    LottieAnimationViewModule.forRoot();
    this.lottieConfig = {
      path: 'assets/animation/lf30_editor_5gTE8E.json',
      autoplay: true,
      loopt: true
    };
  }

  async ionViewDidEnter() {
    this.actualizarUser.emit(true);
    // this.events.publish('UpdateHome');
  }

  async mostrarScan() {
    const popover = await this.popoverCtrl.create({
      component: ScanComponent,
      animated: true,
      mode: 'ios',
      cssClass: 'animate__animated animate__fadeIn',
      showBackdrop: true,
      backdropDismiss: true,
      
    });

    await popover.present();
  }

}
