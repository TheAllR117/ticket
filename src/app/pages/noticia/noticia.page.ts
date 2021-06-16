import { Component, OnInit } from '@angular/core';
import { News } from '../../interfaces/interfaces';
import { YoutubeService } from '../../services/youtube.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-noticia',
  templateUrl: './noticia.page.html',
  styleUrls: ['./noticia.page.scss'],
})
export class NoticiaPage implements OnInit {

  not: News;

  constructor(private youTubeService: YoutubeService,private navCtrl: NavController) { }

  ngOnInit() {
    this.not = this.youTubeService.news;
    console.log(this.not);
  }

  regresar() {
    this.navCtrl.back({animated: true});
  }

}
