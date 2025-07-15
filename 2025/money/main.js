var blc = document.getElementById("mn"),
    ybl = document.getElementById('your-balance'),
    htr = document.getElementById('history'),
    nte = document.getElementById('note');
var check = false,
    label = [],
    dt = [];

var cbl = parseInt(ybl.innerHTML);
var data = [];
function blchange(val, text, ch, date){
    if(val == '' || text == ''){
        return;
    }

    cbl += parseInt(val);
    ybl.innerHTML = rtn(cbl.toString());

    var hCtn = document.createElement('tr'),
        hchange = document.createElement('td'),
        hbl = document.createElement('td'),
        hnote = document.createElement('td'),
        hd = document.createElement('td');

    if(parseInt(val) > 0) {
        hchange.innerHTML = rtn("+" + parseInt(val));
        hchange.classList.add('add');
    } else {
        hchange.innerHTML = rtn(val);
        hchange.classList.add('sub');
    }
    hbl.innerHTML = rtn(cbl.toString());
    hnote.innerHTML = text;

    hCtn.appendChild(hd);
    hCtn.appendChild(hchange);
    hCtn.appendChild(hbl);
    hCtn.appendChild(hnote);

    hCtn.classList.add('h-list');
    htr.insertBefore(hCtn, htr.children[1]);

    var d = new Date();
    if(ch){
        hd.innerHTML = (d.getDate()) + "/" + (d.getMonth() + 1) + '/' + d.getFullYear() + " " + rt(d.getHours(),2 ) + ":" + rt(d.getMinutes(),2);
        data[data.length] = erspace(hbl.innerHTML) + '|' + val + "|" + hnote.innerHTML + '|' + hd.innerHTML; 
        localStorage.setItem('balance', JSON.stringify(data));
        nte.value = '';
        blc.value = '';
        
    }  else {
        hd.innerHTML = date;
    }

}
function rtn(str){
    var c = 0;
    if(str[0] == "+"){
        c = 1;
    } else if(str[0] == '-'){
        c = 2;
    }
    if(str[0] == '+' || str[0] == '-'){
        str = str.slice(1, str.length);
    }
    var cnt = 0, tmp = '';
    for(var i = str.length - 1; i >= 0; i--){
        cnt++;
        tmp = str[i] + tmp;
        if(cnt % 3 == 0 && i != 0){
            tmp = ' ' + tmp;
        }
    }
    if(c == 1) tmp = '+' + tmp;
    if(c == 2) tmp = '-' + tmp;
    return tmp
}
function rt(n, lg){
    var tmp = n.toString();
    if(tmp.length < lg) tmp = '0' + tmp;
    return tmp;
}
var lc = localStorage.getItem('balance');
if(lc != undefined && lc != '' && lc != null && lc != '[]'){
    data = JSON.parse(lc);
    var ini = data[0].split('|');
    blchange(ini[1], "Initialize balance", 0, ini[3]);
    for(var i = 1; i < data.length; i++){
        var tmp = data[i].split('|');
       // console.log(tmp);
        blchange(tmp[1], tmp[2], 0, tmp[3]);
    }
} else {
    nte.value = 'Initialize balance'
}

function resetbl(){
    data = [];
    localStorage.setItem('balance', JSON.stringify(data));
    location.reload();
}

function undobl(){
    if(data.length >= 1) data.length = data.length - 1;
    localStorage.setItem('balance', JSON.stringify(data));
    location.reload();
}


var blk = document.getElementById('black'),
    pp = document.getElementsByClassName('popup');
function closetab(val){
    if(val = -1){
        for(var i = 0; i < pp.length; i++){
            pp[i].classList.remove('show');
        }
    } else {
        pp[val].classList.remove('show');
    }
    blk.style.display = 'none';
}
function showtab(val){
    pp[val].classList.add('show');
    blk.style.display = 'block';
    if(val == 0){
        blc.focus();
    }
}
function cvdatestring(str){
    var dstr = str.split(' ')[0].split('/');
    return dstr[1] + '/' + dstr[0] + '/' + dstr[2];
}
function erspace(str){
    while(str.search(' ') != -1) str = str.replace(' ', '');
    return str;
}






var labelind = 0;
for(var i = data.length - 1; i > 0; i--){
    var dstring = cvdatestring(data[i].split('|')[3]);
    if(i == data.length - 1){
        var tmpdate = new Date(dstring);
        label[label.length] = dstring;
        dt[dt.length] = parseInt(erspace(data[i].split('|')[0]));
        console.log(tmpdate);
    }
    if(dstring != cvdatestring(data[i-1].split("|")[3])){
        label[label.length] = cvdatestring(data[i-1].split("|")[3]);
        dt[dt.length] = parseInt(erspace(data[i-1].split('|')[0]));
    }
    
}


console.log(label, dt);

const canvas = document.getElementById('canvas');
canvas.width = document.body.offsetWidth - 20;
const ctx = canvas.getContext('2d');
ctx.strokeStyle = 'rgba(150,150,150, .3)';
drawbg();
drawline();

ctx.fillStyle = "rgba(250, 100 ,100, .7)";

var mDt = 0;
for(var i = 0; i < dt.length; i++){
    mDt = Math.max(dt[i], mDt);
}
var divine = mDt / canvas.offsetHeight;

var sp = (canvas.width / ((new Date() - new Date(label[label.length - 1])) / 3600 / 1000 / 24)) - 0.2;
//console.log(sp);
var verx = 1,
    col = [],
    clt = 0;
for(var i = label.length - 1; i >= 0; i--){
    if(i == 0){
        var l = new Date(),
            r = new Date(label[i]);
        var lth = Math.floor((l - r) / 3600 / 1000/ 24 + 1);
        console.log(lth);
    } else {
        var l = new Date(label[i]),
            r = new Date(label[i - 1]);
    
        var lth = (r - l) / 3600 / 1000 / 24;
    }
    console.log(lth);
    for(var j = 0; j < lth; j++){

        var tmp = new Date(label[i]),
            d = new Date(tmp.setDate(tmp.getDate() + j));
        chei = canvas.height - (dt[i] / divine);
        //console.log(verx - sp, chei, verx , chei + 10);
        //ctx.fillStyle = 'rgba(255, 0, 0, ' + (dt[i] / mDt);
        ctx.fillRect(verx , chei, sp - 2, canvas.height + 10);

        col[clt] = [];
        col[clt].x = verx;
        col[clt].y = chei;
        col[clt].w = sp - 2;
        col[clt].h = canvas.height + 10;
        col[clt].val = dt[i];
        col[clt].date = d.getDate() + "/" + (d.getMonth() + 1) + '/' + d.getFullYear();
        clt++;
        verx += sp;
    }
    //console.log(col);
}
console.log(col);


canvas.onmousemove = function(e) {
  // important: correct mouse position:
  var rect = this.getBoundingClientRect(),
      x = e.clientX - rect.left,
      y = e.clientY - rect.top,
      i = 0, r;
  
  ctx.clearRect(0, 0, canvas.width, canvas.height); // for demo
  drawline();
  drawbg();
  while(r = col[i++]) {
    // add a single rect to path:
    ctx.beginPath();
    ctx.rect(r.x, r.y, r.w, r.h);    
    
    // check if we hover it, fill red, if not fill it blue
    
    ctx.fillStyle = ctx.isPointInPath(x, y) ? "rgba(200, 50, 50, .7)" : "rgba(250, 100 ,100, .7)";
    ctx.fill();
    
    ctx.font = "15px Arial";
    if(ctx.isPointInPath(x, y)){
        ctx.fillStyle = 'rgba(150,150,150,.2)';
        ctx.fillRect(5, 5,  ctx.measureText(r.val.toString() + " VND").width + 15, 40);
        ctx.fillStyle = 'gray';
        ctx.fillText(rtn(r.val.toString()) + " VND",10,35);
        ctx.fillText(r.date, 10, 20)
    }
  }

};

function drawline(){
    ctx.beginPath();
    ctx.moveTo(0, canvas.height / 2);
    ctx.lineTo(canvas.width, canvas.height / 2);
    ctx.stroke();

    ctx.moveTo(0, canvas.height / 4);
    ctx.lineTo(canvas.width, canvas.height / 4);
    ctx.stroke();

    ctx.moveTo(0, canvas.height * 3 / 4);
    ctx.lineTo(canvas.width, canvas.height * 3 / 4);
    ctx.stroke();
}
function drawbg(){
    ctx.fillStyle = "rgba(150,150,150,.15)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}