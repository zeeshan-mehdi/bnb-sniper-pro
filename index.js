

//https://bitbucket.org/webrtc/codelab/src/master/
//https://myaccount.google.com/lesssecureapps?pli=1
//const translate = require('translate');


const express = require('express');
const app = express();
const http = require('http').Server(app);
var nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

//app.use(app.engine('ejs'));

app.get('/', function(req, res) {
 res.render('index.ejs');
});  

app.post('/mail',function(req,res){
    console.log(req.body);

    res.send(req.body);
});

startServer();

function startServer(){
    const listener = http.listen(process.env.PORT || 3000, function () {
      console.log('Your app is listening on port ' + listener.address().port);
      console.log('HERE ARE YOUR STREAM DETAILS, KEEP THEM SECRET!');
    });
}

  
  
  
  