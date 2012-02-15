
	  	var javascript
  			, ruby
  			, map
  			, example;

  	
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
	      tile_style: "#github_javascript_users {marker-fill: #3399FF; marker-opacity: 1; marker-width: 5; marker-line-color: white; marker-line-width: 2; marker-line-opacity: 0.5; marker-placement: point; marker-type: ellipse; marker-allow-overlap: true;}",
	      infowindow: true,
	      auto_bound: false,
	      debug: true
	    });

	    // Example
			example = getUrlVars().example;

	    if (example>1) {

	    	// WITH OPTIONS
	    	$('body').addClass('options');


	    	// Hireable?
	    	$('div.two')
	    		.css('opacity',1)
	    		.find('a').click(function(ev){
	    			ev.preventDefault();
	    			if (!$(this).hasClass('selected')) {
	    				$(this).parent().find('a.selected').removeClass('selected');
	    				$(this).addClass('selected');
	    				javascript.update('tile_style',$(this).attr('href'));	
	    			}
	    		});


	    	// Distance?
	    	if (example>2) {
	    		$('div.three').find('input').change(function(ev){
	    			$(this).closest('div').find('h4').text('DEVELOPERS IN ' + ($(this).val()/1000) + 'KM');
	    			$('div.three').find('a.selected').click();
	    		});
	    		$('div.three')
		    		.css('opacity',1)
		    		.find('a').click(function(ev){
		    			ev.preventDefault();
	    				var value = getRadDeg($(this).attr('data-lat'),$(this).attr('data-lon'),$(this).closest('div').find('input').val());
	    				$(this).parent().find('a.selected').removeClass('selected');
	    				$(this).addClass('selected');
	    				var query = $(this).attr('href').replace('{{lat}}',$(this).attr('data-lat')).replace('{{lon}}',$(this).attr('data-lon')).replace('{{radius}}',value);
	    				javascript.update('query',query);	
	    		});
	    	}



	    	if (example>3) {
	    		$('div.four').css('opacity',1)
	    		// AUTOCOMPLETE
		    	$('input').autocomplete({
		    		source: function(request,response) {
		    			var url = '';
		    			if (example>4) {
		    				url = "http://viz2.cartodb.com/api/v1/sql/?q=" + encodeURIComponent("(SELECT cartodb_id,username,st_asgeojson(the_geom) as the_geom,'javascript' as tbl FROM github_javascript_users WHERE username ilike '%" + request.term + "%' AND the_geom IS NOT NULL LIMIT 2) UNION (SELECT cartodb_id,username,st_asgeojson(the_geom) as the_geom,'ruby' as tbl FROM github_ruby_users WHERE username ilike '%" + request.term + "%' AND the_geom IS NOT NULL LIMIT 2)")
		    			} else {
		    				url = "http://viz2.cartodb.com/api/v1/sql/?q=" + encodeURIComponent("SELECT cartodb_id,username,st_asgeojson(the_geom) as the_geom,'javascript' as tbl FROM github_javascript_users WHERE username ilike '%" + request.term + "%' AND the_geom IS NOT NULL LIMIT 3")
		    			}

							$.ajax({
						    url:url,
					    	dataType: 'jsonp',
						    timeout: 2000,
						    callbackParameter: 'callback',
						    success: function(result) {
					    		response( $.map( result.rows, function( item ) {
										return {
											label: item.username,
											id: item.cartodb_id,
											center: transformGeoJSON(item.the_geom),
											tbl: item.tbl
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
			      table_name: 'github_ruby_users',
			      query: "SELECT * FROM github_ruby_users",
						tile_style: "#github_ruby_users {marker-fill: #FF3300; marker-opacity: 1; marker-width: 5; marker-line-color: white; marker-line-width: 2; marker-line-opacity: 0.5; marker-placement: point; marker-type: ellipse; marker-allow-overlap: true;}",
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


	function transformGeoJSON(str) {
    var json = JSON.parse(str);
    return new L.LatLng(json.coordinates[1],json.coordinates[0]);
  }


	function getRadDeg(lat,lng,dist) {
		// In meters
		var deg = 180;
		var brng = deg * Math.PI / 180;
		dist = dist/6371000;
		var lat1 = lat * Math.PI / 180;
		var lon1 = lng * Math.PI / 180;
		var lat2 = Math.asin(Math.sin(lat1) * Math.cos(dist) + Math.cos(lat1) * Math.sin(dist) * Math.cos(brng));
		var lon2 = lon1 + Math.atan2(Math.sin(brng) * Math.sin(dist) * Math.cos(lat1),Math.cos(dist) - Math.sin(lat1) * Math.sin(lat2));
		if (isNaN(lat2) || isNaN(lon2)) return null;
		return lat - (lat2 * 180 / Math.PI);
  }