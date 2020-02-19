export class MapConstantes {
    
    /** Map */
    public static style = 'mapbox://styles/mapbox/navigation-guidance-night-v4';
    public static NantesLatitude  = 47.2122785;
    public static NantesLongitude = -1.5701838; 
    public static homeLatitude = 47.209102;
    public static homeLongitude = -1.571824;
    public static zoom = 12;
    public static mapId = "mapbox";
    public static rotation = 180;
    public static rotationDuration = 10000;

    /** Maker */
    public static markerColor = "darkred";

    /** Layer & Layout */
    public static layout : mapboxgl.AnyLayout = {
        'text-field': ['get', 'title'],
        'text-size':24,
        'text-offset': [0, 0.5],
        'icon-image':['get', 'icon'],
        "icon-size":2,
        "text-anchor": 'top',
        "text-font": ['Open Sans Semibold', 'Arial Unicode MS Bold']   
    };
    public static paint = {
        'text-color': 'darkred',
        'text-halo-blur': 5,
        'text-halo-color': 'white',
        'text-halo-width': 1
    }
}