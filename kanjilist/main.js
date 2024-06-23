var kanji = document.getElementById('inpKanji'),
    jlpt = document.getElementById('jlpt');
var listKanji = ['','','','',''];

var JLPT = document.getElementById('jlpt-level');

kanji.addEventListener("keyup", function(e){
    if(e.keyCode == 13){
        addKanji();
    }
});
// fix check function and getlocal function
function check(){
    if(kanji.value.length > 1){
        alt('Please enter no more than one character!')
        return false;
    }
    if(kanji.value.charCodeAt(0) >= 65 && kanji.value.charCodeAt(0) <= 121) {
        alt("No romaji allowed!")
        return false;
    }
    if(localStorage.getItem('file')) if(localStorage.getItem('file').indexOf(kanji.value) != -1) {
        alt("You have added this kanji before! Please choose another kanji!");
        var kj = localStorage.getItem('file').split('/');
        for(var i = 0; i < 5; i++){
            if(kj[i].indexOf(kanji.value) != -1){
                var el = document.querySelectorAll('.list div .N' + (5-i) + ' a')[kj[i].indexOf(kanji.value)];
                el.classList.add("highlight");
                setTimeout(() => {
                    el.classList.remove('highlight');
                }, 7000);
            }
        }
        return false;
    }
    return true;
}

var frame = document.querySelectorAll('.frame iframe')[0];
function addKanji(){
    if(!check()) return;
    var x = document.createElement('a');
    x.innerText = kanji.value;
    //x.setAttribute('href', '#');
    x.setAttribute('onclick', "frame.src = 'https://www.icampusj.net/u/akanji.jsp?k=' + this.innerText; openWindow()");
    document.getElementsByClassName('N' + (5 - JLPT.value))[0].appendChild(x);
    listKanji[JLPT.value] += kanji.value;
    localStorage.setItem("file", listKanji[0] +'/'+ listKanji[1] +'/'+ listKanji[2] +'/'+ listKanji[3] +'/'+ listKanji[4]);
    kanji.value = '';
}

function getLocal(){
    if(localStorage.getItem("file") != null){
        var s = localStorage.getItem("file");
        listKanji = s.split('/');
        for(var i = 0; i < listKanji.length; i++){
            document.getElementById('' + 5-i).innerHTML = 'N' + (5-i) + ' <i>(' + listKanji[i].length +')</i>';
            for(var j = 0; j < listKanji[i].length; j++){
                var x = document.createElement('a');
                //x.setAttribute('href', 'https://jisho.org/search/' + listKanji[i][j] + '%20%23kanji');
                x.setAttribute('onclick', "frame.src = 'https://www.icampusj.net/u/akanji.jsp?k=' + this.innerText; openWindow()");
                
                x.innerText = listKanji[i][j];
                document.getElementsByClassName("N" + (5 - i))[0].appendChild(x);
            }
        }
    }
}
getLocal();

var buttons = document.querySelectorAll(".select button");
function setValue(value){
    JLPT.value = value;
    for(var i = 0; i < buttons.length; i++){
        buttons[i].classList.remove('selected');
    }
    buttons[value].classList.add('selected');
}



// UI/UX
var fr = document.getElementsByClassName('frame')[0],
    bubble = document.getElementsByClassName('bubble')[0];
function openWindow(){
    fr.classList.add('open');
    bubble.style.display = 'none';
}
function closeTab(){
    fr.classList.remove("open");
    bubble.style.display = 'block';
}

document.addEventListener("keyup",function(e){
    e.preventDefault();
    if(e.keyCode == 27){
        closeTab();
    }
});

// txt file
function download(filename) {
    var pom = document.createElement('a');
    pom.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(localStorage.getItem('file')));
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

// input file
document.getElementById('txt-file')
.addEventListener('change', function () {

    let fr = new FileReader();
    fr.onload = function () {
        localStorage.setItem('file', fr.result);
        location.reload();
    }

    fr.readAsText(this.files[0]);
})

var fileEl =  document.getElementById('txt-file');

function alt(text){
    var x= document.createElement("div");
    x.innerHTML = text;
    x.classList.add('alt');
    document.body.appendChild(x);

}
