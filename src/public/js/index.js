
let x = document.getElementById("demo");
let inputNum = document.getElementById("inputNum");
let selectedChoices = document.getElementById("choices");
let total = document.getElementById("total");
let type = document.getElementById("type");
let selected = "Celsius", enteredValue;
let c, f, myLocation, latlon, img_url;
/* eslint-disable no-unused-vars, no-undef, no-empty*/
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition, showError);
  } else {
    x.innerHTML = "Geolocation is not supported by this browser.";
  }
}
function showPosition(position) {
 // x.innerHTML = "Latitude: " + position.coords.latitude +
 // "<br>Longitude: " + position.coords.longitude;
  latlon = position.coords.latitude + "," + position.coords.longitude;

  img_url = "https://maps.googleapis.com/maps/api/staticmap?center="+latlon+"&zoom=12&size=1000x2000&scale=4&maptype=roadmap&markers=color:blue|label:Y|"+latlon+"&key=YOUR_API_KEY";

  //document.getElementById("map").innerHTML = "<img src='"+img_url+"'>";
  document.body.style.backgroundImage = "url('"+img_url+"')";
  GetAddress(position.coords.latitude, position.coords.longitude)
  GetWeatherData(position.coords.latitude, position.coords.longitude);
}

const GetWeatherData = (lat, lon) => {
    fetch("https://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+lon+"&APPID=YOUR_API_KEY")
        .then(response => response.json())
        .then(data => {

            console.log(data);
            document.getElementById('temp').innerHTML = data.main.temp + "°C";
            document.getElementById('pres').innerHTML = data.main.pressure;
            document.getElementById('hum').innerHTML = data.main.humidity;
            document.getElementById('wind').innerHTML = data.wind.speed;
            document.getElementById('current').innerHTML = data.weather[0].description;
            c = data.main.temp;
            inputNum.value = c;
            f = (c * 9/5) + 32;
            total.innerHTML = f + "°F";
            //let resuts = data.weather[0];

        });

}
const GetAddress = (lat, lng) => {
  //let lat = parseFloat(document.getElementById("txtLatitude").value);
  //let lng = parseFloat(document.getElementById("txtLongitude").value);
  let latlng = new google.maps.LatLng(lat, lng);
  let geocoder = new google.maps.Geocoder();
  geocoder.geocode({ 'latLng': latlng }, function (results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
          if (results[1]) {
              //alert("Location: " + enteredValues[1].formatted_address);
              document.getElementById('search').value = results[1].formatted_address;
              myLocation = results[1].formatted_address;
          }
      }
  });
}

const getCoordinates = () => {
  let myAddress = document.getElementById('search').value;
  if(myAddress != null){
  let geocoder = new google.maps.Geocoder();
geocoder.geocode({
    "address": myAddress
}, function(enteredValues) {
    console.log(enteredValues[0].geometry.location); //LatLng
    showPosition(enteredValues[0].geometry.location);
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

//drop down
selectedChoices.oninput = function() {
  selected = selectedChoices.options[selectedChoices.selectedIndex].value;

  if(selected == "Celsius"){
    total.innerHTML = (f - 32) * 5/9;
    type.innerHTML = "Fahrenheit";
      }else if(selected == "Fahrenheit"){
        total.innerHTML = (c * 9/5) + 32;
        type.innerHTML = "Celsius";
      }
}

//input field
inputNum.oninput = function () {
  enteredValue = this.value;
  //converting from C to F
  if(selected == "Celsius"){
    if (enteredValue == null){
total.innerHTML = (f - 32) * 5/9 + "°F";
    }else{
      total.innerHTML = (enteredValue - 32) * 5/9 + "°F";
    }
//converting from F to C
  }else if(selected == "Fahrenheit"){
    if (enteredValue == null){
total.innerHTML = (c * 9/5) + 32 + "°C";
    }else{
      total.innerHTML = (enteredValue * 9/5) + 32 + "°C";
    }
  }
}

//share function
$(document).ready(function(){
  $('#share_button').click(function(e){
  e.preventDefault();
  FB.ui(
  {
  method: 'feed',
  name: myLocation,
  link: 'https://geo-search.heroku.com',
  picture: img_url,
  caption: myLocation,
  description: "This is my current weather conditions",
  message: ""
  });
  });
  });
