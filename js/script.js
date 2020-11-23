// Create a new Leaflet map centered on the continental US
var map = L.map("map", { zoomControl: false }).setView([-73.959826795879195, 40.80543454450055], 3);

// This is the Carto Positron basemap
var basemap = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png");
basemap.addTo(map);

// added initial zoom
var zoomHome = L.Control.zoomHome();
zoomHome.setHomeCoordinates([40.80543454450055, -73.959826795879195]);
zoomHome.setHomeZoom(12)
zoomHome.addTo(map);

var attribution = map.attributionControl;
attribution.setPrefix('&copy; <a target="_blank" href="http://geocadder.bg/en/portfolio.html">GEOCADDER</a>');

// load ZIP codes polygons
(function addPolygons() {
	// The polygons are styled slightly differently on mouse hovers
	var poylygonStyle = { "color": "#e6250b", "weight": 1, fillOpacity: 0.6 };
	// var polygonHoverStyle = { "color": "#e6250b", "fillColor": "#969393", "weight": 3 };
	var polygonHoverStyle = { "color": "#e6250b", "weight": 3, fillOpacity: 0.8 };

	$.getJSON("data/harlem-selected-zip-codes.geojson", function (data) {
		// add GeoJSON layer to the map once the file is loaded
		var datalayer = L.geoJson(data, {
			style: function (feature) {
				return {
					fillColor: "gray",
					color: "red",
					weight: 1,
					opacity: 1,
					fillOpacity: 0.6
				}
			},
			onEachFeature: function (feature, layer) {
				layer.on({
					mouseout: function (e) {
						e.target.setStyle(poylygonStyle);
					},
					mouseover: function (e) {
						e.target.setStyle(polygonHoverStyle);
					},
					click: function (e) {
						// This zooms the map to the clicked polygon
						map.fitBounds(e.target.getBounds());

						var popupContent = "<b>ZIP Code:</b> " + feature.properties["ZIPCODE"];

						layer.bindPopup(popupContent).openPopup();
					}
				});
			}
		}).addTo(map);
		map.fitBounds(datalayer.getBounds());
	});

	$.getJSON("data/bronx-selected-zip-codes.geojson", function (data) {
		// add GeoJSON layer to the map once the file is loaded
		var datalayer = L.geoJson(data, {
			style: function (feature) {
				return {
					fillColor: "#edb4ea",
					color: "red",
					weight: 1,
					opacity: 1,
					fillOpacity: 0.6
				}
			},
			onEachFeature: function (feature, layer) {
				layer.on({
					mouseout: function (e) {
						e.target.setStyle(poylygonStyle);
					},
					mouseover: function (e) {
						e.target.setStyle(polygonHoverStyle);
					},
					click: function (e) {
						// This zooms the map to the clicked polygon
						map.fitBounds(e.target.getBounds());

						var popupContent = "<b>ZIP Code:</b> " + feature.properties["ZIPCODE"];

						layer.bindPopup(popupContent).openPopup();
					}
				});
			}
		}).addTo(map);
		map.fitBounds(datalayer.getBounds());
	});
})();


// load points
var typesArray;
var lyrMarkerCluster = L.markerClusterGroup({ showCoverageOnHover: false }).addTo(map);

function drawPoints() {
	$.getJSON('data/points.geojson', function (response) {
		console.log(response)
		response.features.forEach(drawMarker);

		function drawMarker(element) {
			console.log(element.geometry.coordinates[0])
			var latitude = element.geometry.coordinates[1];
			var longitude = element.geometry.coordinates[0];

			var venueName = element.properties["Venue Name"];
			var address = element.properties["Address"];
			var typeOfLocation = element.properties["Type of Location"];
			var zipCode = element.properties["Zipcode"];
			var venueDescription = element.properties["Venue Description"];

			// var markerIcon = new L.Icon({
			// 	iconUrl: 'https://image.shutterstock.com/image-vector/map-location-icon-pin-gps-260nw-739497727.jpg',
			// 	shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
			// 	iconSize: [25, 41],
			// 	iconAnchor: [12, 41],
			// 	popupAnchor: [1, -34],
			// 	shadowSize: [41, 41]
			// });

			point = L.marker([latitude, longitude]).bindPopup("<b>Venue Name: </b>" + venueName + "<br>" + "<b>Address: </b>" + address + "<br>" + "<b>Type of Location: </b>" + typeOfLocation + "<br>" + "<b>Zipcode: </b>" + zipCode + "<br>" + "<b>Venue Description: </b>" + venueDescription + "<br>");
			lyrMarkerCluster.addLayer(point);
		}
	});
}

drawPoints();
//////////////////
