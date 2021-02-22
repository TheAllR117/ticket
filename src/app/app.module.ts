import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { IonicStorageModule } from '@ionic/storage';
import { ToastController } from '@ionic/angular';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

import { LottieSplashScreen } from '@ionic-native/lottie-splash-screen/ngx';
import { ComponentsModule } from './components/components.module';
import { LottieAnimationViewModule } from 'ng-lottie';

import { Camera } from '@ionic-native/camera/ngx';
import { FileTransfer } from '@ionic-native/file-transfer/ngx';
import { FormsModule } from '@angular/forms';

import { QRCodeModule } from 'angularx-qrcode';
import { OneSignal } from '@ionic-native/onesignal/ngx';

//import { LottieModule } from 'ngx-lottie';
// import player from 'lottie-web';
//import { Geolocation } from '@ionic-native/geolocation/ngx';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';

 
// Note we need a separate function as it's required
// by the AOT compiler.
/*export function playerFactory() {
  return player;
}*/

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    IonicStorageModule.forRoot(),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    ComponentsModule,
    LottieAnimationViewModule,
    //LottieModule.forRoot({ player: playerFactory }),
    QRCodeModule,
    FormsModule,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    LottieSplashScreen,
    InAppBrowser,
    SocialSharing,
    ToastController,
    OneSignal,
    //Geolocation,
    BarcodeScanner,
    FileTransfer,
    Camera,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
