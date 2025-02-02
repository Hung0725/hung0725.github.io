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

        localStorage.setItem('edata', JSON.stringify(data));
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
        console.log(data);
        localStorage.setItem('edata', JSON.stringify(data));
        location.reload();
    // also need to upload to JSONio API
    }
}

var sessions = document.getElementsByClassName('sessions')[0];
function newSession(sessionName, ch){
    // break if the sessionName is inappropriate
    if(parseInt(ch)) if(saved) if(!check(sessionName)) return;

    var newEl = document.createElement('button');
    ++session;
    newEl.innerHTML = '<span>' + sessionName + '</span>' + sessionEl;


    newEl.id = session * 1000;
    newEl.value = session;
    newEl.setAttribute('onclick', 'session = parseInt(this.value); stat(); cur(Y); focusBtn(this)');
    sessions.prepend(newEl);
    if(data[session] == undefined) data[session] = {};
    data[session][0] = sessionName;
    if(data[session][Y] == undefined){data[session][Y] = {};}
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
function render(year){
   

    saved = false;
    var days = checkLeap(year);
    const d = new Date(year + "-1-1");
    // get current Date
    var currentDate = new Date();

    if(seMth){
        var m = ["January", "Feburary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        mForm.innerHTML = "</div></div>"
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
            el.setAttribute('onclick', 'editVal(this.id)');

            el.setAttribute('title', '0 on ' + getDateFromDay(year, j));
            const tooltip = new bootstrap.Tooltip(el);
            if(data[session][Y][j] != undefined) sav(j, data[session][Y][j]);
        }

    } else {
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
        console.log("yearly")
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
    
    inp.children[0].children[0].innerHTML = '<span>Edit</span> ' + getDateFromDay(Y, parseInt(day));
}


var inps = document.getElementsByClassName('inpt');
function sav(ID, val){
    var em = document.getElementById(ID);
    data[session][Y][ID] = val;
    em.setAttribute('title', val + ' on ' + getDateFromDay(Y, ID));
    const tooltip = new bootstrap.Tooltip(em); 
    
    // set color for square
    var cr = Math.floor(val / 100);
    if(cr >= color[colorOpt].length - 2) cr = color[colorOpt].length - 2;

    em.style.background = color[colorOpt][cr];
    //em.style.opacity = inps[0].value / 255;
    
    localStorage.setItem('edata', JSON.stringify(data));
    if(saved){
        updateJSON();
        
    }
}




if(localStorage.edata != undefined){
    data = JSON.parse(localStorage.edata);
    // check localStorage;
    // Create a session if there is no sessions yet
    if(Object.keys(data).length <= 1){
        data = {};
        data[session] = {};
        newSession("Session 1", 1);
    } else {
        for(var i = 0; i < Object.keys(data).length - 1; i++){
            newSession(data[i + 1][0], 1);
        }
    }
    saved = true;
    

}  else {
    fetchJSON();
    if(data == undefined || Object.keys(data).length <= 1){
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
/* async function fetchJSON() {
    const binId = "679a209bad19ca34f8f65f66"; // Replace with your Bin ID
    const response = await fetch(`https://api.jsonbin.io/v3/b/${binId}/latest`, {
        headers: { "X-Master-Key": "$2a$10$aEIMG0yIDIgOHCp12erNru1fdKqdB1zJArI1TfUMUraONeYgas/p2" }
    });

    const Data = await response.json();
    data = Data.record;
    console.log(data);
    if(data != undefined){
        localStorage.setItem('edata', JSON.stringify(data));
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
}*/





// Use Github Gist instead of JSONbin.io





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
        localStorage.setItem('edata', JSON.stringify(data));
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










var inf = document.getElementsByClassName('val');
function stat(){
    var i = 2020, ind = 0, m = 0;
    var s = 0, max = 0, smax = 0;

    while(data[session][i] == undefined) i++;
    while(data[session][i] != undefined){
        
        for(var j = 1; j <= checkLeap(i); j++){
            if(data[session][i][j] != NaN && data[session][i][j] != undefined && data[session][i][j] != 0){
                s += parseInt(data[session][i][j]);
                max = Math.max(max, parseInt(data[session][i][j]));
                ind++;
                m++;
            } else {
                
                smax = Math.max(m, smax);
                m = 0;
            }
        }
        
        i++;
        
    }
    var cSt = 0;
    var temp = new Date(), j = getDayOfYear(), i = temp.getFullYear();
    if(data[session][i][j] != undefined && data[session][i][j] != NaN && data[session][i][j] != 0) cSt = 1;
            for(var j = getDayOfYear() - 1; j > 0; j--){
                if(data[session][i][j] != undefined && data[session][i][j] != NaN && data[session][i][j] != 0) {
                    cSt++;
                }
                else {
                    break;
                }
                if(j <= 1){
                    i--;
                    j = checkLeap(i) + 1;
                }
    }
    inf[0].innerText = cSt;
    inf[1].innerText = smax;
    inf[2].innerText = max;
    inf[3].innerText = s;

    if(ind != 0){
        inf[4].innerText = Math.floor(s / ind * 100) / 100;
    } else {
        inf[4].innerText = '~';
    }
}














cur(Y);
stat();








