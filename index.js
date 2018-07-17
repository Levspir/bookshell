const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());
const scrap = require('./scrap');

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname  + '/client/index.html'));
});

app.get('/search/:library', (req, res) => {
     scrap
     .searchbook(req.params.library)
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



const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Listening ${port}`)
});