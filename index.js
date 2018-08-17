const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const request = require('request')
const rp = require('request-promise')

const app = express();
app.use(cors());
const scrap = require('./scrap');

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname  + '/client/index.html'));
});

app.get('/search/:lib', (req, res) => {
     scrap
     .searchbook(req.params.lib)
     .then(books => {
         res.json(books);

     });
});

app.get('/app.js', function(req, res) {
    res.sendFile(__dirname + "/client/" + "app.js");
  });


app.get('/book/:ref', (req, res) => {
    scrap
    .getBook(req.params.ref)
    .then(book => {
        res.json(book);

    });
});
app.get ('/mine/:param', (req, res) => {
    scrap
    .bookMine(req.params.param)
    .then(datas =>{
        res.json(datas);

    });
    
});

app.get('/recomend', (req, res) => {
    rp({
        method: 'POST',
        uri: 'https://recomenforbook.cfapps.eu10.hana.ondemand.com/recomend',
        body: {
            title: 'Аколит'
        },    
        
    json: true})
    .then(body => {
     res.json(body);
 }).catch(err => {
     console.log(err);
 });
    
});



const port =  8080;
app.listen(port, () => {
    console.log(`Listening ${port}`)
});