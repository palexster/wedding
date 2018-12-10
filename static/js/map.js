var map_center;
var path_bounds;
function myMap() {
	var wwitt = {lat: 42.281011,lng:  -122.570865};
	var mapOptions = {
    		center: new google.maps.LatLng(42.281011, -122.570865),
    		zoom: 9,
    		mapTypeId: google.maps.MapTypeId.HYBRID
	};
	var map = new google.maps.Map(document.getElementById("map"), mapOptions);
	var marker = new google.maps.Marker({
		position: wwitt,
		map: map, 
		label: {
			color: '#00aaff',
			fontWeight: 'bold',
			fontSize: '14px',
			text: 'Willow Witt Ranch'
			}
	});
	resize();
	google.maps.event.addDomListener(window, 'resize',
	resize);
	path_bounds = new google.maps.LatLngBounds();
	var directionsService = new google.maps.DirectionsService();
	var directionsDisplay = new google.maps.DirectionsRenderer({
		draggable: false,
		map: map,
		panel: document.getElementById('right-panel')
	});	

	directionsDisplay.addListener('directions_changed', function () {
		computeTotalDistance(directionsDisplay.getDirections());
	});

	displayRoute('Ashland, OR', wwitt, directionsService,
		directionsDisplay);
};
function resize() {
 map.setCenter(wwitt);
 map.fitBounds(path_bounds);
};
function displayRoute(origin, destination, service, display) {
	service.route({
		origin: origin,
		destination: destination,
		waypoints: [{ location: 'Ashland, OR' }, { location: wwitt }],
		travelMode: 'DRIVING',
		avoidTolls: true
	}, function (response, status) {
		if (status === 'OK') {
			display.setDirections(response);
		} else {
			alert('Could not display directions due to: ' + status);
		}
	});
};
function computeTotalDistance(result) {
	var total = 0;
	var myroute = result.routes[0];
	for (var i = 0; i < myroute.legs.length; i++) {
		total += myroute.legs[i].distance.value;
	}
	total = total / 1000;
	document.getElementById('total').innerHTML = total + ' km';
};
window.onload = function() {
	var div_width = document.getElementById('map').offsetWidth;
	var div_height = document.getElementById('map').offsetHeight;
	var set_width = div_width/2;
	var set_height = div_height/2;
	document.getElementById('map').style.height = div_height+'px';
	document.getElementById('map').style.width = div_width+'px';
	document.getElementById('map').style.position = 'absolute';
	document.getElementById('map').style.top = '50%';
	document.getElementById('map').style.left = '50%';
	document.getElementById('map').style.marginLeft = -set_width+'px';
	document.getElementById('map').style.marginBottom = set_height+'px';
    };
    