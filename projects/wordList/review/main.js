//var content = "茶碗-noun-Rice bowl, tea cup/本屋-noun-Bookstore/服-noun-Chothes/書く-verb-Write/玄関-noun-Entrance, gate/宿題-noun-Homework/外国-noun-Foreign Country/銀行-noun-Bank/牛肉-noun-Beef/牛乳-noun-Cow's milk/台所-noun-Kitchen/調べる-verb-Investigate/動物-noun-Animal/電子辞書-noun-Electric dictionary/小学校-noun-Elementary school/";
if(localStorage.getItem('answerfile') != null || localStorage.getItem('answerfile') == ''){
    var content = localStorage.getItem('answerfile');
} else {
    document.getElementsByClassName('starter')[0].style.display = 'flex';
    var content = '';
}
var choices = document.querySelectorAll('.choice button'),
    word = document.getElementsByClassName('word')[0];

var els = content.split('/');

var t = 0, f = 0, a = els.length - 6;
var al = document.getElementById('amount'),
    cor = document.getElementById('cor'),
    inc = document.getElementsByClassName('inc');
var temp = '';

function loadg(){
    if(content == '') return;
    if(els.length <= 6){
        document.getElementsByClassName('summ')[0].style.display = 'flex';
        return;
    }
    var rnd = Math.floor(Math.random() * (els.length - 1));
    var cnt = els[rnd].split('-');
    word.innerHTML = cnt[0] + ' <span>(' + cnt[1] + ')</span>';
    word.value = cnt[2];
    els.splice(rnd, 1);

    for(var i = 0; i < 5; i++){
        choices[i].className = '';
        choices[i].disabled = false;
        choices[i].innerText = els[Math.floor(Math.random() * (els.length - 1))].split('-')[2];
    }
    choices[Math.floor(Math.random() * 5)].innerText = word.value;
    al.innerText = (f + t + 1) + '/' + a;
    temp = cnt[0];
}
loadg();


var hcnt = document.getElementById('h-content');
var frame = document.getElementById('frame');

function chose(ind, val){
    var container = document.createElement('a');
    container.innerHTML = temp;
    container.setAttribute("onclick", "frame.src = 'https://takoboto.jp/?q=' + this.innerHTML; if(document.getElementsByClassName('embed')[0].classList.contains('sw')){ document.getElementsByClassName('embed')[0].classList.remove('sw');  document.getElementById('ar').classList.add('rotate')}");
    hcnt.insertBefore(container, hcnt.firstChild);
    if(val == word.value){
        cor.innerText = ++t;
    } else {
        inc[0].innerText = ++f;
        container.classList.add('inc');
    }

    for(var i = 0; i < 5; i++){
        choices[i].disabled = true;
        if(choices[i].innerText == word.value){
            choices[i].classList.add('true');
        }
    }
    choices[ind].classList.add('false');
    setTimeout(() => {
        loadg();
    }, 2000);
}

var gcnt = '';
document.getElementById('inp')
            .addEventListener('change', function () {

                let fr = new FileReader();
                fr.onload = function () {
                    gcnt = fr.result;
                    localStorage.setItem('answerfile', gcnt);
                    location.reload();
                }

                fr.readAsText(this.files[0]);
            });

 document.getElementById('ster')
            .addEventListener('change', function () {

                let fr = new FileReader();
                fr.onload = function () {
                    gcnt = fr.result;
                    localStorage.setItem('answerfile', gcnt);
                    location.reload();
                }

                fr.readAsText(this.files[0]);
            });
            // notify
function nof(text){
    var x = document.createElement('div');
    x.classList.add('popup');
    x.innerHTML = text;
    document.body.appendChild(x);
    setTimeout(() => {
        document.body.removeChild(x);
    }, 3000);
}

function sw(){
    document.getElementsByClassName('embed')[0].classList.toggle('sw');
}
