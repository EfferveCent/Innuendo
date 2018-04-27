var app = require('express')()
var express = require('express')
var bodyParser = require('body-parser')
var path = require('path')
var http = require('http').Server(app)
var io = require('socket.io')(http)
var fs = require('fs')
var PEOPLE = 0;

var data1 = ""
function a(){
  fs.readFile('messages.txt', function(err, data) {
    data1 = JSON.parse("["+data.toString('utf8')+"]")
  });
}
setInterval(a, 1500);
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(express.static(path.join(__dirname, 'public/style.css')));
app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res){
    res.sendFile(__dirname + '/public/index.html');
});

//API


app.get('/msg', function(req, res){
  res.send(data1)
})

//END OF API

function addMessage(data){
  let temp = ","+JSON.stringify(data)
  fs.appendFile('messages.txt', temp, function (err) {
    if (err) throw err;
    console.log('newMessage!');
  });
}

io.on('connection', function(socket){
  PEOPLE++
  console.log('a user connected', data1)
  socket.emit('start', data1) //hmm[Math.floor(Math.random()*3)]
  socket.on('message', function(data){
    if(data.author == "Hamziniii" && data.message.includes("`")){
      switch(data.message){
        case "`clear":
          fs.writeFile('messages.txt', '{"message":"herro ʕ•ᴥ•ʔ","author":"Hamziniii"}', function(err){
            if (err) throw err;
            console.log('Clear!');
          })
        case "`reload":
          setTimeout(()=>{socket.emit('reload')
          socket.broadcast.emit('reload')}, 1000)
          return;
          break;
      }
    }else{
      addMessage(data)
      socket.emit('Message',data)
      socket.broadcast.emit('message',data)
    }
  })

  socket.on('apiMsg', function(a_,m_){
    if(a_ == "blamza" || a_ == "Blamza") return
    let data = {"author":a_,"message":m_}

    addMessage(data)
    socket.emit('good')
    socket.broadcast.emit('message',data)
    }
  )

  socket.on('getPeople', function(){
    socket.emit(PEOPLE.toString())
  })

  socket.on('disconnect', function(){
    console.log('user disconnected'); 
    PEOPLE--;
  });
});

http.listen(process.env.PORT || 3000, function(){
    console.log('listening on *:3000');
});
      