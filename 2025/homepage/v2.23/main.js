var d = new Date();
var clock = document.getElementsByClassName('clock')[0],
    clockptg = document.getElementsByClassName('clockptg')[0],
    date = document.getElementsByClassName('date')[0].children,
    year = document.getElementsByClassName('year')[0].children,
    time = document.getElementsByClassName('time')[0].children;

var star = document.getElementsByClassName('star')[0];


const mthname = ['January', "February", "March", "April", "May", "June", "July", "August", "Septemper", "October", "November", "December"];
updateTime();
setInterval(updateTime, 900);

function updateTime(){
    var curr = new Date();
    clock.innerHTML = curr.getHours() + ':' + formatSec(curr.getMinutes().toString()) + ':' + formatSec(curr.getSeconds().toString());
    clockptg.innerHTML = Math.round((curr.getHours() * 3600 + curr.getMinutes() * 60 + curr.getSeconds()) / 0.864) / 1000 + '<span>% of the day</span>'
}
function formatSec(s){
    if(s.length <= 1) return '0' + s;
    else return s;
}

function getweek(date) {
    const currentDate = 
        (typeof date === 'object') ? date : new Date();
    const januaryFirst = 
        new Date(currentDate.getFullYear(), 0, 1);
    const daysToNextMonday = 
        (januaryFirst.getDay() === 1) ? 0 : 
        (7 - januaryFirst.getDay()) % 7;
    const nextMonday = 
        new Date(currentDate.getFullYear(), 0, 
        januaryFirst.getDate() + daysToNextMonday);

    return (currentDate < nextMonday) ? 52 : 
    (currentDate > nextMonday ? Math.ceil(
    (currentDate - nextMonday) / (24 * 3600 * 1000) / 7) : 1);
}
function leap(year){
    if(year % 4 == 0 || (year % 100 == 0 && year % 400 == 0)){
        return 366;
    } else {
        return 365;
    }
}
function weekday(day){
    if(!day) return 7; return day;
}

function getDayOfYear() {
    const date = new Date(); // Convert input to Date object
    const startOfYear = new Date(date.getFullYear(), 0, 1); // January 1st of the same year
    const diff = date - startOfYear; // Difference in milliseconds
    return Math.floor(diff / (1000 * 60 * 60 * 24)) + 1; // Convert to days (1-based)
}

date[0].innerHTML = d.toDateString();
var ldom = new Date(d.getFullYear(), d.getMonth() + 1, 0);
var ptg =  Math.round((d.getHours() * 3600 + d.getMinutes() * 60 + d.getSeconds()) / 864) / 100;
progress(time[2], ptg * 100);


function getweek(d){
    var jan = new Date(d.getFullYear(), 0, 1);
    var cd = weekday(jan.getDay()) - 1, tmp = 0;
    console.log(cd);
    for(var i = 0; i < cd; i++){
        tmp++;
    }
    console.log(tmp);
    return Math.floor((tmp + getDayOfYear() + 1) / 7 + 1);
}

//getweek(d);


var weekptg = Math.round(((weekday(d.getDay()) + ptg - 1) / 7) * 100000) / 1000;
date[1].innerHTML =  weekptg + '% of week ' + getweek(d);
progress(date[2], weekptg);

var mthptg = Math.round((d.getDate() / ldom.getDate()) * 10000) / 100;
date[3].innerHTML =  mthptg + `% of ` + mthname[d.getMonth()];
progress(date[4], mthptg);

var yearptg = Math.round((getDayOfYear() / leap(d.getFullYear())) * 10000) / 100;
year[0].innerHTML = yearptg + '% of year ' + d.getFullYear();
progress(year[0].parentElement, yearptg.toString());

function progress(el, ptg){
    var container = document.createElement('div');
    var child = document.createElement('div');
    child.style.width = ptg + '%';
    container.classList.add('progress');
    container.appendChild(child);
    el.appendChild(container);
}


function fill0(x, y){
    if(x.length < y){
        for(var i = 0; i < y - x.length + 1; i++){
            x = '0' + x;
        }
    }
    return x;
}

const apiKey = '904490d51ffe5d45b5ee24036c6ea3a0'; // Replace with your OpenWeatherMap API key

var latitude = 12.847013; // Replace with the desired latitude
var longitude = 107.984154; // Replace with the desired longitude
var url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric&lang=vi`;

const icon = 'https://openweathermap.org/img/wn/'


function degtoc(num) {
    var val = Math.floor((num / 22.5) + 0.5);
    var arr = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];
    return arr[(val % 16)];
}

var wt = document.getElementsByClassName('weather')[0].children;
var condition;

fetch('condition.json', {
    method: 'GET'
})
.then(function(response){return response.json();})
.then(function(json){
    condition = json;
});

/*fetch("weather.json", {
    method: "GET"
})
.then(function(response){return response.json();})
.then(function(json){
    updatewt(json);
});*/





var lc = wt[0].children;
var wicon = document.getElementById('wicon');
function updatewt(json){
    console.log(json);
    lc[0].innerHTML = 'Latitude: ' + latitude;
    lc[1].innerHTML = 'Longitude: ' + longitude;
    wt[1].innerHTML = json.name + ", " + json.sys.country;
    
    var sr = new Date(json.sys.sunrise * 1000), ss = new Date(json.sys.sunset * 1000);
    wt[2].innerHTML = "sunrise: " + sr.getHours() + ':' +  formatSec(sr.getMinutes().toString()) + " sunset: " + ss.getHours() + ":" + ss.getMinutes();
    
    wicon.setAttribute('src', icon + json.weather[0].icon + '@2x.png');
    wt[4].innerHTML = condition[json.weather[0].id];
    wt[5].innerHTML = "temperature: " + json.main.temp + " Feels like " + json.main.feels_like;
    wt[6].innerHTML = 'Humidity: ' + json.main.humidity + '%';
    wt[7].innerHTML = 'Cloud: ' + json.clouds.all + '%';
    wt[8].innerHTML = "Visibility: " + json.visibility + 'm';
    wt[9].innerHTML = 'Wind deg: ' + json.wind.deg + ' speed: ' + json.wind.speed +'m/s' + ' gust: ' + json.wind.gust +'m/s';
}


function fetchweather(){
 fetch(url)
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok ' + response.statusText);
    }
    return response.json();
  })
  .then(data => {
    updatewt(data);
    //console.log(data);
    //console.log(JSON.stringify(data));
  })
  .catch(error => {
    console.error('There was a problem with the fetch operation:', error);
  }); 
}




function getlocation(){
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(pos);
      } else {
        x.innerHTML = "Geolocation is not supported by this browser.";
      }
}
function pos(position) {
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;

    url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric&lang=vi`;
    //console.log(url);
    fetchweather();
    console.log(latitude, longitude);
}

function getweather(x, y){
    latitude = x;
    longitude = y;

    url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric&lang=vi`;
    //console.log(url);
    fetchweather();
    console.log(latitude, longitude);
}


