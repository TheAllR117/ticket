import { Component, OnInit, Input } from '@angular/core';
import { LottieAnimationViewModule } from 'ng-lottie';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-popinfo',
  templateUrl: './popinfo.component.html',
  styleUrls: ['./popinfo.component.scss'],
})
export class PopinfoComponent implements OnInit {
  @Input() srcAnimation;
  @Input() encabezado;
  @Input() message;
  @Input() time;

  // tslint:disable-next-line: ban-types
  public lottieConfig: Object;
  private anim: any;
  // tslint:disable-next-line: no-inferrable-types
  private animationSpeed: number = 1;

  constructor(private popoverCtrl: PopoverController) {
  }

  ngOnInit() {
    LottieAnimationViewModule.forRoot();
    this.lottieConfig = {
      path: 'assets/animation/' + this.srcAnimation + '.json',
      autoplay: true,
      loopt: true
    };
    setTimeout(() => {
      this.anim.pause();
    }, this.time);
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

  onClick() {
    this.popoverCtrl.dismiss();
  }

}
