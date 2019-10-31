function displaySearchResults(map, searchBox, markers)
{
  var places = searchBox.getPlaces();

  if (places.length == 0) {
      return;
  }

  // Clear out the old markers.
  markers.forEach(function (marker) {
      marker.setMap(null);
  });
  markers = [];

  // For each place, get the icon, name and location.
  var bounds = new google.maps.LatLngBounds();
  places.forEach(function (place) {
      if (!place.geometry) {
          console.log("Returned place contains no geometry");
          return;
      }
      var icon = {
          url: place.icon,
          size: new google.maps.Size(71, 71),
          origin: new google.maps.Point(0, 0),
          anchor: new google.maps.Point(17, 34),
          scaledSize: new google.maps.Size(40, 40)
      };

      // Create a marker for each place.
      markers.push(new google.maps.Marker({
          map: map,
          icon: icon,
          title: place.name,
          position: place.geometry.location
      }));

      if (place.geometry.viewport) {
          // Only geocodes have viewport.
          bounds.union(place.geometry.viewport);
      } else {
          bounds.extend(place.geometry.location);
      }
  });
  map.fitBounds(bounds);
}
function initAutocomplete()
{
  var map = new google.maps.Map(document.getElementById('smap'), {
        center: {lat: 43.25011, lng: -79.84963},
        zoom: 15,
        mapTypeId: 'roadmap'
  });

  // Create the search box and link it to the UI element.
  var input = document.getElementById('addressSearch');
  var searchBtn = document.getElementById('mysubmit');
  var searchBox = new google.maps.places.SearchBox(input);
  // map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

  // Bias the SearchBox results towards current map's viewport.
  map.addListener('bounds_changed', function() {
    searchBox.setBounds(map.getBounds());
  });

  var markers = [];
  // Listen for the event fired when the user selects a prediction and retrieve
  // more details for that place.

  searchBox.addListener('places_changed', function()
   {
    // displaySearchResults(map,searchBox,markers);
   }
  );
  searchBtn.onclick = function ()
  {
    displaySearchResults(map,searchBox,markers);
    // foundLoc=searchBox.value;
    var place = searchBox.getPlaces()[0];
    document.getElementById('mylabel').innerHTML='Name: '+place.name+' Address:'+place.formatted_address+' LatLng:'+place.geometry.location;
  }
}
