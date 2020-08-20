import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { UsuarioService } from '../../services/usuario.service';
import { UserP, User } from '../../interfaces/interfaces';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  user: User = {};

  perfil = {
    name: '',
    first_surname: '',
    second_surname: '',
    phone: '',
    address: '',
    sex: '',
    birthdate: '',
    number_plate: '',
    type_car: '',
    email: '',
    password: ''
  };

  constructor(private navCtrl: NavController, private usuarioService: UsuarioService) { }

  ngOnInit() {
    this.usuarioService.perfil().subscribe(resp => {
      if (resp.ok) {
        this.user = resp.user;
        console.log(this.user);
      }
    });
  }

  regresar(ruta: string) {
    this.navCtrl.back({ animated: true });
  }

  async perfilE() {
    console.log(this.perfil);
    this.usuarioService.editarPerfil(
      this.perfil.name,
      this.perfil.first_surname,
      this.perfil.second_surname,
      this.perfil.phone,
      this.perfil.password,
      this.perfil.address,
      this.perfil.email,
      this.perfil.sex,
      this.perfil.birthdate,
      this.perfil.number_plate,
      this.perfil.type_car
    ).subscribe( resp => {
      // tslint:disable-next-line: no-string-literal
      if (resp[ 'ok' ]) {
        console.log(resp);
        this.usuarioService.perfil().subscribe(resp1 => {
          if (resp1.ok) {
            this.user = resp1.user;
          }
        });
      }
    });
  }

}
