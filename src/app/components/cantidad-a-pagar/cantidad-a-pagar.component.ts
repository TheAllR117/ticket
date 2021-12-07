import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { PostsService } from '../../services/posts.service';

@Component({
  selector: 'app-cantidad-a-pagar',
  templateUrl: './cantidad-a-pagar.component.html',
  styleUrls: ['./cantidad-a-pagar.component.scss'],
})
export class CantidadAPagarComponent implements OnInit {

  @Input() nameStation;
  @Input() balanceInit;
  @Input() balance;
  @Input() id_payment;

  valorSelect: number;
  temp: any;
  cobroSelect = {
    valor: null,
  };

  constructor(
    private modalCtrl: ModalController,
    private postsService: PostsService
  ) { }

  ngOnInit() {
    this.valorSelect = 0;
  }

  regresar() {
    this.modalCtrl.dismiss({
      actualizar: true
    });
  }

  changeValue(cantidadSelect: number){
    this.valorSelect = cantidadSelect;
  }

  async confirmarCantidad(cantidad: string){
     this.temp = await this.postsService.mostrarNotificacionGaleoncito(cantidad,1);
    //console.log(this.temp);

    if (this.temp['actualizar']) {
      this.modalCtrl.dismiss({
        cobrar: true,
        balance: this.valorSelect,
        id_payment: this.id_payment
      });
    }
    
    
  }

}
