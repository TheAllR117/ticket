import { Component, ViewChild, OnInit } from '@angular/core';
import { LottieAnimationViewModule } from 'ng-lottie';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  // tslint:disable-next-line: ban-types
  public lottieConfig: Object;
  private anim: any;
  // tslint:disable-next-line: no-inferrable-types
  private animationSpeed: number = 1;

  constructor() {
    LottieAnimationViewModule.forRoot();
    this.lottieConfig = {
      path: 'assets/animation/26531-construction-in-process.json',
      autoplay: true,
      loopt: true
    };
  }

  ngOnInit() {
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
