var selectBtn = document.querySelectorAll('.select-menu button'),
    inpSel = document.getElementsByClassName('select')[0],
    selMenu = document.getElementsByClassName('select-menu')[0];

function sel(value){
    inpSel.innerText = value;
    tgSel();
}
function tgSel(){
    selMenu.classList.toggle('expand');
    if(selMenu.classList.contains('expand')){
        document.addEventListener('keyup',function(e){
            if(e.keyCode == 27){
                selMenu.classList.remove('expand');
            }
        })
    }
}

var list = document.getElementsByClassName('table-list')[0],
    wordInp = document.getElementById('word'),
    meanInp = document.getElementById('meaning');

wordInp.addEventListener('keyup', function(e){
    if(e.keyCode == 13) meanInp.focus();
});
meanInp.addEventListener('keyup', function(e){
    if(e.keyCode == 13) tgSel();
});

function notify(text){
    var x = document.createElement('div');
    x.innerHTML = text;
    x.classList.add('notify');
    document.body.appendChild(x);
    setTimeout(() => {
        document.body.removeChild(x);
    }, 5000) 
}
function check(val){
    var words = document.querySelectorAll('.table-list tr td:nth-child(' +2 +')');
    for(var i = 0; i < words.length; i++){
        if(words[i].innerText == val){
            notify("You have added this word before!" + ' #' + (i + 1));
            return false;
        }
    } 
}


var od = 0;
function addWord(){
    
    if(wordInp.value == '' || meanInp.value == ''){
        notify('Input field(s) missing!')
        return;
    }
    if(!check(wordInp.value)) return;
    var x = document.createElement('tr'),
        stt = document.createElement('td'),
        word = document.createElement('td'),
        pop = document.createElement('td'),
        meaning = document.createElement('td');

    stt.innerText = ++od;
    word.innerText = wordInp.value;
    pop.innerText = inpSel.innerText;
    meaning.innerText = meanInp.value;
    list.appendChild(x);
    x.appendChild(stt);
    x.appendChild(word);
    x.appendChild(pop);
    x.appendChild(meaning);

    if(localStorage.getItem('wordFile') == null){
        localStorage.setItem('wordFile', word.innerText + '-' + pop.innerText + '-' + meaning.innerText + '/');
    } else {
        localStorage.setItem('wordFile', localStorage.getItem('wordFile') + (word.innerText + '-' + pop.innerText + '-' + meaning.innerText + '/'));
    }
    wordInp.value = '';
    meanInp.value ='';
}

if(localStorage.getItem('wordFile') != null){
    var lists = localStorage.getItem('wordFile').split('/');

    for(var i = 0; i < lists.length-1; i++){
        var words = lists[i].split('-');

        var x = document.createElement('tr'),
        stt = document.createElement('td'),
        word = document.createElement('td'),
        pop = document.createElement('td'),
        meaning = document.createElement('td');

        stt.innerText = i + 1;
        od = i + 1;
        word.innerText = words[0];
        pop.innerText = words[1];
        meaning.innerText = words[2];
        list.appendChild(x);
        x.appendChild(stt);
        x.appendChild(word);
        x.appendChild(pop);
        x.appendChild(meaning);
    }
}

var searchInp = document.getElementById('search');
function searchFor(para, val){
    var words = document.querySelectorAll('.table-list tr td:nth-child(' +para +')');
    if(val == ''){
        for(var i = 0; i < words.length; i++){
            words[i].parentElement.style.display = 'table-row';
        }
        return;
    }
    while(val[0] == ' ') val = val.substr(1, val.length - 1);
    while(val[val.length - 1] == ' ') val = val.substr(0, val.length-1);
    while(val.indexOf('  ') != -1) val = val.replaceAll('  ', ' ');


    for(var i = 0; i < words.length; i++){
        if(words[i].innerText.toUpperCase() != val.toUpperCase()){
            words[i].parentElement.style.display = 'none';
        } else {
            words[i].parentElement.style.display = 'table-row';
        }
    }
}


var fileEl = document.getElementById('txt-file');
// download txt File
function download(filename) {
    var pom = document.createElement('a');
    pom.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(localStorage.getItem('wordFile')));
    pom.setAttribute('download', filename);

    if (document.createEvent) {
        var event = document.createEvent('MouseEvents');
        event.initEvent('click', true, true);
        pom.dispatchEvent(event);
    }
    else {
        pom.click();
    }
}

//load file
document.getElementById('txt-file')
.addEventListener('change', function () {

    let fr = new FileReader();
    fr.onload = function () {
        localStorage.setItem('wordFile', fr.result);
        location.reload();
    }

    fr.readAsText(this.files[0]);
})

var selBtn = document.querySelectorAll('.filter button');
function selec(ind){
    for(var i = 0; i < selBtn.length; i++){
        selBtn[i].classList.remove('bg-primary');
    }
    selBtn[ind].classList.add('bg-primary');
}

var hid = document.getElementById('hide');
hid.onchange = function(){
    var words = document.querySelectorAll('.table-list tr td:nth-child(' +4 +')'); 
    for(var i =0; i < words.length; i++){
            words[i].classList.toggle('hidden');
    }
}

var date = new Date();
function formatNum(num){
    if(num < 10){
        return '0' + num;
    }
    return num;
}
function filename(){
    var y = date.getFullYear();
    var m = formatNum(date.getMonth());
    var d = formatNum(date.getDate());
    var h = formatNum(date.getHours());
    var min = formatNum(date.getMinutes());
    return 'wordList' + y + m + d + h + m;
}
