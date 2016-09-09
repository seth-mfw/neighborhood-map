//Initial map variable needed for API
var map;
//Markers array - part of view?
var markers = [];
//Locations array, part of Model for sure.
var locations = ko.observableArray([
	    {title: "Olympic Training Center", location: {lat: 38.84, lng: -104.80}},
	    {title: "Garden of the Gods", location: {lat: 38.87, lng: -104.88}},
	    {title: "Palmer Park", location: {lat: 38.88, lng: -104.78}},
	    {title: "The Manitou Incline", location: {lat: 38.85, lng: -104.93}},
	    {title: "Colorado Springs Sports Center", location: {lat: 38.87, lng: -104.70}}
	]);
//Function to initialize the map
function MapViewModel() {}
function initMap() {
	//Map options
	map = new google.maps.Map(document.getElementById('map'), {
		center: {lat: 38.854, lng: -104.821},
		mapTypeId: google.maps.MapTypeId.ROADMAP,
		zoom: 12,
		mapTypeControl: false
	});

	//Info window management
	var infoWindow = new google.maps.InfoWindow();

	//Looping through marker array
	for (var i = 0; i < locations.length; i++) {
	    var position = locations[i].location;
	    var title = locations[i].title;

	    var marker = new google.maps.Marker({
	    	title: title,
	    	position: position,
	    	map: map,
	    	animation: google.maps.Animation.DROP
	    	});

	    //Push markers up to marker array - why?
	    markers.push(marker);

	    //Run 'addContent' function when any marker is clicked
	    marker.addListener('click', function() {
	    	addContent(this, infoWindow);
	    });
	}
}

function addContent(marker, infoWindow) {
	//If the info window isn't open over clicked marker
	//then open it over the clicked marker
	if (infoWindow.marker != marker) {
		infoWindow.marker = marker;
		//Make the clicked marker bounce, and stop after a bit
		//Thank you to Udacity forums poster ryan_v for helping me figuring out the bounce issue
		//(https://discussions.udacity.com/t/how-should-i-toggle-the-animation-for-clicked-markers-on-and-off/182954/2)
		marker.setAnimation(google.maps.Animation.BOUNCE);
		setTimeout(function(){marker.setAnimation(null)}, 2000);
		//TODO: Manage the content of the marker
		infoWindow.setContent(marker.title);
		infoWindow.open(map, marker);
		//If the window is closed, stop the bouncing and null
		//the marker so we can click it again.
		infoWindow.addListener('closeclick',function(){
        	marker.setAnimation(null);
        	infoWindow.marker = null;
        });
    //If the window is already open on the clicked marker,
    //Close it, stop the bouncing, and make it reclickable.
	} else {
		infoWindow.close();
		marker.setAnimation(null);
		infoWindow.marker = null;
	}
}

ko.applyBindings(new MapViewModel());
 

