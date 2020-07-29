import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IonSlides, NavController, MenuController } from '@ionic/angular';
import { UsuarioService } from '../../services/usuario.service';
import { UiServicesService } from '../../services/ui-services.service';
import { LoadingController } from '@ionic/angular';
import { PostsService } from '../../services/posts.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  @ViewChild('sliderPrincipal', {static: true}) slides: IonSlides;
  avatars = [
    {
      img: 'av-1.png',
      seleccionado: true
    },
    {
      img: 'av-2.png',
      seleccionado: false
    },
    {
      img: 'av-3.png',
      seleccionado: false
    },
    {
      img: 'av-4.png',
      seleccionado: false
    },
    {
      img: 'av-5.png',
      seleccionado: false
    },
    {
      img: 'av-6.png',
      seleccionado: false
    },
    {
      img: 'av-7.png',
      seleccionado: false
    },
    {
      img: 'av-8.png',
      seleccionado: false
    },
];

avatarSlide = {
  slidesPerView: 3.5
};

loginUser = {
  email: '',
  password: ''
};

loading: any;

  constructor(
    private usuarioService: UsuarioService,
    private navCtrl: NavController,
    private uiService: UiServicesService,
    private menuCtrl: MenuController,
    private postsService: PostsService) { }

  ngOnInit() {
    this.slides.lockSwipes(true);
    this.menuCtrl.enable (false);
  }

  async login( fLogin: NgForm ) {
    this.postsService.presentLoading('Espere por favor...');

    if (fLogin.invalid) { this.loading.dismiss(); return; }

    // mandamos a llavar la funcion de inicio de sesion
    const valido = await this.usuarioService.login( this.loginUser.email, this.loginUser.password );

    if (valido) {
      // navegar al tab
      this.postsService.loading.dismiss();
      this.navCtrl.navigateRoot('/main/tabs/tab1', { animated: true });
    } else {
      // mostrar alerta de usuario y contraseña no correcto
      this.postsService.loading.dismiss();
      // this.uiService.alertaInformativa('Credenciales incorrectas');
      this.postsService.mostrarPop('14331-error', 'Error al iniciar sesión', 'Credenciales incorrectas', 1950);
    }

  }

  registro( fRegistro: NgForm ) {
    console.log( fRegistro.valid);
  }

  seleccionarAvatar(avatar) {
    this.avatars.forEach(av => av.seleccionado = false);
    avatar.seleccionado = true;
  }

  mostrarRegistro() {
    this.slides.lockSwipes(false);
    this.slides.slideTo(0);
    this.slides.lockSwipes(true);
  }

  mostrarLogin() {
    this.slides.lockSwipes(false);
    this.slides.slideTo(1);
    this.slides.lockSwipes(true);
  }
}
