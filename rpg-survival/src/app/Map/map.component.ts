import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import { MapConstantes } from '../Constantes/map-constantes';
import { FriendsConstantes } from '../Constantes/friends-constantes';
import * as aymericFile from '../Saves/AymericMarker.json';
import * as mehdiFile   from '../Saves/MehdiMarker.json';
import { ISave } from '../Interfaces/ISave';
import { GeoJSON, FeatureCollection } from '../Interfaces/IGeoJSON';
import * as mapboxgl from 'mapbox-gl';
// Do not import @types/file-saver
import * as saver from 'file-saver';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})

// Docs: https://docs.mapbox.com/mapbox-gl-js/
export class MapComponent implements OnInit {
  
  // Map
  public map: mapboxgl.Map;

  // Markers
  public homeMarker   : mapboxgl.Marker; 
  public mehdiMarker  : mapboxgl.Marker;
  public aymericMarker: mapboxgl.Marker;

  // Save
  public mehdiLngLgSave   : mapboxgl.LngLat;
  public aymericLngLgSave : mapboxgl.LngLat;

  // Layers
  public friendsData  : FeatureCollection;
  public friendsSource: any;

  // Load
  private isLoad : boolean;
  private aymericSaveData : ISave;
  private mehdiSaveData   : ISave;
  
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
  private initializeMap(): void{
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

    // Load if we can previous game session
    this.loadPlayersMarkers();

    // Load Players' Marker
    this.createMehdiMarker();
    this.createAymericMarker();    

    // Add markers
    this.homeMarker.addTo(this.map);
    this.mehdiMarker.addTo(this.map);
    this.aymericMarker.addTo(this.map);

    // Add map controls
    this.map.addControl(new mapboxgl.FullscreenControl());
    this.map.rotateTo(MapConstantes.rotation,{ duration: MapConstantes.rotationDuration});
  }

  // Download the marker coordinates at the current state
  public saveMarkerState(): void{    
    let mehdiFile   = new Blob([this.createMehdiSave()],   {type: 'application/json;charset=utf-8'});
    let aymericFile = new Blob([this.createAymericSave()], {type: 'application/json;charset=utf-8'});
    saver(mehdiFile  , 'MehdiMarker.json'  );
    saver(aymericFile, 'AymericMarker.json');
  }

  // Mehdi's save
  public createMehdiSave(): string {
    this.mehdiLngLgSave = this.mehdiMarker.getLngLat();
    return JSON.stringify({lat: this.mehdiLngLgSave.lat, lng: this.mehdiLngLgSave.lng});
  }

  // Aymeric's save
  public createAymericSave(): string {
    this.aymericLngLgSave = this.aymericMarker.getLngLat();
    return JSON.stringify({lat: this.aymericLngLgSave.lat, lng: this.aymericLngLgSave.lng});
  }

  // Load players marker 
  public loadPlayersMarkers(): void {
    if(aymericFile != null || mehdiFile != null ){
      this.aymericSaveData = (aymericFile as any).default;
      this.mehdiSaveData = (mehdiFile as any).default;
      this.mehdiLngLgSave = new mapboxgl.LngLat(this.mehdiSaveData.lng, this.mehdiSaveData.lat)
      this.aymericLngLgSave = new mapboxgl.LngLat(this.aymericSaveData.lng, this.aymericSaveData.lat);
      this.isLoad = true;
    } 
    else {
      this.isLoad = false; 
    }   
  }

  // Mehdi's marker
  private createMehdiMarker(): void {
    this.mehdiMarker = new mapboxgl.Marker({
      color: "yellow",
      draggable: true
    });

    if(this.isLoad){
      this.mehdiMarker.setLngLat([this.mehdiLngLgSave.lng, this.mehdiLngLgSave.lat]);
    } else {
      this.mehdiMarker.setLngLat([MapConstantes.NantesLongitude, MapConstantes.NantesLatitude]);
    }
  }

  // Mehdi's marker
  private createAymericMarker(): void {
    this.aymericMarker = new mapboxgl.Marker({
      color: "green",
      draggable: true
    });

    if(this.isLoad){
      this.aymericMarker.setLngLat([this.aymericLngLgSave.lng, this.aymericLngLgSave.lat]);
    } else {
      this.aymericMarker.setLngLat([MapConstantes.NantesLongitude, MapConstantes.NantesLatitude]);
    }
  }
}
