var async = require('async');
var fs = require('fs');
var path = require('path');
var mongodb = require('mongodb').MongoClient;

/**
 * sample script to populate a mongodb with data when starting
 * current deployment does not require a backend database so the script is not being used at the moment
 */
module.exports = function (app) {

	//create all models
	async.parallel({
		fancave: async.apply(createModels),
	}, function (err, results) {
		if (err) throw err;
	});

	//create models
	function createModels(cb) {
		console.log('>> createModels')
		
		//check if mongo datasource exists
		var mongoDS = app.dataSources.mongo;	
		if (mongoDS) {
			console.log("using database")
			var mongo_url = 'mongodb://' + mongoDS.settings.host + ':' + mongoDS.settings.port;
			//connect to mongo database
			mongodb.connect(mongo_url, function(err, client) {
				if (err) {
					console.log("Unable to connect to URL %s", mongo_url);
					throw err;
				}
				var dbo = client.db(mongoDS.settings.database + mongoDS.settings.replicaSet);
				//check if collection needs to be populated
				dbo.collection("players").count(function (err, count) {
					if (!err && count === 0) {
						console.log("Populating database ...");
						var players = require('../sample-data/players.json');
						var mergedPlayers = players.nba.concat(players.nhl).concat(players.mlb).concat(players.nfl);

						dbo.collection("players").insertMany(mergedPlayers, function(err, result) {
							if (err) throw err;
							console.log("successfully inserted %s items", result.insertedCount);
						});
					}
					client.close();
				});
			});
		}
		//use in-memory datasource
		else {
			console.log("Using local player repository.")
		}
		console.log('>> createModels')
	}
};