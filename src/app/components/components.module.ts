import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { MenuComponent } from './menu/menu.component';
import { HeaderComponent } from './header/header.component';
import { FormsModule } from '@angular/forms';
import { EnviarCantidaComponent } from './enviar-cantida/enviar-cantida.component';
import { PopinfoComponent } from './popinfo/popinfo.component';
import { AbonarQrComponent } from './abonar-qr/abonar-qr.component';
import { QRCodeModule } from 'angularx-qrcode';
import { ConfirmarPagoComponent } from './confirmar-pago/confirmar-pago.component';
import { CompartidoQrComponent } from './compartido-qr/compartido-qr.component';
import player from 'lottie-web';
import { LottieModule } from 'ngx-lottie';
import { HeaderAnimationComponent } from './header-animation/header-animation.component';
import { NotificacionesComponent } from './notificaciones/notificaciones.component';
import { CantidadAPagarComponent } from './cantidad-a-pagar/cantidad-a-pagar.component';
import { NotificacionesGaleoncitoComponent } from './notificaciones-galeoncito/notificaciones-galeoncito.component';
export function playerFactory() {
  return player;
}


@NgModule({
  entryComponents: [
    MenuComponent,
    HeaderComponent,
    EnviarCantidaComponent,
    PopinfoComponent,
    AbonarQrComponent,
    CompartidoQrComponent,
    ConfirmarPagoComponent,
    HeaderAnimationComponent,
    NotificacionesComponent,
    CantidadAPagarComponent,
    NotificacionesGaleoncitoComponent
  ],
  declarations: [
    MenuComponent,
    HeaderComponent,
    EnviarCantidaComponent,
    PopinfoComponent,
    AbonarQrComponent,
    CompartidoQrComponent,
    ConfirmarPagoComponent,
    HeaderAnimationComponent,
    NotificacionesComponent,
    CantidadAPagarComponent,
    NotificacionesGaleoncitoComponent
  ],
  exports: [
    MenuComponent,
    HeaderComponent,
    EnviarCantidaComponent,
    PopinfoComponent,
    AbonarQrComponent,
    CompartidoQrComponent,
    ConfirmarPagoComponent,
    HeaderAnimationComponent,
    NotificacionesComponent,
    CantidadAPagarComponent,
    NotificacionesGaleoncitoComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    LottieModule.forRoot({ player: playerFactory }),
    QRCodeModule,
  ]
})
export class ComponentsModule { }
