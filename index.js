// server.js

const express = require('express');
const app = express();
const path = require('path');

app.get('/', function(req, res) {
    console.log("Goit");
    
    res.sendFile(path.join(__dirname, 'index.html'));
});



var port = process.env.PORT || 4000
app.listen(port, function(){
    console.log('Your node js server is running'+ port) ;
});