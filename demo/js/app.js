
	  	var javascript
  			, ruby
  			, map;

  	
	  $(document).ready(function() {
			map = new L.Map('map').setView(new L.LatLng(51.505, -0.09), 1);
			var cloudmadeUrl = 'http://{s}.tile.cloudmade.com/BC9A493B41014CAABB98F0471D759707/997/256/{z}/{x}/{y}.png',
	    cloudmadeAttrib = 'Map data &copy; 2011 OpenStreetMap contributors, Imagery &copy; 2011 CloudMade',
	    cloudmade = new L.TileLayer(cloudmadeUrl, {maxZoom: 18, attribution: cloudmadeAttrib});
			map.addLayer(cloudmade);

	    javascript = new L.CartoDBLayer({
	      map_canvas: 'map',
	      map: map,
	      user_name:'viz2',
	      table_name: 'github_javascript_users',
	      query: "SELECT cartodb_id,the_geom_webmercator FROM github_javascript_users",
	      tile_style: "",
	      infowindow: "SELECT cartodb_id,the_geom_webmercator FROM github_javascript_users WHERE cartodb_id={{feature}}",
	      auto_bound: false,
	      debug: true
	    });

	    cartodb_leaflet2 = new L.CartoDBLayer({
	      map_canvas: 'map',
	      map: map,
	      user_name:'viz2',
	      table_name: 'github_ruby_users_export_8',
	      query: "SELECT cartodb_id,the_geom_webmercator FROM github_ruby_users_export_8",
	      tile_style: "",
	      infowindow: true,
	      auto_bound: false,
	      debug: true
	    });
	  });