
var selectBtn = document.getElementsByClassName('custom-select-btn');
var sidebar = document.getElementsByClassName('sidebar')[0];
var mainBd = document.getElementsByClassName('main-body')[0];
var bSection = document.getElementsByClassName('black')[0];
var fixedContainer = document.getElementsByClassName('fix');

// app variables
var inp = document.getElementsByClassName('inp');
var rs = document.getElementsByClassName('rs');
var codeRs = rs[0].children;
var tgBtn = document.getElementById('tgBtn');

function toggleSidebar(){
    sidebar.classList.toggle('appear');
    mainBd.classList.toggle('push-body');
    bSection.classList.toggle('bl');

    Array.prototype.forEach.call(fixedContainer, el => {
        el.classList.toggle('sidebar-tg'); 
    });
}

var mainWindow = document.getElementsByClassName('window');

function popupWindow(index){
    Array.prototype.forEach.call(mainWindow, ed => {
        ed.style.display = "none";
    });
    mainWindow[index].style.display = 'block';
    localStorage.setItem('window', index);
}

function currentWindow(){
    for(var i = 0; i < mainWindow.length; i++){
        if(mainWindow[i].style.display == 'block') return i;
    }
    return;
}
/* Toggle popover */
var popoverTriggers = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"'));
var popoverList = popoverTriggers.map(function (popoverTrigEl){
    return new bootstrap.Popover(popoverTrigEl);
})



function generate(){
    // preview 
    rs[1].children[0].innerHTML =  `<br><b style = 'font-size:25px'> ${inp[0].value} </b><span style = "color:gray; font-size:small"> ${inp[1].innerHTML} </span><br><span style = "color:gray"> ${inp[2].value} </span>`;
    rs[1].children[2].innerHTML =   `<br><b style = "color: #3d3d3d"> ${inp[3].value} </b><br><span style = "color:gray"> ${inp[4].value} </span><br><br><span style = "font-size: small"> ${inp[5].value} </span>`;

    //code
    rs[0].children[0].innerText = rs[1].children[0].innerHTML;
    rs[0].children[1].innerText = rs[1].children[2].innerHTML;

    hlCode();
    scrollWindow();
}
function Generate(index){
    // preview 
    rs[1].children[0].innerHTML = `<b style = 'font-size:14.5px; letter-spacing:1px'><span style = 'color:gray'>Question: </span> ${textareaEl[0].value} </b><br>`;
    rs[1].children[2].innerHTML = `<br><span style = 'font-weight:bold; letter-spacing:1px; color:gray'>Answer: </span><span style = ''; letter-spacing:1px'> ${textareaEl[1].value} </span>`;

    //code
    rs[0].children[0].innerText = rs[1].children[0].innerHTML;
    rs[0].children[1].innerText = rs[1].children[2].innerHTML;

    hlCode();
    scrollWindow();
}


/* 
<b style = 'font-size:14.5px'> ${textaeraEl[0].value} </b>

<span style = 'gray'> ${textareaEl[1]} </span>
*/

function hlCode(){
    hljs.highlightElement(rs[0].children[0]);
    hljs.highlightElement(rs[0].children[1]);
}
function copyCode(text){
    navigator.clipboard.writeText(text);
}

function alt(){
    var toastelList = [].slice.call(document.querySelectorAll('.toast'));
    var toastList = toastelList.map(function(toastEl){
        return new bootstrap.Toast(toastEl);
    });
    toastList.forEach(toast => toast.show());
}
function showToast(index){
    var toastelList = [].slice.call(document.querySelectorAll('.toast'));
    var toastList = toastelList.map(function(toastEl){
        return new bootstrap.Toast(toastEl);
    });
    toastList[index].show();
   
}
/* 

<b> inp[0].value </b>
<span style = "color:gray; font-size:small"> 
    inp[1].value 
</span>
<br>
<span style = "color:gray"> inp[2].value </span>

<br>
<b style = "color: #3d3d3d"> inp[3].value </b>
<br>
<span style = "color:gray"> inp[4].value </span>
<br>
<br>
<span style = "font-size: small"> inp[5].value </span>
*/

const ans = ['A', 'B', 'C', 'D'];

var mulInp = document.getElementsByClassName('inpt');
var rightAns = document.getElementsByClassName('right-ans');

function generateMul(){
    rs[1].children[0].innerHTML = `<b> ${mulInp[0].value} </b><br><br><div style = "font-size:14.5px;padding:5px; border:1px dashed gray; background: rgba(150,150,150,.2); text-align:left; margin:10px 0"> <b>A.</b> ${mulInp[1].value} </div><div style = "font-size:14.5px; padding:5px; border:1px dashed gray; background: rgba(150,150,150,.2); text-align:left; margin:10px 0"> <b>B.</b> ${mulInp[2].value} </div><div style = "font-size:14.5px; padding:5px; border:1px dashed gray; background: rgba(150,150,150,.2); text-align:left; margin:10px 0"> <b>C.</b> ${mulInp[3].value} </div><div style = "font-size:14.5px; padding:5px; border:1px dashed gray; background: rgba(150,150,150,.2); text-align:left; margin:10px 0"> <b>D.</b> ${mulInp[4].value} </div><br>`;
    rs[1].children[2].innerHTML = `<br><span style = "color:gray"> The correct answer is <b style = 'color:rgb(72, 133, 111); font-size: 20px; margin: 0 5px'> ${ans[getRightAns()]} </b></span>`;

     rs[0].children[0].innerText = rs[1].children[0].innerHTML;
    rs[0].children[1].innerText = rs[1].children[2].innerHTML;

    hlCode();
    scrollWindow();
}

function getRightAns(){
    for(var index = 0; index < rightAns.length; index++){
        if(rightAns[index].checked) return index;
    }
}

function clearInput(){
    for(var i = 0; i < inp.length; i++){
        inp[i].value = '';
    }
    inp[1].value = 'noun';
    for(var i = 0; i < mulInp.length; i++){
        mulInp[i].value = '';
    }
    Array.prototype.forEach.call(textareaEl, el => {
        el.value = '';
    });
}

/* 
<span style = "color:gray"> The correct answer is <b style = 'color:rgb(72, 133, 111); font-size: 17pxl margin:0 5px'> ${getRightAns()} </b></span>
*/


/* Highlight.js code theme links */
const lightCode = '//cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/styles/atom-one-light.min.css';
const darkCode = '//cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/styles/atom-one-dark.min.css';


var themes = document.getElementById('themes');
var codeTheme = document.getElementById('style-code');


themes.onchange = () => {
    // save to localStorage
    if(themes.checked){
        localStorage.setItem('theme','dark');
    }else{
        localStorage.setItem('theme','light');
    }

    // change document background and text
    togTheme();    
}

var inpEl = document.getElementsByTagName('input');
var selectEl = document.getElementsByTagName('select');
var textareaEl = document.getElementsByTagName('textarea');

var menuEl = document.getElementsByClassName('heading-container');

function togTheme(){
    /* change elements theme and text color */
    Array.prototype.forEach.call(inpEl, el => {
        el.classList.toggle('dark-inp');
    });
    Array.prototype.forEach.call(menuEl, el => {
        el.classList.toggle('dark-cnt')
    });
    Array.prototype.forEach.call(selectEl, el => {
        el.classList.toggle('dark-inp');
    });
    Array.prototype.forEach.call(textareaEl, el => {
        el.classList.toggle('dark-inp');
    });
    rs[1].classList.toggle('dark-preview');
    selectBtn[0].classList.toggle('dark');
    

    /* Body background */
    document.body.classList.toggle('bg-dark');
    document.body.classList.toggle('text-white');

    /* change code theme */
    if(document.body.classList.contains('bg-dark')){
        codeTheme.href = darkCode;
    } else {
        codeTheme.href = lightCode;
    }

    
}

/* Scroll when click generate buttons */
function scrollWindow(){
    document.documentElement.scrollTop = mainWindow[currentWindow()].offsetHeight + 80;
}


// do localStorage
var themeData = localStorage.getItem('theme');
var pageData = localStorage.getItem('window');

if(themeData == 'dark'){
    togTheme();
    themes.checked = true;
}
if(pageData != null){
    popupWindow(pageData);
} else {
    popupWindow(0);
}


// store word founded in a variable
var wordStorage;

async function getWord(word, partofSpeech){
    try{
        const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
        const result = await fetch(url).then((res) => res.json());
        if(result.title){
            
        }else{
            wordStorage = result[0];
            var pos = searchPos(partofSpeech);
            try{
                wordText = wordStorage.word;
                poS = wordStorage.meanings[pos].partOfSpeech;
                definition = wordStorage.meanings[pos].definitions[0].definition;
                phonetic = wordStorage.phonetics[0].text || wordStorage.phonetics[1].text || wordStorage.phonetics[2].text;
                example = wordStorage.meanings[pos].definitions[0].example;
                console.log(wordText, poS, definition, phonetic, example) 

                 wordInf[0].innerHTML = convrt(wordText);
                 wordInf[1].innerHTML = convrt(poS);
                 wordInf[2].innerHTML = convrt(phonetic);

                 wordInf[3].innerHTML = convrt(definition);
                 wordInf[4].innerHTML = convrt(example);
            } catch{
                
            }
        }
    }
    catch{
        console.log('No words founded');
    }
}

function convrt(variable){
    if(variable == undefined) return '';
    return variable;
}


// find word meaning by parts of speech
function searchPos(pos){
    for(var i = 0; i < wordStorage.meanings.length; i++){
        if(wordStorage.meanings[i].partOfSpeech == pos){
            return i;
        }
    }
    return "No word founded";
}

// word data
var wordText, poS, definition, phonetic, example;

var wordInp = document.getElementById('wordtext');
var posInp = document.getElementById('pos');

// html .dictionary children elements
var wordInf = document.getElementsByClassName('dictionary')[0].children;

function parseText(){
    inp[0].value = wordInf[0].innerText;    
    inp[1].innerHTML = wordInf[1].innerText;
    inp[2].value = wordInf[2].innerText;
    inp[4].value = wordInf[3].innerText;
    inp[5].value = wordInf[4].innerText;    
}

wordInp.onkeydown = function(event){
    if(event.key == "Enter"){
        getWord(wordInp.value, posInp.innerHTML);
    }
}

var dictionarySection = document.getElementsByClassName('input-cnt')[0];

//custom select tag
var valueSelect = document.getElementById('data-value');
var customSelectContainer = document.getElementsByClassName('selector-container');


function tgl(ind){
    customSelectContainer[ind].classList.toggle("open-select");
    selectBtn[ind].classList.toggle('rotate-icon');
}

