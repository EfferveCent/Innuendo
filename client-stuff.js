// ADD MESSAGE
javascript:
var q = document.createElement('script');
q.src = 'https://cdnjs.cloudflare.com/ajax/libs/socket.io/2.1.0/socket.io.js';
document.body.appendChild(q);
var socket = io.connect('https://evening-wave-36315.herokuapp.com/');
socket.emit('apiMsg', prompt('What is your nickname?') || "this user failed to put a name", prompt('What is your message') || "this user failed to put a message");
socket.on('good', function(){
    alert("Message was sent");
    console.log("waow it worked");
});

// GET MESSAGE
var xhr = new XMLHttpRequest(); 
var st = ""; 
xhr.open('GET', "https://evening-wave-36315.herokuapp.com/msg", true); 
xhr.send(); 
xhr.onreadystatechange = processRequest; 
function processRequest(e) { 
    if (xhr.readyState == 4 && xhr.status == 200) { 
        var response = JSON.parse(xhr.responseText); 
        response.forEach((x)=>{st+=x.author+": "+x.message+"\n"}); 
        alert(st); 
    } 
}