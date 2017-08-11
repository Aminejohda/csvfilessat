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
//function parse
function parcih(req,res) {
	var file =fs.readFileSync(req.file.path)+""
  filename= req.file.originalname;

  console.log(filename)
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



router.post('/', upload.single('myfile'), function (req,res) {
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



router.post('/add',function (req,res) {
 //console.log(variable)
 //console.log(req.body)
  var newentete = []

  var numberentete = Object.keys(req.body).length;
  //console.log(Object.keys(req.body).length);
  for (var i = 0; i < numberentete; i++) {
    newentete.push(req.param("f"+i))
  }
  //console.log(newentete)
  //console.log(entete)
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

console.log(variable)
//end delete skipped files


// create the final file
//donne = results.data
 
for (var i = 0; i < variable.length; i++) {
  //console.log("part("+i+")")
  db.collection(filename).save(variable[i], function(err, records) {
        if (err) throw err;
      //  console.log("record added");

      });

}

console.log("el base sayer")

// mongodb


variable = new Object();
entete = [];
            res.sendStatus(200);
});

module.exports = router;