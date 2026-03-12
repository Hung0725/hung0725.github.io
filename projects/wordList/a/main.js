// 24/6/2024: game function done -- tomorrow: clock and statistics for the game
// 25.6.2024: clock, start function, statistics and game logs -- tomorrow: finish game appearance and functions then publish
// 29/6: remove 2 rows; remove the ping sound; change a bit in UI

var wordtext;
if(localStorage.getItem('gcontent') == null || localStorage.getItem('gcontent') == ''){
    wordtext = "茶碗-noun-Rice bowl, tea cup/本屋-noun-Bookstore/服-noun-Chothes/書く-verb-Write/玄関-noun-Entrance, gate/宿題-noun-Homework/外国-noun-Foreign Country/銀行-noun-Bank/牛肉-noun-Beef/牛乳-noun-Cow's milk/台所-noun-Kitchen/調べる-verb-Investigate/動物-noun-Animal/電子辞書-noun-Electric dictionary/小学校-noun-Elementary school/明後日-noun-Day after tomorrow/夏休み-noun-Summer break/冬-noun-Winter/春-noun-Spring/";
} else {
    wordtext = localStorage.getItem('gcontent');
}

var wrongfile = '';
var splitword = wordtext.split('/'),
    checkword = wordtext.split('/');

var btn1 = document.querySelectorAll('.col1 button'),
    btn2 = document.querySelectorAll('.col2 button');
var MAX = 5;

var audios = [
'rightans.mp3'
];
var audioEl = document.getElementById('audio1');

for(var i = 0; i < MAX; i++){
    btn1[i].value = '0';
    btn2[i].value = '0';
}
var nval = 0;
function findpair(key){
    for(var i = 0; i < MAX; i++){
        if(btn1[i].innerText == key) return 1;
    }
    return 0;
}
function set(){
    if(nval >= MAX) return;
    if(splitword.length == 1) return;
    var ind = Math.floor(Math.random() * (splitword.length-1));
    var word = splitword[ind].split('-');
    
    while(findpair(word[0])) word = splitword[Math.floor(Math.random() * (splitword.length-1))].split('-');
    

    var rnd = Math.floor(Math.random() * MAX);
    while(btn1[rnd].value != 0){
        rnd = Math.floor(Math.random() * MAX);
    }
    nval++;
    btn1[rnd].value = '1';
    btn1[rnd].innerHTML = word[0];
    btn1[rnd].disabled = false;

    var rnd = Math.floor(Math.random() * MAX);
    while(btn2[rnd].value != 0){
        rnd = Math.floor(Math.random() * MAX);
    }
    btn2[rnd].value = '1';
    btn2[rnd].innerHTML = word[2];
    btn2[rnd].disabled = false;
    splitword.splice(ind, 1);
}

for(var i = 0; i < MAX; i++){
    set();
}

function choose(el, ind){
    if(ind == 1){
        for(var i = 0; i < MAX; i++){
            btn1[i].classList.remove('choose');
        }
        el.classList.add('choose');
    } else {
        for(var i = 0; i < MAX; i++){
            btn2[i].classList.remove('choose');
        }
        el.classList.add('choose');
    }
}

function findword(val){
    for(var i = 0; i < checkword.length; i++){
        var spl = checkword[i].split('-');
        if(val == spl[0]) return i;
    }
}

// alternative to button
var alter = document.getElementById('alter');

var ch = 0;
var r = 0, w = 0;

// game audio
var wing = new Audio('win.mp3');


var chvalue = [], btnval = [];
function tg(ind, val, id){
    ch++;
    chvalue[ind] = val;
    btnval[ind] = id;
    if(ch >= 2){
        if(chvalue[1] == undefined || chvalue[3] == undefined) return;
        if(checkword[findword(chvalue[1])].split('-')[2] == chvalue[3]){
            r++; // right times
            choose(alter, 1);
            choose(alter, 2);
            btn1[btnval[1]].classList.add('correct');
            btn2[btnval[3]].classList.add('correct');
            setTimeout(() => {
                btn1[btnval[1]].classList.remove('correct');
                btn2[btnval[3]].classList.remove('correct');
            }, 500);
            nval--;
            btn1[btnval[1]].value = '0';
            btn2[btnval[3]].value = '0';
            btn1[btnval[1]].disabled = true;
            btn2[btnval[3]].disabled = true;
            if(nval <= MAX - 3){
                for(var j = 0; j < 3; j++){
                    set();
                }
            }
            if(nval == 0){
                sec -= gsec;
                gsec = 0;
            }
        } else {
            // wrong data
            if(wrongfile.indexOf(checkword[findword(chvalue[1])].split('-')[0]) == -1 || wrongfile.indexOf(chvalue[3]) == -1) wrongfile += checkword[findword(chvalue[1])].split('-')[0] + '-' + chvalue[3] + '/';
            w++; // wrong times
            choose(alter, 1);
            choose(alter, 2);
            btn1[btnval[1]].classList.add('inc');
            btn2[btnval[3]].classList.add('inc');
            setTimeout(() => {
                btn1[btnval[1]].classList.remove('inc');
                btn2[btnval[3]].classList.remove('inc');
            }, 500);
        }
        ch = 0;
        chvalue[1] = undefined;
        chvalue[3] = undefined;
        

    } else {

    }
}


// clockset
var cl = document.getElementsByClassName('clock')[0];
var subsec = 3, sec = 60;
var gsec = sec;

function formsec(num){
    if(num < 10) return "0" + num;
    return num;
}

var congrgif = document.getElementById('congrgif'),
    bg = document.getElementById('bg'),
    main = document.getElementsByClassName('main')[0];
var ctrl = document.getElementsByClassName('control')[0],
    head = document.getElementsByClassName('head')[0],
    setting = document.getElementsByClassName('setting')[0],
    abt = document.getElementsByClassName('about')[0],
    hr = document.getElementsByTagName('hr'),
    footer = document.getElementsByClassName('footer')[0];
function startgame(){
    if(sec < 60){
        notifi('Time should be at least 1 min!');
        return;
    }
    document.documentElement.scrollTop = 0;
    document.body.classList.add('fixed');
    ctrl.classList.add('close');
    timeinp[0].parentElement.style.display = 'none';
    head.style.display = 'none';
    setting.style.display = 'none';
    hr[0].style.display = 'none';
    footer.style.display = 'none';
    var interval;
    gsec = sec;
    cl.classList.add('down');
    cl.classList.add('prepare');
    cl.innerHTML = subsec--;
    var subInterval = setInterval(() => {
        
        cl.innerHTML = subsec--;
        // when prepare time is up
        if(subsec <= -1){
            abt.style.display = 'none';
            main.style.display = 'flex';
            clearInterval(subInterval);
            if(sec > 10) cl.classList.remove('down');
            cl.classList.remove('prepare');
            if(Math.floor(gsec/60) > 0) {
                cl.innerHTML = Math.floor(gsec / 60) + '<i>:</i>' + formsec(gsec % 60);
            } else{
                cl.innerHTML = gsec;
            }
            gsec--;
            interval = setInterval(() => {
                if(Math.floor(gsec/60) > 0) {
                    cl.innerHTML = Math.floor(gsec / 60) + '<i>:</i>' + formsec(gsec % 60);
                } else{
                    cl.innerHTML = gsec;
                }
                gsec--;
                if(gsec < 10){
                    cl.classList.add('down');
                }
                if(gsec <= -1){
                    wing.play();
                    bg.classList.add('bg');
                    clearInterval(interval);
                    congrgif.classList.add('showimg');
                    congrgif.setAttribute('src','congr.gif');
                    setTimeout(() => {
                        congrgif.classList.remove('showimg');
                    }, 2490);
                    setstat();
                    cl.classList.remove('down');
                }
            }, 1000)
        }
    }, 1000);
}

// stat function
var gamelog = localStorage.getItem('gamelog') || '';
var logEl = document.getElementsByClassName('game-log')[0];
if(gamelog != ''){
    var logs = gamelog.split('/');
    for(var i = 0; i < logs.length - 1; i++){
        var parts = logs[i].split('-');
            var x = document.createElement('tr');
            var stt = document.createElement('td');
            var dt = document.createElement('td');
            var tm = document.createElement('td');
            var pm = document.createElement('td');
            var rs = document.createElement('td');
            var ws = document.createElement('td');

            var time = parseInt(parts[3]), timestring = '';
            if(time >= 60){
                timestring = Math.floor(time / 60) + 'm' + (time % 60) + 's';
            } else {
                timestring = time + 's';
            }

            stt.innerHTML = i + 1;
            dt.innerHTML = parts[0] + '-' + (parseInt(parts[1]) + 1) + '-' + parts[2];
            tm.innerHTML = timestring;
            pm.innerHTML = parseInt(parts[4]) + parseInt(parts[5]);
            rs.innerHTML = parts[4];
            ws.innerHTML = parts[5];
            
            x.appendChild(stt);
            x.appendChild(dt);
            x.appendChild(tm);
            x.appendChild(pm);
            x.appendChild(rs);
            x.appendChild(ws);
            logEl.insertBefore(x, logEl.firstChild);
    }
}



var date = new Date();
var statistics = document.getElementsByClassName('statistic')[0];
function setstat(){
    statistics.classList.add('showstat');
    var timed = document.getElementById('timeplayed'),
        pairs = document.getElementById('pairs'),
        rights = document.getElementById('rights'),
        wrong = document.getElementById('wrong'),
        acc = document.getElementById('acc');
    var wrongList = document.getElementById('wrong-list');
    var tms = '';

    if(sec >= 60){
        tms = Math.floor(sec / 60) + 'm' + (sec % 60) + 's';
    } else {
        tms = sec + 's';
    }
    timed.innerHTML = '<b>Time played: </b>' + tms;
    pairs.innerHTML = '<b>Pairs matched: </b> ' + (r + w);
    rights.innerHTML = '<b>Right: </b>' + r;
    wrong.innerHTML = '<b>Wrong: </b>' + w;
    acc.innerHTML = '<b>Accuracy: </b>'+((r / (r + w)) * 100).toFixed(1) + '%'

    // gamelog content
    gamelog += date.getFullYear() + '-' + date.getMonth() + '-' + date.getDate() + '-' + sec + '-' + r + '-' + w + '/';
    // save gamelog to local storage
    localStorage.setItem('gamelog', gamelog);
    var wrs = wrongfile.split('/');
    for(var i = 0; i < wrs.length - 1; i++){
        var x = document.createElement('div');
        var content = wrs[i].split('-');
        x.innerHTML = content[0] + ' - ' + content[1];
        wrongList.appendChild(x);
    }
}

var loginfo = document.getElementsByClassName('log')[0],
    closebtn = document.getElementById('tablebtn');
function closetable(){
    loginfo.classList.remove("showtable");
    bg.classList.remove('bg');
}
function showtable(){
    loginfo.classList.add('showtable');
    bg.classList.add('bg');
}


// mouse events 
var mininp = document.getElementById('mininp'),
    secinp = document.getElementById('secinp');
var rect = mininp.getBoundingClientRect();
var tint = document.getElementsByClassName('tint'),
    dint = document.getElementsByClassName('dint');
mininp.onmousedown = function(){
    var prev = 0;
    document.body.onmousemove = function(e){
    if(Math.abs(e.clientY - rect.top) >= 50){
        var d = Math.floor(Math.floor(rect.top)/ 30 - Math.floor(e.clientY) /30);
        if(prev > d){
            if(mininp.innerHTML > 0){
                mininp.innerHTML--;
                tint[0].innerHTML--;
                dint[0].innerHTML--;
            }
        } else if(prev < d){
            if(mininp.innerHTML < 30){
                mininp.innerHTML++;
                tint[0].innerHTML++;
                dint[0].innerHTML++;
            }
        }
        sec = mininp.innerHTML * 60 + parseInt(secinp.innerHTML);
        prev = d;
    }
}
}
secinp.onmousedown = function(){
    var prev = 0;
    document.body.onmousemove = function(e){
    if(Math.abs(e.clientY - rect.top) >= 50){
        var d = Math.floor(Math.floor(rect.top)/ 20 - Math.floor(e.clientY) /20);
        if(prev > d){
            if(secinp.innerHTML > 0){
                secinp.innerHTML--;
                tint[1].innerHTML--;
                dint[1].innerHTML--;
            }
        } else if(prev < d){
            if(secinp.innerHTML < 59){
                secinp.innerHTML++;
                tint[1].innerHTML++;
                dint[1].innerHTML++;
            }
        }
        prev = d;
        sec = mininp.innerHTML * 60 + parseInt(secinp.innerHTML);
    }
}
}
document.body.onmouseup = function(){
    document.body.onmousemove = null;
}
var prev1 = 0, prev2 = 0;
// ontouch event
var timeinp = document.querySelectorAll('.timeinput div');
mininp.ontouchmove = function(e){
        timeinp[0].classList.add('active');
        document.body.classList.add('fixed');
        var d = Math.floor(Math.floor((rect.top + rect.bottom)/2)/ 15 - Math.floor(e.touches[0].clientY) /15);
        if(prev1 < d){
            if(mininp.innerHTML > 0){
                mininp.innerHTML--;
                tint[0].innerHTML--;
                dint[0].innerHTML--;
            }
        } else if(prev1 > d){
            if(mininp.innerHTML < 30){
                mininp.innerHTML++;
                tint[0].innerHTML++;
                dint[0].innerHTML++;
            }
        }
        prev1 = d;
        sec = mininp.innerHTML * 60 + parseInt(secinp.innerHTML);
    }
//}
secinp.ontouchmove = function(e){
    timeinp[5].classList.add('active');
    document.body.classList.add('fixed');
    var d = Math.floor(Math.floor((rect.top + rect.bottom)/2)/ 15 - Math.floor(e.touches[0].clientY) /15);
    if(prev1 < d){
        if(secinp.innerHTML > 0){
            secinp.innerHTML--;
            tint[1].innerHTML--;
            dint[1].innerHTML--;
        }
    } else if(prev1 > d){
        if(secinp.innerHTML < 30){
            secinp.innerHTML++;
            tint[1].innerHTML++;
            dint[1].innerHTML++;
        }
    }
    prev1 = d;
    sec = mininp.innerHTML * 60 + parseInt(secinp.innerHTML);
}
mininp.ontouchend = function(){
    prev1 = 0;
    prev2 = 0;
    timeinp[0].classList.remove('active');
    timeinp[5].classList.remove('active');
    document.body.classList.remove('fixed');
}
secinp.ontouchend = function(){
    prev1 = 0;
    prev2 = 0;
    timeinp[0].classList.remove('active');
    timeinp[5].classList.remove('active');
    document.body.classList.remove('fixed');
}

// word text file
var gameContent = document.getElementsByClassName('game-content')[0];
var gcontent = '';
document.getElementById('gcontent')
            .addEventListener('change', function () {

                let fr = new FileReader();
                fr.onload = function () {
                    gcontent = fr.result;
                    loadgcontent();
                    document.body.classList.add('fixed');
                }

                fr.readAsText(this.files[0]);
            })

var wlist = document.getElementById('wlist');
var els = 0;
function loadgcontent(){
    wlist.textContent = '';
    bg.classList.add('bg');
    gameContent.classList.add('showfile');
    var stt = 1;
    var wrds = gcontent.split('/');
    els = wrds.length - 1;
    for(var i = 0; i < wrds.length - 1; i++){
        var wcontent = wrds[i].split('-');
        var thtml = document.createElement('tr'),
            whtml = document.createElement('td'),
            phtml = document.createElement('td'),
            mhtml = document.createElement('td'),
            shtml = document.createElement('td');

            shtml.innerText = stt;
            stt++;
            whtml.innerText = wcontent[0];
            phtml.innerText = wcontent[1].substring(0, 1);
            mhtml.innerText = wcontent[2];
        thtml.appendChild(shtml);
        thtml.appendChild(whtml);
        thtml.appendChild(phtml);
        thtml.appendChild(mhtml);
        wlist.appendChild(thtml);
    }
}

function savedata(){
    if(els < 10){
        notifi('You need at least 7 words to load game content!');
        return;
    }
    localStorage.setItem('gcontent', gcontent);
    location.reload();
}
function notifi(text){
    var x = document.createElement('div');
    x.innerText = text;
    x.classList.add('notifi');
    document.body.appendChild(x);
    setTimeout(() => {
        document.body.removeChild(x);
    }, 4500); 
}