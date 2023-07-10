var d = 0, h = 0, m = 0, s = 0;
var clock = document.getElementsByClassName('clock')[0];


function resetDate(){
    localStorage.setItem('milsec', Date.now());
    mil = Date.now();

    clock.innerHTML = '0 Day 0:0:0s';

}

var dateData = document.getElementsByClassName('dt');

function setDate(){
    localStorage.setItem('milsec', (Date.parse(dateData[0].value + 'T' + dateData[1].value + ':00')));
    mil = localStorage.getItem('milsec');
    console.log(mil);
    calc();
    upDate();
    
}



var mil = localStorage.getItem('milsec');
console.log(mil);
if(mil != null || mil != ''){
     /* const minute = 1000 * 60;
     const hour = minute * 60;
     const day = hour * 24; */

     milRange = Date.now() - mil;
     
     
     calc();   
     upDate();

     setInterval(function(){
        
        milRange = Date.now() - mil;
        calc();
        upDate();
    }, 1000);

}

function calc(){
     s = Math.round(milRange / 1000);

     m = Math.floor(s / 60);
     s %= 60;

     h = Math.floor(m / 60);
     m %= 60;

     d = Math.floor(h / 24);
     h %= 24;
}

function upDate(){
    clock.innerHTML = '<b class = "h2 fw-bolder b">' + d + " Day " + '</b>' + h + ':' + m + ':' + s + 's'
}

var area = document.getElementById('note');
var warn = document.getElementById('warn');
var altt = document.getElementsByClassName('altt')[0];

function saveText(){
    localStorage.setItem('note', area.value);
    warn.style.display = 'none';
    altt.innerText = 'Saved';
    altt.classList.remove('alt-warn');
}

if(localStorage.getItem('note') != null){
    area.value = localStorage.getItem('note');
    
}

area.oninput = () => {
    disWarn();
}
function disWarn(){
    warn.style.display = 'block';
    altt.innerText = 'Editing';
    altt.classList.add('alt-warn');
}

