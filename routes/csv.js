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
const config = require('../config/database')

mongoose.connect(config.database);
const db= mongoose.connection;
var entete = []
var variable
var filename;
let User = require('../model/user')

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
  
      }
	});
//console.log(file)
	}	



router.post('/',ensureAuthentification , upload.single('myfile'), function (req,res) {
  //console.log(req.user._id)
  
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
  //console.log(numberentete)
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
   if (newentete[i] ==="") {
    delete variable[j][entete[i]];
  }
}
}
var newUser = 'user_id'
var newValue = req.user._id
for (var j = 0; j < variable.length; j++) {
  variable[j][newUser] = newValue ;
}

//--------------------------------file upload and insert into db---------------------------------------------------------------------------------

  /*var json = JSON.stringify(variable);
      fs.writeFile('myjsonfile.json',json , 'utf8', function (err){
              if (err) {
        return console.log(err);
    }else{
      console.log("chouf el fichier")
            var exec = require('child_process').exec;
exec('mongoimport --jsonArray --db csvfiles --collection satoripop'+newValue+filename+' --file myjsonfile.json', function(error, stdout, stderr) {
     //console.log('satoripop'+newValue+filename) 
    //console.log('stdout: ' + stdout);
    
    //console.log('stderr: ' + stderr);
    
    if (error !== null) {
        console.log('exec error: ' + error);
    }
});
    }
        });*/
//--------------------------------End-file upload and insert into db---------------------------------------------------------------------------------



//------------------------------------Bulk insert into db---------------------------------------------------------------------------------

    var col = db.collection('satoripop'+newValue+filename)
    col.insert(variable, function (err, mongooseDocuments) { if(err) console.log(err)
    else{
      variable = new Object();
entete = [];
console.log('sayee')

res.redirect('/csv/show/'+filename)
    } })
//--------------------------------End-Bulk insert into db---------------------------------------------------------------------------------

  // for (var i = 0; i < variable.length; ++i) {
  //   var entry = variable[i];
  //    batch.insert(entry);
  //   }
  //  console.log(variable.length);return

  //   batch.execute(function(err, result) {
  //     console.dir(err);
  //     console.dir(result);
  //   });

//---------------------------------Simple insert into db---------------------------------------------------------------------------------------
/*//req.user._id;
//console.log(variable)
//end delete skipped files
for (var i = 0; i < variable.length; i++) {
  //console.log("part("+i+")")
  db.collection('satoripop'+newValue+filename).save(variable[i], function(err, records) {
        if (err) throw err;
      //  console.log("record added");
      });
}*/
// mongodb
//--------------------------------End-Simple insert into db---------------------------------------------------------------------------------

});
router.get('/show/:id', ensureAuthentification, function (req,res) {
  var userId= req.user._id
  console.log(userId)
collectionsname = []
     User.findById(userId,function(err,user){
      if (err) {throw err}else {
//-----------------------------------find collections names ---------------------------------------------------
         mongoose.connection.db.listCollections().toArray(function (err, names) {
      if (err) {
        console.log(err);
      } else {
        for (var i = 0; i < names.length; i++) {
          if (names[i]['name'].indexOf(userId) !== -1) {
            var collection = names[i]['name'];
            var prefix ='satoripop'+userId;
            collectionsname.push(collection.slice(prefix.length,collection.length))
          }
        }
      }
    });
//-----------------------------------End collections names ---------------------------------------------------
            db.collection('satoripop'+userId+req.params.id).find().toArray( function(err, csvm){
              showedentete = []
         res.render('showcsv',{
          name : user.name,
          csvm : csvm,
          collectionsname : collectionsname
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