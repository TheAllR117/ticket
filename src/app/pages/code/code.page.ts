import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-code',
  templateUrl: './code.page.html',
  styleUrls: ['./code.page.scss'],
})
export class CodePage implements OnInit {

  constructor(private navCtrl: NavController,) { }

  ngOnInit() {
  }

  regresar() {
    this.navCtrl.back();
  }

}
