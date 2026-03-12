function alt(text){
    var x = document.createElement('div');
    x.classList.add('alt');
    x.innerHTML = text;

    document.body.appendChild(x);
    setTimeout(() => {
        document.body.removeChild(x);
    },5000)
}

var dataTx = [];
var subs = document.getElementsByClassName('subjects')[0];

function createSub(name){
    var container = document.createElement('div');
    var subName = document.createElement('div');

    subName.innerHTML = name;
    container.classList.add('sub');

    container.appendChild(subName);

    for(var i = 0; i < 3; i++){
        var el = document.createElement('input');
        el.setAttribute('pattern','\d*');
        el.classList.add(i.toString(10));

        container.appendChild(el);
    }
    var btn = document.createElement('button');
    btn.setAttribute('onclick','this.parentElement.parentElement.removeChild(this.parentElement);localStorage.setItem("grade",convertTxt())');
    btn.innerHTML = '<span class = "material-symbols-outlined">close</span>';
    btn.tabIndex = '-1';

    var avg = document.createElement('div');
    avg.classList.add('avg');

    container.appendChild(avg);
    container.appendChild(btn);
    subs.appendChild(container);

    // save to localStorage
    localStorage.setItem('grade',convertTxt());
    alt('Created subject: ' + name);
}

function convertTxt(){
    var txt = '';
    var subEl = document.querySelectorAll('.subjects .sub');

    for(var i = 0; i < subEl.length; i++){
        txt += subEl[i].children[0].innerHTML + '/';

        for(var j = 1; j < subEl[i].children.length; j++){
            txt += undf(subEl[i].children[j].value) + '/';
        }
        txt += '+';
    }
    return txt;
}
function undf(text){
    if(text == undefined) return '';
    return text;
}

var subGrade = [];
var statistic = document.getElementsByClassName('statistic')[0];

function calc(){
    var subEl = document.querySelectorAll('.subjects .sub');

    for(var i = 0; i < subEl.length; i++){
        var hsFirst = subEl[i].children[1].value.split(' ');

        var sum = 0, z = 0, hs1Length = 0;
        for(var j = 0; j < hsFirst.length; j++){
            if(hsFirst[j] != ''){
                sum += parseFloat(hsFirst[j]);
                z++;
                hs1Length++;
            }
        }

        
        if(check(subEl[i].children[2].value)) z += 2;
        if(check(subEl[i].children[3].value)) z += 3;
        // Formula: (1st + 2nd * 2 + 3nd * 3) / (number of grades)
        subGrade[i] = parseFloat(((sum + parseFloat(blankInp(subEl[i].children[2].value)) * 2 + parseFloat(blankInp(subEl[i].children[3].value)) * 3) / z).toFixed(2));
        
        // average of every subeject
        subEl[i].children[4].innerHTML = NaNtoBlank(subGrade[i]);
    }

    var sum = 0, z = 0;
    for(var i = 0; i < subGrade.length; i++){
        if(!isNaN(subGrade[i])){
            sum += subGrade[i];
            z++;
        }
    }
    var avgAll = parseFloat((sum / z).toFixed(2));

    // do statistics
    statistic.children[1].innerHTML = '<span>Average: </span>' + avgAll;

    var above8 = 0, below65 = 0;
    for(var i = 0; i < subEl.length; i++){
        if(parseFloat(subEl[i].children[4].innerHTML) > 8) above8++;
        if(parseFloat(subEl[i].children[4].innerHTML) < 6.5) below65++;
    }

    statistic.children[2].innerHTML = '<span>Above 8: </span>' + above8;
    statistic.children[3].innerHTML = '<span>Below 6.5: </span>' + below65;

    // save to localStorage
    localStorage.setItem('grade',convertTxt());
    alt('Grade calculated! ');
}

function blankInp(text){
    if(text == '') return '0';
    return text;
}
function check(text){
    if(text == '') return false;
    return true;
}
function NaNtoBlank(val){
    if(isNaN(val)) return '';
    return val;
}

// localStorage work
var subData = localStorage.getItem('grade');
if(subData != undefined){
    var subject = subData.split('+');
    for(var i = 0; i < subject.length - 1; i++){
        var inpData = subject[i].split('/');
        createSub(inpData[0]);
    }

    var subEl = document.querySelectorAll('.subjects .sub');

    for(var i = 0; i < subject.length - 1; i++){
        var inpData = subject[i].split('/');
        //subEl[i].children[0].innerHTML = inpData[0];

        for(var j = 1; j < 4; j++){
            subEl[i].children[j].value = inpData[j];
        }
    }

    calc();
}

var tabs = document.getElementsByClassName('tab');
var bl = document.getElementsByClassName('black')[0];
function tgTab(index){
    tabs[index].classList.add('opentab');
    bl.style.display = 'block';
}
function closeTab(index){
    tabs[index].classList.remove('opentab');
    bl.style.display = 'none';
}
function closeall(){
    Array.prototype.forEach.call(tabs, el => {
        if(el.classList.contains('opentab')) el.classList.remove('opentab');
    });
    bl.style.display = 'none';
}

// toggle menu
var tgBtn = document.getElementsByClassName('tgmenu')[0];
var menucnt = document.getElementsByClassName('menu-cnt')[0];

function toggleMenu(){
    menucnt.classList.toggle('appear');
    tgBtn.classList.toggle('rotate');
}

var subjectName = document.getElementById('name');

subjectName.onkeydown = function(e){
    if(e.key == 'Enter'){
        createSub(subjectName.value);
        closeall();
    }
}