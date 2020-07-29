import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NoticiaComponent } from './noticia/noticia.component';
import { NoticiasComponent } from './noticias/noticias.component';
import { IonicModule } from '@ionic/angular';
import { MenuComponent } from './menu/menu.component';
import { HeaderComponent } from './header/header.component';
import { AbonarComponent } from './abonar/abonar.component';
import { FormsModule } from '@angular/forms';
import { EnviarSaldoComponent } from './enviar-saldo/enviar-saldo.component';
import { LottieAnimationViewModule } from 'ng-lottie';
import { EnviarCantidaComponent } from './enviar-cantida/enviar-cantida.component';
import { PopinfoComponent } from './popinfo/popinfo.component';
import { HistorialComponent } from './historial/historial.component';
import { MenuPopComponent } from './menu-pop/menu-pop.component';
import { AbonarQrComponent } from './abonar-qr/abonar-qr.component';
import { QRCodeModule } from 'angularx-qrcode';


@NgModule({
  entryComponents: [
    MenuComponent,
    HeaderComponent,
    AbonarComponent,
    EnviarSaldoComponent,
    EnviarCantidaComponent,
    HistorialComponent,
    PopinfoComponent,
    MenuPopComponent,
    AbonarQrComponent
  ],
  declarations: [
    NoticiaComponent,
    NoticiasComponent,
    MenuComponent,
    HeaderComponent,
    AbonarComponent,
    EnviarSaldoComponent,
    EnviarCantidaComponent,
    HistorialComponent,
    PopinfoComponent,
    MenuPopComponent,
    AbonarQrComponent
  ],
  exports: [
    MenuComponent,
    NoticiasComponent,
    HeaderComponent,
    AbonarComponent,
    EnviarSaldoComponent,
    EnviarCantidaComponent,
    HistorialComponent,
    PopinfoComponent,
    MenuPopComponent,
    AbonarQrComponent
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
