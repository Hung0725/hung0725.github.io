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

var methodbtn = document.getElementById('methods');
methodbtn.oninput = () => {

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
    switch(parseInt(methodbtn.value)){
        case 0:
            bubbleSort(a);
            break;
        case 1:
            selSort(a);
            break;
        
    }    
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
    'blue',
    'checked'
]
// x is the number of element to highlight
function focusEl(ind, colorInd, x){
    Array.from(arrayEl.children).forEach(el => {
        el.classList.remove(colors[colorInd]);
    });
    Array.from(arrayInd.children).forEach(el => {
        el.classList.remove(colors[colorInd]);
    });
    
    for(var i = ind; i < x + ind; i++){
        arrayInd.children[i].classList.add(colors[colorInd]);
        arrayEl.children[i].classList.add(colors[colorInd]);
    }
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
    focusEl(j, 0, 2, 1);
    focusEl(j + 1, 1, 1);
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

// display variable name and value in HTML page
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
// used when the sorting is done
// clear interval, display text
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


// render a text, add class to a DOM element
function alt(txt, cls, isxml){
    if(isxml){
        altEl.innerHTML = txt;
    } else {
        altEl.innerText = txt;
    }
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




// selection sort algorithm
function selalg(ar){
    for(var i = 0; i < ar.length; i++){
        var m = i;
        for(var j = i + 1; i < ar.length; i++){
            if(ar[j] < a[m]){
                m = i;
            }
        }
        [ar[i], ar[m]] = [ar[m], ar[i]];
    }
}

var sel = false, jmin = 0;
// isloop: used this so user have 2 click 2 times to continue to loop
// one of the click initialize iterate value (i, j), the other one display the variable in middle of the loop
var isloop = false;
// tmpch: check if j loop has ended to rerender j_min DOM
var tmpch = false, jend = false;
function selSort(ar){
    // condition to stop when the sorting is done
    if(i >= ar.length - 1){
        swapDone(ti, tj);
        sortDone();
        console.log('done');
        return;
    }
    // initializing selection sort (just once)
    if(!sel){
        sel = true;
        i = 0;
        j = i + 1;
        markEl(i);
    }
    // highlight the DOM
    focusEl(i, 0, 1);
    focusEl(j, 1, 1);
    alt("Continue loop");

    // isloop value will be toggled between 0 and 1 on click
    // that lead to different behaviours inside this function
    // isloop value: 0 - 1 - 0 - 1 -...
    if(isloop){
        // that is what run inside the j loop
        if(ar[j] < ar[jmin]){
            alt(`a[${j}] < a[${jmin}] so j_min = ${j}`, 2);
            jmin = j;
            markEl(jmin);
        }
        isloop = !isloop;
    } else {
        // when the loop interate, remove previous display swapEl
        isloop = !isloop;
        swapDone(ti, tj);
        // if j loop end, i value +1, highlight jmin at i (initialize jmin)
        if(tmpch){
            markEl(i);
            console.log(tmpch);
            tmpch = false;
        }
    }

    // display variables in HTML
    displayVar(['i', 'j','j_min'],[i, j, jmin],[]);

    // when the comparison is done, its time to increase j (and i) value
    if(!isloop){
        j++;
        // increase i by 1 and continue the loop, if the j loop end
        if(j >= ar.length){
            // render swap el
            swapEl(i, jmin);
            
            // render alt text
            if(altEl.innerText[0] == 'a'){
                alt(`a[${j-1}] < a[${jmin}] so j_min = ${j-1}\n<i>Swap a[${i}] and a[${jmin}]</i>`, 2, 1);
            } else {
                alt(`<i>Sort a[${i}] and a[${jmin}]</i>`, 2, 1);
            }
            // temporary variables, used for swapDone()
            ti = i;
            tj = jmin;
            // swap array el
            [ar[i], ar[jmin]] = [ar[jmin], ar[i]];
            // increase i value and initialize variables
            i++;
            j = i + 1;
            jmin = i;
            tmpch = true;
            jend = false;
        }
    }
}

// mark array DOM element with red underline
function markEl(ind){
    Array.from(arrayEl.children).forEach(el => {
        el.classList.remove('mark-el');
    });
    arrayEl.children[ind].classList.add('mark-el');
}



displayArray(a);
