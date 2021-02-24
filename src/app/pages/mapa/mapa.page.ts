import { Component, OnInit, ViewChild } from '@angular/core';
import {
  ToastController,
  Platform,
  LoadingController,
  NavController
} from '@ionic/angular';
//import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Marker, Station } from '../../interfaces/interfaces';
import { IonSlides, IonSelect } from '@ionic/angular';
import { UsuarioService } from '../../services/usuario.service';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';

declare var google;

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.page.html',
  styleUrls: ['./mapa.page.scss'],
})
export class MapaPage implements OnInit {
    stations: Station[] = [];

    @ViewChild(IonSlides) slides: IonSlides;
    @ViewChild(IonSelect) select: IonSelect;
    markers: Marker[] = [
        {
            lat: 19.042653, 
            lng: -98.171310,
        },
        {
            lat: 18.464493,
            lng: -97.409523,
        },
        {
            lat: 19.053488, 
            lng: -98.240399,
        },
        {
            lat: 18.441392,
            lng: -97.380210,
        },
        {
            lat: 18.837959,
            lng: -96.820249,
        },
        {
            lat: 18.791627,
            lng: -97.194223,
        },
        {
            lat: 18.885477,
            lng: -96.963668,
        },
        {
            lat: 16.779043, 
            lng: -96.671696,
        }

        ,
        {
            lat: 19.047443, 
            lng: -98.172072
        },
        {
            lat: 20.008258, 
            lng: -97.854740,
        },
        {
            lat: 18.827072, 
            lng: -97.160970,
        },
        {
            lat: 18.612087, 
            lng: -97.408577
        },
        {
            lat: 18.874889, 
            lng: -97.026757
        },
        {
            lat: 18.543673, 
            lng: -97.198724
        }
    ];
    mapRef = null;
    loading: any;

    slideOpts = {
        slidesPerView: 1.5,
        slidesPerColumn: 1,
        slidesPerGroup: 1,
        watchSlidesProgress: true,
        spaceBetween: 0,
        //virtualTranslate: true,
    };

    urls = [
        'https://www.google.com.mx/maps/place/Energeticos+Sole/@19.0425566,-98.1734922,17z/data=!3m1!4b1!4m5!3m4!1s0x85cfc177c5f7e699:0xd954efdf3997271b!8m2!3d19.0425515!4d-98.1712982',
        'https://www.google.com.mx/maps/place/Energ%C3%A9ticos+de+Tehuac%C3%A1n+S.A.+de+C.V./@18.4645429,-97.4117124,17z/data=!3m1!4b1!4m5!3m4!1s0x85c5bd3119db4c2f:0xbe52115b86adea7!8m2!3d18.4645378!4d-97.4095184',
        'https://www.google.com.mx/maps/place/Gasolinera+Zavaleta/@19.0535642,-98.2425496,17z/data=!3m1!4b1!4m5!3m4!1s0x85cfc6df07e920ef:0x88efaa597cff5d19!8m2!3d19.0535591!4d-98.2403556',
        'https://www.google.com.mx/maps/place/Gasolinera+Ele/@18.4414173,-97.3826083,17z/data=!3m1!4b1!4m5!3m4!1s0x85c5bceef61b8ea9:0x248604326f3b1c47!8m2!3d18.4414122!4d-97.3804143',
        'https://www.google.com.mx/maps/place/Energ%C3%A9ticos+de+Cordoba,+S.A.+de+C.V./@18.8380569,-96.8202136,17z/data=!4m12!1m6!3m5!1s0x85c4f23a0ce27cef:0x803b36718f8f8158!2sEnerg%C3%A9ticos+de+Cordoba,+S.A.+de+C.V.!8m2!3d18.83797!4d-96.8202478!3m4!1s0x85c4f23a0ce27cef:0x803b36718f8f8158!8m2!3d18.83797!4d-96.8202478',
        'https://www.google.com.mx/maps/place/Energeticos+Sole/@19.0425566,-98.1734922,17z/data=!3m1!4b1!4m5!3m4!1s0x85cfc177c5f7e699:0xd954efdf3997271b!8m2!3d19.0425515!4d-98.1712982',
        'https://www.google.com.mx/maps/place/Gasolinera+Eucomb/@18.7916467,-97.1944419,20.04z/data=!4m12!1m6!3m5!1s0x85c5046dd3e903f3:0xa795f58824dbfb91!2sServicio+Rinc%C3%B3n+de+las+Doncellas!8m2!3d18.7934761!4d-97.1922139!3m4!1s0x85c5046c660426c3:0xee4651e7e30d02ef!8m2!3d18.7916041!4d-97.1941593',
        'https://www.google.com.mx/maps/place/Combustibles+y+Servicios+Esmeralda,+S.A.+de+C.V./@18.8866239,-96.9632283,17z/data=!4m12!1m6!3m5!1s0x85c4e520ab7fb7d9:0xf1fd3e34d8b53216!2sCombustibles+y+Servicios+Esmeralda,+S.A.+de+C.V.!8m2!3d18.885481!4d-96.963532!3m4!1s0x85c4e520ab7fb7d9:0xf1fd3e34d8b53216!8m2!3d18.885481!4d-96.963532',
        "https://www.google.com/maps/place/16%C2%B046'44.0%22N+96%C2%B040'17.0%22W/@16.7788934,-96.6735768,17z/data=!3m1!4b1!4m5!3m4!1s0x0:0x0!8m2!3d16.7788934!4d-96.6713881?hl=es",

        "https://www.google.com/maps/place/19%C2%B002'50.7%22N+98%C2%B010'20.6%22W/@19.0474127,-98.1745786,17z/data=!3m1!4b1!4m5!3m4!1s0x0:0x0!8m2!3d19.0474076!4d-98.1723899?hl=es",
        "https://www.google.com/maps/place/20%C2%B000'30.3%22N+97%C2%B051'16.8%22W/@20.008419,-97.8568561,17z/data=!3m1!4b1!4m5!3m4!1s0x0:0x0!8m2!3d20.008414!4d-97.8546674?hl=es",
        "https://www.google.com/maps/place/18%C2%B050'17.6%22N+96%C2%B049'13.1%22W/@18.8382245,-96.8224935,17z/data=!3m1!4b1!4m5!3m4!1s0x0:0x0!8m2!3d18.8382194!4d-96.8203048?hl=es",
        "https://www.google.com/maps/place/18%C2%B036'44.4%22N+97%C2%B024'30.8%22W/@18.6123246,-97.4107332,17z/data=!3m1!4b1!4m5!3m4!1s0x0:0x0!8m2!3d18.6123195!4d-97.4085445?hl=es",
        "https://www.google.com/maps/place/18%C2%B052'39.4%22N+97%C2%B001'39.6%22W/@18.8776199,-97.0298671,17z/data=!3m1!4b1!4m5!3m4!1s0x0:0x0!8m2!3d18.8776148!4d-97.0276784?hl=es",
        "https://www.google.com/maps/place/18%C2%B032'38.5%22N+97%C2%B011'55.5%22W/@18.5440452,-97.2009342,17z/data=!3m1!4b1!4m5!3m4!1s0x0:0x0!8m2!3d18.5440401!4d-97.1987455?hl=es"
    ];

    stationsNue: Station[] = [
        {
            id: 9,
            name: 'Servicio Alfa Bravo Coca, S.A. de C.V.',
            address: 'Boulevard Xonaca, No. 3216, Col. Vista Hermosa, Puebla Pue.',
            image: 'https://lh5.googleusercontent.com/p/AF1QipPVYt8vFVS6J3SaeN200anKmjZrVRmpZ7YgZDW9=w408-h306-k-no',
            phone: '(222)9458986',
            email: 'servicioalfabravococa@gmail.com',
            number_station: 9,
        },
        {
            id: 10,
            name: 'Energéticos Ahuacatlan, S.A. de C.V.',
            address: 'Libramiento Bicentenario Numero 46, Centro, 73330 Pue., México',
            image: 'https://lh5.googleusercontent.com/p/AF1QipNsSs3hD_KzS3imi0hzKJBfe7_J_hq2RaBceAsZ=w426-h240-k-no',
            phone: '(764)76-3-32-62 ',
            email: 'encargadaahuacatlan@gmail.com',
            number_station: 10,
        },
        {
            id: 11,
            name: 'Energéticos de Cordoba, S.A. de C.V. (Nogales)',
            address: 'Av. Juárez No. 125, Col. Aurora, Nogales Ver.',
            image: 'https://geo3.ggpht.com/cbk?panoid=5_nQhQwwINqaKh5NcX5szA&output=thumbnail&cb_client=search.gws-prod.gps&thumb=2&w=408&h=240&yaw=190.5929&pitch=0&thumbfov=100',
            phone: '(272)72-7-50-42 ',
            email: 'encargadonogales@outlook.es',
            number_station: 11,
        },
        {
            id: 12,
            name: 'Servicio Cuautlapan, S.A. de C.V. (Chapulco)',
            address: 'Carretera Fed. Tehuacán – Orizaba Km. 14.5 S/N., Chapulco Pue.',
            image: 'https://geo1.ggpht.com/cbk?panoid=tx_U96ggDu1y-tvTHnqOtA&output=thumbnail&cb_client=search.gws-prod.gps&thumb=2&w=408&h=240&yaw=107.51343&pitch=0&thumbfov=100',
            phone: '(238)37-1-42-12',
            email: 'joseluisgears@hotmail.com',
            number_station: 12,
        },
        {
            id: 13,
            name: 'Servicio Cuautlapan (Cuautlapan)',
            address: 'Km. 325 Carret. Fed. México - Veracruz S/N., Cuautlapan Ixtaczoquitlán Ver.',
            image: 'https://lh5.googleusercontent.com/p/AF1QipM0rV2LOYO9aIlLFteCOIGan7V86a9C36CZJtSS=w426-h240-k-no',
            phone: '(271)71-3-10-68 ',
            email: 'enc_scu_0673@hotmail.com',
            number_station: 13,
        },
        {
            id: 14,
            name: 'Energéticos Santa María del Monte, S.A. de C.V.',
            address: 'Predio Atzómpa S/N., Santa Ma. del Monte Vicente Guerrero Pue.',
            image: 'https://geo0.ggpht.com/cbk?panoid=jEdeGCom1EvHIP4dtBZ7sg&output=thumbnail&cb_client=search.gws-prod.gps&thumb=2&w=408&h=240&yaw=105.51575&pitch=0&thumbfov=100',
            phone: '(236)37-4-92-39',
            email: 'enc_stama@hotmail.com',
            number_station: 14,
        }
    ];


  constructor(
        public loadingCtrl: LoadingController,
        public toastCtrl: ToastController, 
        //private geolocation: Geolocation, 
        private navCtrl: NavController,  
        private usuarioService: UsuarioService,
        private socialSharing: SocialSharing) { }
    

    ngOnInit() {
        this.usuarioService.lista_estaciones().subscribe( resp => {
            this.stations.push(...resp.stations);
            //console.log(this.urls);
            /*for(var _i = 0; _i < this.stations.length; _i++){
                console.log(this.stations[_i]);
            }*/
        });
        
        //console.log(this.stations[0]);
        this.loadMap();
    }

    regresar() {
      this.navCtrl.back({animated: true});
    }

    async loadMap() {
      const loading = await this.loadingCtrl.create();
      loading.present();
      //const myLatLng = await this.getLocation();
      const mapEle: HTMLElement = document.getElementById('map_canvas');
      const marker = this.markers[0];
      this.mapRef = new google.maps.Map(mapEle, {
        zoomControl: false,
        mapTypeControl: false,
        scaleControl: false,
        streetViewControl: false,
        rotateControl: false,
        fullscreenControl: false,
        center: {lat: marker.lat, lng:marker.lng},
        zoom: 9,
        styles:[
            {
                "featureType": "administrative",
                "elementType": "all",
                "stylers": [
                    {
                        "visibility": "on"
                    },
                    {
                        "lightness": 33
                    }
                ]
            },
            {
                "featureType": "landscape",
                "elementType": "all",
                "stylers": [
                    {
                        "color": "#f7f7f7"
                    }
                ]
            },
            {
                "featureType": "poi.business",
                "elementType": "all",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "poi.park",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#deecdb"
                    }
                ]
            },
            {
                "featureType": "poi.park",
                "elementType": "labels",
                "stylers": [
                    {
                        "visibility": "on"
                    },
                    {
                        "lightness": "25"
                    }
                ]
            },
            {
                "featureType": "road",
                "elementType": "all",
                "stylers": [
                    {
                        "lightness": "25"
                    }
                ]
            },
            {
                "featureType": "road",
                "elementType": "labels.icon",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#ffffff"
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "labels",
                "stylers": [
                    {
                        "saturation": "-90"
                    },
                    {
                        "lightness": "25"
                    }
                ]
            },
            {
                "featureType": "road.arterial",
                "elementType": "all",
                "stylers": [
                    {
                        "visibility": "on"
                    }
                ]
            },
            {
                "featureType": "road.arterial",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#ffffff"
                    }
                ]
            },
            {
                "featureType": "road.local",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#ffffff"
                    }
                ]
            },
            {
                "featureType": "transit.line",
                "elementType": "all",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "transit.station",
                "elementType": "all",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "water",
                "elementType": "all",
                "stylers": [
                    {
                        "visibility": "on"
                    },
                    {
                        "color": "#e0f1f9"
                    }
                ]
            }
        ],
        
      });
      google.maps.event.addListenerOnce(this.mapRef, 'idle', () => {
        loading.dismiss();
        this.loadMarkers();
        //this.addMaker(myLatLng.lat, myLatLng.lng);
      });
    }
  
    private addMaker(lat: number, lng: number) {
      const marker = new google.maps.Marker({
        position: { lat, lng },
        map: this.mapRef,
        title: 'Hello World!'
      });
    }

    private addMarca(itemMarker: Marker){
      const marker = new google.maps.Marker({
        position: { lat: itemMarker.lat, lng: itemMarker.lng },
        map: this.mapRef,
        title: itemMarker.title
      });
      return marker;
    }

    private loadMarkers(){
      this.markers.forEach(marker => {
        const markerObj = this.addMarca(marker);
        marker.markerObj = markerObj;
      });
    }
  
    /*private async getLocation() {
      const rta = await this.geolocation.getCurrentPosition();
      
      return {
        lat: rta.coords.latitude,
        lng: rta.coords.longitude
      };
    }*/

    async onSlideDidChange() {
        const currentSlide = await this.slides.getActiveIndex();
        const marker = this.markers[currentSlide];
        this.mapRef.panTo({lat: marker.lat, lng: marker.lng});
    }

    async onSelectDidChange(){
        const currentSlide = await this.select.value;
        await this.slides.slideTo(currentSlide);
    }

    async enviarEmail(email: string){
        // Share via email
        this.socialSharing.shareViaEmail('', 'Información', [email]).then(() => {
            // Success!
        }).catch(() => {
            // Error!
        });
    }
  

}
