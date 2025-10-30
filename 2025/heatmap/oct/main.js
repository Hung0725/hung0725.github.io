// complete the delete feature
// edit feature
//hover on a section to display these buttons

// make more color options 1/2/2025



var edit = document.getElementsByClassName('reN')[0];
var nameinp = document.getElementById('rename');
function rename(){
    if(check(nameinp.value)){
        document.getElementById(focusSession * 1000).children[0].innerHTML = nameinp.value;
        data[focusSession][0] = nameinp.value;

        localStorage.setItem('cdata', JSON.stringify(data));
        closeWindow(edit);
        updateJSON();
    }
}

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

var focusSession = 1;
var sessionEl = "<div><button onclick = 'focusSession = parseInt(this.parentElement.parentElement.id) / 1000; openWindow(edit); edit.children[0].innerHTML = `Rename session <b>` + data[focusSession][0]+`</b>`; nameinp.focus(); nameinp.value = data[focusSession][0]; nameinp.select()'><span class = 'material-symbols-outlined'>edit</span></button>  <button onclick = 'delSession(parseInt(this.parentElement.parentElement.id / 1000))'><span class = 'material-symbols-outlined'>delete</span></button></div>";

function delSession(sID){
    var confirm = prompt('Enter "Mikuchan" to confirm delete!');
    if(confirm == "Mikuchan"){
        for(var i = sID; i < Object.keys(data).length - 1; i++){
            data[i] = data[i+1];
        }
        delete data[Object.keys(data).length - 1];
        //onsole.log(data);
        localStorage.setItem('cdata', JSON.stringify(data));
        location.reload();
    // also need to upload to JSONio API
    }
}
function todayCount(){
    if(data[session][Y][getDayOfYear()] != undefined){
        tcnt.innerText = data[session][Y][getDayOfYear()];
    } else {
        tcnt.innerText = 0;
    }
}
function refine(word){
    if(word.length >= 23){
        return word.slice(0, 20) + "...";
    }
    return word;
}

var createIndex = session;
var sessions = document.getElementsByClassName('sessions')[0];
function newSession(sessionName, ch, manual){
    // break if the sessionName is inappropriate
    if(parseInt(ch)) if(saved) if(!check(sessionName)) return;
    var newEl = document.createElement('button');
    session++;
    createIndex++;

    newEl.innerHTML = '<span>' + refine(sessionName) + '</span>' + sessionEl;

    newEl.title = sessionName;
    newEl.id = session * 1000;
    newEl.value = session;
    newEl.setAttribute('onclick', 'session = parseInt(this.value); stat();  cur(Y); focusBtn(this); todayCount()');
    sessions.appendChild(newEl);
    

    if(data[createIndex] == undefined) data[createIndex] = {};
    data[createIndex][0] = sessionName;
    if(data[createIndex][Y] == undefined){data[createIndex][Y] = {};}
    localStorage.cdata = JSON.stringify(data); 


   /* if(data[tmp] == undefined) data[tmp] = {};
    data[tmp][0] = sessionName;
    if(data[tmp][Y] == undefined){data[tmp][Y] = {};}
    localStorage.cdata = JSON.stringify(data);*/
}

function focusBtn(El){
    var childbtn = El.children[1].children;
    
    for(var i = 1; i < sessions.children.length; i++){
        sessions.children[i].classList.remove('focusBtn');
        sessions.children[i].children[1].children[0].disabled = true;
        sessions.children[i].children[1].children[1].disabled = true;
        
    }
    El.classList.add('focusBtn');
    childbtn[0].disabled = false;
    childbtn[1].disabled = false;
}

var Y = 2025;
var curr = document.getElementsByClassName('current')[0];
function cur(year){
    if(data[session][Y] == undefined){
        
        data[session][Y] = {};
    } 

    
    curr.innerHTML = year;
    render(year);
}

var display = document.getElementsByClassName('heatmap-display')[0];

function getDateFromDay(year, day) {
  let date = new Date(year, 0, day); // January 1st is day 1
  return date.toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "short" });
}
function getDayOfYear() {
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

function fillBlank(el, month, year){
    var firstDate = new Date(year, month - 1, 1);
    dd = firstDate.getDay();
    if(firstDate.getDay() == 0) dd = 7;
    for(var i = 1; i < dd; i++){
        var blank = document.createElement('span');
        el.appendChild(blank);
    }
}
var Mths = document.getElementsByClassName('heatmap-display');
var mForm = document.getElementById('cont');
var cld = document.getElementById('cld');

function render(year){
    saved = false;
    var days = checkLeap(year);
    const d = new Date(year + "-1-1");
    // get current Date
    var currentDate = new Date();

    if(seMth){
        cld.classList.add('checked');
        var m = ["January", "Feburary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        mForm.innerHTML = "";
        mForm.classList.add("THEME");
        for(var i = 0; i < 12; i++){
            var container = document.createElement('div');
            container.setAttribute("data-before", m[i]);
            container.classList.add('heatmap-display');
            mForm.appendChild(container);
        }
        fillBlank(Mths[0], 1, year);
        
        
        var i = 0;
        for(var j = 1; j <= days; j++){
            let date = new Date(year, 0, j);
            if(j != 1 && date.getDate() == 1){
                i++;
                fillBlank(Mths[i], i + 1, year);
            }

            var el = document.createElement('div');
            Mths[i].appendChild(el);
            
            //console.log(date.getDate(), date.getMonth());
            
            el.setAttribute('id', j);
            el.setAttribute('data-bs-toggle','tooltip');
            
            if(currentDate > new Date(Y, 0, j)){
                el.setAttribute('onclick', 'editVal(this.id)');
                el.classList.add('edible');
            }

            el.setAttribute('title', '0 on ' + getDateFromDay(year, j));
            const tooltip = new bootstrap.Tooltip(el);
            if(data[session][Y][j] != undefined) sav(j, data[session][Y][j]);
        }

    } else {
        cld.classList.remove("checked");
        mForm.innerHTML = "<div class = 'ord'></div><div class = 'heatmap-display'></div>"
        var display = document.getElementsByClassName('heatmap-display')[0];
        display.innerHTML = '';
        mForm.classList.remove("THEME");

        // week number
        var ord = document.getElementsByClassName("ord")[0];
        for(var i = 0; i < 53; i++){
            var x = document.createElement('div');
            x.innerHTML = i + 1;
            ord.appendChild(x);
        }

        var dd = d.getDay();
        if(dd == 0) dd = 7;
        for(var i = 1; i < dd; i++){
            var el = document.createElement('span');
            display.appendChild(el);
        }
        for(var i = 1; i <= days; i++){
            var el = document.createElement('div');
            display.appendChild(el);
            var date = getDateFromDay(year, i);

            el.setAttribute('id', i);
            el.setAttribute('data-bs-toggle','tooltip');
            el.setAttribute('onclick', 'editVal(this.id)');

            el.setAttribute('title', '0 on ' + date);
            const tooltip = new bootstrap.Tooltip(el);
            if(data[session][Y][i] != undefined) sav(i, data[session][Y][i]);
        }
        //console.log("yearly")
    }

    var current = document.getElementById(getDayOfYear());
    if(year == currentDate.getFullYear()){
        current.classList.add('currentDate');
    } 

    saved = true;
}
function openWindow(window){
    window.classList.add("showw");
    btnbl.style.display = 'block';
}
function closeWindow(window){
    window.classList.remove("showw");
    btnbl.style.display = 'none';
}
btnbl = document.getElementsByClassName('black')[0];
var inp = document.getElementsByClassName('inp')[0],
    cmtd = document.getElementById('cmtd');
function editVal(day){
    inp.classList.add('showw');
    btnbl.style.display = 'block';
    
    inp.value =  day;
    inps[0].value = parseInt(data[session][Y][day]);
    var tmp = parseInt(data[session][Y][day]);
    if(!tmp) tmp = 0;
    cmtd.innerText = tmp;
    inp.children[0].children[0].innerHTML = '<span style = "font-weight:bold">Edit</span> ' + getDateFromDay(Y, parseInt(day));
}


var inps = document.getElementsByClassName('inpt');
function sav(ID, val){
    var em = document.getElementById(ID);
    data[session][Y][ID] = val;
    em.setAttribute('title', val + ' on ' + getDateFromDay(Y, ID));
    const tooltip = new bootstrap.Tooltip(em); 
    
    // set color for square
    if(!(val == 0 || val == undefined || val == NaN)){

        // DARK OPTION HERE

        if(!dark){
            var cr = Math.floor(val / threshold);
            if(cr >= color[colorOpt].length - 2) cr = color[colorOpt].length - 2;
            em.style.background = color[colorOpt][cr];
        } else {
            var cr = color[colorOpt].length - Math.floor(val / threshold) - 2;
            if(cr < 0) cr = 0;
            if(cr > color[colorOpt].length - 2) cr = color[colorOpt].length - 2;
            var temp = cr;
            if(!temp) temp = 1;
            //em.style.opacity = 1 - temp / (parseInt(variation) + 2);
           // console.log(cr);
            var tmp = color[colorOpt][cr];
            tmp = tmp.slice(0,tmp.length-1) + "," + (1 - temp / (parseInt(variation) + 2)) + ")";
            em.style.background = tmp;
            
        }
        
    
    }
    localStorage.setItem('cdata', JSON.stringify(data));
    if(saved){
        //updateJSON();    
    }
}



 if(localStorage.cdata != undefined && localStorage.cdata != ''){
    data = JSON.parse(localStorage.cdata);
    // check localStorage;
    // Create a session if there is no sessions yet
    if(Object.keys(data).length <= 1){
        data = {};
        data[session] = {};
        newSession("Session 1", 1, 0);
    } else {
       for(var i = 0; i < Object.keys(data).length - 1; i++){
           newSession(data[i + 1][0], 0, 0);
        } 
    }
    saved = true;
    

}  else {
    //fetchJSON();

// BUG 


   if(data == undefined || Object.keys(data).length <= 1){
        data = {};
        data[session] = {};
        newSession("Session 1", 0, 0);
    }
}


var newS = document.getElementsByClassName('new')[0];
var nameInp = document.getElementById('session-name');



// JSON
async function fetchJSON() {
    const binId = "679a209bad19ca34f8f65f66"; // Replace with your Bin ID
    const response = await fetch(`https://api.jsonbin.io/v3/b/${binId}/latest`, {
        headers: { "X-Master-Key": "$2a$10$aEIMG0yIDIgOHCp12erNru1fdKqdB1zJArI1TfUMUraONeYgas/p2" }
    });

    const Data = await response.json();
    data = Data.record;
    //console.log(data);
    if(data != undefined){
        localStorage.setItem('cdata', JSON.stringify(data));
        alert("Downloaded successfully! Reload page to see update!")
    }
    location.reload();
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
    alert("Uploaded succcessfully!")
}


function elval(val, x){
    var tmp = parseInt(cmtd.innerText);
    sav(val, tmp + parseInt(x));
    cmtd.innerText = tmp + parseInt(x);
}


// Use Github Gist instead of JSONbin.io



/*

async function fetchJSON() {
    const gistId = "b5e054f2974d10228bc88038eefc75ee"; // Replace with your actual Gist ID
    const response = await fetch(`https://api.github.com/gists/${gistId}`);
    const gistData = await response.json();
    
    // Get the latest raw URL dynamically
    const rawUrl = gistData.files["data.json"].raw_url;
  
    // Fetch the actual JSON data
    const jsonResponse = await fetch(rawUrl);
    const jsonData = await jsonResponse.json();
    data = jsonData;
    console.log(data);
    if(data != undefined){
        localStorage.setItem('cdata', JSON.stringify(data));
        alert("Downloaded successfully! Reload page to see update!")
    }
    location.reload();
  }
  




const gistId = "b5e054f2974d10228bc88038eefc75ee"; // Replace with your Gist ID
const fileName = "data.json"; // Replace with your JSON file name
const token = "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"; // Replace with your GitHub token

async function updateJSON() {
  const response = await fetch(`https://api.github.com/gists/${gistId}`, {
    method: "PATCH",
    headers: {
      "Authorization": `token ${token}`,
      "Accept": "application/vnd.github.v3+json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      files: {
        [fileName]: {
          content: JSON.stringify(data, null, 2) // Update content
        }
      }
    })
  });

  if (response.ok) {
    console.log("Gist updated successfully!");
  } else {
    console.error("Error updating Gist:", response.statusText);
  }
}



*/






var inf = document.getElementsByClassName('val');
function stat(){
    var s = 0, mV = 0, mD = new Date();
    for(const y in data[session]){
        if(y != '0'){
            for(const k in data[session][y]){
                var x = parseInt(data[session][y][k])
                s += x;
                if(mV < x){
                    mV = x;
                    mD = new Date(y, 0, k);
                }
            }
        }
    }
    

    var cD = getDayOfYear() - 1, cS = 0, tmp = Y;
    while(parseInt(data[session][tmp][cD])){
        cS++;
        cD--;
        if(cD == 0){
            tmp--;
            cD = checkLeap(tmp);
        }
    }
    if(parseInt(data[session][Y][getDayOfYear()])) cS++;

    var bS = 0, btmp = 1;
    for(const y in data[session]){
        if(y != '0'){
            for(const k in data[session][y]){
                if(parseInt(data[session][y][parseInt(k)]) && parseInt(data[session][y][parseInt(k) + 1])){
                    btmp++;
                } else {
                    bS = Math.max(bS, btmp);
                    btmp = 1;
                }
            }
        }
    }

// selected year stat
    var yS = 0, aY = 0, aTmp = 1;
    for(const i in data[session][Y]){
        if(parseInt(data[session][Y][i])){
            yS += parseInt(data[session][Y][i]);
            if(!aY) aTmp = i;
            aY++;
        }
        
        
    }
//console.log(aY, aTmp, getDayOfYear());
var arY = Math.floor((aY / (getDayOfYear() - aTmp + 1)) * 10000) / 100,
    avg = Math.floor(yS / (getDayOfYear() - aTmp + 1) * 100) / 100;
//console.log(s, cS, bS, yS, arY, avg);
//console.log(mV, mD);

if(cS > 0){
    inf[0].classList.add("cS");
} else {
    inf[0].classList.remove('cS');
}

inf[0].innerText = cS;
inf[1].innerText = bS;
inf[2].innerHTML = `<b>${mV}</b><i>(${mD.getDate()}/${mD.getMonth() + 1}/${mD.getFullYear()})</i>`;
inf[3].innerText = s;
inf[4].innerHTML = `<b>${avg}</b><i>commits/day</i>`;
inf[5].innerHTML = `${arY}% <i>(${aY}/${getDayOfYear() - aTmp + 1})</i>`;
}


function ctr(ind){
    var l = sessions.children.length - 1;
    if(ind){
        if(session > 1){
            var i = session - 1;
            var tmp = sessions.children[i].innerHTML;
            sessions.children[i].innerHTML = sessions.children[session].innerHTML;
            sessions.children[session].innerHTML = tmp;

            focusBtn(sessions.children[i]);

            tmp = data[i];
            data[i] = data[session];
            data[session] = tmp;
            localStorage.setItem('cdata', JSON.stringify(data));

            session--;
        }
    } else {
        if(session < l){
            var i = session + 1;
            var tmp = sessions.children[i].innerHTML;
            sessions.children[i].innerHTML = sessions.children[session].innerHTML;
            sessions.children[session].innerHTML = tmp;

            focusBtn(sessions.children[i]);

            tmp = data[i];
            data[i] = data[session];
            data[session] = tmp;
            localStorage.setItem('cdata', JSON.stringify(data));
            
            session++;
        }
    }
}


var tcnt = document.getElementById('today-count');
function addval(val){
    if(isNaN(val) || val == '') return;
    var newd = new Date();
    if(data[session][newd.getFullYear()][getDayOfYear()] == undefined) data[session][newd.getFullYear()][getDayOfYear()] = 0;
    var newval = parseInt(data[session][newd.getFullYear()][getDayOfYear()]) + parseInt(val);
    sav(getDayOfYear(), newval); 
    tcnt.innerText = newval;
}







// MAIN PROGRAM


session = 1;
closeWindow(inp);
cur(Y);
focusBtn(sessions.children[session]);
addval(0);
stat();
todayCount();
/* focusBtn(sessions.children[session]);

cur(Y);
stat();
addval(0);
todayCount();
*/


var aa = document.querySelectorAll(".stat div");