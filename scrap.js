const fetch = require('node-fetch');
const cheerio = require('cheerio');

const url = 'https://author.today/u/anubis49/';

const url1 = 'https://author.today/work/';


function searchbook (searchTerm) {
    return fetch (`${url}${searchTerm}`)
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

module.exports = {
    searchbook,
    getBook
};

