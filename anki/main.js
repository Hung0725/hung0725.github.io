var inp = document.getElementsByClassName('inf-inp');
var form = document.getElementsByClassName('inp-form')[0];
var rsWord = document.getElementsByClassName('word')[0];
var rsMeaning = document.getElementsByClassName('meaning')[0];

var rvWord = document.getElementsByClassName('rvword')[0];
var rvMeaning = document.getElementsByClassName('rvmeaning')[0];

form.addEventListener('submit', function(e){
    e.preventDefault();
});


function createScript(){
    rsWord.innerText = addTag('<b>', '</b>',inp[0].value) + addTag(' <span style = "color:gray; font-size:small">', '</span>', inp[1].innerHTML) + '<br>' + addTag('<span style = "color:gray">', '</span>', inp[2].value);
    rvWord.innerHTML = rsWord.innerText;

    rsMeaning.innerText = addTag('<br><b style = "color:#3d3d3d">', '</b><br>', inp[3].value) + addTag('<span style = "color:gray">', '</span><br><br>', inp[4].value) + addTag('<span style = "font-size:small">', '</span>', inp[5].value);
    rvMeaning.innerHTML = rsMeaning.innerText;

    document.getElementById('press').click();
}

function addTag(before, after, value){
    return before + value + after;
}

let timeout;
function copyscript(text){
    navigator.clipboard.writeText(text);
    tgcl();
}

var select = document.getElementById('droplist');
var drop = document.getElementsByClassName('dropdown')[0];
var blacksection = document.getElementsByClassName('black')[0];

function dropdown(){
    drop.classList.toggle('show');
    if(drop.classList.contains('show')){
        blacksection.style.display = 'block';
    } else {
        blacksection.style.display = 'none';
    }
}
function setValue(value){
    select.innerHTML = value;
    dropdown();
}


var scrollH = document.documentElement.scrollHeight;
var sect = document.querySelectorAll('.page-map div');

window.addEventListener('scroll', function(){
    if(document.documentElement.scrollTop > (scrollH / 2) - 100){
        sect[1].classList.add('big');
        sect[0].classList.remove('big');
    } else {
        sect[0].classList.add('big');
        sect[1].classList.remove('big');
    }
});
if(document.documentElement.scrollTop > (scrollH / 2) - 100){
    sect[1].classList.add('big');
    sect[0].classList.remove('big');
} else {
    sect[0].classList.add('big');
    sect[1].classList.remove('big');
}



var alt = document.getElementsByClassName('alert')[0];

function tgcl(){
    alt.classList.add('display');
    setTimeout(function(){
        alt.classList.remove('display');
    }, 3000);
}
