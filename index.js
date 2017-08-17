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
const expressValidator = require('express-validator');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport')
var mongoose = require('mongoose');
const config = require('./config/database')
mongoose.connect(config.database);
const db= mongoose.connection;
let User = require('./model/user')
app.set('views',path.join(__dirname,'views'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true,
}));
//pasport config
  app.use(passport.initialize());
  app.use(passport.session());
require('./config/passport')(passport);
app.get('*',function(req,res,next){
  res.locals.user = req.user || null
  next()
})
app.use(require('connect-flash')());
app.use(function (req, res, next) {
  res.locals.messages = require('express-messages')(req, res);
  next();
});
// In this example, the formParam value is going to get morphed into form body format useful for printing.
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));

let csv = require('./routes/csv');
let users = require('./routes/users');
app.use('/csv',csv)
app.use('/users',users)
//index
app.get('/', ensureAuthentification, function (req,res) {

  var userId= req.user._id
var collectionsname = []

     User.findById(userId,function(err,user){
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
             res.render('index',{
          name : user.name,
          collectionsname : collectionsname
        })
             console.log(collectionsname)

    });

       
          })
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

function ensureAuthentification(req, res, next){
if (req.isAuthenticated()) {
  return next();
}else{
  req.flash('please login')
  res.redirect('/users/login')
}
}
server.listen(process.env.PORT || 8080,function () {
	console.log('welcome');
	// body...
});