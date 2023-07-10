var d = 0, h = 0, m = 0, s = 0;
var clock = document.getElementsByClassName('clock')[0];


// reset to now date
function resetDate(){
    localStorage.setItem('milsec', Date.now());
    mil = Date.now();

    clock.innerHTML = '<b class = "h2 b fw-bolder">0 Day </b> <b class = "ct">0:0:0s</b>';
}

var dateData = document.getElementsByClassName('dt');

// set custom date
function setDate(){
    if(!checkDate()){
        alt('Invalid Date!', 'yel')
        return;
    }

    localStorage.setItem('milsec', (Date.parse(dateData[0].value + 'T' + dateData[1].value + ':00')));
    mil = localStorage.getItem('milsec');
    console.log(mil);
    calc();
    upDate();
}

function checkDate(){
    var D = new Date();
    const mth = [1,2,3,4,5,6,7,8,9,10,11,12];
    // format yyyymmdd
    var dateNow = parseInt(D.getFullYear() + formatDate(mth[D.getMonth()].toString(10)) + formatDate(D.getDate().toString(10)));
    var setdate = parseInt(dateData[0].value.replace(/-/g, ''));
    
    if(dateNow < setdate) return false;
    if(dateNow == setdate){
        var timeNow = D.getHours().toString(10) + D.getMinutes().toString(10);
        var timeSet = dateData[1].value.replace(/:/g, '');

        if(timeNow < timeSet) return false;
    }

    return true;
}


//  calculate and set interval if there is data in localStorage
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

} else {
    resetDate();
}

// calculating function
function calc(){
     s = Math.round(milRange / 1000);

     m = Math.floor(s / 60);
     s %= 60;

     h = Math.floor(m / 60);
     m %= 60;

     d = Math.floor(h / 24);
     h %= 24;
}

// update caculated duration
function upDate(){
    clock.innerHTML = '<b class = "h2 fw-bolder b">' + d + " Day " + '</b><b class = "ct">' + h + '<b class = "s">:</b>' + formatDate(m.toString()) + '<b class = "s">:</b>' + formatDate(s.toString()) + '<b class = "s">s</b></b>'
}


var area = document.getElementById('note');
var warn = document.getElementById('warn');
var altt = document.getElementsByClassName('altt')[0];

//save text to localStorage
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


// set default date
let dateTime = new Date();
/*
    Date format:  YYYY-MM-DD
    Time format:  HH:MM
*/
dateData[0].value = dateTime.getFullYear() + '-' + formatDate((dateTime.getMonth() + 1).toString(10)) + '-' + formatDate((dateTime.getDate()).toString(10));
dateData[1].value = formatDate(dateTime.getHours().toString(10)) + ':' + formatDate(dateTime.getMinutes().toString(10));

function formatDate(val){
    if(val.length == 1) return '0' + val;
    return val;
}



var altList = document.querySelectorAll('.alert-list div');
function checkAltList(){
    if(altList.length > 3){
        for(var i = 0; i < altList.length - 3; i++){
            altList[i].style.display = 'none';
        }
    }
}

function alt(text, BSTbg){
    var altEl = document.createElement('div');
    altEl.innerHTML = text;
    if(BSTbg != '') altEl.classList.add(BSTbg);
    document.getElementsByClassName('alert-list')[0].appendChild(altEl)

    setTimeout(function(){
        altEl.style.display = 'none';
    }, 5000)

   
}
