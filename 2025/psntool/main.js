var inp = document.getElementById('text-inp'),
    lst = document.getElementById("t-list"),
    dl = document.getElementById('dl');
var ar;
var duplist = [];
function dup(){
    lst.innerHTML = '';
    duplist = [];
    dl.innerHTML = '<tr class = "tle"><th>Word</th><th>Line</th></tr>';
    while(inp.value[inp.value.length - 1] == '\n') inp.value = inp.value.slice(0, inp.value.length - 1);
    ar = inp.value.split("\n");
    for(var i = 0; i < ar.length; i++){
        ar[i] = delspace(ar[i]);
        var r1 = document.createElement('tr'),
            c1 = document.createElement('td'),
            c2 = document.createElement('td');
        c1.innerHTML = i + 1;
        c2.innerHTML = ar[i];
        if(ar[i].search("--e") != -1){
            r1.classList.add('edmark');
        }

        r1.appendChild(c1);
        r1.appendChild(c2);
        lst.insertBefore(r1, lst.firstChild);
    }
    for(var i = ar.length - 1; i >= 0; i--){
        for(var j = i - 1; j >= 0; j--){
            if(delmark(ar[i]) == delmark(ar[j])){
                lst.children[lst.children.length - j - 1].classList.add('dup');
                lst.children[lst.children.length - i - 1].classList.add('dup');
                if(duplist[delmark(ar[i])] == undefined){
                    duplist[delmark(ar[i])] = [];
                }
                if(duplist[delmark(ar[i])].length == 0){
                    duplist[delmark(ar[i])][duplist[delmark(ar[i])].length] = i + 1;
                } else {
                    duplist[delmark(ar[i])][duplist[delmark(ar[i])].length - 1] = i + 1;
                }
                duplist[delmark(ar[i])][duplist[delmark(ar[i])].length] = j + 1;
                ar.splice(i, 1);
                break;
            }
        }
    }

    for(var k of Object.keys(duplist)){
        console.log(k, duplist[k]);
        var r1 = document.createElement('tr'),
            n1 = document.createElement('td'),
            n2 = document.createElement('td');
        n1.innerHTML = k;
        for(var j = 0; j < duplist[k].length; j++){
            n2.innerHTML += duplist[k][j] + " ";
        }
        r1.appendChild(n1);
        r1.appendChild(n2);
        dl.appendChild(r1);
    }
}


var fl = document.getElementById('find-line');

function delmark(str){
    if(str.search("--e") != -1){
        str = str.slice(0, str.length - 4);
    }
    while(str[str.length - 1] == " ") str = str.slice(0, str.length - 1);
    return str;
}
function delspace(str){
    while(str[0] == " ") str = str.slice(1);
    while(str[str.length - 1] == " ") str = str.slice(0, str.length - 1);
    return str;
}
function jumptoline(x){
    for(var i = 0; i < lst.children.length; i++){
        lst.children[i].classList.remove('findline');
    }
    if(lst.children[parseInt(x) - 1] == undefined){
        alert('Line unavailable');
        return;
    }
    lst.children[lst.children.length - parseInt(x)].scrollIntoView();
    document.documentElement.scrollTop = 0;
    lst.children[lst.children.length - parseInt(x)].classList.add('findline');
}

function clr(){
    if(ar == undefined){
        alert("List unavailable!");
        return;
    }
    inp.value = '';
    for(var i = 0; i < ar.length; i++){
        inp.value += ar[i] + "\n";
    }
    dup();
    inp.classList.add("eff");
    setTimeout(function(){
        inp.classList.remove('eff');
    }, 3000);
}

var out = document.getElementById('output');
function clz(){
    var i = ar.length - 1;
    while(ar[i].search("--e") == -1 && i >= 0){
        i--;
    }
    var bg = i + 1;
    lst.children[lst.children.length - i - 1].scrollIntoView();
    var ch = true;
    out.innerHTML = '';
    while((ch || ar[i].search("--e") == -1) && i >= 0){
        ch = false;
        lst.children[lst.children.length - i - 1].classList.add('clz');
        out.innerHTML = clzstring(delmark(ar[i])) + "<br>" + out.innerHTML;
        i--;
    }
    var ed = i + 2;
    document.getElementById('nof').innerHTML = "Clozed from line <b>" + ed + "</b> to line <b>" + bg + "</b>!";
}
var inc = 4;
function clzstring(str){
    var wrd = str.split(" ");
    var rs = "";
    for(var i = 0; i < wrd.length; i++){
        //console.log(wrd[i].length);
        if(wrd[i].length < 3){
            continue;
        } else if(wrd[i].length == 3){
            wrd[i] = wrd[i][0] + "_" + wrd[i][2];
            continue;
        }
        var bg = 1 + Math.floor(Math.random() * wrd[i].length / inc);
        var ed = 1 + Math.floor(Math.random() * wrd[i].length / inc);
        //console.log(bg, ed);
        temp = wrd[i];
        wrd[i] = temp.slice(0, bg);
        for(var j = 0; j < temp.length - bg - ed; j++){
            wrd[i] += "_";
        }
        wrd[i] += temp.slice(temp.length - ed);
    }
    for(var i = 0; i < wrd.length; i++){
        rs += wrd[i] + " ";
    }
    return rs.slice(0, rs.length - 1);
}
