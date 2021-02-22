import { Component, OnInit } from '@angular/core';
import { User } from '../../interfaces/interfaces';
import { UsuarioService } from '../../services/usuario.service';
//import { LottieAnimationViewModule } from 'ng-lottie';
import { MenuController, ModalController, NavController } from '@ionic/angular';
import { TabsPage } from '../tabs/tabs.page';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { AnimationItem } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})

export class Tab1Page implements OnInit {

  user: User = {};
  animacion = false;
  // tslint:disable-next-line: ban-types
  public lottieConfig: Object;
  private anim: any;
  // tslint:disable-next-line: no-inferrable-types
  private animationSpeed: number = 1;

  slideOpts = {
    slidesPerView: 2.1,
    freeMode: true,
    coverflowEffect: {
    slideShadows: true,
    },
  };
  currentPage: any;

  constructor(
    private usuarioService: UsuarioService,
    private menuCtrl: MenuController,
    private modalCtrl: ModalController,
    private navCtrl: NavController,
    private tabspage: TabsPage,
    private routerModule: RouterModule,
    private router: Router) {

    /*LottieAnimationViewModule.forRoot();*/
    this.lottieConfig = {
      path: 'assets/animation/intro.json',
      autoplay: false,
      loopt: true
    };

    this.lottieConfig = {
      path: 'assets/animation/26531-construction-in-process.json',
      autoplay: true,
      loopt: true
    };

    /*setTimeout(() => {
      this.anim.play();
      setTimeout(() => {
        this.anim.pause();
        this.animacion = true;
      }, 6000);
    }, 2000);*/

  }

  ngOnInit() {
    // habilitamos el menu lateral
    this.menuCtrl.enable(true);
    // cargamos la informacion del usuario
    this.user = this.usuarioService.getUsuario();

  }

  async ionViewWillEnter() {

    this.tabspage.actualizarUser.subscribe(async respueta => {
      if (respueta) {
        await this.usuarioService.validaToken();
        this.user = this.usuarioService.getUsuario();
      }
    });

  }

  navRouting(ruta: string) {
    this.navCtrl.navigateForward(ruta);
  }

  navigate(ruta: string) {
    this.router.navigateByUrl(ruta);
  }

  async doRefresh(event) {
    await this.usuarioService.validaToken();
    this.user = this.usuarioService.getUsuario();
    event.target.complete();
  }


  handleAnimation(anim: any) {
    this.anim = anim;
  }

  stop() {
    this.anim.stop();
  }
  play() {
    this.anim.play();
  }
  pause() {
    this.anim.pause();
  }
  setSpeed(speed: number) {
    this.animationSpeed = speed;
    this.anim.setSpeed(speed);
  }
}
