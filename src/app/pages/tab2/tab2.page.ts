import { Component, OnInit } from '@angular/core';
import { User } from '../../interfaces/interfaces';
import { UsuarioService } from '../../services/usuario.service';
import { NavController, MenuController } from '@ionic/angular';
import { TabsPage } from '../tabs/tabs.page';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  user: User = {};
  // tslint:disable-next-line: ban-types
  public lottieConfig: Object;
  private anim: any;
  // tslint:disable-next-line: no-inferrable-types
  private animationSpeed: number = 1;
  animacion = true;

  slideOpts = {
    slidesPerView: 2.1,
    freeMode: true,
    coverflowEffect: {
    slideShadows: true,
    },
  };

  constructor(
    private usuarioService: UsuarioService,
    private navCtrl: NavController,
    private tabspage: TabsPage,
    private menuCtrl: MenuController,) {
    /*this.lottieConfig = {
      path: 'assets/animation/intro.json',
      autoplay: false,
      loopt: true
    };
    setTimeout(() => {
      this.anim.play();
      setTimeout(() => {
        this.anim.pause();
        this.animacion = true;
      }, 6000);
    }, 2000);*/
  }

  ngOnInit() {
    // habilitamos el menu lateral
    this.menuCtrl.enable (true);
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
