
var d = new Date();
var t = new Date(2025, 6, 2, 12, 0);
var tmptime;
const mname = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct','Nov', 'Dec'];


var scr = document.querySelectorAll('.clock div'),
    mark = document.getElementById('timemark');
var timeout;
function setTime(Time){
    //console.log(Time);

    var day, hour, min, sec, milsec;
    var ts = new Date() - Time;
    tmptime = ts / 8.64e+7;
    milsec = Math.floor(ts % 1000);
    sec = Math.floor(ts / 1000 % 60);
    ts /= 1000;
    min = Math.floor(ts / 60 % 60);
    ts /= 60;
    hour = Math.floor(ts / 60 % 24);
    ts /= 60;
    //console.log(ts);
    day = Math.floor(tmptime);

    scr[0].innerHTML = day + plr(day, " Day");
    scr[1].innerHTML = reg(hour, 2) +  plr(hour, " Hour");
    scr[2].innerHTML = reg(min, 2) + '<i> m</i>';
    scr[3].innerHTML = reg(sec, 2) + '<i> s</i>';
    scr[4].innerHTML = reg(milsec, 3);

    timeout = setTimeout(function(){
        setTime(Time);
    },90)
    //console.log(day, hour, min, sec, milsec);
}
function plr(val, str){
    var tagstart = "<i>", tagend = '</i>';
    if(val != 1){return tagstart + str + "s" + tagend} else return tagstart + str + tagend;
}

function saveTime(Time){
    localStorage.setItem("timesaved", Time);
}
function reg(s, length){
    var tmp = s.toString();
    while(tmp.length < length) tmp = '0' + tmp;
    return tmp;
}
function setmark(date){
    var tmp = new Date(date);
    const dname = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    mark.innerHTML = "<b>Date set: </b><span>" + dname[tmp.getDay()] + " " + tmp.getDate() + "/" + (tmp.getMonth()+1) + "/" + tmp.getFullYear() + " " + reg(tmp.getHours(), 2) + ":" + reg(tmp.getMinutes(), 2) + "</span><button onclick = 'showtab(0, 0)'>Reset</button>";
}
function setnew(){
    savedtime = d;
    clearTimeout(timeout);
    var d = new Date(); 
    setTime(d);
    saveTime(d);
    setmark(d);
    setprog();
    rendercal(y,m);
}
function setmanual(){
    var Time = new Date(dateinp.value + ", "+ timeinp.value);
    if(Time == "Invalid Date" || Time == undefined || Time > new Date() || Time == ''){notify(0, "Invalid date!"); return}else{clearInterval(timeout)}
    savedtime = Time;
    setTime(Time);
    saveTime(Time);
    setmark(Time);
    setprog();
    rendercal(y,m);
}

var savedtime = localStorage.getItem('timesaved');
if(savedtime != '' && savedtime != undefined){
    setTime(new Date(savedtime));
    setmark(savedtime);
} else {
    setnew();
}

var dateinp = document.getElementById('date'),
    timeinp = document.getElementById('time');

const milestone = [3, 7, 10, 15, 30, 45, 60, 80, 100, 150, 300, 350, 400];
var mIndex = 0;
function mstone(){
    mIndex = 0;
    while(tmptime > milestone[mIndex]) mIndex++;
    document.getElementById('cr').innerText = Math.floor(tmptime * 100) / 100;
    document.getElementById('tl').innerText = milestone[mIndex];
    return Math.floor((tmptime / milestone[mIndex]) * 10000) / 100;    
}

var prog = document.getElementById('progress');
function setprog(){
    prog.style.width = mstone() + '%';
}
setprog();

var alt = document.getElementsByClassName("alt"),
    bbtn = document.getElementById('black');
function cltab(){
    for(var i = 0; i < alt.length; i++){
        alt[i].classList.remove('show');
    }
    bbtn.style.display = 'none';
}
var fn = document.getElementById('fn');
function showtab(i, f){
    alt[i].classList.add('show');
    bbtn.style.display = 'block';
    switch(f){
        case 0: 
            fn.setAttribute("onclick", "setnew();cltab();");
            break;
        case 1:
            fn.setAttribute("onclick", "setmanual();cltab();");
            break;
    }
}

function notify(type, content){
    const stl = ['rgb(196, 7, 7)', 'green'];
    var x = document.createElement('div');
    x.innerText = content;
    x.classList.add('nof');

    var btn = document.createElement('button');
    btn.innerText = 'x';
    x.appendChild(btn);
    btn.setAttribute("onclick", "this.parentElement.style.display = 'none'");
    document.body.appendChild(x);

    x.style.background = stl[type];
    setTimeout(function(){
        document.body.removeChild(x)
    }, 4000);
}

var y = d.getFullYear(), m = d.getMonth(),
    cal = document.getElementsByClassName('calendar')[0];

for(var i = 0;i < 42; i++){
    var x = document.createElement('div');
    cal.appendChild(x);
    x.innerText = i;
}
function rendercal(y, m){
    var tmp = new Date(y, m+1, 0),
        cr = new Date(y, m, 1);
    var mk = new Date(savedtime);
    for(var i = 0;i < 42; i++){
        cal.children[i].classList = [];
    }
    for(var i = cr.getDay(); i < tmp.getDate() + cr.getDay(); i++){
        cal.children[i].innerHTML = i - cr.getDay() + 1;
        cal.children[i].classList.add('day');
        var tp = new Date(y, m, i - cr.getDay() + 1, 23, 59, 59);
        if(tp >= mk && tp <= d){
            cal.children[i].classList.add('steak');
        }
        if(tp.getDate() == d.getDate() && tp.getMonth() == d.getMonth() && tp.getFullYear() == d.getFullYear()){
            cal.children[i].classList.add('cur');
        }
    }
}

var dpl = document.getElementById('dpl');
dpl.innerHTML = `<div>${y}</div>${mname[m]}`;
rendercal(2025, 6);

function cge(val){
    if(val){
        m++;
        if(m > 11){
            m = 0;
            y++;
        }
    }else {
        m--;
        if(m < 0){
            m = 11;
            y--;
        }
    }
    dpl.innerHTML = `<div>${y}</div>${mname[m]}`;
    rendercal(y, m);
}