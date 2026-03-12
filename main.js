msg = document.getElementById('msg');

function sendMess(){
    window.open('https://mail.google.com/mail/?view=cm&fs=1&to=k25hung07@gmail.com&su=Hello%20Hung&body=' + msg.value +'&bcc=')
}