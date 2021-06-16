import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController } from '@ionic/angular';
import { YoutubeService } from '../../services/youtube.service';
import { News } from '../../interfaces/interfaces';

@Component({
  selector: 'app-noticias',
  templateUrl: './noticias.page.html',
  styleUrls: ['./noticias.page.scss'],
})
export class NoticiasPage implements OnInit {
  news: News;

  constructor(private navCtrl: NavController,private youTubeService: YoutubeService,public loadingCtrl: LoadingController) { }

  async ngOnInit() {
    const loading = await this.loadingCtrl.create();
    loading.present();
    await this.youTubeService.getNews().subscribe(resp => {
      //console.log(resp);
      this.news = resp;
    });
    loading.dismiss();
  }

  regresar() {
    this.navCtrl.back({animated: true});
  }

  navRouting(ruta: string, not: News) {
    //console.log(not);
    this.youTubeService.news = not;
    this.navCtrl.navigateForward(ruta);
  }

}
