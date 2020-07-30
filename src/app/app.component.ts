import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { LottieSplashScreen } from '@ionic-native/lottie-splash-screen/ngx';


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
    private lottieSplashScreen: LottieSplashScreen
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // this.statusBar.backgroundColorByHexString('#75b952');
      setTimeout(() => {
        this.lottieSplashScreen.hide();
        // this.statusBar.styleDefault();
        this.statusBar.overlaysWebView(true);
        this.statusBar.backgroundColorByHexString('#33000000');
        // this.statusBar.styleBlackTranslucent();
      }, 5000);
      // this.splashScreen.hide();
    });
  }
}
