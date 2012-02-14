
	  	var javascript
  			, ruby
  			, map;

  	
	  $(document).ready(function() {

			map = new L.Map('map').setView(new L.LatLng(49.781264058178344,19.51171875), 3);
			var cloudmadeUrl = 'http://{s}.tile.cloudmade.com/BC9A493B41014CAABB98F0471D759707/997/256/{z}/{x}/{y}.png',
	    cloudmadeAttrib = 'Map data &copy; 2011 OpenStreetMap contributors, Imagery &copy; 2011 CloudMade',
	    cloudmade = new L.TileLayer(cloudmadeUrl, {maxZoom: 18, attribution: cloudmadeAttrib});
			map.addLayer(cloudmade);


	    javascript = new L.CartoDBLayer({
	      map_canvas: 'map',
	      map: map,
	      user_name:'viz2',
	      table_name: 'github_javascript_users',
	      query: "SELECT * FROM github_javascript_users",
	      infowindow: true,
	      auto_bound: false,
	      debug: true
	    });


	    var example = getUrlVars().example;

	    if (example>1) {

	    	// WITH OPTIONS
	    	$('body').addClass('options');

	    	if (example>2) {
	    		// AUTOCOMPLETE
		    	$('input').autocomplete({
		    		source: function(request,response) {
							$.ajax({
						    url:"http://viz2.cartodb.com/api/v1/sql/?q=" + encodeURIComponent("SELECT cartodb_id,username,latitude,longitude FROM github_javascript_users WHERE username ilike '%" + request.term + "%' AND the_geom IS NOT NULL LIMIT 3"),
					    	dataType: 'jsonp',
						    timeout: 2000,
						    callbackParameter: 'callback',
						    success: function(result) {
					    		response( $.map( result.rows, function( item ) {
										return {
											label: item.username,
											id: item.cartodb_id,
											center: new L.LatLng(item.latitude,item.longitude) 
										}
									}));
								},
					    	error: function(e, msg) {}
					    });
		    		}
		    	});
	    	}


	    	// ANOTHER LAYER
	    	if (example>4) {
			    ruby = new L.CartoDBLayer({
			      map_canvas: 'map',
			      map: map,
			      user_name:'viz2',
			      table_name: 'github_ruby_users_export_8',
			      query: "SELECT * FROM github_ruby_users_export_8",
			      infowindow: true,
			      auto_bound: false,
			      debug: true
			    });
	    	}
	    }

	  });




	function getUrlVars() {
	  var vars = [], hash;
	  var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
	  for(var i = 0; i < hashes.length; i++) {
	    hash = hashes[i].split('=');
	    vars.push(hash[0]);
	    vars[hash[0]] = hash[1];
	  }
	  return vars;
	}	  