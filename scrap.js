const fetch = require('node-fetch');
const cheerio = require('cheerio');
const stringify = require('csv-stringify');
const options = [{delimiter: ','}];

const fs = require('fs');




const url = 'https://author.today/u/';


const url1 = 'https://author.today/work/';

const url3 = 'https://author.today/work/genre/all?page='

function searchbook (searchTerm) {
    return fetch (`${url}${searchTerm}/library`)
    .then (response => response.text())
    .then(body => {
        const books = [];
        const $ = cheerio.load(body);
        $ ('.bookcard').each(function(i, element){
            const $element = $(element);
            const $img = $element.find("div");
            const $title = $element.find('.bookcard-title a');
            const $author = $element.find('.bookcard-authors');
            const ref = $title.attr('href').substring(6);
            refer = `https://author.today/work/${ref}`;
            const book = {
                title:  $title.text(),
                author: $author.text().trim(),
                ref, 
                refer
            };
            books.push(book);
        });
    
        return books;
    });
}

function getBook (ref) {
    return fetch(`${url1}${ref}`) 
    .then (response => response.text())
    .then (body => {
        const $ = cheerio.load(body);
        const $title = $('h1.book-title').text().trim();
        const title = $title;
        const data = $('span.hint-top').attr("data-time");
        return {
            title,
            data

       }


    });
    }

    function bookMine(bookItem) {
        return fetch (`${url3}${bookItem}`)
        .then (response => response.text())
        .then (body => {
            const $ = cheerio.load(body);
            const datas =[];
            $(".book-row-content").each(function(i, element){
                const $element = $(element);
                const $title = $element.find(".book-title a");
                const $annotation = $element.find(".annotation");
                const $author = $element.find('.book-author');
                const data = {
                    title: $title.text().trim(),
                    author: $author.text().trim(),
                    annotation: $annotation.text().trim()
                              
        
                };
                datas.push(data);
            });
            //results.append(datas)
            return datas;
        })
        .then(datas =>{
            stringify(datas,options, function(err, output){
               // output.should.eql('1,2,3,4\na,b,c,d');
               fs.appendFile('message.csv', output, 'utf8', function (err) {
                if (err) throw err;
                console.log('Saved!');
              });
                //console.log(output);
              });


           //let jsonData =  JSON.stringify(datas);
           //console.log(jsonData);
           
           
    });
        
}
// let allbase = [];
 //allbase = allbase.concat(datas);
 //console.log(allbase);

// for (let i = 1; i < 50; i++){
//    bookMine(i);
//     //console.log (n);
// };




   
module.exports = {
    searchbook,
    getBook,
    bookMine

};

