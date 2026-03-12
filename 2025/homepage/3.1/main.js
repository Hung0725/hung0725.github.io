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
    clockptg.innerHTML = Math.round((curr.getHours() * 3600 + curr.getMinutes() * 60 + curr.getSeconds()) / 0.864) / 1000 + '<span>% <i>of the day</i></span>'
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


var weekptg = Math.round(((weekday(d.getDay()) + ptg - 1) / 7) * 10000) / 100;
document.getElementById('wk').innerHTML =  weekptg + '% <i>of week ' + getweek(d) + '</i>';
progress(document.getElementById('wk'), weekptg);

var mthptg = Math.round((d.getDate() / ldom.getDate()) * 10000) / 100;
date[3].innerHTML =  mthptg + `% <i>of ` + mthname[d.getMonth()] + "</i>";
progress(date[4], mthptg);

var yearptg = Math.round((getDayOfYear() / leap(d.getFullYear())) * 10000) / 100;
year[0].innerHTML = yearptg + '% <i>of year ' + d.getFullYear() +'</i>';
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
});
*/




var lc = wt[0].children;
var wicon = document.getElementById('wicon');
var inf = document.getElementsByClassName('inf')[0].children;
function updatewt(json){
    console.log(json);
    lc[0].innerHTML = '<b>Latitude: </b>' + latitude;
    lc[1].innerHTML = '<b>Longitude: </b>' + longitude;
    wt[1].innerHTML = json.name + ", " + json.sys.country;
    
    var sr = new Date(json.sys.sunrise * 1000), ss = new Date(json.sys.sunset * 1000);
    wt[2].innerHTML = "<div><span class='material-symbols-outlined'>water_lux</span>" + sr.getHours() + ':' +  formatSec(sr.getMinutes().toString()) + "</div><div><span class='material-symbols-outlined'>wb_twilight</span>" + ss.getHours() + ":" + ss.getMinutes() + "</div>";
    
    wicon.setAttribute('src', icon + json.weather[0].icon + '@2x.png');
    document.getElementById('cnd').innerHTML = condition[json.weather[0].id];
    document.getElementById('tmp').innerHTML = Math.round(json.main.temp * 10) / 10;

    inf[0].innerHTML = '<span class="material-symbols-outlined tp">device_thermostat</span> ' + " Feels like " + Math.round(json.main.feels_like * 10) / 10;
    inf[1].innerHTML = '<span class="material-symbols-outlined hm">humidity_percentage</span> ' + json.main.humidity + '%';
    inf[2].innerHTML = '<span class="material-symbols-outlined">cloud</span> ' + json.clouds.all + '%';
    inf[3].innerHTML = '<span class="material-symbols-outlined">visibility</span> ' + json.visibility / 1000 + 'km';
    
    document.getElementById('wnd').innerHTML = '<span class="material-symbols-outlined">airwave</span>' + "<span><div style = 'display:flex; align-items:center'><span class='material-symbols-outlined'>explore</span><div class = 'deg' style = 'transform:rotate(" + (-90 +json.wind.deg) +"deg)'></div></div>" +'<div><span class="material-symbols-outlined">speed</span>' + json.wind.speed +'<i>m/s</i></div><div><span class="material-symbols-outlined">air</span> ' + json.wind.gust +'<i>m/s</i></span></div>';
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
getlocation();







