import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';

import { MapConstantes } from '../Constantes/map-constantes';
import { FriendsConstantes } from '../Constantes/friends-constantes';

import { GeoJSON, FeatureCollection } from '../Interfaces/IGeoJSON';
import * as mapboxgl from 'mapbox-gl';

// Do not import @types/file-saver
import * as saver from 'file-saver';

@Component({
  selector: 'app-google-map',
  templateUrl: './google-map.component.html',
  styleUrls: ['./google-map.component.css']
})

// Docs: https://docs.mapbox.com/mapbox-gl-js/
export class GoogleMapComponent implements OnInit {
  
  public map: mapboxgl.Map;

  // Markers
  public homeMarker: mapboxgl.Marker; 
  public mehdiMarker: mapboxgl.Marker;

  // Save
  public mehdiLngLgSave : mapboxgl.LngLat;

  // Layers
  public friendsData : FeatureCollection;
  public friendsSource: any;

  
  constructor() { }
  
  ngOnInit(): void {   
    this.initializeMap();    
  }

  // Set all friends markers
  setFriendsMarkers(): void {
    // Add Friends Source
    this.map.addSource(FriendsConstantes.id,{
      type: 'geojson',
      data: {
        type:"FeatureCollection",
        features: []
      }
    });
  
    // Create Friends Marker
    const markerJulia = new GeoJSON([FriendsConstantes.juliaLongitude, FriendsConstantes.juliaLatitude], {
      title: FriendsConstantes.julia,
      icon: FriendsConstantes.icon
    });
    const markerKevin = new GeoJSON([FriendsConstantes.kevinLongitude, FriendsConstantes.kevinLatitude], {
      title: FriendsConstantes.kevin,
      icon: FriendsConstantes.icon
    });

    // Bind makers to source
    this.friendsData = new FeatureCollection([markerJulia, markerKevin]);
    this.friendsSource = this.map.getSource(FriendsConstantes.id);
    this.friendsSource.setData(this.friendsData);
    
    // Add layer containing all friends (GeoJSON)
    this.map.addLayer({
      id:'friends',
      type:'symbol',
      source:'friends',
      layout: MapConstantes.layout,
      paint: MapConstantes.paint
    })
  }

  // Initialize the map
  private initializeMap(){
    // @types/mapbox known bug, as to cast as 'any' to suppress ERROR
    (mapboxgl as any).accessToken = environment.mapbox.accessToken;
      this.map = new mapboxgl.Map({
        container: MapConstantes.mapId,
        style: MapConstantes.style,
        zoom: MapConstantes.zoom,
        center: [MapConstantes.NantesLongitude, MapConstantes.NantesLatitude]
    });
    
    // Where the players start
    this.homeMarker = new mapboxgl.Marker({
      color: MapConstantes.markerColor
    }).setLngLat([MapConstantes.homeLongitude,MapConstantes.homeLatitude]);

    this.mehdiMarker = new mapboxgl.Marker({
      color: "yellow",
      draggable: true
    }).setLngLat([MapConstantes.NantesLongitude, MapConstantes.NantesLatitude]);

    // Add markers
    this.homeMarker.addTo(this.map);
    this.mehdiMarker.addTo(this.map);

    // Add map controls
    this.map.addControl(new mapboxgl.NavigationControl());
    this.map.rotateTo(MapConstantes.rotation,{ duration: MapConstantes.rotationDuration});
  }

  public saveGameState(){    
    let file = new Blob([this.createMehdiSave()], {type: 'text/csv;charset=utf-8'});
    saver(file,'Mehdi.csv');
  }

  public createMehdiSave(): string {
    this.mehdiLngLgSave = this.mehdiMarker.getLngLat();
    let lat = this.mehdiLngLgSave.lat;
    let lng = this.mehdiLngLgSave.lng;
    return lat + ',' + lng;
  }
}
