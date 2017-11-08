"use strict";

var api_key = "AIzaSyA0uxntd1Ceq5QW3DhU4mvjravjCJzOGlo";

(function(){
	var user_location,travelMode;
	// http://www.gps-coordinates.net/
	const myLocation = {lat:-12.075459703422702, lng:-76.91201305402501}
	google.maps.event.addDomListener(window,"load",()=>{
		init_maps();
		user_location = new UserLocation(calculateDistance);
	});

	function init_maps(){
		travelMode = "DRIVING";
		const mapOptions = {
			center: myLocation,
			zoom:15
		};

		// Set variables 
		const map = new google.maps.Map(document.getElementById('map'),mapOptions);

	// Instantiate marker
	const marker = new google.maps.Marker({
		map: map,
		position: myLocation,
			title: "Restaurante Lothiem",
			visible: true
	  });

	  
	  
	}
	function calculateDistance(){
	var origin = new google.maps.LatLng(user_location.latitude,user_location.longitude);
	var destination = new google.maps.LatLng(myLocation.lat,myLocation.lng);

	var service = new google.maps.DistanceMatrixService();
		service.getDistanceMatrix(
		  {
			origins: [origin],
			destinations: [destination],
			travelMode: google.maps.TravelMode[travelMode]
		  },(response,status)=>{
			if (status == google.maps.DistanceMatrixStatus.OK) {
				var origin = response.rows[0];
				const element = origin.elements[0];
				const duration = element.duration.text;

				writeMessage(`
					Estás a ${duration} de una noche inolvidable en 
					<span class='medium lobster'>Restaurante Lothiem</span>
				`);
			}
		  });
  }
	function writeMessage(message){
		document.getElementById("messages").innerHTML = message;
	}
	

})();