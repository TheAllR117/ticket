import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IonSlides, NavController, MenuController } from '@ionic/angular';
import { UsuarioService } from '../../services/usuario.service';
import { UiServicesService } from '../../services/ui-services.service';
import { PostsService } from '../../services/posts.service';
import { UserRegis } from '../../interfaces/interfaces';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  @ViewChild('sliderPrincipal', {static: true}) slides: IonSlides;
  @ViewChild('sliderSecundario', {static: true}) slidesSe: IonSlides;
  @ViewChild('passwordEyeRegister', {read: ElementRef, static: true}) passwordEye: ElementRef;

  datosP: any;
  datosC: any;
  datosV: any;

  datosPC: any;
  datosCC: any;
  datosVC: any;

  loginUser = {
    email: '',
    password: ''
  };

  registerUser: UserRegis = {

  };

  passwordTypeInput  =  'password';

  constructor(
    private usuarioService: UsuarioService,
    private navCtrl: NavController,
    private menuCtrl: MenuController,
    private postsService: PostsService) { }

  ngOnInit() {
    this.datosP = true;
    this.datosC = false;
    this.datosV = false;

    this.datosPC = false;
    this.datosCC = false;
    this.datosVC = false;

    this.slides.lockSwipes(true);
    this.slidesSe.lockSwipes(true);
    this.menuCtrl.enable (false);
  }

  async login( fLogin: NgForm ) {
    await this.postsService.presentLoading('Espere por favor...');

    if (fLogin.invalid) {
      await this.postsService.loading.dismiss();
      this.postsService.mostrarPop('14331-error', 'Error al iniciar sesión', 'Verifica los campos', 1950);
      return;
    }

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

  async registro( fRegistro: NgForm ) {
    await this.postsService.presentLoading('Espere por favor...');

    if (fRegistro.invalid) {
      await this.postsService.loading.dismiss();
      this.postsService.mostrarPop('14331-error', 'Error al iniciar sesión', 'Verifica los campos', 1950);
      return;
    }

    const validoR = await this.usuarioService.registro(this.registerUser);
    if (validoR) {
      // navegar al tab
      this.postsService.loading.dismiss();
      this.navCtrl.navigateRoot('/main/tabs/tab1', { animated: true });
    } else {
      // mostrar alerta de usuario y contraseña no correcto
      this.postsService.loading.dismiss();
      // this.uiService.alertaInformativa('Credenciales incorrectas');
      this.postsService.mostrarPop('14331-error', 'Error al completar el registro', 'Verifica los datos', 1950);
    }
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

  mostrarDPersonales() {
    this.datosP = true;
    this.datosPC = false;

    this.datosC = false;
    this.datosCC = false;

    this.slidesSe.lockSwipes(false);
    this.slidesSe.slideTo(0);
    this.slidesSe.lockSwipes(true);
  }

  mostrarDContacto() {
    this.datosP = false;
    this.datosPC = true;

    this.datosC = true;
    this.datosCC = false;

    this.datosV = false;
    this.datosVC = false;

    this.slidesSe.lockSwipes(false);
    this.slidesSe.slideTo(1);
    this.slidesSe.lockSwipes(true);
  }

  mostrarDVehiculo() {
    this.datosP = false;
    this.datosPC = true;

    this.datosC = false;
    this.datosCC = true;

    this.datosV = true;
    this.datosVC = false;

    this.slidesSe.lockSwipes(false);
    this.slidesSe.slideTo(2);
    this.slidesSe.lockSwipes(true);
  }

  // Esta función verifica si el tipo de campo es texto lo cambia a password y viceversa,
  // además verificara el icono si es 'eye-off' lo cambiara a 'eye' y viceversa
  togglePasswordMode() {
    // cambiar tipo input
    this.passwordTypeInput = this.passwordTypeInput === 'text' ? 'password' : 'text';
    // obtener el input
    const nativeEl = this.passwordEye.nativeElement.querySelector('input');
    // (click)="togglePasswordMode()"
    // obtener el indice de la posición del texto actual en el input
    const inputSelection = nativeEl.selectionStart;
    // ejecuto el focus al input
    nativeEl.focus();
    // espero un milisegundo y actualizo la posición del indice del texto
    setTimeout(() => {
        nativeEl.setSelectionRange(inputSelection, inputSelection);
    }, 1);

    }
}
