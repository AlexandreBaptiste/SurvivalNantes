import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
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

  source: any;

  constructor() { }
  
  ngOnInit(): void {   

    // @types/mapbox known bug, as to cast as 'any' to suppress ERROR
    (mapboxgl as any).accessToken = environment.mapbox.accessToken;
      this._map = new mapboxgl.Map({
        container: 'mapbox',
        style: this._style,
        zoom: this._zoom,
        center: [this._longitude, this._latitude]
    });
    
    this._homeMarker = new mapboxgl.Marker({
      color: 'red'
    }).setLngLat([-1.571824,47.209102]);
    this._homeMarker.addTo(this._map);
    
    

    // Add map controls
    this._map.addControl(new mapboxgl.NavigationControl());
    this._map.rotateTo(280,{ duration: 10000});

  }

  addKevin(): void {
    // Register Source
    this._map.addSource('points',{
      type: 'geojson',
      data: {
        type:"FeatureCollection",
        features: [{
          type:"Feature",
          properties: {},
          geometry: {
            type: "Point",
            coordinates:  [-1.5701838,47.2122785]
          }
        }]
      }
    });
    
    this._map.addLayer({
      id:'labels',
      type:'symbol',
      source:'points',
      layout:{
        'text-field': "Kévin",
        'text-size':24,
        'text-offset': [0, 1.5],
        'icon-image':'embassy-15',
        "icon-size":2,
        
      }
    })
  }
}
