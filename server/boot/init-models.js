var async = require('async');
var fs = require('fs');
var path = require('path');

/**
 * sample script to populate a mongodb with data when starting
 * current deployment does not require a backend database so the script is not being used at the moment
 */
module.exports = function (app) {

	//create all models
	async.parallel({
		// megafanz: async.apply(createModels),
	}, function (err, results) {
		if (err) throw err;
	});

	//create models
	function createModels(cb) {
		console.log('>> createModels')
		
		//check if mongo datasource exists
		var mongoDS = app.dataSources.mongo;	
		if (mongoDS) {
			mongoDS.automigrate('team', function (err) {
			if (err) return cb(err);
			//read data from file
			});
		}
		//use in-memory datasource
		else {
			//remove existing entries
			var fs = require('fs');
			var database = '{}';
			console.log("current path %s", require('path').resolve(__dirname, '../database.json'));
			fs.writeFile(require('path').resolve(__dirname, '../database.json'), JSON.stringify(database, null, 4), function(err){
				if (err) console.log("Unable to remove existing database."); //handle err, success
				console.log('Successfully removed database entries.');
			});

			// app.models.Team.create(getData('team'), function(err, teams) {
			// 	if (err) { return console.log(err.message); }
			// }		
		}
		console.log('>> createModels')
	}
};