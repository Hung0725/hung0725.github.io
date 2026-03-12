var color = [];
var seMth = 1;
var displayWay = document.getElementById('display');
var dark = 0;
var threshold = 100;
var variation = 5;
var thres = document.getElementById('thres');
var cvar = document.getElementById('cvar');

color[0] = [
    '#BFFFB7',
    '#008DBB',
    'Green'
];

color[1] = [
    '#FFE1E1',
    '#C62F99',
    'Red'
];

color[2] = [
    '#D1E9FF',
    '#1D79BF',
    'Blue'
];

color[3] = [
    '#FFE9B3',
    '#FF4000',
    'Orange'
];

color[4] = [
    '#E2C6FD',
    '#7700FF',
    'Violet'
];
color[5] = [
    '#ffde91',
    '#ffbd24',
    'Yellow'
]





function savesetting(){
    localStorage.setItem('setting',colorOpt + '/' + (0 + seMth) + '/' + dark + '/' + threshold + '/' + variation);
}

function grd(col1, col2, n){
    var a = [];
    var c = document.createElement('canvas');
    const ctx = c.getContext('2d');
    c.width = 300;
    c.height = 50;
    const grad = ctx.createLinearGradient(0,0,200,0);
    grad.addColorStop(0, col1);
    grad.addColorStop(1, col2);
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, c.width, 1);
    const imgdata = ctx.getImageData(0,0,200,1);
    const dt = imgdata.data;
        //console.log(dt.length);

    for(let i = 0; i < dt.length; i+= 4 * 200/n){
        //console.log(i);
        //console.log(dt[i], dt[i+1], dt[i+2]);
        var gColor = `rgb(${dt[i]}, ${dt[i+1]},${dt[i+2]})`;
        a.push(gColor);            
    }
    return a;
}













var colorOpt = 0;

var a = document.querySelectorAll('.stat div');

optContainer = document.getElementById('color-options');
for(var i = 0; i < color.length; i++){
    var opt = document.createElement('option');
    opt.innerText = color[i][color[i].length - 1];
    opt.value = i;
    optContainer.appendChild(opt);
}

optContainer.onchange = function(){
    colorOpt = parseInt(optContainer.value);
    render(Y);
    savesetting();
    statCol();
}

// see if there are anything in LocalStorage
var bg = document.getElementById('dark');
var settings = localStorage.setting;
if(settings != undefined){
    arr = settings.split('/');
    colorOpt = parseInt(arr[0]);
    seMth = parseInt(arr[1]);
    dark = parseInt(arr[2]);
    if(seMth){
        displayWay.checked = true;
    } else {
        displayWay.checked = false;
    }
    if(dark){
        bg.checked = true;
    } else {
        bg.checked = false;
    }
    optContainer.children[colorOpt].selected = true;
    threshold = arr[3];
    thres.value = arr[3];

    variation = arr[4];
    for(var i = 0; i < color.length; i++){
        var temp = color[i][color[i].length - 1];
        color[i] = grd(color[i][0], color[i][color[i].length - 2], variation);
        color[i][color[i].length] = temp;
    }
    cvar.value = arr[4];

}
else {
    for(var i = 0; i < color.length; i++){
        var temp = color[i][color[i].length - 1];
        color[i] = grd(color[i][0], color[i][color[i].length - 2], variation);
        color[i][color[i].length] = temp;
    }
}
// stats font color

function statCol(){
    if(!dark){
        for(var i = 0; i < a.length; i+= 2){
            a[i].style.color = color[colorOpt][color[colorOpt].length - 2];
        }
    } else {
        for(var i = 0; i < a.length; i+= 2){
            a[i].style.color = color[colorOpt][1];
        } 
    }
}













statCol();

//custom selects







thres.onchange = function(){
    threshold = thres.value;
    savesetting();
    location.reload();
}
cvar.onchange = function(){
    variation = cvar.value;
    savesetting();
    location.reload();
}
