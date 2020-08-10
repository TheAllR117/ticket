import { Component, OnInit, Input } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-confirmar-pago',
  templateUrl: './confirmar-pago.component.html',
  styleUrls: ['./confirmar-pago.component.scss'],
})
export class ConfirmarPagoComponent implements OnInit {
  @Input() prices;
  @Input() producto;
  @Input() cantidad;
  @Input() estacion;

  constructor(private popoverCtrl: PopoverController) { }

  ngOnInit() {}

  onClick() {
    this.popoverCtrl.dismiss();
  }

}
