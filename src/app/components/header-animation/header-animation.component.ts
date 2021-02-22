import { Component, OnInit, Input } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-header-animation',
  templateUrl: './header-animation.component.html',
  styleUrls: ['./header-animation.component.scss'],
})
export class HeaderAnimationComponent implements OnInit {
  public lottieConfigBanner: Object
  constructor(private navCtrl: NavController) {
    this.lottieConfigBanner = {
      path: 'assets/animation/lf30_editor_2qjxgvyf.json',
      autoplay: false,
      loopt: true
    };
  }
  @Input() titulo: string;
  ngOnInit() {}

  regresar() {
    this.navCtrl.back({animated: true});
  }

}
