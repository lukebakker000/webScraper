var express = require('express'),
  	fs = require('fs'),
  	request = require('request'),
  	cheerio = require('cheerio'),
	  app = express()


//'/scrapedPage' is the localhost location
app.get('/scrapedPage', function(req, res){
	//request
	var url = 'http://www.google.com'
	//response
	//Here is where we move through the DOM
	request(url, function(error, response, html){
		if(!error){
			//What we are looking for
			var $ = cheerio.load(html)
			var title
			var json = {title: ""}
			//DOM html names eg. #, ., <>
			$('#hplogo').filter(function(){
				var data = $(this)
				//Exact location within element
				var title = data.children().first().text()
				//Load into JSON file
				json.title = title
			})
		}
		//Time to write the data to the system if successful
		//Can use JSON.stringify for easier reading eg. can manipulate the string
		fs.writeFile('webScraper_results.json', JSON.stringify(json, null, 2), function(err){
			if(!err){
				console.log("webScraper successful. Scrape written to 'webScraper_results.json'.")
			}
		})
		//Send a message to the browser to check your console for success
		res.send('Check your console!')
	})
})

app.listen(3000)
console.log("Listening for webScraper on port 3000.")
