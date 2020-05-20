const Db = require('./module/db.js');
var JSON = require('JSON');
var express = require('express');
var bodyParser = require('body-parser');
const cors = require("cors");

var corsOptions = {
    origin: "http://localhost:3010"
  };

var app = new express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors(corsOptions));

app.get('/item', async function(req, res){    
    let ret = await Db.query(0,'item');
    res.send(ret);
})

app.get('/history/:id', async function(req, res){            
    let targetId = req.params.id;
    console.log("In the get history route: " + targetId);
    let ret = await Db.query(targetId, 'History');
    res.send(ret);
})

app.get('/item/:id', async function(req, res){
    let targetId = req.params.id;    
    let ret = await Db.query(targetId,'item');    
    res.send(ret);
})

app.post('/item/doAdd', async function(req, res) {
    console.log("In the post route:");    
    console.log(req.body);
    let ret = await Db.insert(req.body);
    console.log('ret is: ' + ret); 
    if(ret == -1) res.send('Fail!');   
    else res.send("Succeeded! " + ret);    
})

app.post('/item/doDelete', async function(req, res) {
    console.log("In the delete route:");  
    console.log(req.body);          
    let ret = await Db.delete(req.body.id);
    console.log('ret is: ' + ret); 
    if(ret == -1) res.send('Delete Fail!');    
    else res.send("Delete Succeeded! " + ret);    
})

app.post('/item/doEdit', async function(req, res) {
    console.log("In the edit route:");  
    console.log(req.body);          
    let ret = await Db.update(req.body);
    console.log('ret is: ' + ret); 
    if(ret == -1) res.send('Edit Fail!');    
    else res.send("Edit Succeeded! " + ret);    
})

var portnum = 3080;
app.listen(portnum, process.env.IP, function(){
    console.log("Server has started on " + portnum);
})