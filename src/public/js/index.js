
let x = document.getElementById("demo");
/* eslint-disable no-unused-vars, no-undef*/
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
  GetWeatherData(position.coords.latitude, position.coords.longitude);
}

const GetWeatherData = (lat, lon) => {
    fetch("http://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+lon+"&APPID=YOUR_API_KEY")
        .then(response => response.json())
        .then(data => {

            console.log(data);
            document.getElementById('temp').innerHTML = data.main.temp;
            document.getElementById('pres').innerHTML = data.main.pressure;
            document.getElementById('hum').innerHTML = data.main.humidity;
            document.getElementById('wind').innerHTML = data.wind.speed;

        });

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

const getCoordinates = () => {
  let myAddress = document.getElementById('search').value;
  if(myAddress != null){
  var geocoder = new google.maps.Geocoder();
geocoder.geocode({
    "address": myAddress
}, function(results) {
    console.log(results[0].geometry.location); //LatLng
    showPosition(results[0].geometry.location);
});
}
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
