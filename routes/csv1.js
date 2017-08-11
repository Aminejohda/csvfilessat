const express = require('express')
const multer = require('multer')
const csv = require('csv-parse')
const router = express.Router()
var fs = require('fs')
var csvv = require("csvtojson");
let upload = multer({dest: 'uploads/'})
let progress = 0;

router.post('/', upload.single('myfile'), function (req,res) {
		let i =1;
	var file = req.file;
	console.log(fs.createReadStream(file.path).path)
	csvv()
  .fromFile(fs.createReadStream(file.path).path)
  .on("end_parsed",function(jsonArrayObj){ //when parse finished, result will be emitted here.
    
  res.send(jsonArrayObj)

   })

})

module.exports = router;
