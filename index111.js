const express = require('express');
const app = express();
var server = require('http').createServer(app); 
const io = require('socket.io').listen(4000);
const multer = require('multer');
const path = require('path');
const Baby= require('babyparse');
const bodyParser = require('body-parser');
let upload = multer({dest: 'uploads/'})
const fs = require('fs')
var donne;
app.set('views',path.join(__dirname,'views'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, 'public')));
let csv = require('./routes/csv');
app.use('/csv',csv)
var compteur = 0;

//index
app.get('/',function (req,res) {
  res.render('index');
});

//core express
app.use(function (req,res,next) {
 res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE, PUT");
  next();
  // body...
})
//baby parser
function parcih(req,res,compteur) {
	var file =fs.readFileSync(req.file.path)+""
console.log(compteur+"test compteur")
Baby.parse(file, {
	download: true,
	  header: true,
      dynamicTyping: true,
      complete: (results)=> {
        donne = results.data
        var ff=[]
        var limit = compteur+5;
        console.log(compteur+"hedha houwa")
        for ( compteur ; compteur <limit; compteur++) {
          ff.push((donne[compteur]));
        }
        compteur+=1;
        console.log(ff);
        res.json(ff)
      }
	});
console.log(compteur+"test compteur apres boucle")
	// body...
}

//socket io

        io.sockets.on('connection', function (socket) {
    socket.on('next', function (data) {
        socket.emit('next', data)
        app.post('/', upload.single('myfile'),  (req,res)=> {
        	 compteur+=1;
parcih(req,res,compteur);


});
        
    });
});


server.listen(3000,function () {
	console.log('welcome');
	// body...
});