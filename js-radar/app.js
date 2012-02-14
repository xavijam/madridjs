var map, 
    cartodb_leaflet1,
    cartodb_leaflet2;

function initialize() {
    map = new L.Map('map_canvas');

    var cloudmadeUrl = 'http://{s}.tile.cloudmade.com/BC9A493B41014CAABB98F0471D759707/997/256/{z}/{x}/{y}.png',
        cloudmadeAttrib = 'Map data &copy; 2011 OpenStreetMap contributors, Imagery &copy; 2011 CloudMade', 
        cloudmade = new L.TileLayer(cloudmadeUrl, {maxZoom: 18, attribution: cloudmadeAttrib});

    map.addLayer(cloudmade);

    cartodb_leaflet1 = new L.CartoDBLayer({
        map_canvas: 'map_canvas',
                     map: map,
                     user_name:'arce',
                     table_name: 'github_ruby_users',
                     query: "SELECT cartodb_id,the_geom_webmercator FROM github_ruby_users",
                     tile_style: "#test2{line-color:#719700;line-width:1;line-opacity:0.6;polygon-opacity:0.6;}",
                     map_key: "6087bc5111352713a81a48491078f182a0541f6c",
                     infowindow: "SELECT cartodb_id,the_geom_webmercator FROM github_users WHERE cartodb_id={{feature}}",
                     auto_bound: true,
                     debug: true
    });

    cartodb_leaflet2 = new L.CartoDBLayer({
        map_canvas: 'map_canvas',
                     map: map,
                     user_name:'arce',
                     table_name: 'points',
                     query: "SELECT cartodb_id,the_geom_webmercator FROM github_ruby_users",
                     map_key: "6087bc5111352713a81a48491078f182a0541f6c",
                     infowindow: true,
                     auto_bound: false,
                     debug: true
    });

    var success = function(position) {
        var latlng = new L.LatLng(position.coords.latitude, position.coords.longitude);
        console.log(latlng);
        map.setView(latlng, 13, true);
    }

    function error(msg) {
        console.log(msg);
    }

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(success, error);
    } else {
        error('not supported');
    }
}
