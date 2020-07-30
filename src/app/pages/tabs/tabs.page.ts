import { Component, Injectable } from '@angular/core';
import { LottieAnimationViewModule } from 'ng-lottie';
import { UsuarioService } from '../../services/usuario.service';
import { Events } from '@ionic/angular';
import { Observable, asyncScheduler, Subject } from 'rxjs';
import { observeOn } from 'rxjs/operators';

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

  constructor(private usuarioService: UsuarioService, private events: Events) {
    LottieAnimationViewModule.forRoot();
    this.lottieConfig = {
      path: '../../../assets/animation/lf30_editor_7HuC2C.json',
      autoplay: true,
      loopt: true
    };
  }

  async ionViewDidEnter() {
    this.events.publish('UpdateHome');
  }
}
