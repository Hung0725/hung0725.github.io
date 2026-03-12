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
    clockptg.innerHTML = Math.round((curr.getHours() * 3600 + curr.getMinutes() * 60 + curr.getSeconds()) / 8.64) / 100 + '<span>% of the day</span>'
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
    if(!day) return 8; return day;
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

var weekptg = Math.round(((weekday(d.getDay()) + ptg) / 9) * 10000) / 100;
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

//ptg = 0.3;


// background
var sun = document.getElementsByClassName('sun')[0],
    moon = document.getElementsByClassName('moon')[0],
    bg = document.getElementsByClassName('bg')[0],
    mt = document.getElementsByClassName('mountain')[0];

if(ptg <= 0.5){
    sun.style.top = 100 - ptg*200 + '%';
    sun.style.left = ptg * 100 + "%";
} else {
    sun.style.top = (ptg*100 - 50)*3.3 + '%';
    sun.style.left = ptg * 100 + "%";
}
if(ptg >= 0.65){
    moon.style.bottom = (ptg - 0.65) * 270 + '%';
    moon.style.left = (ptg - 0.65) * 200 + '%';
    moon.style.opacity = 1;
} else {
    moon.style.bottom = 90 - (ptg * 250) + '%';
    moon.style.opacity = 0.5 - (ptg * 2);
    moon.style.left = 100 - (ptg * 150) + '%';
}
if(ptg > 0.65){
    star.style.opacity = ptg;
} else {
    if(ptg < 0.5) ptg = 1 - ptg;
    star.style.opacity = ptg - 0.5;
}
if(ptg < 0.5) ptg = 1 - ptg;


bg.style.background = 'rgb(0,' + (100 - ptg * 90) + ',' + (200 - ptg * 170) + ')';
mt.style.background = 'linear-gradient(transparent, rgba(0,0,0,' + (ptg + 0.1) + ')';

function loop(){
    if(ptg >= 1) ptg = 0;
    ptg += 0.01;
/*if(ptg <= 0.5){
    sun.style.top = 100 - ptg*200 + '%';
    sun.style.left = ptg * 100 + "%";
} else {
    sun.style.top = (ptg*100 - 50)*3 + '%';
    sun.style.left = ptg * 100 + "%";
}
if(ptg >= 0.65){
    moon.style.bottom = (ptg - 0.65) * 270 + '%';
    moon.style.left = (ptg - 0.65) * 200 + '%';
} else {
    moon.style.bottom = (0.5 - ptg) * 100 + '%';
    moon.style.left = 100 - (ptg * 150) + '%';
}*/

if(ptg <= 0.5){
    sun.style.top = 100 - ptg*200 + '%';
    sun.style.left = ptg * 100 + "%";
} else {
    sun.style.top = (ptg*100 - 50)*3 + '%';
    sun.style.left = ptg * 100 + "%";
}
if(ptg >= 0.65){
    moon.style.bottom = (ptg - 0.65) * 270 + '%';
    moon.style.left = (ptg - 0.65) * 200 + '%';
    moon.style.opacity = 1;
} else {
    moon.style.opacity = 0.5 - (ptg * 2);
    moon.style.bottom = 90 - (ptg * 250) + '%';
    moon.style.left = 100 - (ptg * 150) + '%';
}
var temp = ptg;
if(ptg < 0.5) temp = 1 - ptg;
bg.style.background = 'rgb(0,' + (100 - temp * 90) + ',' + (200 - temp * 170) + ')';
console.log(Math.floor(ptg * 2400) / 100);
}

//setInterval(loop, 100);



//stars;
for(var i = 0; i < 75; i++){
    var x = document.createElement('div');
    x.innerHTML = '.';
    x.style.top = Math.random() * 100 + '%';
    x.style.left = Math.random() * 100 + '%';
    x.style.fontSize = Math.random() * 35 + 'px';
    x.style.opacity = Math.random() * 1;
    star.appendChild(x);
}
