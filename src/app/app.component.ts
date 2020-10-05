import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { LottieSplashScreen } from '@ionic-native/lottie-splash-screen/ngx';
import { PushService } from './services/push.service';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private lottieSplashScreen: LottieSplashScreen,
    private pushService: PushService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.pushService.configuracionInicial();
      setTimeout(() => {
        this.lottieSplashScreen.hide();
        this.statusBar.overlaysWebView(true);
        this.statusBar.backgroundColorByHexString('#33000000');
      }, 5000);
    });
  }
}
