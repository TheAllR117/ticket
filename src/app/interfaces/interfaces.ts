export interface RespuestaTopHeadlines {
  status: string;
  totalResults: number;
  articles: Article[];
}

export interface Article {
  source: Source;
  author?: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  content?: string;
}

interface Source {
  id?: string;
  name: string;
}

export interface RespuestaPosts {
  ok: boolean;
  posts: Post[];
}

export interface Post {
  img?: string[];
  _id?: string;
  mensaje?: string;
  coords?: string;
  usuario?: Usuario;
  created?: string;
}

// respuesta ok con token
export interface RespuestaOkToken {
  ok?: boolean;
  token?: string;
  message?: string;
  id?: number;
}

export interface UserRegis {
  name?: string;
  first_surname?: string;
  second_surname?: any;
  email?: string;
  sex?: string;
  phone?: any;
  password?: string;
  address?: string;
  birthdate?: string;
  number_plate?: string;
  type_car?: string;
  ids?: string;
}
export interface Usuario {
  avatar?: string;
  _id?: string;
  nombre?: string;
  email?: string;
}

export interface Users {
  ok: boolean;
  token: string;
  user: User;
}

export interface RespuestaUser {
  ok?: boolean;
  user?: User;
  data?: Client;
}

export interface User {
  id?: number;
  name?: string;
  first_surname?: string;
  second_surname?: any;
  email?: string;
  sex?: string;
  phone?: any;
  password?: string;
  address?: string;
  birthdate?: string;
  number_plate?: string;
  type_car?: string;
  client?: Client;
  data_car?: Data_car;
}

export interface Client {
  id?: number;
  membership?: string;
  current_balance?: number;
  shared_balance?: number;
  total_shared_balance?: number;
  points?: number;
  image_qr?: string;
  birthdate?: string;
}

// tslint:disable-next-line: class-name
export interface Data_car {
  number_plate?: string;
  type_car?: string;
}



// tslint:disable-next-line: class-name
export interface respuestaStation {
  ok?: boolean;
  stations?: Station[];
  exchanges?: Exchanges[];
}

export interface Station {
  id?: number;
  name?: string;
  address?: string;
  image?: string;
  phone?: string;
  email?: string;
  number_station?: number;
  lat?: number,
  lng?: number,
}


export interface Abono {
  image?: string[];
  deposit?: string;
  id_station?: string;
}

// buscar contacto
// tslint:disable-next-line: class-name
export interface RespuetasContact {
  ok?: boolean;
  contact?: Contact;
}

export interface Contact {
  id?: number;
  user_id?: number;
  membership?: string;
  current_balance?: number;
  shared_balance?: number;
  points?: number;
  image_qr?: string;
  birthdate?: any;
  user?: UserContac;
}

export interface UserContac {
  id?: number;
  name?: string;
  first_surname?: string;
  second_surname?: any;
  email?: string;
  sex?: string;
  phone?: any;
}

// lista de contactos

export interface RespuetasList {
  ok?: boolean;
  contacts?: Contacts[];
}

export interface Contacts {
  id?: number;
  transmitter_id?: number;
  receiver_id?: number;
  created_at?: string;
  updated_at?: string;
  receiver?: Receiver;
}

export interface Receiver {
  id?: number;
  user_id?: number;
  membership?: string;
  current_balance?: number;
  shared_balance?: number;
  points?: number;
  image_qr?: string;
  birthdate?: any;
  user?: UserA;
}

export interface UserA {
  id?: number;
  name?: string;
  first_surname?: string;
  second_surname?: any;
  email?: string;
  sex?: string;
  phone?: any;
}

// agregar usuario
// tslint:disable-next-line: class-name
export interface respuestaAdd {
  ok: boolean;
  message: string;
}


//  puntos por estación
export interface RepuestaPuntos {
  ok?: boolean;
  payments?: Payment[];
}

export interface Payment {
  id?: number;
  client_id?: number;
  balance?: number;
  station_id?: number;
  status?: number;
  created_at?: string;
  updated_at?: string;
  station?: Station;
}


// respuesta enviar saldo
export interface RepuestaEnvio {
  ok: boolean;
  message: string;
}


// historial

// tslint:disable-next-line: class-name
export interface respuestaHistorial {
  ok?: boolean;
  balances?: Balance[];
  payments?: Payments[];
  exchanges?: Exchanges[];
  points?: Points[];
}

export interface Balance {
  balance?: string;
  membership?: string;
  name?: string;
  station?: string;
  date?: string;
  hour?: string;
  liters?: number;
  gasoline?: string;
  status?: string;
  no_island?: string;
  no_bomb?: string;
  sale?: string;
}

export interface Payments {
  balance?: string;
  membership?: string;
  name?: string;
  station?: string;
  date?: string;
  hour?: string;
  liters?: number;
  gasoline?: string;
}

export interface Exchanges {
  points?: number;
  station?: string;
  invoice?: number;
  status?: string;
  date?: string;
}

export interface Points {
  points?: number;
  station?: string;
  invoice?: number;
  status?: string;
  date?: string;
}

// perfil

export interface RespuestaPerfil {
  ok: boolean;
  user: UserP;
}

export interface UserP {
  id?: number;
  name?: string;
  first_surname?: string;
  second_surname?: any;
  phone?: any;
  address?: any;
  email?: string;
  sex?: string;
  birthdate: string;
  data_car?: Datacar;
}

export interface Datacar {
  number_plate?: string;
  type_car?: string;
}

// transferencias recibidas

// tslint:disable-next-line: class-name
export interface respuestaTransferenciasR {
  ok?: boolean;
  payments?: PaymentR[];
}

export interface PaymentR {
  id?: number;
  balance?: number;
  station?: StationR;
  transmitter?: Transmitter;
}

export interface Transmitter {
  membership?: string;
  user?: UserR;
}

export interface UserR {
  name?: string;
  first_surname?: string;
  second_surname?: string;
}

export interface StationR {
  name?: string;
  number_station?: number;
}


// tslint:disable-next-line: class-name
export interface respuestaQrAbono {
  ok?: boolean;
  membership?: string;
  station?: StationQR;
}

export interface StationQR {
  id?: number;
  name?: string;
  number_station?: number;
}

// tslint:disable-next-line: class-name
export interface respuestaQrCompartido {
  ok: boolean;
  tr_membership: string;
  membership: string;
  station: StationQR;
}



/*-----------Mapa----------*/

export interface Marker {
  lat?: number;
  lng?: number;
  title?: string;
  image?: string;
  text?: string;
  markerObj?: any;
}

