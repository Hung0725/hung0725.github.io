var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
  return new bootstrap.Tooltip(tooltipTriggerEl)
});
var saved = false; // at first when load data we can avoid duplications with this
var session = 0;

var data;

// check for inappropriate names
function check(name){
    if(name == "" || name == undefined || name == null){
        alert("There's nothing here!");
        return false;
    }
    var s = 0;
    for(var i = 1; i < Object.keys(data).length; i++){
        if(name == data[i][0]){
            alert('You have already had "'+ name+ '" session!');
            return false;
        }
    }
    return true;
}


var ord = document.getElementsByClassName("ord")[0];
for(var i = 0; i < 53; i++){
    var x = document.createElement('div');
    x.innerHTML = i + 1;
    ord.appendChild(x);
}

var sessions = document.getElementsByClassName('sessions')[0];
function newSession(sessionName, ch){
    // break if the sessionName is inappropriate
    if(parseInt(ch)) if(saved) if(!check(sessionName)) return;

    var newEl = document.createElement('button');
    ++session;
    newEl.innerHTML = sessionName;
    
    newEl.value = session;
    newEl.setAttribute('onclick', 'session = parseInt(this.value); cur(Y); focusBtn(this)');
    sessions.prepend(newEl);
    if(data[session] == undefined) data[session] = {};
    data[session][0] = newEl.innerHTML;
}

function focusBtn(El){
    for(var i = 0; i < sessions.children.length; i++){
        sessions.children[i].classList.remove('focusBtn');
    }
    El.classList.add('focusBtn');
}

var Y = 2025;
var curr = document.getElementsByClassName('current')[0];
function cur(year){
    if(data[session][Y] == undefined){
        data[session][Y] = {};
       /* for(var i = 0; i < checkLeap(year); i++){
            data[session][Y][i] = 0;
        } */
    }

    display.innerHTML = '';
    curr.innerHTML = year;
    render(year);
}

var display = document.getElementsByClassName('heatmap-display')[0];

function getDateFromDay(year, day) {
  let date = new Date(year, 0, day); // January 1st is day 1
  return date.toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "short" });
}
function getDayOfYear(dateString) {
    const date = new Date(); // Convert input to Date object
    const startOfYear = new Date(date.getFullYear(), 0, 1); // January 1st of the same year
    const diff = date - startOfYear; // Difference in milliseconds
    return Math.floor(diff / (1000 * 60 * 60 * 24)) + 1; // Convert to days (1-based)
}

function checkLeap(year){
    if(year % 4 == 0 || (year % 100 == 0 && year % 400 == 0)){
            return 366;
    } else {
        return 365;
    }
}


function render(year){
    saved = false;
    var days = checkLeap(year);
    const d = new Date(year + "-1-1");
    // get current Date
    var currentDate = new Date();

    for(var i = 1; i < d.getDay(); i++){
        var el = document.createElement('span');
        display.appendChild(el);
    }
    for(var i = 0; i < days; i++){
        var el = document.createElement('div');
        display.appendChild(el);
        var date = getDateFromDay(year, i + 1);

        el.setAttribute('id', i);
        el.setAttribute('data-bs-toggle','tooltip');
        el.setAttribute('onclick', 'editVal(this.id)');

        el.setAttribute('title', '0 on ' + date);
        const tooltip = new bootstrap.Tooltip(el);

        

        if(data[session][Y][i] != undefined) sav(i, data[session][Y][i]);
    }
    var current = document.getElementById(getDayOfYear());
    if(year == currentDate.getFullYear()){
        current.classList.add('currentDate');
    }
    saved = true;
}
function openWindow(window){
    window.classList.add("show");
    btnbl.style.display = 'block';
}
function closeWindow(window){
    window.classList.remove("show");
    btnbl.style.display = 'none';
}
btnbl = document.getElementsByClassName('black')[0];
var inp = document.getElementsByClassName('inp')[0];
function editVal(day){
    inp.classList.add('show');
    btnbl.style.display = 'block';
    
    inp.value =  day;
    inps[0].value = parseInt(data[session][Y][day]);
    
    inp.children[0].children[0].innerHTML = '<span>Edit</span> ' + getDateFromDay(Y, parseInt(day) + 1);
}


var inps = document.getElementsByClassName('inpt');
function sav(ID, val){
    var em = document.getElementById(ID);
    data[session][Y][ID] = val;
    em.setAttribute('title', val + ' on ' + getDateFromDay(Y, ID + 1));
    const tooltip = new bootstrap.Tooltip(em); 
    
    
    em.style.background = "rgb(" + Math.abs(221 - val) + ", 221, 221)"; 
    //em.style.opacity = inps[0].value / 255;
    localStorage.setItem('edata', JSON.stringify(data));

    if(saved){
        updateJSON();
    }
}




if(localStorage.edata != undefined){
    data = JSON.parse(localStorage.edata);
    for(var i = 0; i < Object.keys(data).length - 1; i++){
        newSession(data[i + 1][0], 1);
    }
    saved = true;

}  else {
    fetchJSON();
    if(data == undefined){
        data = {};
        data[session] = {};
        newSession("Session 1", 1);
    }
}


var newS = document.getElementsByClassName('new')[0];
var nameInp = document.getElementById('session-name');
// close Window
closeWindow(inp);
focusBtn(sessions.children[0]);


// JSON
async function fetchJSON() {
    const binId = "679a209bad19ca34f8f65f66"; // Replace with your Bin ID
    const response = await fetch(`https://api.jsonbin.io/v3/b/${binId}/latest`, {
        headers: { "X-Master-Key": "$2a$10$aEIMG0yIDIgOHCp12erNru1fdKqdB1zJArI1TfUMUraONeYgas/p2" }
    });

    const Data = await response.json();
    data = Data.record;
    console.log(data);
    if(data != undefined){
        localStorage.setItem('edata', JSON.stringify(data));
        alert("JSON fetched successfully! Reload page to see update!")
    }
    saved = true;
}

async function updateJSON() {
    const binId = "679a209bad19ca34f8f65f66"; // Replace with your Bin ID
    const newData = { message: "Updated JSON data!" };

    const response = await fetch(`https://api.jsonbin.io/v3/b/${binId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "X-Master-Key": "$2a$10$aEIMG0yIDIgOHCp12erNru1fdKqdB1zJArI1TfUMUraONeYgas/p2"
        },
        body: JSON.stringify(data)
    });

    const jdata = await response.json();
    console.log("Updated JSON:", jdata);
}


cur(Y);
