var express = require('express');
var bodyParser = require('body-parser');

var Pusher = require('pusher');

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

/* Who needs security */
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(express.static('public'));

var pusher = new Pusher({ appId: '179357', key: '1616daa75a9b5e7076bc', secret: 'a17c2204a03f0721b2f5', encrypted: true });

var userCount = 0;
app.post('/pusher/auth', function(req, res) {
  var socketId = req.body.socket_id;
  var channel = req.body.channel_name;
  var presenceData = {
    user_id: ++userCount
  };

  console.log('Authing ', presenceData);

  var auth = pusher.authenticate(socketId, channel, presenceData);
  res.send(auth);
});

var port = process.env.PORT || 5000;
app.listen(port);
