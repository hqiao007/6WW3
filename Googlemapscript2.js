function init()
{
  var myLatLng =new google.maps.LatLng(43.2407396, -79.86547080000003);
  var mapOptions = {
     center: myLatLng,
     zoom: 18,
  };
  var map = new google.maps.Map(document.getElementById("hmap"), mapOptions);
  var marker = new google.maps.Marker({
     position: myLatLng,
     map: map,
  });
}
