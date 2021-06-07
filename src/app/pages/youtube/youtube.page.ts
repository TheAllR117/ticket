import { Component, OnInit } from '@angular/core';
import { ModalController, NavController, Platform } from '@ionic/angular';
import { YoutubeService } from '../../services/youtube.service';
import { Observable } from 'rxjs';
import { YoutubeVideoPlayer } from '@ionic-native/youtube-video-player/ngx';


@Component({
  selector: 'app-youtube',
  templateUrl: './youtube.page.html',
  styleUrls: ['./youtube.page.scss'],
})
export class YoutubePage implements OnInit {
  videos: any[];
  unsubscribe$: Observable<any>;
  constructor(private youTubeService: YoutubeService,private navCtrl: NavController,private youTube: YoutubeVideoPlayer, private plt: Platform) { }

  ngOnInit() {
    this.videos = [];
    this.youTubeService.getVideosForChanel('UCpl0dkNCEQsOOKS587yPEXA', 20).subscribe(lista => {
      //console.log(lista);
      for (let element of lista["items"]) {
        this.videos.push(element)
      }
    });
  }

  regresar() {
    this.navCtrl.back({animated: true});
  }

  async openYouTubeVedio(id: string){
    if (this.plt.is('cordova')) {
      await this.youTube.openVideo(id);
    }else{
      window.open('https://www.youtube.com/watch?v=' + id);
    }
  }  

}
