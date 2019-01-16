const express = require('express');
const axios = require('axios');
const app = express();
const bodyParser = require('body-parser')
const port = process.env.PORT || 6000;

app.use(bodyParser.json())

app.post('/webhook',(res,req) =>{
console.log('in')
})

app.listen(port);

console.log('App is listening on port ' + port);
