var express = require('express');
var fs      = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();

app.get('/api', function(req, res){

var url = 'http://money.rediff.com/gainers/nse/daily/nifty';
    request(url, function(error, response, html){
        if(!error){
            var $ = cheerio.load(html);
            var company = [], pClose = [], currentPrice = [], change = [];
            var json = [];
            var tbody = $('tbody').first()
            var total = tbody.find('tr').length;
            console.log('loop started');
            tbody.find('tr').each(function(i, elem) {
                company[i] = $(this).find('td a').eq(0).text().trim();
                pClose[i] = $(this).find('td').eq(1).text().trim();
                currentPrice[i] = $(this).find('td').eq(2).text().trim();
                change[i] = $(this).find('td font').eq(0).text().trim();

                json.push({
                    company : company[i], 
                    pClose : pClose[i], 
                    currentPrice: currentPrice[i], 
                    change : change[i]
                });
            });
            console.log('loop completed');

            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify(json));
            console.log('done');
            
            
        }
})


})

app.listen('80');
console.log('Server Started... localhost:80');
