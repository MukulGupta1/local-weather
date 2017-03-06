/**
 * Created by Mukul on 04/03/17.
 */
var tempInC;
var tempInF;
var lat;
var long;


$(document).ready(function() {
    if ("geolocation" in navigator) { //check geolocation available
        navigator.geolocation.getCurrentPosition(function (position) {

            lat = position.coords.latitude;
            long = position.coords.longitude;

            $('img').attr("src", "https://maps.googleapis.com/maps/api/staticmap?center=" + lat + "," + long + "&zoom=11&size=500x300&scale=2&maptype=roadmap&key=AIzaSyAoL2kDSJJztp3xOVjUbMbyCUJ-1W7655c");

            var forecastApiUrl = 'https://api.forecast.io/forecast/e07fdce24bb3337313ce3a131327d614/' + lat + ',' + long + '?units=si&callback=?'

            $.getJSON(forecastApiUrl, function (data1) {
                console.log(data1);
                console.log('https://api.forecast.io/forecast/e07fdce24bb3337313ce3a131327d614/' + lat + ',' + long + '?units=si');
                tempInC = parseInt(data1.currently.temperature);
                $('#main-temp').html('<h1 style="font-size: 96pt">' + tempInC + "&#8451;" + '</h1>');
                $('#main-humidity').html('<h2 style="font-size: 48pt">' + parseInt(data1.currently.humidity * 100)+ "%" + '</h2>');
                $('#weather-main').html('<h2>' + data1.currently.icon + '</h2>');
                var iconString = "wi wi-forecast-io-" + data1.currently.icon;
                $('#weather-icon').html('<i style="font-size:120pt" class="' + iconString + '"></i>')
                $('#summary').html('<h2 style="font-size: 48pt">' + data1.currently.summary + '</h2>');
                $('#temp-toggle').attr("style", "display:block")
            });
        });
    }
});

function convertToF(){
    tempInF = parseInt((9/5*tempInC) + 32);
    $('#main-temp h1').html(tempInF + "&#8457;");
    $('#fahrenheit_btn').addClass("disabled");
    $('#celsius_btn').removeClass("disabled");
}

function convertToC(){
    $('#main-temp h1').html(tempInC + "&#8451;");
    $('#fahrenheit_btn').removeClass("disabled");
    $('#celsius_btn').addClass("disabled");
}