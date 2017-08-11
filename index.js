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
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/csvfiles');
const db= mongoose.connection;

app.set('views',path.join(__dirname,'views'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, 'public')));
let csv = require('./routes/csv');
app.use('/csv',csv)
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
})



//database
db.once('open',function(){
  console.log('connected to db');
})

//check for db errors
db.on('error',function (err) {
  console.log(err);
})



//socket io


io.sockets.on('connection', function (socket) {
    socket.on('next', function (data,req,res) {
        socket.broadcast.emit('next', data)
        //console.log("okok");
    });
});


server.listen(3000,function () {
	console.log('welcome');
	// body...
});