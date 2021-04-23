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
            lat: 19.0424103,
            lng: -98.1709034,
        },
        {
            lat: 18.4645378,
            lng: -97.4095184,
        },
        {
            lat: 19.0535591,
            lng: -98.2403556,
        },
        {
            lat: 18.4414122,
            lng: -97.3804143,
        },
        {
            lat: 18.83797,
            lng: -96.8202478,
        },
        {
            lat: 18.791627,
            lng: -97.194223,
        },
        {
            lat: 18.885481,
            lng: -96.963532,
        },
        {
            lat: 16.779043, 
            lng: -96.671696,
        }

        ,
        {
            lat: 19.0474617,
            lng: -98.1720717,
        },
        {
            lat: 20.0081882, 
            lng: -97.8547039,
        },
        {
            lat: 18.8271456,
            lng: -97.1608651
        },
        {
            lat: 18.612045,
            lng: -97.408523
        },
        {
            lat: 18.8748058,
            lng: -97.0266527
        },
        {
            lat: 18.5436831, 
            lng: -97.1987151
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
        "https://www.google.com.mx/maps/place/19%C2%B002'32.7%22N+98%C2%B010'15.3%22W/@19.0424116,-98.1714506,19z/data=!3m1!4b1!4m5!3m4!1s0x0:0x0!8m2!3d19.0424103!4d-98.1709034",
        'https://www.google.com.mx/maps/place/Energ%C3%A9ticos+de+Tehuac%C3%A1n+S.A.+de+C.V./@18.4645429,-97.4117124,17z/data=!3m1!4b1!4m5!3m4!1s0x85c5bd3119db4c2f:0xbe52115b86adea7!8m2!3d18.4645378!4d-97.4095184',
        'https://www.google.com.mx/maps/place/Gasolinera+Zavaleta/@19.0535642,-98.2425496,17z/data=!3m1!4b1!4m5!3m4!1s0x85cfc6df07e920ef:0x88efaa597cff5d19!8m2!3d19.0535591!4d-98.2403556',
        'https://www.google.com.mx/maps/place/Gasolinera+Ele/@18.4414173,-97.3826083,17z/data=!3m1!4b1!4m5!3m4!1s0x85c5bceef61b8ea9:0x248604326f3b1c47!8m2!3d18.4414122!4d-97.3804143',
        'https://www.google.com.mx/maps/place/Energ%C3%A9ticos+de+Cordoba,+S.A.+de+C.V./@18.8380569,-96.8202136,17z/data=!4m12!1m6!3m5!1s0x85c4f23a0ce27cef:0x803b36718f8f8158!2sEnerg%C3%A9ticos+de+Cordoba,+S.A.+de+C.V.!8m2!3d18.83797!4d-96.8202478!3m4!1s0x85c4f23a0ce27cef:0x803b36718f8f8158!8m2!3d18.83797!4d-96.8202478',
        'https://www.google.com.mx/maps/place/Gasolinera+Eucomb/@18.7916545,-97.1943971,20z/data=!4m8!1m2!2m1!1sgasolinera+litro+exacto!3m4!1s0x0:0xee4651e7e30d02ef!8m2!3d18.7915448!4d-97.1942556',
        'https://www.google.com.mx/maps/place/Combustibles+y+Servicios+Esmeralda,+S.A.+de+C.V./@18.8866239,-96.9632283,17z/data=!4m12!1m6!3m5!1s0x85c4e520ab7fb7d9:0xf1fd3e34d8b53216!2sCombustibles+y+Servicios+Esmeralda,+S.A.+de+C.V.!8m2!3d18.885481!4d-96.963532!3m4!1s0x85c4e520ab7fb7d9:0xf1fd3e34d8b53216!8m2!3d18.885481!4d-96.963532',
        "https://www.google.com.mx/maps/place/16%C2%B046'44.6%22N+96%C2%B040'18.1%22W/@16.7795566,-96.6762665,16z/data=!4m5!3m4!1s0x0:0x0!8m2!3d16.779043!4d-96.671696",

        "https://www.google.com.mx/maps/place/REPSOL/@19.0475326,-98.1723778,20z/data=!4m12!1m6!3m5!1s0x85cfc128611e38c3:0x27d4dac4633f361!2sEstaci%C3%B3n+de+Servicio+Repsol!8m2!3d19.04712!4d-98.1724!3m4!1s0x0:0x7c702f9f438f49c4!8m2!3d19.0474616!4d-98.1720718",
        "https://www.google.com.mx/maps/place/Energ%C3%A9ticos+Ahuacatl%C3%A1n/@20.0081932,-97.8568926,17z/data=!4m12!1m6!3m5!1s0x85d0799eb6ef1603:0xed26196aac828ac4!2sEnerg%C3%A9ticos+Ahuacatl%C3%A1n!8m2!3d20.0081882!4d-97.8547039!3m4!1s0x85d0799eb6ef1603:0xed26196aac828ac4!8m2!3d20.0081882!4d-97.8547039",
        "https://www.google.com.mx/maps/place/Gasoliner%C3%ADa+Nogales+S.A.+de+C.V./@18.8271507,-97.1630538,17z/data=!3m1!4b1!4m5!3m4!1s0x85c5036df4d91c3b:0x239abbddf6906ba0!8m2!3d18.8271456!4d-97.1608651",
        "https://www.google.com.mx/maps/place/Pemex/@18.6127103,-97.4091162,19z/data=!4m13!1m7!3m6!1s0x85c50a8054c6d959:0x990e94a0f64a1b7d!2sChapulco,+Pue.!3b1!8m2!3d18.6257727!4d-97.4047722!3m4!1s0x0:0x8f1d3baace512382!8m2!3d18.612045!4d-97.408523",
        "https://www.google.com.mx/maps/place/Pemex/@18.8747131,-97.0289462,16.79z/data=!4m13!1m7!3m6!1s0x85c4e34c1e6d7b01:0x3a4bde2f3ecda89a!2sCuautlapan,+Veracruz!3b1!8m2!3d18.8712561!4d-97.0229629!3m4!1s0x85c4e3484607146b:0x4510eb8448302848!8m2!3d18.8748058!4d-97.0266527",
        "https://www.google.com.mx/maps/place/Gasoliner%C3%ADa/@18.5436834,-97.1987147,17z/data=!4m13!1m7!3m6!1s0x85c5aef297d4f367:0xcd62743191227a17!2sSanta+Mar%C3%ADa+del+Monte,+Pue.!3b1!8m2!3d18.5387882!4d-97.2019434!3m4!1s0x0:0xcb4ba8eb8c2fa2b4!8m2!3d18.5436831!4d-97.1987151"
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
            image: 'https://lh5.googleusercontent.com/p/AF1QipMcnO5voWHT_K4WxcuslRGKcbdbJp7eG9_ACqJe=w408-h306-k-no',
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
            image: 'https://lh5.googleusercontent.com/proxy/7RhpQu3TcCwTq5rx0USI-9xFEQCd02c0PG4zzUFai6hPWoHpdrmx1VUhLjJ8t0RuJ1UiGcG8jMMGOM0lEcmq_UJFmJud6-lrCmC4XqeCXsbsD1e6B6nLeHaXojzqn7twGJ3ehiEjRqGymcGbSUaS2YneBkQ=w427-h240-k-no',
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
