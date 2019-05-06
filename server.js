var express = require('express');
var app = express();
var bodyParser = require('body-parser')
var path = require("path");

const PORT = process.env.PORT || 3000;

//Middleware
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname,'./public')))

var path = require('path')

//Routes
require('./controller/routes')(app)
require('./controller/html-routes')(app)

app.listen(PORT, ()=>{
    console.log(`Listening on PORT ${PORT}`);
});
