var info = {
    messages: []
}
var app = new Vue({
    el: '#app',
    // data: {
    //     message:"afsd"
    // }
    data:info
  })

  function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function checkCookie() {
    var user = getCookie("username");
    if (user != "") {
        M.toast({html: "Welcome again " + user, displayLength:3000, classes:'rounded'})
    } else {
        user = prompt("Please enter your nickname:", "");
        if (user != "" && user != null) {
            setCookie("username", user, 365);
        }
    }
}


function spawnNotification(theBody,theTitle) {
    var options = {
        body: theBody,
        icon: "icon.png"
    }
    var n = new Notification(theTitle,options);
    setTimeout(n.close.bind(n), 5000); 
  }