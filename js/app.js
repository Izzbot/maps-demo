/* app.js -- our application code */

"use strict";

// UW coordinates:
// lat: 47.655
// lng: -122.3080

$(document).ready(function() {

    function createMap(center, zoom) {

        var mapElem = document.getElementById('map');
        var map = new google.maps.Map(mapElem, {
            center: center,
            zoom: zoom,
            mapTypeId: google.maps.MapTypeId.HYBRID
        });

        var marker = new google.maps.Marker({
           position:  center,
           map: map,
           animation: google.maps.Animation.BOUNCE
        });

        // Make the info window
        var infoWindow = new google.maps.InfoWindow();
        infoWindow.setContent('<p>Not here!</p>');

        // When a marker is clicked,
        google.maps.event.addListener(marker, 'click', function() {
            infoWindow.open(map, marker);
            map.panTo(marker.getPosition());
        });

    }


    // Geo Success
    function onGeoSuccess(position) {
        var center = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
        };

        createMap(center, 14);
    }

    // Geo Error
    function onGeoError(error) {
        console.log(error);
    }


    // Machu Picchu coords
    var startCoords = {
        lat: -13.1633,
        lng: -72.5456
    };

    // Open the map
    if (navigator && navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(onGeoSuccess, onGeoError, {
        });
    } else {
        createMap(startCoords, 14);
    }

});

