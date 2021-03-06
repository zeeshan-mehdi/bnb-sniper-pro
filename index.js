

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
let ejs = require("ejs");
let pdf = require("html-pdf");
let path = require("path");
app.set('view engine', 'ejs');
//app.use(app.engine('ejs'));

app.get('/', function(req, res) {
 res.render('report',{user:{email:'abcd'}});
});  

app.post('/mail',async function(req,res){
    console.log(req.body);

    let user = req.body;

    
    let status = await sendEmail(user);

    // ejs.renderFile(path.join(__dirname, './views/', "report.ejs"), {user:user}, (err, data) => {
    //   if (err) {
    //         res.send(err);
    //   } else {
    //       let options = {
    //           "height": "11.25in",
    //           "width": "8.5in",
    //           "header": {
    //               "height": "20mm"
    //           },
    //           "footer": {
    //               "height": "20mm",
    //           },
    //       };
    //       pdf.create(data, options).toFile("report.pdf", function (err, data) {
    //           if (err) {
    //               res.send(err);
    //           } else {
    //               res.send("File created successfully");
    //           }
    //       });
    //   }

    res.send(status);
   });

async function sendEmail(user){
  let status;
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'smartsolutions343@gmail.com',
      pass: 'zeeshan1998'
    }
  });

  const data = await ejs.renderFile(path.join(__dirname, './views/', "report.ejs"), { user:user });
  
  var mailOptions = {
    from: 'smartsolutions343@gmail.com',
    to: user.email,
    subject: 'Weekly Report by BNB Sniper Pro',
    html: data
  };
  
  await transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      status = error;
    } else {
      status = info.response;
    }
  });
  return status;
}

startServer();

function startServer(){
    const listener = http.listen(process.env.PORT || 3000, function () {
      console.log('Your app is listening on port ' + listener.address().port);
      console.log('HERE ARE YOUR STREAM DETAILS, KEEP THEM SECRET!');
    });
}

  
  
  
  