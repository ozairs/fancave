'use strict';

const cheerio = require('cheerio'); //used for parsing HTML web pages

/**
 * set of functions to retrieve news feed from a news provider. 
 * If the backend is unavailable, it will return a local copy of the data.
 * The news provider is Yahoo which requires an OAuth access token. If the OAuth token has expired,
 * it will obtain a new access token by using the provided refresh token.
 */
module.exports = function (News) {

	//returns a set of news articles for a given league
	News.getNews = function (league, callback) {
		console.log('<< getNews');
		let data = [];
		//request to obtain a set of news articles for a given league using a previously obtained access token
		News.app.dataSources.sportsDS.getNews(league, global.access_token, function (err, response) {
			//error calling news provider service
			if (err) {
				//access token expired - use refresh token to obtain a new access token
				if (err.message) {
					News.app.dataSources.sportsDS.getToken(function (err, response) {
						//unable to obtain a new access token with a refresh token, so return local data
						if (err) {
							console.log("Unable to call news service with error %s", err.message);
							//return static data unable when news service is unavailable
							console.log("returning data file file");
							var data = require('../../server/sample-data/news.json')[league];
							return callback(null, data);
						}
						//save the access and refresh token
						global.access_token = JSON.parse(response).access_token;
						global.refresh_token = JSON.parse(response).refresh_token;
						// console.log("ys access token " + global.access_token);
						// console.log("ys refresh token " + global.refresh_token);
						
						//re-request the set of news articles using the previously obtained access token
						News.app.dataSources.sportsDS.getNews(league, global.access_token, function (err, response) {
							//error occured calling news provider with new access token so return local data
							if (err) {
								console.log("Unable to call news service with error %s", err.message);
								//return static data unable when news service is unavailable
								console.log("returning data file file");
								var data = require('../../server/sample-data/news.json')[league];
								return callback(null, data);
							}
							//format the news articles for the response
							data = News.parseNews(response);
							callback(null, data);
						});
						
					});
				}
				//error calling news provider service so return local data
				else {
					console.log("Unable to call news service with error %s", err.message);
					//return static data unable when news service is unavailable
					var data = require('../../server/sample-data/news.json')[league];
					return callback(null, data);
				}
			}
			//successfully called news provider service
			else {
				data = News.parseNews(response);
				callback(null, data);
			}
			
		});
		console.log('>> getNews');
	}

	/**
	 * build list of news articles, filtering the data to provide a nicely formatted JSON response
	 */
	News.parseNews = function (response) {
		console.log('<< parseNews');
		let data = [];
		let filterLinks = 'www.thestar.com'; //excludes sites for news articles
		//check response from REST call
		if (response.query.count > 0) {
			console.log("Successfully obtained news feed.");

			//loop through the articles
			response.query.results.item.forEach(function (newsItem) {
				//don't include articles in the excluded list
				if (newsItem.link.toLowerCase().indexOf(filterLinks) < 0) {
					//parse the image
					const $ = cheerio.load(newsItem.encoded);
					var image = $('img').attr('src');
					//build the article 
					var article = {
						'url': newsItem.link,
						'title': newsItem.title,
						'urlToImage': image,
						'description': newsItem.description,
						'publishedAt': new Date()
					}
					data.push(article);
				}
				else {
					console.log('Filtering article ' + newsItem.link);
				}
			});
		}
		else if (response.err) {
			console.log("Error obtaining news feed." + err.toString());
		}
		else {
			console.log("No articles found with matching criteria");
		}
		console.log('>> parseNews');
		//remove duplicate items in the array
		return News.removeDuplicates(data);
	}

	/**
	 * filter the array looking for duplicate items
	 */
	News.removeDuplicates = function (articles) {
		console.log('<< removeDuplicates');
		var values = {}; //used as hashtable to track current items
		var key = 'title'
		// var result = articles.filter(function (a) {
		// 	return (!this[a.url] && (this[a.url] = true)) || (!this[a.title] && (this[a.title] = true));
		// }, Object.create(null));
		var results = articles.filter(function (item) {
			var val = item[key];
			var exists = values[val];
			values[val] = true;
			return !exists;
		});
		console.log('>> removeDuplicates');
		return results;
	}
};

