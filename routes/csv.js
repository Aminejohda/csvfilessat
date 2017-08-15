const express = require('express');
const app = express();
const server = require('http').createServer(app); 
const multer = require('multer');
const path = require('path');
const Baby= require('babyparse');
const bodyParser = require('body-parser');
const upload = multer({dest: 'uploads/'})
const fs = require('fs')
const router = express.Router()
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/csvfiles');
const db= mongoose.connection;
var entete = []
var variable
var filename;
let User = require('../model/user')
let CsvM = require('../model/csvfiles')

//function parse
function parcih(req,res) {
	var file =fs.readFileSync(req.file.path)+""
  filename= req.file.originalname;

  //console.log(filename)
Baby.parse(file, {
	download: true,
	  header: true,
      dynamicTyping: true,
      complete: function(results) {
        donne = results.data
        var json = JSON.stringify(donne);
        fs.writeFile('myjsonfile.json', json, 'utf8', function (err){
        	    if (err) {
        return console.log(err);
    }else{
      //console.log("chouf el fichier")
    }
        });
      }
	});
//console.log(file)
	}	



router.post('/',ensureAuthentification , upload.single('myfile'), function (req,res) {
  console.log(req.user._id)
  
parcih(req,res);
var key = [];//nombre de champs
var keys = Object.keys(donne[1]);
entete=[]
for (var x = 0; x < keys.length; x++) {
        entete.push(keys[x]); //remplir un tableau avec les champs a tester
        key.push(x); //remplir un tableau avec les index des champs a tester
        }
        variable= donne
        
res.send({donne,entete})
//donne = new Object()
});



router.post('/add', ensureAuthentification, function (req,res) {
 //console.log(variable)
 //console.log(req.body)
  var newentete = []
  var numberentete = Object.keys(req.body).length;
  console.log(numberentete)
  //console.log(Object.keys(req.body).length);
  for (var i = 0; i < numberentete; i++) {
    newentete.push(req.param("f"+i))
  }
  console.log(newentete)
  console.log(entete)
  //-------------------------------------------------------------------------------------------------
  //comparison
  //get header donne
//update header
for (var j = 0; j < variable.length; j++) {
  for (var i = 0; i < entete.length; i++) {
if (entete[i] !== newentete[i] && newentete[i] !=="") {
  variable[j][newentete[i]] = variable[j][entete[i]]
delete variable[j][entete[i]];
}
}
}
console.log("el filter sayer")
//end update header
 // to delete the skip files
for (var j = 0; j < variable.length; j++) {
  for (var i = 0; i < entete.length; i++) {

    if (newentete[i] ==="") {
    delete variable[j][entete[i]];
  }
}
}
console.log("el tafsi5 sayer")
// add id user connected
var newUser = 'user_id'
var newValue = req.user._id
for (var j = 0; j < variable.length; j++) {
  variable[j][newUser] = newValue ;
}
//req.user._id;
console.log(variable)
//end delete skipped files
for (var i = 0; i < variable.length; i++) {
  //console.log("part("+i+")")
  db.collection(filename).save(variable[i], function(err, records) {
        if (err) throw err;
      //  console.log("record added");
      });
}
// mongodb
variable = new Object();
entete = [];
 res.sendStatus(200);
});


router.get('/show', ensureAuthentification, function (req,res) {
  var userId= req.user._id
  console.log(userId)
     User.findById(userId,function(err,user){
      if (err) {throw err}else {
            db.collection('normal.csv').find({ user_id: userId }).toArray( function(err, csvm){
         res.render('showcsv',{
          name : user.name,
          csvm : csvm
        })
    })
      }
 
          })



});












function ensureAuthentification(req, res, next){
if (req.isAuthenticated()) {
  return next();
}else{
  req.flash('please login')
  res.redirect('/users/login')
}
}
module.exports = router;