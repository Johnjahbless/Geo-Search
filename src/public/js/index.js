
let x = document.getElementById("demo");
/* eslint-disable no-unused-vars */
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition, showError);
  } else {
    x.innerHTML = "Geolocation is not supported by this browser.";
  }
}
function showPosition(position) {
  x.innerHTML = "Latitude: " + position.coords.latitude +
  "<br>Longitude: " + position.coords.longitude;
  var latlon = position.coords.latitude + "," + position.coords.longitude;

  var img_url = "https://maps.googleapis.com/maps/api/staticmap?center="+latlon+"&zoom=12&size=1000x2000&scale=4&maptype=roadmap&markers=color:blue|label:Y|"+latlon+"&key=YOUR_API_KEY";

  //document.getElementById("map").innerHTML = "<img src='"+img_url+"'>";
  document.body.style.backgroundImage = "url('"+img_url+"')";
  GetAddress(position.coords.latitude, position.coords.longitude)
}
function GetAddress(lat, lng) {
  //var lat = parseFloat(document.getElementById("txtLatitude").value);
  //var lng = parseFloat(document.getElementById("txtLongitude").value);
  var latlng = new google.maps.LatLng(lat, lng);
  var geocoder = geocoder = new google.maps.Geocoder();
  geocoder.geocode({ 'latLng': latlng }, function (results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
          if (results[1]) {
              //alert("Location: " + results[1].formatted_address);
              document.getElementById('search').value = results[1].formatted_address;
          }
      }
  });
}

function showError(error) {
  switch(error.code) {
    case error.PERMISSION_DENIED:
      x.innerHTML = "User denied the request for Geolocation."
      break;
    case error.POSITION_UNAVAILABLE:
      x.innerHTML = "Location information is unavailable."
      break;
    case error.TIMEOUT:
      x.innerHTML = "The request to get user location timed out."
      break;
    case error.UNKNOWN_ERROR:
      x.innerHTML = "An unknown error occurred."
      break;
  }
}
