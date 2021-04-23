import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { UsuarioService } from '../../services/usuario.service';
import { UserP, User, Data_car } from '../../interfaces/interfaces';
import { PostsService } from '../../services/posts.service';
import { async } from '@angular/core/testing';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  user: User = {};
  // tslint:disable-next-line: variable-name
  data_car: Data_car = {};

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

  constructor(private navCtrl: NavController, private usuarioService: UsuarioService, private postsService: PostsService,) { }

  ngOnInit() {
    this.usuarioService.perfil().subscribe( resp => {
      if (resp.ok) {
        this.perfil.name = (resp.user.name) ? resp.user.name : '' ;
        this.perfil.first_surname = (resp.user.first_surname) ? resp.user.first_surname : '' ;
        this.perfil.second_surname = (resp.user.second_surname) ? resp.user.second_surname : '' ;
        this.perfil.phone = (resp.user.phone) ? resp.user.phone : '' ;
        this.perfil.address = (resp.user.address) ? resp.user.address : '' ;
        this.perfil.sex = (resp.user.sex) ? resp.user.sex : '' ;
        this.perfil.birthdate = (resp.user.birthdate) ? resp.user.birthdate.split('T')[0] : '' ;
        this.perfil.number_plate = (resp.user.number_plate) ? resp.user.number_plate : '' ;
        this.perfil.type_car = (resp.user.type_car) ? resp.user.type_car : '' ;
        this.perfil.email = (resp.user.email) ? resp.user.email : '' ;

        this.user = resp.user;
        //this.perfil = resp.user;
        this.data_car = resp.user.data_car;
        
        //console.log(this.user.birthdate.length);
      }
    });
  }

  regresar() {
    this.navCtrl.back({ animated: true });
  }

  async perfilE() {
    await this.postsService.presentLoading('Espere por favor...');
    //console.log(this.user);
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
    ).subscribe( async resp => {
      await this.postsService.loading.dismiss();
      // tslint:disable-next-line: no-string-literal
      if (resp[ 'ok' ]) {
        await this.postsService.mostrarNotificacion('CaritaVerde', 'Información actualizada correctamente.', 1);
        // console.log(resp);
        this.usuarioService.perfil().subscribe( resp1 => {
          if (resp1.ok) {
            this.user = resp1.user;
          }
        });
      }
      else{
        console.log(resp);
        await this.postsService.mostrarNotificacion('Triste_Mesadetrabajo1', resp[ 'message' ], 2);
      }
    });
  }

}
