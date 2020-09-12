window.onload = () => {  
    'use strict';     
    if ('serviceWorker' in navigator) {     
    navigator.serviceWorker  
    .register('./sw.js'); 
    } 
    }

const api = {
    key: "1328ea3456815b7eb8538223650a76b4",
    base: "https://api.openweathermap.org/data/2.5/"
}

 

 const notificationEl = document.querySelector('.notification');
 const searchbox = document.querySelector('.search-box'); 

 if('geolocation' in navigator){
     navigator.geolocation.getCurrentPosition(setPosition, showError);
 }else{
    notificationEl.style.display = 'block';
    notificationEl.innerHTML = '<p>Browser Does not Support Geolocation.</p>';
 }

 function setPosition(position){
     let latitude = position.coords.latitude;
     let longitude = position.coords.longitude;
     getDefaultResults(latitude, longitude);
 }

 function showError(error){
    notificationEl.style.display = 'block';
    notificationEl.innerHTML = `<p> ${error.message} </p>`;
 }
 
 searchbox.addEventListener('keypress', setQuery);

 function setQuery(evt){
    if(evt.keyCode == 13){
        getResults(searchbox.value);       
    }
 }

 function getDefaultResults(latitude, longitude){
    fetch(`${api.base}weather?lat=${latitude}&lon=${longitude}&units=metric&APPID=${api.key}`)
    .then(weather => {
            return weather.json();
        }).then(displayResults);
 }

 function getResults(query){
    fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
    .then(weather => {
            return weather.json();
        }).then(displayResults);
 }

 function displayResults(weather){
     console.log(weather);
     let city = document.querySelector('.location .city');
     city.innerText = `${weather.name}, ${weather.sys.country}`;

     let now = new Date();
     let date = document.querySelector('.location .date');
     date.innerText = dateBuilder(now);

     let temp = document.querySelector('.current .temp');
     temp.innerHTML = `${Math.round(weather.main.temp).toFixed(0)}<span>&deg;c</span>`;
     
     let iconEl = document.querySelector('.weather-icon');
     iconEl.innerHTML = `<img class='icons' src="http://openweathermap.org/img/w/${weather.weather[0].icon}.png" alt="weather icon" />`;

     let weather_el = document.querySelector('.current .weather');
     weather_el.innerText = weather.weather[0].main;

     let hilow = document.querySelector('.hi-low');
     hilow.innerText = `${Math.round(weather.main.temp_min)}°c / ${Math.round(weather.main.temp_max)}°c`; 
 }

 function dateBuilder(d){
     let months = [
        'January', 
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
        ];
    let days = ["Sunday","Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;



 }