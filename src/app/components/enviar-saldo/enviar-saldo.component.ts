import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { UsuarioService } from '../../services/usuario.service';
import { Contact, Contacts } from '../../interfaces/interfaces';
import { LottieAnimationViewModule } from 'ng-lottie';
import { AlertController } from '@ionic/angular';
import { EnviarCantidaComponent } from '../enviar-cantida/enviar-cantida.component';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';


@Component({
  selector: 'app-enviar-saldo',
  templateUrl: './enviar-saldo.component.html',
  styleUrls: ['./enviar-saldo.component.scss'],
})
export class EnviarSaldoComponent implements OnInit {

  contact: Contact;
  contacts: Contacts[] = [];
  mostraList = false;
  buscando = false;
  mostrarContactos = true;
  usuariosNoRegistrado: any;
  // tslint:disable-next-line: ban-types
  public lottieConfig: Object;
  private anim: any;
  // tslint:disable-next-line: no-inferrable-types
  private animationSpeed: number = 1;

  constructor(
    private modalCtrl: ModalController,
    private usuarioService: UsuarioService,
    private alertController: AlertController,
    private socialSharing: SocialSharing,
  ) { }

  ngOnInit() {
    LottieAnimationViewModule.forRoot();
    this.lottieConfig = {
      path: '../../../assets/animation/contac.json',
      autoplay: true,
      loopt: true
    };

    this.usuarioService.lista_de_contactos().subscribe( resp => {
      if (resp.ok) {
        // this.mostrarContactos = false;
        // tslint:disable-next-line: no-string-literal
        if (resp['message'] === 'No tienes contactos agregados') {
          this.mostrarContactos = true;
        } else {
          this.mostrarContactos = false;
        }
        this.contacts = resp.contacts;
      } else {
        this.mostrarContactos = true;
      }
    });
  }


  handleAnimation(anim: any) {
    this.anim = anim;
  }

  compartirInvitacion() {
    this.socialSharing.share(
      'Puedes descargar la aplicación a través del siguiente enlace:', 'Eucomb', null, 'https://www.levelup.com/noticias');
  }

  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header,
      message,
      buttons: ['OK']
    });

    await alert.present();
  }

  regresar() {
    this.modalCtrl.dismiss();
  }

  buscar( event ) {
    this.usuariosNoRegistrado = null;
    this.contact = null;
    const membresia = event.detail.value;
    this.buscando = true;
    this.usuarioService.burcar_usuario( membresia ).subscribe( resp => {
      if (resp.ok) {
        this.contact = resp.contact;
        this.buscando = false;
        this.mostraList = true;
        // tslint:disable-next-line: no-string-literal
        if (resp.contact['message']) {
          // tslint:disable-next-line: no-string-literal
          this.usuariosNoRegistrado = true;
        } else {
          this.usuariosNoRegistrado = false;
        }
      } else {
        this.buscando = false;
        this.mostraList = false;
      }
    });
  }

  // tslint:disable-next-line: variable-name
  add_user(id_contact: string) {
    this.usuarioService.agregar_contacto(id_contact).subscribe( resp => {
      if (resp.ok) {
        this.contacts = [];
        this.usuarioService.lista_de_contactos().subscribe( respuesta => {
          this.contacts = respuesta.contacts;
        });
      } else {
        this.presentAlert('Error al agregar al usuario', resp.message);
      }
    });
  }

  async modal_enviar(membership: string) {
    // this.modalCtrl.dismiss();
    const modal = await this.modalCtrl.create({
      component: EnviarCantidaComponent,
      componentProps: {
        membership
      }
    });
    modal.present();
  }


}
