import { Component, OnInit, Input } from '@angular/core';
import { Article } from '../../interfaces/interfaces';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { ActionSheetController } from '@ionic/angular';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { DataLocalService } from '../../services/data-local.service';


@Component({
  selector: 'app-noticia',
  templateUrl: './noticia.component.html',
  styleUrls: ['./noticia.component.scss'],
})
export class NoticiaComponent implements OnInit {

  @Input() noticia: Article;
  @Input() indice: number;
  @Input() enFavoritos;

  constructor(
    private iab: InAppBrowser,
    private actionSheetCtrl: ActionSheetController,
    private socialSharing: SocialSharing,
    private dataLocalService: DataLocalService,
  ) { }

  ngOnInit() {}

  abrirNoticia() {
    const browser = this.iab.create(this.noticia.url, '_system');
    // console.log('noticia', this.noticia.url);
  }

  async lanzarMenu() {
    let guardarBorrarBtn;

    if (this.enFavoritos) {
      guardarBorrarBtn = {
        text: 'Remove',
        cssClass: 'action-dark',
        icon: 'trash',
        handler: () => {
          // console.log('Favorite clicked');
          this.dataLocalService.borrarNoticia( this.noticia );
        }
      };

    } else {
      guardarBorrarBtn = {
        text: 'Favorite',
        cssClass: 'action-dark',
        icon: 'star',
        handler: () => {
          // console.log('Favorite clicked');
          this.dataLocalService.guardarNoticia( this.noticia );
        }
      };
    }

    const actionSheet = await this.actionSheetCtrl.create({
      header: 'New',
      buttons: [
        {
          text: 'Share',
          cssClass: 'action-dark',
          icon: 'share',
          handler: () => {
            // console.log('Share clicked');
            this.socialSharing.share(
              this.noticia.title,
              this.noticia.source.name,
              '',
              this.noticia.url
            );
          }
        },
        guardarBorrarBtn,
        {
          text: 'Cancel',
          cssClass: 'action-dark',
          icon: 'close',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
      }]
    });
    await actionSheet.present();
  }
}
