import { Component, Injectable, EventEmitter } from '@angular/core';
import { LottieAnimationViewModule } from 'ng-lottie';
import { UsuarioService } from '../../services/usuario.service';
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

  constructor(private usuarioService: UsuarioService) {
    LottieAnimationViewModule.forRoot();
    this.lottieConfig = {
      path: '../../../assets/animation/lf30_editor_5gTE8E.json',
      autoplay: true,
      loopt: true
    };
  }

  async ionViewDidEnter() {
    this.actualizarUser.emit(true);
    // this.events.publish('UpdateHome');
  }
}
