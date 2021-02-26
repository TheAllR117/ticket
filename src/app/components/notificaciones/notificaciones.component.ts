import { Component, OnInit, Input } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-notificaciones',
  templateUrl: './notificaciones.component.html',
  styleUrls: ['./notificaciones.component.scss'],
})
export class NotificacionesComponent implements OnInit {
  
  @Input() srcAnimation;
  @Input() message;
  @Input() color;

  mensajes: string[] = [];
  srcUrl = '';

  constructor(private popoverCtrl: PopoverController,) { }

  ngOnInit() {
    this.srcUrl = `assets/svg/${this.srcAnimation}.svg`;
    //console.log(this.message);
    //console.log(Array.isArray([this.message]));
    if(Array.isArray([this.message])){
      if(this.message['code']){
        for(let i of this.message['code']){
          this.mensajes.push(i);
        }
      } else if(this.message['sale']){
        for(let i of this.message['sale']){
          this.mensajes.push(i);
        }
      }else if(this.message['station']){
        for(let i of this.message['station']){
          this.mensajes.push(i);
        }
      }
      else if(this.message['email']){
        for(let i of this.message['email']){
          this.mensajes.push(i);
        }
      }
      else if(this.message['first_surname']){
        for(let i of this.message['first_surname']){
          this.mensajes.push(i);
        }
      }
      else if(this.message['name']){
        for(let i of this.message['name']){
          this.mensajes.push(i);
        }
      }
      else{
        this.mensajes.push(this.message.toString());
      }

    }
  }

  aceptar(){
    (this.color == 0) ? this.popoverCtrl.dismiss({ aceptar: true }) : this.popoverCtrl.dismiss();
  }

  denegar(){
    this.popoverCtrl.dismiss();
  }

}
