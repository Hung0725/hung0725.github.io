var a = [1, 2, -1, 0];

function sort(ar){
    for(var i = 0; i < ar.length; i++){
        for(var j = i + 1; j < ar.length; j++){
            if(ar[i] > ar[j]){
                [ar[i], ar[j]] = [ar[j], ar[i]];
            }
        }
    }
    return ar;
}


let autoEv;
var autoBtn = document.getElementById('auto');
// automatically click > button
function autoclick(itv){
    autoEv = setInterval(() => {
        cont();
    }, itv);
    autoBtn.style.display = 'none';
}
function cont(){
    bubbleSort(a);
    
}
function stopauto(){
    clearInterval(autoEv);
    autoBtn.style.display = 'inline';

}

var arrayEl = document.getElementsByClassName('array')[0],
    arrayInd = document.getElementsByClassName('array-ind')[0];
// display array using DOM
function displayArray(ar){
    arrayEl.replaceChildren();
    arrayInd.replaceChildren();

    const fragment = document.createDocumentFragment(),
        frag2 = document.createDocumentFragment();
    var i = 0;
    ar.forEach(el => {
        // the array element
        const x = document.createElement('div');
        x.innerText = el;
        fragment.appendChild(x);

        // array index
        const ind = document.createElement('div');
        ind.innerHTML = i;
        i++;
        frag2.appendChild(ind);
    });
    arrayEl.appendChild(fragment);
    arrayInd.appendChild(frag2);
}

var colors = [
    'green',
    'blue'
]
function focusEl(ind, colorInd){
    Array.from(arrayEl.children).forEach(el => {
        el.classList.remove(colors[colorInd]);
    });
    arrayEl.children[ind].classList.add(colors[colorInd]);
    Array.from(arrayInd.children).forEach(el => {
        el.classList.remove(colors[colorInd]);
    });
    arrayInd.children[ind].classList.add(colors[colorInd]);
}
function swapEl(i, j){
    var v1 = arrayEl.children[i].innerText,
        v2 = arrayEl.children[j].innerText;
    arrayEl.children[i].innerHTML = `<i>${v1}</i>→${v2}`;
    arrayEl.children[j].innerHTML = `<i>${v2}</i>→${v1}`;
}
//rerender the DOM inner Text "3 -> 2" -> "2"
function swapDone(i, j){
    var v1 = arrayEl.children[i].innerText,
        v2 = arrayEl.children[j].innerText;
    if(v1.split('→')[1] == undefined) return; 
    arrayEl.children[i].innerText = v1.split('→')[1];
    arrayEl.children[j].innerText = v2.split('→')[1];
}


// variable for the loop
let i = 0; j = 0, ti = i ,tj = j;
var clk = false, swapped = false;
var boolClass = ['f', 't'];
// illustrate the bubble sort algorithm
function bubbleSort(ar){
    if(i >= ar.length - 1){
        sortDone();
        return;
    }
    displayVar(['i', 'j', 'swapped'],[i, j, swapped], [null, null, boolClass[swapped ? 1 : 0]]);
    focusEl(j, 0);
    focusEl(j + 1, 1);
    if(clk){
        if(ar[j] > ar[j + 1]){
            alt(`a[j] > a[j+1] ${ar[i]} > ${ar[j]}, swapping`, 2);
            [ar[j], ar[j + 1]] = [ar[j + 1], ar[j]];
            swapEl(j, j + 1);
            swapped = true;
        } else {
            alt(`${ar[j]} <= ${ar[j + 1]}, no swap`, 1);
        }
        ti = i;
        tj = j;

        j++;
        if(!(j + 1 < ar.length)){
            if(!swapped){
                sortDone();
            }
            i++;
            j = 0;
            swapped = false;
        }
        clk = !clk;
    } else {
        clk = !clk;
        swapDone(tj, tj + 1);
        alt(`Looping, i = ${i}, j = ${j}`);
    }
    
}

var vlist = document.getElementsByClassName('var-list')[0];
function displayVar(vars, value, classes){
    vlist.replaceChildren();
    var fragment = document.createDocumentFragment();
    for(var i = 0; i < vars.length; i++){
        var x = document.createElement('div');
        x.innerText = `${vars[i]} = ${value[i]}`;
        x.className = classes[i];
        fragment.appendChild(x);
    }

    vlist.appendChild(fragment);
}
function sortDone(){
    alt('sorting done', 3);
    swapDone(ti, tj);
    clearInterval(autoEv);
}

var altEl = document.getElementById('alt');
var altCls = [
    'nof',
    'noswap',
    'swap',
    'end'
]
function alt(txt, cls){
    altEl.innerText = txt;
    altCls.forEach(i => {
        altEl.classList.remove(i);
    });
    altEl.classList.add(altCls[cls]);
}

// make a random array
var neg = [-1, 1];
function rnd(){
    var n = Math.floor(Math.random() * 8) + 4;
    for(var i = 0; i < n; i++){
        a[i] = Math.floor(Math.random() * 20) * neg[Math.floor(Math.random() * 2)];
    }
    displayArray(a);
}

displayArray(a);


function selSort(ar){
    for(var i = 0; i < ar.length; i++){
        
    }
}