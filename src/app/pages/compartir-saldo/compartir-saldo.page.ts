import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { UsuarioService } from '../../services/usuario.service';
import { Contact, Contacts } from '../../interfaces/interfaces';
import { LottieAnimationViewModule } from 'ng-lottie';
import { AlertController } from '@ionic/angular';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { EnviarCantidaComponent } from '../../components/enviar-cantida/enviar-cantida.component';
import { Tab1Page } from '../tab1/tab1.page';
import { PostsService } from '../../services/posts.service';

@Component({
  selector: 'app-compartir-saldo',
  templateUrl: './compartir-saldo.page.html',
  styleUrls: ['./compartir-saldo.page.scss'],
})
export class CompartirSaldoPage implements OnInit {

  contact: Contact;
  contacts: Contacts[] = [];
  mostraList = false;
  buscando = false;
  mostrarContactos: any;
  usuariosNoRegistrado: any;
  // tslint:disable-next-line: ban-types
  public lottieConfig: Object;
  private anim: any;
  // tslint:disable-next-line: no-inferrable-types
  private animationSpeed: number = 1;
  tab1Page: Tab1Page;

  constructor(
    private modalCtrl: ModalController,
    private usuarioService: UsuarioService,
    private alertController: AlertController,
    private socialSharing: SocialSharing,
    private navCtrl: NavController,
    private postsService: PostsService
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
    this.navCtrl.back();
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
        this.mostrarContactos = false;
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

    const modal = await this.modalCtrl.create({
      component: EnviarCantidaComponent,
      componentProps: {
        membership
      }
    });
    modal.present();
  }

}