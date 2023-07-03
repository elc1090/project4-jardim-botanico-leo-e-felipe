import { Component, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements AfterViewInit {
  private map: any;

  markers: any = [];
  trilhaSelected: any;
  trilhas = ['Trilha 1','Trilha 2'];
  pontos: any[] = [];

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
  }

  removeMarkers() {
    for (var id in this.markers) {
      this.map.removeLayer(this.markers[id]);
    }
    this.markers = []
  }

  onChange(event: any) {
    this.trilhaSelected = event;
  }

  mostrarTrilha() {
    this.removeMarkers();
    if (this.trilhaSelected == 'Trilha 1') {
      let trilha = this.pontos.filter(p => p.id == 1 ||  p.id == 9 || p.id == 14 );
      trilha.forEach(t => this.addMarker(t.lat, t.lng, t.msg));
    } else if (this.trilhaSelected == 'Trilha 2') {
      let trilha = this.pontos.filter(p => p.id == 1 ||  p.id == 7 || p.id == 8 || p.id == 9 || p.id == 10);
      trilha.forEach(t => this.addMarker(t.lat, t.lng, t.msg));
    }
  }

}
