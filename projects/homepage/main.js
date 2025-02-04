var addBtn = document.getElementsByClassName('add')[0];
var apps = document.getElementsByClassName('apps')[0];
var arr = [];
var editapp = document.getElementsByClassName('apps-cnt')[0];

function createApp(name, appLink){
    if(name == '' || appLink == ''){
        alt('You have to fill shortcut name and URL!');
        return;
    }
    //var favicon = 'https://s2.googleusercontent.com/s2/favicons?domain=' + appLink;
    var favicon = appLink + '/favicon.ico';
    
    var app = document.createElement('a');
    var container = document.createElement('div');

    var img = document.createElement('img');
    var tle = document.createElement('div');

    img.src = favicon;
    tle.innerHTML = name;

    app.appendChild(container);
    container.appendChild(img);
    container.appendChild(tle);

    app.href = appLink;

    apps.insertBefore(app, addBtn);
    arr.push(name + '(' + appLink);
    updateLocalStorage();

    addList(name, appLink);
}
var appList = document.getElementsByClassName('app-list')[0];
var z = 0;

function addList(name, appLink){
    var newEl = document.createElement('div');
    newEl.innerHTML = '<b>' + name + '</b><i>' + appLink + '</i><button onclick = "delApp(' + z + '); this.parentElement.style.display = `none`"><span class = "material-symbols-outlined">delete</span></button>';

    appList.appendChild(newEl);

    z++;
}
function delApp(ind){
    var ap = apps.children;
    ap[ind].style.display = 'none';
    arr.splice(ind, 1);

    updateLocalStorage();
}
function updateLocalStorage(){
    var txt = '';

    for(var i = 0; i < arr.length; i++){
        txt += arr[i] + ')';
    }
    localStorage.setItem('apps', txt);
} 
var appCnt = localStorage.getItem('apps');
if(appCnt == null || appCnt == ''){
    appCnt = "Youtube(https://www.youtube.com)Facebook(https://m.facebook.com)Drive(https://drive.google.com)";
}

var appsInf = appCnt.split(')');
var j = appsInf.length;

for(var i = 0; i < appsInf.length - 1; i++){
    var inf = appsInf[i].split('(');
    createApp(inf[0], inf[1]);
} 

var appName = document.getElementById('app-name');
var appURL = document.getElementById('app-url');

var cntBox = document.getElementsByClassName('create-app')[0];

function clear(){
    appName.value = '';
    appURL.value = '';
}

var bl = document.getElementsByClassName('black')[0];


var imgInp = document.getElementById('img-inp');
var bg = document.getElementsByClassName('bg')[0];
var bgimg = document.getElementById('bgimg');

imgInp.onchange = () => {
    if(imgInp.files && imgInp.files[0]){
        var reader = new FileReader();
        reader.onload = function(e){
            bgimg.src = e.target.result;
            bg.style.display = 'block';

            localStorage.setItem('bgLink',reader.result);
            bg.style.backgroundImage = 'url("' + bgimg.src + '")'; 
        }
        reader.readAsDataURL(imgInp.files[0]);
    }
}

function uploadBg(){
    if(imgInp.files && imgInp.files[0]){
        localStorage.setItem('bgLink',getBase64Image(bgimg));
        bg.style.backgroundImage = 'url("' + bgimg.src + '")'; 
    }
}

if(localStorage.getItem('bgLink') != null){
    bg.style.display = 'block';
    bgimg.src = localStorage.getItem('bgLink');
    bg.style.backgroundImage = 'url("' + bgimg.src + '")';
} else {
    bg.style.display = 'none';
}
// base64 image link
function getBase64Image(img){
    var canvas = document.createElement('canvas');
    canvas.width = img.width;
    canvas.height = img.height;

    var ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0);

    var dataURL = canvas.toDataURL('image/png');
    return dataURL.replace(/^data:image\/(png|jpg);base64,/, '');
}

var ximg = document.getElementById('x-img'),
    yimg = document.getElementById('y-img'),
    blur = document.getElementById('blur');

ximg.oninput = function(){
    bg.style.backgroundPosition = ximg.value + '% ' + yimg.value + '%';
    localStorage.setItem('bgPos',ximg.value + ' ' + yimg.value + ' ' + blur.value);
}
yimg.oninput = function(){
    bg.style.backgroundPosition = ximg.value + '% ' + yimg.value + '%';
    localStorage.setItem('bgPos',ximg.value + ' ' + yimg.value + ' ' + blur.value);
}

blur.oninput = function(){
    bg.style.filter = 'blur(' + blur.value + 'px)';
    localStorage.setItem('bgPos',ximg.value + ' ' + yimg.value + ' ' + blur.value);
}

// apply localStorage value
if(localStorage.getItem('bgPos') != null){
    var bgPos = localStorage.getItem('bgPos').split(' ');
    bg.style.backgroundPosition = bgPos[0] + '% ' + bgPos[1]+ '%';
    bg.style.filter = 'blur(' + bgPos[2] + 'px)';

    ximg.value = bgPos[0];
    yimg.value = bgPos[1];
    blur.value = bgPos[2];
} 

var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
  return new bootstrap.Tooltip(tooltipTriggerEl)
}) 


var bgSetting = document.getElementsByClassName('bg-setting')[0];

// google search
var searchEl = document.getElementById('srch');
var searchLink = 'https://www.google.com/search?q=';

function srch(){
    var x = document.createElement('a');
    if(searchEl.value != '') x.href = searchLink + searchEl.value;
    x.click();
}

searchEl.onkeydown = function(e){
    if(e.key == "Enter"){
        srch();
    }
}

// open and close window
var tabs = document.getElementsByClassName('tab');

function openTab(ind){
    tabs[ind].classList.add('openTab');
    bl.style.display = 'block';
    document.onkeydown = function(e){
        if(e.key == 'Escape') closeTab(ind);
    }
}
function closeTab(ind){
    tabs[ind].classList.remove('openTab');
    cbl();
    document.onkeydown = null;
}
function closeWindow(){
    for(var i = 0; i < tabs.length; i++){
        if(tabs[i].classList.contains('openTab')) tabs[i].classList.remove('openTab');
    }
}
function cbl(){
    bl.style.display = 'none';
}

// alert function
function alt(text){
    var x = document.createElement('div');
    x.classList.add('alt');
    x.innerHTML = text;

    document.body.appendChild(x);
    setTimeout(() => {
        document.body.removeChild(x);
    },5000)
}