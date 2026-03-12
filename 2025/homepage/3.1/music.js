const songs = [
    'cappie.mp3',
    'miside_menu.mp3',
    'sleepy_mita.mp3',
    'fukashigi_no_carte_piano.mp3'
]



var ad = document.getElementById('pl');
    ad.src = 'music/' + songs[0];
var tle = document.getElementById('title'),
    crt = document.getElementsByClassName('crt')[0],
    mxt = document.getElementsByClassName('mxt')[0];

tle.innerHTML = songs[0];
var IND = 0;
var ts = document.getElementById('ts');
ts.onchange = function(){
    ad.currentTime = (parseInt(ts.value) / 100) * ad.duration;
}



setInterval(function(){
    crt.innerHTML = conv(Math.round(ad.currentTime * 100) / 100);
    mxt.innerHTML = conv(Math.round(ad.duration * 100) / 100);
    //console.log(ad.currentTime, ad.duration);
    ts.value = Math.round((ad.currentTime / ad.duration) * 100);
    if(ad.ended){
        if(!ad.loop) psong(1);
    }
}, 700);



function conv(sec){
    var i = parseInt(sec);
    return (Math.round(i / 60)) + ":" + formatSec((i % 60).toString()); 
}

function playaudio(link, i){
      ad.src = 'music/' + link;
      pp();
      tle.innerHTML = link;
      IND = i;
      setsong(i);
}
function padd(time){
    var ptime = ad.currentTime + time;
    if(ptime < 0) ptime = 0;
    if(ptime > ad.duration) ptime = ad.duration;
    ad.currentTime = ptime;
}


var plbtn = document.getElementById('plbtn');
function pp(){
    if(ad.paused){
        ad.play();
        plbtn.innerHTML = "<span class = 'material-symbols-outlined'>stop</span>"
    } else {
        ad.pause();
        plbtn.innerHTML = "<span class = 'material-symbols-outlined'>play_arrow</span>"
    }
}
function rndsong(){
    IND = Math.round(Math.random() * (songs.length - 1));
    ad.src = 'music/' + songs[IND];
    pp();
    tle.innerHTML = songs[IND]
    setsong(IND);
}
function psong(ind){
    if(ind){
        if(IND < songs.length - 1) {IND++} else {IND = 0}
    } else {
        if(IND > 0) {IND--} else {IND = songs.length - 1}
    }
    ad.src = 'music/' + songs[IND];
    pp();
    tle.innerHTML = songs[IND];
    setsong(IND);
}

var songlist = document.getElementsByClassName('music-list')[0],
    psource = document.getElementById('source');

for(var i = 0; i < songs.length; i++){
    var x = document.createElement('button');
    x.innerHTML = songs[i];
    x.id = i;
    x.setAttribute('onclick','playaudio(this.innerHTML, this.id)');
    songlist.appendChild(x);
}

function setsong(ind){
    for(var i = 0; i < songlist.children.length; i++){
        songlist.children[i].classList.remove('playing');
    }
    songlist.children[ind].classList.add('playing');
}
setsong(IND);
