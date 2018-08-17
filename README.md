# BookShell

There are a large variety of online libraries in the internet today, and it  is very hard to keep track on every book and every website by yourself.This application is planned as online book shell. The user will have opportunity to make an account, to connect it to his libraries and to follow all his works in one place. ON DEVELOPING...

## Getting Started
The application is running on Sap Cloud Platform: https://book.cfapps.eu10.hana.ondemand.com/
For the moment the application is working only with Author Today: https://author.today

### Instractions

First you need to get your login name

```
author.today/u/***anubis49***/library
```

Then you should pass it in the input field and you will get  your library list.

Then you could pass book name in the field for reccomendation system and it will give you simmilar list of books.


## Reccomendation system

Recommendation system was created as web service on Flask. It also running on SCP. It is a content-based recommendation system, which is working on TF-IDF algorithm



## Built With

* [Express](http://http://expressjs.com//) - The web framework used
* [Cheerio](https://github.com/cheeriojs/cheerio/) - Cheerio module 
