import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';

import { GeoJSON, FeatureCollection } from '../Interfaces/IGeoJSON';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-google-map',
  templateUrl: './google-map.component.html',
  styleUrls: ['./google-map.component.css']
})

// Docs: https://docs.mapbox.com/mapbox-gl-js/
export class GoogleMapComponent implements OnInit {
  
  public _map: mapboxgl.Map;
  public _homeMarker: mapboxgl.Marker;
  public _style = 'mapbox://styles/mapbox/navigation-guidance-night-v4';
  public _latitude  = 47.2122785;
  public _longitude = -1.5701838; 
  public _zoom = 15;
  public _layout : mapboxgl.AnyLayout = {
    'text-field': ['get', 'title'],
    'text-size':24,
    'text-offset': [0, 0.5],
    'icon-image':['get', 'icon'],
    "icon-size":2,
    "text-anchor": 'top',
    "text-font": ['Open Sans Semibold', 'Arial Unicode MS Bold']   
  };
  public _kevinData : FeatureCollection;
  public _friendsSource: any;

  constructor() { }
  
  ngOnInit(): void {   
    this.initializeMap();    
  }

  addKevin(): void {
    this._map.addSource('friends',{
      type: 'geojson',
      data: {
        type:"FeatureCollection",
        features: []
      }
    });
  
    const markerKévin = new GeoJSON([-1.556835,47.247449], { title: "Julia", icon: "embassy-15" });
    this._kevinData = new FeatureCollection([markerKévin]);
    this._friendsSource = this._map.getSource('friends');
    this._friendsSource.setData(this._kevinData);
    
    // Add layer containing all friends (GeoJSON)
    this._map.addLayer({
      id:'friends',
      type:'symbol',
      source:'friends',
      layout: this._layout
    })
  }

  // Initialize the map
  private initializeMap(){

    // @types/mapbox known bug, as to cast as 'any' to suppress ERROR
    (mapboxgl as any).accessToken = environment.mapbox.accessToken;
      this._map = new mapboxgl.Map({
        container: 'mapbox',
        style: this._style,
        zoom: this._zoom,
        center: [this._longitude, this._latitude]
    });
    
    // Where the player start
    this._homeMarker = new mapboxgl.Marker({
      color: 'red'
    }).setLngLat([-1.571824,47.209102]);
    this._homeMarker.addTo(this._map);

    // Add map controls
    this._map.addControl(new mapboxgl.NavigationControl());
    this._map.rotateTo(280,{ duration: 10000});
  }
}
