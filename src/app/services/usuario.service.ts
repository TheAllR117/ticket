import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { environment } from '../../environments/environment';
import {
  RespuestaOkToken,
  User,
  Station,
  respuestaStation,
  RespuetasContact,
  RespuetasList,
  respuestaAdd,
  RepuestaPuntos,
  RepuestaEnvio} from '../interfaces/interfaces';
import { NavController } from '@ionic/angular';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { RespuestaPerfil } from '../interfaces/interfaces';
import {
  RespuestaUser,
  respuestaHistorial,
  respuestaTransferenciasR,
  respuestaQrAbono,
  UserRegis,
  respuestaQrCompartido } from '../interfaces/interfaces';

const URL = environment.url;
const URLP = environment.urlP;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  token: string = null;
  private user: User = {};
  private stations: Station[] = [];
  private respuestaAbono: {} = {};
  public progress = 0;
  initUser = new EventEmitter<boolean>();

  constructor(
    private http: HttpClient,
    private storage: Storage,
    private navCtrl: NavController,
    // tslint:disable-next-line: deprecation
    private fileTransfer: FileTransfer) { }


  login( email: string, password: string) {
    const data = { email, password };
    return new Promise( resolve => {
      this.http.post<RespuestaOkToken>(`${URLP}/login`, data).subscribe( async resp => {
        if ( resp.ok) {
          await this.guardarToken( resp.token );
          resolve(true);
        } else {
          this.token = null;
          this.storage.clear();
          resolve(false);
        }
      });
    });
  }

  logout() {
    this.cargarToken();
    const headers = new HttpHeaders({
      // tslint:disable-next-line: object-literal-key-quotes
      'Authorization': 'Bearer ' + this.token,
    });

    return new Promise( resolve => {
      this.http.get(`${URLP}/logout`, {headers}).subscribe( async resp => {
        // tslint:disable-next-line: no-string-literal
        if ( resp[ 'ok' ]) {
          this.token = null;
          this.user = null;
          this.storage.clear();
          this.initUser.emit(false);
          this.navCtrl.navigateRoot('/login', { animated: true });
          resolve(true);
        } else {
          resolve(false);
        }
      });
    });
  }

  registro(user: UserRegis) {
    return new Promise(resolve => {
      this.http.post<RespuestaOkToken>(`${URLP}/register`, user).subscribe( async resp => {
        if ( resp.ok) {
          await this.guardarToken( resp.token );
          resolve(true);
        } else {
          this.token = null;
          this.storage.clear();
          resolve(false);
        }
      });
    });
  }

  getUsuario() {
    return {...this.user};
  }

  getEstaciones() {
    return {...this.stations};
  }

  async guardarToken( token: string ) {
    this.token = token;
    await this.storage.set('token', token);
    await this.validaToken();
  }

  async cargarToken() {
    this.token = await this.storage.get('token') || null;
  }

  async validaToken(): Promise<boolean> {
    this.user = null;

    await this.cargarToken();

    if ( !this.token ) {
      this.navCtrl.navigateRoot('/slides', { animated: true });
      return Promise.resolve(false);
    }

    return new Promise<boolean>(resolve => {
      const headers = new HttpHeaders({
        // tslint:disable-next-line: object-literal-key-quotes
        'Authorization': 'Bearer ' + this.token,
      });

      this.http.get<RespuestaUser>(`${URLP}/main`, {headers}).subscribe( resp => {
        if ( resp.ok ) {
          this.user = resp.user;
          this.initUser.emit(true);
          resolve(true);
        } else {
          this.initUser.emit(false);
          this.navCtrl.navigateRoot('/login', { animated: true });
          resolve(false);
        }
      });
    });
  }

  lista_estaciones() {
    this.cargarToken();
    const headers = new HttpHeaders({
      // tslint:disable-next-line: object-literal-key-quotes
      'Authorization': 'Bearer ' + this.token,
    });
    return this.http.get<respuestaStation>(`${URLP}/balance`, {headers});
  }

  async realizar_abono(img: string, idstation: string, deposit: number): Promise<boolean>  {
    await this.cargarToken();
    return new Promise<boolean>(resolve => {
      const options: FileUploadOptions = {
        fileKey: 'image',
        mimeType: 'image/jpeg',
        chunkedMode: false,
        headers: {
          // tslint:disable-next-line: object-literal-key-quotes
          'Authorization': 'Bearer ' + this.token,
        },
        params: {
          // tslint:disable-next-line: object-literal-key-quotes
          'id_station': idstation,
          deposit,
        }
      };

      const fileTransfer: FileTransferObject = this.fileTransfer.create();

      fileTransfer.onProgress( (e) => {
        this.progress = (e.lengthComputable) ?  Math.round(e.loaded / e.total * 100) : -1;
      });

      fileTransfer.upload(img, `${URLP}/balance/pay`, options)
      .then( data => {
        this.respuestaAbono = JSON.parse( data.response);
        // tslint:disable-next-line: no-string-literal
        if ( this.respuestaAbono['ok'] ) {
          resolve(true);
        } else {
          resolve(false);
        }
      })
      .catch( err => {
        console.log('error en cargar', err);
        resolve(false);
      });

    });
  }

  burcar_usuario(membership: string) {
    this.cargarToken();
    const headers = new HttpHeaders({
      // tslint:disable-next-line: object-literal-key-quotes
      'Authorization': 'Bearer ' + this.token,
    });

    const params = new HttpParams({
      fromObject: {
        membership,
      }
    });

    const options = {
      headers,
      params
    };
    return this.http.get<RespuetasContact>(`${URLP}/balance/contact`, options);
  }

  lista_de_contactos() {
    this.cargarToken();
    const headers = new HttpHeaders({
      // tslint:disable-next-line: object-literal-key-quotes
      'Authorization': 'Bearer ' + this.token,
    });

    return this.http.get<RespuetasList>(`${URLP}/balance/contact/getlist`, {headers});
  }

  // tslint:disable-next-line: variable-name
  agregar_contacto(id_contact: string) {
    this.cargarToken();
    const data = { };
    const headers = new HttpHeaders({
      // tslint:disable-next-line: object-literal-key-quotes
      'Authorization': 'Bearer ' + this.token,
    });

    const params = new HttpParams({
      fromObject: {
        id_contact,
      }
    });

    const options = {
      headers,
      params
    };

    return this.http.post<respuestaAdd>(`${URLP}/balance/contact/add`, data, options);
  }

  // tslint:disable-next-line: variable-name
  eliminar_contacto(id_contact: string) {
    this.cargarToken();
    const data = { };
    const headers = new HttpHeaders({
      // tslint:disable-next-line: object-literal-key-quotes
      'Authorization': 'Bearer ' + this.token,
    });

    const params = new HttpParams({
      fromObject: {
        id_contact,
      }
    });

    const options = {
      headers,
      params
    };

    return this.http.post<respuestaAdd>(`${URLP}/balance/contact/delete`, data, options);
  }

  obtener_puntos_por_estacion() {
    this.cargarToken();
    const headers = new HttpHeaders({
      // tslint:disable-next-line: object-literal-key-quotes
      'Authorization': 'Bearer ' + this.token,
    });
    return this.http.get<RepuestaPuntos>(`${URLP}/payments`, {headers});
  }

  // tslint:disable-next-line: variable-name
  enviarSaldo(id_contact: string, balance: string, id_payment: string) {
    this.cargarToken();
    const data = { };
    const headers = new HttpHeaders({
      // tslint:disable-next-line: object-literal-key-quotes
      'Authorization': 'Bearer ' + this.token,
    });

    const params = new HttpParams({
      fromObject: {
        id_contact,
        balance,
        id_payment
      }
    });

    const options = {
      headers,
      params
    };

    return this.http.post<RepuestaEnvio>(`${URLP}/balance/contact/sendbalance`, data, options);
  }

  historialAbonos(type: string, start: string, end: string) {
    this.cargarToken();
    const data = { };
    const headers = new HttpHeaders({
      // tslint:disable-next-line: object-literal-key-quotes
      'Authorization': 'Bearer ' + this.token,
    });

    const params = new HttpParams({
      fromObject: {
        type,
        start,
        end
      }
    });

    const options = {
      headers,
      params
    };

    return this.http.get<respuestaHistorial>(`${URLP}/balance/history`, options);
  }

  transferenciasRecibidas() {
    this.cargarToken();
    const headers = new HttpHeaders({
      // tslint:disable-next-line: object-literal-key-quotes
      'Authorization': 'Bearer ' + this.token,
    });
    return this.http.get<respuestaTransferenciasR>(`${URLP}/balance/getlistreceived`, {headers});
  }

  // tslint:disable-next-line: variable-name
  informacionQrAbono(id_payment: string) {
    this.cargarToken();

    const headers = new HttpHeaders({
      // tslint:disable-next-line: object-literal-key-quotes
      'Authorization': 'Bearer ' + this.token,
    });

    const params = new HttpParams({
      fromObject: {
        id_payment
      }
    });

    const options = {
      headers,
      params
    };

    return this.http.get<respuestaQrAbono>(`${URLP}/balance/use`, options);

  }

  // tslint:disable-next-line: variable-name
  informacionQrAbonoCompartido(id_payment: string) {
    this.cargarToken();

    const headers = new HttpHeaders({
      // tslint:disable-next-line: object-literal-key-quotes
      'Authorization': 'Bearer ' + this.token,
    });

    const params = new HttpParams({
      fromObject: {
        id_payment
      }
    });

    const options = {
      headers,
      params
    };

    return this.http.get<respuestaQrCompartido>(`${URLP}/balance/getlistreceived/use`, options);

  }


  confirmarCancelarPago(
    // tslint:disable-next-line: variable-name
    ids_dispatcher: string,
    // tslint:disable-next-line: variable-name
    ids_client: string,
    // tslint:disable-next-line: variable-name
    tr_membership: string,
    // tslint:disable-next-line: variable-name
    id_station: string,
    price: string,
    liters: string,
    // tslint:disable-next-line: variable-name
    id_dispatcher: string,
    // tslint:disable-next-line: variable-name
    id_gasoline: string,
    // tslint:disable-next-line: variable-name
    id_schedule: string,
    authorization: string,
    // tslint:disable-next-line: variable-name
    id_time: string
    ) {

    this.cargarToken();
    const data = { };
    const headers = new HttpHeaders({
      // tslint:disable-next-line: object-literal-key-quotes
      'Authorization': 'Bearer ' + this.token,
    });

    const params = new HttpParams({
      fromObject: {
        ids_dispatcher,
        ids_client,
        tr_membership,
        id_station,
        price,
        liters,
        id_dispatcher,
        id_gasoline,
        id_schedule,
        authorization,
        id_time
      }
    });

    const options = {
      headers,
      params
    };

    return this.http.post(`${URLP}/balance/makepayment`, data, options);

  }


  perfil() {
    this.cargarToken();
    const headers = new HttpHeaders({
      // tslint:disable-next-line: object-literal-key-quotes
      'Authorization': 'Bearer ' + this.token,
    });
    return this.http.get<RespuestaPerfil>(`${URLP}/profile`, {headers});
  }

  editarPerfil(
    name: string,
    // tslint:disable-next-line: variable-name
    first_surname: string, second_surname: string,
    phone: string,
    password: string,
    address: string,
    email: string,
    sex: string,
    birthdate: string,
    // tslint:disable-next-line: variable-name
    number_plate: string, type_car: string
    ) {

      this.cargarToken();
      const data = { };
      const headers = new HttpHeaders({
        // tslint:disable-next-line: object-literal-key-quotes
        'Authorization': 'Bearer ' + this.token,
      });

      const params = new HttpParams({
        fromObject: {
          name, first_surname, second_surname, phone, password, address, email, sex, birthdate, number_plate, type_car
        }
      });

      const options = {
        headers,
        params
      };

      return this.http.post(`${URLP}/profile/update`, data, options);

  }


}
