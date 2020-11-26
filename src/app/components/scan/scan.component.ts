import { Component, OnInit } from '@angular/core';
import { LottieAnimationViewModule } from 'ng-lottie';
@Component({
  selector: 'app-scan',
  templateUrl: './scan.component.html',
  styleUrls: ['./scan.component.scss'],
})
export class ScanComponent implements OnInit {

  // tslint:disable-next-line: ban-types
  public lottieConfig: Object;
  private anim: any;
  // tslint:disable-next-line: no-inferrable-types
  private animationSpeed: number = 1;

  constructor() { }

  ngOnInit() {
    LottieAnimationViewModule.forRoot();
    this.lottieConfig = {
      path: 'assets/animation/26531-construction-in-process.json',
      autoplay: true,
      loopt: true
    };
    
  }

  handleAnimation(anim: any) {
    this.anim = anim;
  }

}
