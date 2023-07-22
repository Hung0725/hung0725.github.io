/*
var imgInp = document.getElementById('image-inp');
var image = document.getElementById('image');

imgInp.onchange = e => {
    const [file] = imgInp.files;
    if(file) {
        image.src = URL.createObjectURL(file);
    }
}

*/

function alt(text){
    var x = document.createElement('div');
    x.classList.add('alt');
    x.innerHTML = text;

    document.body.appendChild(x);
    setTimeout(() => {
        document.body.removeChild(x);
    },5000)
}




let dateInf = new Date();
var currentMonth = dateInf.getMonth() + 1;
var currentYear = dateInf.getFullYear();

var dates = document.getElementsByClassName('day')[0].children;
var monthInf = document.getElementById('monthInf');


var dataStorage = localStorage.getItem('cld');
var datesData = dataStorage.split('+');

var datenow = dateInf.getFullYear().toString(10) + formatDate(dateInf.getMonth() + 1) + formatDate(dateInf.getDate());


var comms = [], emoji = [];
var yearData = [];

for(var i = 0; i < datesData.length; i++){
    yearData[i] = datesData[i].slice(0, 8);
    emoji[i] = datesData[i].slice(9, 10);
    comms[i] = datesData[i].slice(11, datesData[i].length);
}



const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May' , 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
function getCalendar(month, year){
    var d = new Date(month + '-1-' + year);
    var date = d.getDate();

    clearDate();

    // dates of previous month
    var prevDate = new Date(year, month - 1, 0).getDate();
    for(var i = d.getDay() - 1; i >= 0; i--){
        dates[i].innerHTML = prevDate;
        prevDate--;
        dates[i].classList.add('extra-date');
    }


    var datesEmo = monthFilter(month);
    // set dates of current month
    for(var i = d.getDay(); i < new Date(year, month, 0).getDate() + d.getDay(); i++){
        dates[i].innerHTML = date;

        if(date == dateInf.getDate() && month == dateInf.getMonth() + 1){
            dates[i].classList.add('currentDate');
        }
        dates[i].classList.add('mouseover');

        // style events
        var innerDate = year + formatDate(month) + formatDate(date);
        for(var j = 0; j < datesEmo.length; j++){
            if(innerDate == datesEmo[j]){
                dates[i].classList.add('emotion-' + emoji[j]);
                if(dates[i].classList.contains('mouseover')) dates[i].classList.remove('mouseover');
                dates[i].setAttribute('data',comms[j]);
                dates[i].setAttribute('onclick','displayComment(this.getAttribute(`data`), this.innerHTML)')
            }
        }

        date++;
    }

    // dates of next month
    var nextDate = 1;
    for(var i = new Date(year, month, 0).getDate() + d.getDay(); i < dates.length; i++){
        dates[i].innerHTML = nextDate;
        nextDate++;
        dates[i].classList.add('extra-date');
    }

    monthInf.innerHTML = months[month - 1] + ' ' + year;
}

var dateTitle = document.getElementsByClassName('title')[0];
var cmtSection = document.getElementsByClassName('cmt-cnt')[0];
var cmtBlock = document.getElementsByClassName('cmtSection')[0];

function displayComment(cmt, date){
    dateTitle.innerHTML = monthInf.innerHTML.slice(0,4) + date + monthInf.innerHTML.slice(3, monthInf.innerHTML.length); 
    var commt = cmt;
    if(commt == '') commt = '<span style = "opacity:0.4">No comment.</span>';
    cmtSection.innerHTML = commt;

    cmtBlock.style.bottom = 0;
}
function monthFilter(month){
    var mths = [], j = 0;

    for(var i = 0; i < yearData.length; i++){
        var mth = parseInt(yearData[i].slice(4, 6), 10);
        if(mth == month){
            mths[j] = yearData[i];
            j++;
        }
    }

    return mths;
}
function clearDate(){
    Array.prototype.forEach.call(dates, el => {
        el.innerHTML = '';
        if(el.classList.contains('currentDate')) el.classList.remove('currentDate');
        if(el.classList.contains('mouseover')) el.classList.remove('mouseover');
        if(el.classList.contains('extra-date')) el.classList.remove('extra-date');
        if(el.classList.contains('emotion-1')) el.classList.remove('emotion-1')
        if(el.classList.contains('emotion-2')) el.classList.remove('emotion-2')
        if(el.classList.contains('emotion-3')) el.classList.remove('emotion-3')
        if(el.classList.contains('emotion-4')) el.classList.remove('emotion-4')
        if(el.classList.contains('emotion-0')) el.classList.remove('emotion-0')
    });
}
function calc(index){
    if (index == 0){
        currentMonth--;
        if(currentMonth == 0){
            currentMonth = 12;
            currentYear--;
        }
    } else {
        currentMonth++;
        if(currentMonth > 12){
            currentMonth = 1;
            currentYear++;
        }
    }
    getCalendar(currentMonth, currentYear);
}
getCalendar(currentMonth,currentYear);

var emo = document.getElementsByClassName('emo');
var cmt = document.getElementById('comment');

function sendEmo(){
    var emos = getEmo();
    if(emos == -1){
        alt('Choose an emoji first!');
        return;
    }
    for(var i = 0; i < yearData.length; i++){
        if(datenow == yearData[i]) {
            alt("You cannot write your feeling 2 times a day! Please come back tomorrow!")
            return;
        }
    }
    // save to locaLStorage
    localStorage.setItem('cld', dataStorage + '+' + dateInf.getFullYear().toString(10) + formatDate(dateInf.getMonth() + 1) + formatDate(dateInf.getDate()) + '/' + emos + '/' + comment.value);
    alt("We saved your feeling today! come here tomorrow to write your feeling here!")
}

function getEmo(){
    for(var i = 0; i < emo.length; i++){
        if(emo[i].checked == true) return i;
    }
    return -1;
}
function formatDate(date){
    if(date.toString(10).length <= 1) return '0' + date.toString(10);
    return date;
}


// tooltip
var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
  return new bootstrap.Tooltip(tooltipTriggerEl)
})



