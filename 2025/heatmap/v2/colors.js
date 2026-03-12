var color = [];
var seMth = 1;
var displayWay = document.getElementById('display');

color[0] = [
    '#BFFFB7',
    '#8FE3B8',
    '#60C6B9',
    '#30AABA',
    '#008DBB',
    'Green'
];

color[1] = [
    '#FFE1E1',
    '#F1B5CF',
    '#E388BD',
    '#D45CAB',
    '#C62F99',
    'Red'
];

color[2] = [
    '#D1E9FF',
    '#A4CDEF',
    '#77B1DF',
    '#4A95CF',
    '#1D79BF',
    'Blue'
];

color[3] = [
    '#FFE9B3',
    '#FFBF86',
    '#FF955A',
    '#FF6A2D',
    '#FF4000',
    'Orange'
];

color[4] = [
    '#E2C6FD',
    '#C795FE',
    '#AD63FE',
    '#9232FF',
    '#7700FF',
    'Violet'
];

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
    localStorage.setItem('setting',colorOpt + '/' + (0 + seMth));

    for(var i = 0; i < a.length; i+= 2){
        a[i].style.color = color[colorOpt][color[colorOpt].length - 2];
    }
}

// see if there are anything in LocalStorage
var settings = localStorage.setting;
if(settings != undefined){
    arr = settings.split('/');
    colorOpt = parseInt(arr[0]);
    seMth = parseInt(arr[1]);

    if(seMth){
        displayWay.checked = true;
    } else {
        displayWay.checked = false;
    }
    optContainer.children[colorOpt].selected = true;
}
// stats font color
for(var i = 0; i < a.length; i+= 2){
    a[i].style.color = color[colorOpt][color[colorOpt].length - 2];
}



//custom selects
