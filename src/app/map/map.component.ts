import { Component, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';
import * as geojson from 'geojson';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements AfterViewInit {
  private map: any;

  markers: any = [];
  trilhaSelected: any;
  trilhas = ['Trilha do Bambu','Trilha da Mata'];
  pontos: any[] = [];
  caminho: any;

  private initMap(): void {
    this.map = L.map('map', {
      center: [ -29.718920, -53.729449 ],
      zoom: 17,
    });

    const tiles = L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager_nolabels/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
      subdomains: 'abcd',
      maxZoom: 20,
      minZoom: 17,
    });

    tiles.addTo(this.map);
  }


  constructor() { }

  ngAfterViewInit(): void {
    this.initMap()
    this.buildPontos()    
  }

  buildPontos() {
    this.pontos = [
      {
      lat : -29.7169309,
      lng : -53.7295549,
      msg : 'Prédio 13F, com saguão principal, banheiros e fraldário. Livro de assinatura para visitantes.',
      id : 1
    },
    {
      lat : -29.7171207,
      lng : -53.7304567,
      msg : 'Viveiros com espécies de plantas carnívoras. Visitas somente com guia.',
      id : 7
    },
    {
      lat : -29.7173319,
      lng : -53.7301703,
      msg : 'Canteiros de Plantas Medicinais.',
      id : 8
    },
    {
      lat : -29.7171267,
      lng : -53.7297833,
      msg : 'Coleção de jerivas ao lado do prédio 13F.',
      id : 9
    },
    {
      lat : -29.719794,
      lng : -53.728525,
      msg : 'Jardim Sensorial. Localizado no viveiro metálico grande, com plantas que aguçam os sentidos humanos',
      id : 10
    },
    {
      lat : -29.717163,
      lng : -53.728408,
      msg : 'Bambuzal',
      id : 14
    }];
  }

  addMarker(latitude: number, longitude: number, msgPopup: string) {
    const marker = L.marker([latitude, longitude]).addTo(this.map);    
    marker.bindPopup(msgPopup);
    this.markers.push(marker);
    const iconRetinaUrl = 'assets/marker-icon-2x.png';
    const iconUrl = 'assets/marker-icon.png';
    const shadowUrl = 'assets/marker-shadow.png';
    const iconDefault = L.icon({
      iconRetinaUrl,
      iconUrl,
      shadowUrl,
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      tooltipAnchor: [16, -28],
      shadowSize: [41, 41]
    });
    marker.setIcon(iconDefault);  
  }

  removeMarkers() {
    for (var id in this.markers) {
      this.map.removeLayer(this.markers[id]);
      this.map.removeLayer(this.caminho);  
    }    
    this.markers = []
  }

  onChange(event: any) {
    this.trilhaSelected = event;
  }

  mostrarTrilha() {
    this.removeMarkers();
    if (this.trilhaSelected == 'Trilha do Bambu') {
      let trilha = this.pontos.filter(p => p.id == 1 ||  p.id == 9 || p.id == 14 );
      trilha.forEach(t => this.addMarker(t.lat, t.lng, t.msg));
      this.caminho = L.polyline(trilha, {color: 'red'}).addTo(this.map);
    } else if (this.trilhaSelected == 'Trilha da Mata') {
      let trilha = this.pontos.filter(p => p.id == 1 ||  p.id == 7 || p.id == 8 || p.id == 9 || p.id == 10);
      trilha.forEach(t => this.addMarker(t.lat, t.lng, t.msg));
      this.caminho = L.polyline(trilha, {color: 'red'}).addTo(this.map);
    }
  }

}
