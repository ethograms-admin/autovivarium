const express = require('express')
const app = express()
var fs = require('fs');
var cors = require('cors')
var bodyParser = require('body-parser');

var port = 3111;

var router = require('./routes/routes');

app.use(cors());
app.use(bodyParser.json({limit: '15mb'}));
app.use(bodyParser.urlencoded({limit: '15mb', extended: true}));

app.get('/', function (req, res) {
    res.send('- vivarium server -');
})

app.listen(port, function () {
    console.log('listening on port ' + port);
})

app.use('/', router); 
