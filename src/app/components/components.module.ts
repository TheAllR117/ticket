import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { MenuComponent } from './menu/menu.component';
import { HeaderComponent } from './header/header.component';
import { FormsModule } from '@angular/forms';
import { LottieAnimationViewModule } from 'ng-lottie';
import { EnviarCantidaComponent } from './enviar-cantida/enviar-cantida.component';
import { PopinfoComponent } from './popinfo/popinfo.component';
import { AbonarQrComponent } from './abonar-qr/abonar-qr.component';
import { QRCodeModule } from 'angularx-qrcode';
import { ConfirmarPagoComponent } from './confirmar-pago/confirmar-pago.component';


@NgModule({
  entryComponents: [
    MenuComponent,
    HeaderComponent,
    EnviarCantidaComponent,
    PopinfoComponent,
    AbonarQrComponent,
    ConfirmarPagoComponent
  ],
  declarations: [
    MenuComponent,
    HeaderComponent,
    EnviarCantidaComponent,
    PopinfoComponent,
    AbonarQrComponent,
    ConfirmarPagoComponent
  ],
  exports: [
    MenuComponent,
    HeaderComponent,
    EnviarCantidaComponent,
    PopinfoComponent,
    AbonarQrComponent,
    ConfirmarPagoComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    LottieAnimationViewModule,
    QRCodeModule,
  ]
})
export class ComponentsModule { }
